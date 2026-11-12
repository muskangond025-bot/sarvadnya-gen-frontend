import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export interface LegalTocItem {
  id: string;
  title: string;
}

export interface LegalRelatedDoc {
  href: string;
  label: string;
}

interface LegalDocumentLayoutProps {
  titlePrefix: string;
  titleAccent: string;
  subtitle: string;
  tableOfContents: LegalTocItem[];
  relatedDocs: LegalRelatedDoc[];
  helpTitle: string;
  helpDescription: string;
  children: ReactNode;
}

export function LegalDocumentLayout({
  titlePrefix,
  titleAccent,
  subtitle,
  tableOfContents,
  relatedDocs,
  helpTitle,
  helpDescription,
  children,
}: LegalDocumentLayoutProps) {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#111315] pt-28 pb-24 px-6 sm:px-10 font-sans selection:bg-[#FF5500]/15 selection:text-[#FF5500]">
      <div className="max-w-5xl mx-auto">
        <header className="border-b border-[#E8E2D9] pb-10 mb-14">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111315] leading-[1.08]">
            {titlePrefix}{" "}
            <span className="text-[#FF5500]">{titleAccent}</span>
          </h1>
          <p className="mt-4 text-sm font-mono text-[#524E48]">{subtitle}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <article className="lg:col-span-8 space-y-12 text-[#403C36] leading-relaxed">
            {children}
          </article>

          <aside className="lg:col-span-4 lg:sticky lg:top-28 lg:pl-8 lg:border-l lg:border-[#E8E2D9] space-y-8">
            <nav aria-label="Main Points" className="space-y-3">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[#524E48]">
                Main Points
              </h2>
              <ul className="space-y-2.5">
                {tableOfContents.map((item, index) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="group flex items-baseline gap-3 text-sm text-[#403C36] hover:text-[#FF5500] transition-colors"
                    >
                      <span className="text-xs font-mono text-[#524E48] group-hover:text-[#FF5500] transition-colors">
                        0{index + 1}
                      </span>
                      <span className="font-medium">{item.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="pt-7 border-t border-[#E8E2D9] space-y-3">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[#524E48]">
                Related Documents
              </h2>
              <ul className="space-y-2.5">
                {relatedDocs.map((doc) => (
                  <li key={doc.href}>
                    <Link
                      href={doc.href}
                      className="group inline-flex items-center gap-2 text-sm font-medium text-[#111315] hover:text-[#FF5500] transition-colors"
                    >
                      <span>{doc.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#524E48] group-hover:text-[#FF5500] group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-7 border-t border-[#E8E2D9] space-y-3">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[#524E48]">
                {helpTitle}
              </h2>
              <p className="text-sm text-[#403C36] leading-relaxed">
                {helpDescription}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#111315] hover:text-[#FF5500] border-b border-[#111315]/40 hover:border-[#FF5500] pb-0.5 transition-colors"
              >
                <span>Contact Support</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

