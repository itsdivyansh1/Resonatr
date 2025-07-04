// app/dashboard/ideas/new/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createIdea } from "@/actions/idea";
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
  const queryClient = useQueryClient();

  // Create idea mutation
  const createIdeaMutation = useMutation({
    mutationFn: createIdea,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ideas"] });

      if (onSuccess) {
        onSuccess();
      } else {
        router.push(redirectTo);
      }
    },
  });

  const handleSubmit = async (data: FormData) => {
    try {
      await createIdeaMutation.mutateAsync(data);
    } catch (error) {
      console.error("Error creating idea:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Create New Idea</h1>
      </div>

      <IdeaForm
        onSubmit={handleSubmit}
        submitLabel={
          createIdeaMutation.isPending ? "Creating..." : "Create Idea"
        }
        showResetButton={true}
        disabled={createIdeaMutation.isPending}
      />
    </div>
  );
}
