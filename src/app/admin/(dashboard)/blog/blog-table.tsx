"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ResourceFormDialog, type FieldConfig } from "@/components/admin/crud/resource-form-dialog";
import { DeleteButton } from "@/components/admin/crud/delete-button";
import { ActiveToggle } from "@/components/admin/crud/active-toggle";
import type { BlogPost } from "@/db/schema";
import { createBlogPostAction, updateBlogPostAction, deleteBlogPostAction, togglePostPublishedAction } from "./actions";

const FIELDS: FieldConfig[] = [
  { type: "text", name: "title", label: "Title", required: true },
  { type: "text", name: "slug", label: "URL slug", placeholder: "auto-generated from title if left blank" },
  { type: "textarea", name: "excerpt", label: "Excerpt", required: true, rows: 2 },
  {
    type: "lines",
    name: "content",
    label: "Content",
    required: true,
    rows: 6,
    hint: "One paragraph per line.",
  },
  { type: "text", name: "category", label: "Category", placeholder: "Company Updates" },
  { type: "date", name: "publishedAt", label: "Publish date" },
];

function toDateInputValue(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toISOString().slice(0, 10);
}

export function BlogTable({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <ResourceFormDialog
          trigger={
            <Button>
              <Plus className="size-4" /> Add Post
            </Button>
          }
          title="Add Blog Post"
          fields={FIELDS}
          action={createBlogPostAction}
          submitLabel="Create Post"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Live</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="max-w-sm font-medium text-brand-charcoal">
                  <span className="line-clamp-2 text-wrap">{post.title}</span>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{post.category}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  <ActiveToggle
                    active={post.published}
                    action={(next) => togglePostPublishedAction(post.id, next)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <ResourceFormDialog
                      trigger={
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      }
                      title="Edit Post"
                      fields={[{ type: "hidden", name: "id" }, ...FIELDS]}
                      defaultValues={{ ...post, id: post.id, publishedAt: toDateInputValue(post.publishedAt) }}
                      action={updateBlogPostAction}
                      submitLabel="Save Changes"
                    />
                    <DeleteButton action={() => deleteBlogPostAction(post.id)} itemLabel={post.title} resourceLabel="post" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                  No blog posts yet.
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
