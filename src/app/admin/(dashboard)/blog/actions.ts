"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth/guard";
import { createBlogPost, updateBlogPost, deleteBlogPost, getBlogPost } from "@/lib/services/blog";

function linesToArray(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function parseBlogForm(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const category = String(formData.get("category") ?? "Company Updates").trim() || "Company Updates";
  const content = linesToArray(formData.get("content"));
  const publishedAtInput = String(formData.get("publishedAt") ?? "").trim();
  const published = formData.get("published") === "true";

  if (!title || !excerpt || content.length === 0) {
    return { error: "Title, excerpt and at least one content paragraph are required." } as const;
  }

  const slug = slugify(slugInput || title);
  if (!slug) return { error: "Could not derive a valid slug from the title." } as const;

  const publishedAt = publishedAtInput ? new Date(publishedAtInput) : new Date();
  if (Number.isNaN(publishedAt.getTime())) {
    return { error: "Invalid publish date." } as const;
  }

  return { data: { title, slug, excerpt, category, content, publishedAt, published } } as const;
}

function revalidateBlogPaths(slug?: string) {
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/");
  if (slug) revalidatePath(`/blog/${slug}`);
}

export async function createBlogPostAction(formData: FormData) {
  const guard = await requireRole("ADMIN");
  if (!guard.ok) return { error: guard.error };

  const parsed = parseBlogForm(formData);
  if ("error" in parsed) return parsed;

  try {
    await createBlogPost(parsed.data);
  } catch (err) {
    console.error("Failed to create blog post", err);
    return { error: "Failed to create post - the slug may already be in use." };
  }
  revalidateBlogPaths(parsed.data.slug);
}

export async function updateBlogPostAction(formData: FormData) {
  const guard = await requireRole("ADMIN");
  if (!guard.ok) return { error: guard.error };

  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Missing post id." };

  const parsed = parseBlogForm(formData);
  if ("error" in parsed) return parsed;

  try {
    await updateBlogPost(id, parsed.data);
  } catch (err) {
    console.error("Failed to update blog post", err);
    return { error: "Failed to update post - the slug may already be in use." };
  }
  revalidateBlogPaths(parsed.data.slug);
}

export async function deleteBlogPostAction(id: string) {
  const guard = await requireRole("ADMIN");
  if (!guard.ok) return { error: guard.error };

  try {
    const post = await getBlogPost(id);
    await deleteBlogPost(id);
    revalidateBlogPaths(post?.slug);
    return;
  } catch (err) {
    console.error("Failed to delete blog post", err);
    return { error: "Failed to delete post." };
  }
}

export async function togglePostPublishedAction(id: string, published: boolean) {
  const guard = await requireRole("ADMIN");
  if (!guard.ok) return { error: guard.error };

  try {
    const post = await updateBlogPost(id, { published });
    revalidateBlogPaths(post.slug);
    return;
  } catch (err) {
    console.error("Failed to update blog post", err);
    return { error: "Failed to update post." };
  }
  revalidateBlogPaths();
}
