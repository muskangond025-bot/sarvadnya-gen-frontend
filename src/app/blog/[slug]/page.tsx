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
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  // Mock data for now, in a real app this would fetch from a CMS or DB
  const title = params.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  return {
    title: `${title} | Sarvadnya Generators Blog`,
    description: `Learn more about ${title} and how it impacts your power management strategies.`,
  };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  // Mock check for slug existence
  if (!params.slug) return notFound();

  return (
    <main className="min-h-screen bg-black pt-28 pb-20">
      <ScrollProgress />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-[60px]">
        {/* Article Header & Hero */}
        <BlogHeader slug={params.slug} />

        <div className="flex flex-col lg:flex-row gap-10 sm:gap-16 mt-10 sm:mt-16">
          {/* Main Content Area */}
          <article className="flex-1 min-w-0">
            <div className="prose prose-invert prose-emerald max-w-none font-['Outfit',sans-serif] text-[#bfbfbf] text-base sm:text-lg leading-relaxed">
              <p className="text-lg sm:text-xl text-white font-medium mb-6 sm:mb-8">
                In this comprehensive guide, we explore the critical factors that determine the success of power management for large-scale events and industrial operations in Nashik.
              </p>
              
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-['Poppins',sans-serif] mt-8 sm:mt-12 mb-4 sm:mb-6">Introduction to Power Reliability</h2>
              <p>
                When planning a grand wedding or managing a 24/7 manufacturing facility, power isn't just a utility—it's the backbone of your operation. A single minute of downtime can result in massive financial losses or the disruption of a once-in-a-lifetime celebration.
              </p>

              <div className="my-8 sm:my-12 p-5 sm:p-8 bg-white/5 border-l-4 border-[#00ff8f] rounded-r-2xl">
                <p className="italic text-white text-base sm:text-xl">
                  "Reliability in power generation is not an option; it's a necessity for modern industrial growth."
                </p>
                <cite className="block mt-4 text-[#00ff8f] font-bold">— Tanmay Avhad, CEO</cite>
              </div>

              <h2 className="text-3xl font-bold text-white font-['Poppins',sans-serif] mt-12 mb-6">Key Considerations for kVA Selection</h2>
              <p>
                Choosing the right kVA rating is the first step. For weddings, you typically need to account for lighting, sound systems, and catering equipment. A 125kVA unit is often the "sweet spot" for grand banquet halls, while 250kVA is preferred for outdoor concerts and large-scale industrial shifts.
              </p>

              <ul className="list-disc pl-6 space-y-4 my-8">
                <li><strong className="text-white">Peak Load Management:</strong> Always factor in a 20% safety margin.</li>
                <li><strong className="text-white">Fuel Efficiency:</strong> Modern CPCB II certified engines offer up to 15% better fuel economy.</li>
                <li><strong className="text-white">Noise Control:</strong> For residential zones and weddings, acoustic enclosures are mandatory.</li>
              </ul>
            </div>

            {/* Author Bio Section */}
            <div className="mt-20 p-8 bg-[#111] border border-white/10 rounded-3xl flex items-center gap-6">
              <div className="size-20 rounded-full bg-[#00ff8f]/20 border border-[#00ff8f]/40 flex items-center justify-center text-[#00ff8f]">
                <span className="text-2xl font-bold">TA</span>
              </div>
              <div>
                <h4 className="text-white font-bold text-xl mb-1">Tanmay Avhad</h4>
                <p className="text-[#bfbfbf] text-sm">Founder & Technical Lead at Sarvadnya Generators with 15+ years of experience in power systems.</p>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 shrink-0">
            <BlogSidebar />
          </aside>
        </div>

        {/* Related Posts */}
        <div className="mt-32">
          <RelatedPosts />
        </div>
      </div>

      <div className="mt-32">
        <CTA />
      </div>
    </main>
  );
}
