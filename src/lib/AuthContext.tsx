"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

/**
 * User profile from the users table
 */
interface UserProfile {
  id: string;
  auth_id: string;
  name: string;
  email: string;
  user_type: "individual" | "business";
  email_verified: boolean;
  phone_number: string | null;
  phone_country_code: string | null;
  phone_verified: boolean;
  profile_image_url: string | null;
  date_of_birth: string | null;
  gender: string | null;
  preferred_language: string;
  preferred_currency: string;
  timezone: string;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signUpWithEmail: (
    email: string,
    password: string,
    name: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Memoize Supabase client to prevent recreation on each render
  const supabase = useMemo(() => createClient(), []);

  // Sync user with backend and fetch profile
  const fetchUserProfile = async (
    accessToken: string,
    authId: string
  ): Promise<UserProfile | null> => {
    console.log("AuthContext: Syncing user with backend and fetching profile");
    try {
      // Step 1: Sync user with backend (creates user in public.users if not exists)
      const syncResponse = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
        }/api/v1/auth/sync-user`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      if (!syncResponse.ok) {
        console.error("AuthContext: Backend sync failed", syncResponse.status);
        // Continue anyway - user might already be synced
      } else {
        const syncResult = await syncResponse.json();
        console.log("AuthContext: Backend sync result", syncResult);
      }

      // Step 2: Fetch profile from Supabase directly
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("auth_id", authId)
        .eq("is_deleted", false)
        .maybeSingle();

      if (error) {
        console.error("AuthContext: Supabase profile fetch error", error);
        return null;
      }

      if (!data) {
        console.warn("AuthContext: User profile not found after sync");
        return null;
      }

      console.log("AuthContext: Profile fetched successfully");
      return data as UserProfile;
    } catch (error) {
      console.error("AuthContext: Error in sync/fetch flow:", error);
      return null;
    }
  };

  // Refresh user profile
  const refreshProfile = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session?.access_token && session?.user?.id) {
      const profile = await fetchUserProfile(
        session.access_token,
        session.user.id
      );
      setUserProfile(profile);
    }
  };

  // Sign in with Google OAuth
  const signInWithGoogle = async () => {
    console.group("Supabase Auth: Google Sign In");
    const options = {
      provider: "google" as const,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    };
    console.log("Request Payload:", options);

    const { error, data } = await supabase.auth.signInWithOAuth(options);

    console.log("Supabase Response:", { error, data });
    console.groupEnd();

    if (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  // Sign up with Email
  const signUpWithEmail = async (
    email: string,
    password: string,
    name: string
  ) => {
    console.group("Supabase Auth: Email Sign Up");
    const payload = {
      email,
      password: "***",
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: { name },
      },
    };
    console.log("Request Payload:", payload);

    const response = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          name,
        },
      },
    });

    console.log("Supabase Response:", response);
    console.groupEnd();

    const { error } = response;

    if (error) {
      console.error("Error signing up with email:", error);
      throw error;
    }
  };

  // Sign out
  const signOut = async () => {
    console.log("AuthContext: Starting signOut");
    try {
      const { error } = await supabase.auth.signOut();
      console.log("AuthContext: signOut result", { error });
      if (error) {
        console.error("Error signing out:", error);
        throw error;
      }
      setUser(null);
      setUserProfile(null);
      console.log("AuthContext: signOut complete, user state cleared");
    } catch (err) {
      console.error("AuthContext: signOut exception", err);
      throw err;
    }
  };

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      console.log("AuthContext: Starting initAuth");
      try {
        // Get current session
        const {
          data: { session },
        } = await supabase.auth.getSession();

        console.log(
          "AuthContext: Session retrieved",
          session ? "Session Found" : "No Session"
        );

        if (session?.user && session.access_token) {
          setUser(session.user);
          console.log("AuthContext: Fetching profile from backend...");
          const profile = await fetchUserProfile(
            session.access_token,
            session.user.id
          );
          console.log("AuthContext: Profile retrieved", profile);
          setUserProfile(profile);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        console.log("AuthContext: Setting loading false");
        setLoading(false);
      }
    };

    initAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event: any, session: any) => {
      if (session?.user && session.access_token) {
        setUser(session.user);
        const profile = await fetchUserProfile(
          session.access_token,
          session.user.id
        );
        setUserProfile(profile);
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        signInWithGoogle,
        signUpWithEmail,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to access auth context
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
