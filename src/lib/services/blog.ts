import "server-only";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { blogPosts, type BlogPost, type NewBlogPost } from "@/db/schema";

export async function listBlogPosts({ onlyPublished = false } = {}): Promise<BlogPost[]> {
  const rows = await db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));
  return onlyPublished ? rows.filter((p) => p.published) : rows;
}

export async function getBlogPost(id: string): Promise<BlogPost | undefined> {
  const [row] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
  return row;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const [row] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
  return row;
}

export async function createBlogPost(
  data: Omit<NewBlogPost, "id" | "createdAt" | "updatedAt">
): Promise<BlogPost> {
  const [row] = await db.insert(blogPosts).values(data).returning();
  return row;
}

export async function updateBlogPost(
  id: string,
  data: Partial<Omit<NewBlogPost, "id" | "createdAt" | "updatedAt">>
): Promise<BlogPost> {
  const [row] = await db
    .update(blogPosts)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(blogPosts.id, id))
    .returning();
  return row;
}

export async function deleteBlogPost(id: string): Promise<void> {
  await db.delete(blogPosts).where(eq(blogPosts.id, id));
}
