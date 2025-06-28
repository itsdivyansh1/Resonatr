"use client";

import { JSX, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getIdeaById, updateIdea, deleteIdea } from "@/actions/idea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

type Idea = {
  id: string;
  title: string;
  platform: string;
  stage: string;
  description: string;
  createdAt: string | Date;
};

const platformIcons: Record<string, JSX.Element> = {
  YouTube: <RiYoutubeFill className="text-red-600 w-5 h-5" />,
  Instagram: <RiInstagramLine className="text-pink-500 w-5 h-5" />,
  Twitter: <RiTwitterXFill className="text-white w-5 h-5" />,
};

export default function EditIdeaPage() {
  const params = useParams();
  const router = useRouter();

  const id =
    typeof params?.id === "string"
      ? params.id
      : Array.isArray(params?.id)
        ? params.id[0]
        : "";

  const [idea, setIdea] = useState<Idea | null>(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!id) return;
      try {
        setLoading(true);
        const data: any = await getIdeaById(id);
        if (data) {
          setIdea(data);
        }
      } catch (err) {
        console.error("Error fetching idea:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const handleUpdate = async (formData: FormData) => {
    await updateIdea(id, {
      title: formData.title,
      platform: formData.platform,
      stage: formData.stage,
      content: formData.content,
    });

    setIdea((prev) =>
      prev
        ? {
            ...prev,
            title: formData.title,
            platform: formData.platform,
            stage: formData.stage,
            description: formData.content,
          }
        : null
    );

    setEditing(false);
    router.refresh();
  };

  const handleDelete = async () => {
    await deleteIdea(id);
    router.push("/dashboard/ideas");
  };

  const handleCancelEdit = () => {
    setEditing(false);
  };

  if (loading) {
    return <p className="text-muted-foreground">Loading...</p>;
  }

  if (!idea) {
    return <p className="text-muted-foreground">Idea not found.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {platformIcons[idea.platform] ?? null}
          <h1 className="text-2xl font-semibold">{idea.title}</h1>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setEditing(!editing)}
            variant="outline"
            size="sm"
          >
            <RiEdit2Line className="w-4 h-4 mr-1" />
            {editing ? "Cancel" : "Edit"}
          </Button>

          {/* AlertDialog for Delete */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
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
                >
                  Yes, delete
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
            <Badge variant="secondary">{idea.platform}</Badge>
            <Badge variant="outline">{idea.stage}</Badge>
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
                platform: idea.platform,
                stage: idea.stage,
                content: idea.description,
              }}
              onSubmit={handleUpdate}
              onCancel={handleCancelEdit}
              submitLabel="Update Idea"
              showResetButton={false}
            />
          ) : (
            <div
              className="prose prose-sm prose-invert max-w-full text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: idea.description }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
