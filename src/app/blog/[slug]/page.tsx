import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  BlogHeader,
  BlogSidebar,
  RelatedPosts,
  ScrollProgress,
} from "@/components/blog";
import { CTA } from "@/components/home";

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${title} | Sarvadnya Generators Blog`,
    description: `Learn more about ${title} and how it impacts your power management strategies.`,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  if (!slug) return notFound();

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#111315] pt-28 sm:pt-32 pb-20">
      <ScrollProgress />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-[60px]">
        {/* Article Header & Hero */}
        <BlogHeader slug={slug} />

        <div className="flex flex-col lg:flex-row gap-10 sm:gap-14 mt-10 sm:mt-14">
          {/* Main Content Area */}
          <article className="flex-1 min-w-0">
            <div className="bg-white border border-[#E8E2D9] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xs">
              <div className="space-y-6 text-[#403C36] text-base sm:text-lg leading-relaxed">
                <p className="text-lg sm:text-xl text-[#111315] font-semibold leading-relaxed">
                  In this comprehensive guide, we explore the critical factors
                  that determine the success of power management for large-scale
                  events and industrial operations in Nashik.
                </p>

                <h2 className="text-2xl sm:text-3xl font-bold text-[#111315] pt-4">
                  Introduction to Power Reliability
                </h2>
                <p>
                  When planning a grand wedding or managing a 24/7 manufacturing
                  facility, power isn&apos;t just a utility—it&apos;s the
                  backbone of your operation. A single minute of downtime can
                  result in massive financial losses or the disruption of a
                  once-in-a-lifetime celebration.
                </p>

                <div className="my-8 p-6 sm:p-8 bg-[#FAF8F5] border-l-4 border-[#FF5500] rounded-r-2xl">
                  <p className="italic text-[#111315] text-base sm:text-xl font-medium">
                    &ldquo;Reliability in power generation is not an option;
                    it&apos;s a necessity for modern industrial growth.&rdquo;
                  </p>
                  <cite className="block mt-3 text-[#FF5500] font-bold not-italic text-sm">
                    — Tanmay Avhad, CEO
                  </cite>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-[#111315] pt-2">
                  Key Considerations for kVA Selection
                </h2>
                <p>
                  Choosing the right kVA rating is the first step. For weddings,
                  you typically need to account for lighting, sound systems, and
                  catering equipment. A 125kVA unit is often the &ldquo;sweet
                  spot&rdquo; for grand banquet halls, while 250kVA is preferred
                  for outdoor concerts and large-scale industrial shifts.
                </p>

                <ul className="list-disc pl-6 space-y-3 pt-2">
                  <li>
                    <strong className="text-[#111315]">
                      Peak Load Management:
                    </strong>{" "}
                    Always factor in a 20% safety margin.
                  </li>
                  <li>
                    <strong className="text-[#111315]">
                      Fuel Efficiency:
                    </strong>{" "}
                    Modern CPCB II certified engines offer up to 15% better fuel
                    economy.
                  </li>
                  <li>
                    <strong className="text-[#111315]">Noise Control:</strong>{" "}
                    For residential zones and weddings, acoustic enclosures are
                    mandatory.
                  </li>
                </ul>
              </div>
            </div>

            {/* Author Bio Section */}
            <div className="mt-8 p-6 sm:p-8 bg-white border border-[#E8E2D9] rounded-3xl flex items-center gap-5 shadow-xs">
              <div className="size-16 sm:size-20 rounded-full bg-[#FFF3EC] border border-[#FF5500]/30 flex items-center justify-center text-[#FF5500] shrink-0">
                <span className="text-xl sm:text-2xl font-bold">TA</span>
              </div>
              <div>
                <h4 className="text-[#111315] font-bold text-lg sm:text-xl mb-1">
                  Tanmay Avhad
                </h4>
                <p className="text-[#524E48] text-sm leading-relaxed">
                  Founder &amp; Technical Lead at Sarvadnya Generators with 15+
                  years of experience in power systems.
                </p>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 shrink-0">
            <BlogSidebar />
          </aside>
        </div>

        {/* Related Posts */}
        <div className="mt-20 sm:mt-24">
          <RelatedPosts />
        </div>
      </div>

      <div className="mt-20 sm:mt-24">
        <CTA />
      </div>
    </main>
  );
}
