"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ResourceFormDialog, type FieldConfig } from "@/components/admin/crud/resource-form-dialog";
import { DeleteButton } from "@/components/admin/crud/delete-button";
import { ActiveToggle } from "@/components/admin/crud/active-toggle";
import type { Faq } from "@/db/schema";
import { createFaqAction, updateFaqAction, deleteFaqAction, toggleFaqActiveAction } from "./actions";

const FIELDS: FieldConfig[] = [
  { type: "textarea", name: "question", label: "Question", required: true, rows: 2 },
  { type: "textarea", name: "answer", label: "Answer", required: true, rows: 4 },
  { type: "text", name: "category", label: "Category", placeholder: "General" },
  { type: "number", name: "sortOrder", label: "Sort order", placeholder: "0" },
];

export function FaqsTable({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <ResourceFormDialog
          trigger={
            <Button>
              <Plus className="size-4" /> Add FAQ
            </Button>
          }
          title="Add FAQ"
          fields={FIELDS}
          action={createFaqAction}
          submitLabel="Create FAQ"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Question</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {faqs.map((faq) => (
              <TableRow key={faq.id}>
                <TableCell className="max-w-md font-medium text-brand-charcoal">
                  <span className="line-clamp-2 text-wrap">{faq.question}</span>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{faq.category}</Badge>
                </TableCell>
                <TableCell>
                  <ActiveToggle active={faq.active} action={(next) => toggleFaqActiveAction(faq.id, next)} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <ResourceFormDialog
                      trigger={
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      }
                      title="Edit FAQ"
                      fields={[{ type: "hidden", name: "id" }, ...FIELDS]}
                      defaultValues={{ ...faq, id: faq.id }}
                      action={updateFaqAction}
                      submitLabel="Save Changes"
                    />
                    <DeleteButton action={() => deleteFaqAction(faq.id)} itemLabel={faq.question} resourceLabel="FAQ" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {faqs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
                  No FAQs yet.
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
