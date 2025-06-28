"use client";

import { JSX, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getIdeaById, updateIdea, deleteIdea } from "@/actions/idea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  RiYoutubeFill,
  RiInstagramLine,
  RiTwitterXFill,
  RiEdit2Line,
  RiDeleteBinLine,
} from "@remixicon/react";
import TiptapEditor from "@/components/tiptap-editor";

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
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("");
  const [stage, setStage] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    async function load() {
      if (!id) return;
      try {
        const data: any = await getIdeaById(id);
        if (data) {
          setIdea(data);
          setTitle(data.title);
          setPlatform(data.platform ?? "Unknown");
          setStage(data.stage ?? "Idea");
          setContent(data.description ?? "");
        }
      } catch (err) {
        console.error("Error fetching idea:", err);
      }
    }
    load();
  }, [id]);

  if (!idea) return <p className="text-muted-foreground">Loading...</p>;

  const handleSave = async () => {
    await updateIdea(id, { title, platform, stage, content });
    setEditing(false);
    router.refresh();
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this idea?")) return;
    await deleteIdea(id);
    router.push("/dashboard/ideas");
  };

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
            <RiEdit2Line className="w-4 h-4" />
            {editing ? "Cancel" : "Edit"}
          </Button>
          <Button onClick={handleDelete} variant="destructive" size="sm">
            <RiDeleteBinLine className="w-4 h-4" />
            Delete
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>{idea.title}</CardTitle>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary">{platform}</Badge>
            <Badge variant="outline">{stage}</Badge>
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
            <div className="space-y-4">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              />
              <Input
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                placeholder="Platform"
              />
              <Input
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                placeholder="Stage"
              />
              <TiptapEditor value={content} onChange={setContent} />
              <Button onClick={handleSave} className="mt-2">
                Save Changes
              </Button>
            </div>
          ) : (
            <div
              className="prose prose-sm prose-invert max-w-full text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
