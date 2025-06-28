// app/dashboard/ideas/new/page.tsx
"use client";

import IdeaForm from "@/components/idea-form";

export default function NewIdeaPage() {
  return (
    <>
      <div className="text-lg font-semibold">Create New Idea</div>
      <IdeaForm />
    </>
  );
}
