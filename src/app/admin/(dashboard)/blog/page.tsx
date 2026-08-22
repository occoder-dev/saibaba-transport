import type { Metadata } from "next";
import { listBlogPosts } from "@/lib/services/blog";
import { BlogTable } from "./blog-table";

export const metadata: Metadata = { title: "Blog", robots: { index: false, follow: false } };

export default async function AdminBlogPage() {
  const posts = await listBlogPosts();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-brand-charcoal">Blog</h1>
        <p className="text-sm text-muted-foreground">Manage company update posts shown on the website.</p>
      </div>
      <BlogTable posts={posts} />
    </div>
  );
}
