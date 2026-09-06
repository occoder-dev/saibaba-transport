import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

import { PageHero } from "@/components/site/page-hero";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { listBlogPosts } from "@/lib/services/blog";

export const metadata: Metadata = {
  title: "Blog & Company Updates",
  description: "Logistics articles, industry updates and company news from Sai Baba Transport.",
};

export default async function BlogPage() {
  const blogPosts = await listBlogPosts({ onlyPublished: true });

  return (
    <>
      <PageHero
        eyebrow="Blog & Updates"
        title="Logistics insights & company news"
        description="Articles on textile transportation, logistics fundamentals, and updates from across our branch network."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Stagger className="grid gap-6 sm:grid-cols-2">
            {blogPosts.map((post) => (
              <StaggerItem key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary/40"
                >
                  <Badge variant="secondary" className="w-fit">
                    {post.category}
                  </Badge>
                  <h2 className="mt-4 text-lg font-semibold text-brand-charcoal transition-colors group-hover:text-primary">
                    {post.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="size-3.5" />
                      {new Date(post.publishedAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
                    </span>
                    <span className="flex items-center gap-1 font-medium text-primary">
                      Read more <ArrowRight className="size-3.5" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
