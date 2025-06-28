// app/dashboard/ideas/new/page.tsx
"use client";

import { createIdea } from "@/actions/idea";
import { useRouter } from "next/navigation";
import IdeaForm, { FormData } from "@/components/idea-form";

interface NewIdeaPageProps {
  onSuccess?: () => void;
  redirectTo?: string;
}

export default function NewIdeaPage({
  onSuccess,
  redirectTo = "/dashboard/ideas",
}: NewIdeaPageProps) {
  const router = useRouter();

  const handleSubmit = async (data: FormData) => {
    await createIdea(data);

    if (onSuccess) {
      onSuccess();
    } else {
      router.push(redirectTo);
    }
  };

  return (
    <IdeaForm
      onSubmit={handleSubmit}
      submitLabel="Create Idea"
      showResetButton={true}
    />
  );
}
