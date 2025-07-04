// app/dashboard/ideas/[id]/page.tsx
"use client";

import { JSX, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  RiYoutubeFill,
  RiInstagramLine,
  RiTwitterXFill,
  RiEdit2Line,
  RiDeleteBinLine,
} from "@remixicon/react";
import IdeaForm, { FormData } from "@/components/idea-form";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { getIdeaById, updateIdea, deleteIdea } from "@/actions/idea";

type Idea = {
  id: string;
  title: string;
  platform: string | null;
  stage: string | null;
  description: string | null;
  createdAt: string | Date;
};

const platformIcons: Record<string, JSX.Element> = {
  YouTube: <RiYoutubeFill className="text-red-600 w-5 h-5" />,
  Instagram: <RiInstagramLine className="text-pink-500 w-5 h-5" />,
  Twitter: <RiTwitterXFill className="text-white w-5 h-5" />,
};

const IdeaDetailSkeleton = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Skeleton className="w-5 h-5 rounded" />
        <Skeleton className="w-48 h-8" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="w-20 h-9" />
        <Skeleton className="w-20 h-9" />
      </div>
    </div>
    <Card>
      <CardHeader className="pb-2">
        <Skeleton className="w-48 h-6" />
        <div className="flex items-center gap-2 mt-2">
          <Skeleton className="w-16 h-6 rounded" />
          <Skeleton className="w-16 h-6 rounded" />
          <Skeleton className="w-32 h-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-3/4 h-4" />
        </div>
      </CardContent>
    </Card>
  </div>
);

export default function EditIdeaPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);

  const id =
    typeof params?.id === "string"
      ? params.id
      : Array.isArray(params?.id)
        ? params.id[0]
        : "";

  // Fetch idea data
  const {
    data: idea,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["idea", id],
    queryFn: () => getIdeaById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  // Update idea mutation
  const updateIdeaMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<FormData> }) =>
      updateIdea(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ideas"] });
      queryClient.invalidateQueries({ queryKey: ["idea", id] });
      setEditing(false);
      router.refresh();
    },
  });

  // Delete idea mutation
  const deleteIdeaMutation = useMutation({
    mutationFn: deleteIdea,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ideas"] });
      router.push("/dashboard/ideas");
    },
  });

  const handleUpdate = async (formData: FormData) => {
    try {
      await updateIdeaMutation.mutateAsync({
        id,
        data: {
          title: formData.title,
          platform: formData.platform,
          stage: formData.stage,
          content: formData.content,
        },
      });
    } catch (error) {
      console.error("Error updating idea:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteIdeaMutation.mutateAsync(id);
    } catch (error) {
      console.error("Error deleting idea:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditing(false);
  };

  if (isLoading) {
    return <IdeaDetailSkeleton />;
  }

  if (error || !idea) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          {error ? "Error loading idea" : "Idea not found"}
        </p>
        <Button
          onClick={() => router.push("/dashboard/ideas")}
          variant="outline"
          className="mt-4"
        >
          Back to Ideas
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {idea.platform && platformIcons[idea.platform]
            ? platformIcons[idea.platform]
            : null}
          <h1 className="text-2xl font-semibold">{idea.title}</h1>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setEditing(!editing)}
            variant="outline"
            size="sm"
            disabled={updateIdeaMutation.isPending}
          >
            <RiEdit2Line className="w-4 h-4 mr-1" />
            {editing ? "Cancel" : "Edit"}
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                disabled={deleteIdeaMutation.isPending}
              >
                <RiDeleteBinLine className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  idea and remove it from the database.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-white hover:bg-destructive/90"
                  disabled={deleteIdeaMutation.isPending}
                >
                  {deleteIdeaMutation.isPending ? "Deleting..." : "Yes, delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>{idea.title}</CardTitle>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary">{idea.platform ?? "Unknown"}</Badge>
            <Badge variant="outline">{idea.stage ?? "Unknown"}</Badge>
            <span className="text-xs text-muted-foreground">
              Created on{" "}
              {typeof idea.createdAt === "string"
                ? new Date(idea.createdAt).toLocaleDateString()
                : idea.createdAt.toLocaleDateString()}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          {editing ? (
            <IdeaForm
              initialData={{
                title: idea.title,
                platform: idea.platform ?? undefined,
                stage: idea.stage ?? undefined,
                content: idea.description ?? undefined,
              }}
              onSubmit={handleUpdate}
              onCancel={handleCancelEdit}
              submitLabel={
                updateIdeaMutation.isPending ? "Updating..." : "Update Idea"
              }
              showResetButton={false}
              disabled={updateIdeaMutation.isPending}
            />
          ) : (
            <div
              className="prose prose-sm prose-invert max-w-full text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: idea.description ?? "" }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
