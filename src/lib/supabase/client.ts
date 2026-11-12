import { createBrowserClient } from "@supabase/ssr";

const MOCK_AUTH_STORAGE_KEY = "sarvadnya_mock_auth_session";

type AuthListener = (event: string, session: any) => void;
const mockListeners = new Set<AuthListener>();

function buildMockUser(email: string, name?: string) {
  const cleanEmail = email.trim().toLowerCase();
  const derivedName =
    name?.trim() ||
    cleanEmail
      .split("@")[0]
      .replace(/[._-]+/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()) ||
    "Member";

  return {
    id: `mock-${cleanEmail}`,
    email: cleanEmail,
    user_metadata: {
      name: derivedName,
      full_name: derivedName,
    },
    created_at: new Date().toISOString(),
  };
}

function readMockSession() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(MOCK_AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeMockSession(session: any | null, event: string) {
  if (typeof window !== "undefined") {
    try {
      if (session) {
        window.localStorage.setItem(MOCK_AUTH_STORAGE_KEY, JSON.stringify(session));
      } else {
        window.localStorage.removeItem(MOCK_AUTH_STORAGE_KEY);
      }
    } catch {
      // ignore storage errors
    }
  }

  for (const listener of mockListeners) {
    try {
      listener(event, session);
    } catch {
      // ignore listener errors
    }
  }
}

/**
 * Creates a Supabase client for use in the browser (Client Components)
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

  const isMock =
    !supabaseUrl ||
    !supabaseKey ||
    supabaseUrl.includes("your_supabase_project_url") ||
    !supabaseUrl.startsWith("http");

  if (isMock) {
    return {
      auth: {
        getSession: async () => ({
          data: { session: readMockSession() },
          error: null,
        }),
        onAuthStateChange: (callback: AuthListener) => {
          mockListeners.add(callback);
          return {
            data: {
              subscription: {
                unsubscribe: () => {
                  mockListeners.delete(callback);
                },
              },
            },
          };
        },
        signInWithPassword: async ({
          email,
          password,
        }: {
          email: string;
          password: string;
        }) => {
          if (!email || !email.includes("@")) {
            return {
              data: { user: null, session: null },
              error: { message: "Please enter a valid email address." },
            };
          }
          if (!password || password.length < 6) {
            return {
              data: { user: null, session: null },
              error: {
                message: "Password must be at least 6 characters.",
              },
            };
          }
          const user = buildMockUser(email);
          const session = {
            access_token: "mock-access-token",
            user,
          };
          writeMockSession(session, "SIGNED_IN");
          return { data: { user, session }, error: null };
        },
        signInWithOAuth: async () => {
          const user = buildMockUser("guest@sarvadnyagenerators.com", "Guest Member");
          const session = {
            access_token: "mock-access-token",
            user,
          };
          writeMockSession(session, "SIGNED_IN");
          return { data: { user, session }, error: null };
        },
        signUp: async ({
          email,
          password,
          options,
        }: {
          email: string;
          password: string;
          options?: { data?: { name?: string } };
        }) => {
          if (!email || !email.includes("@")) {
            return {
              data: { user: null, session: null },
              error: { message: "Please enter a valid email address." },
            };
          }
          if (!password || password.length < 6) {
            return {
              data: { user: null, session: null },
              error: {
                message: "Password must be at least 6 characters.",
              },
            };
          }
          const user = buildMockUser(email, options?.data?.name);
          const session = {
            access_token: "mock-access-token",
            user,
          };
          writeMockSession(session, "SIGNED_IN");
          return { data: { user, session }, error: null };
        },
        signOut: async () => {
          writeMockSession(null, "SIGNED_OUT");
          return { error: null };
        },
      },
      from: () => ({
        select: () => ({
          eq: () => ({
            eq: () => ({
              maybeSingle: async () => ({ data: null, error: null }),
              single: async () => ({ data: null, error: null }),
            }),
            maybeSingle: async () => ({ data: null, error: null }),
          }),
          maybeSingle: async () => ({ data: null, error: null }),
        }),
      }),
    } as any;
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
}
