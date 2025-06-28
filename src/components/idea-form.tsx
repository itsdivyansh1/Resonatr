"use client";

import { createIdea } from "@/actions/idea";
import TiptapEditor from "@/components/tiptap-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "./ui/label";

const formSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  platform: z.string().min(1, "Please select a platform"),
  stage: z.string().min(1, "Please select a stage"),
  content: z
    .string()
    .min(10, "Content cannot not be empty")
    .refine(
      (val) => {
        // Check if content is not just empty HTML tags
        const textContent = val.replace(/<[^>]*>/g, "").trim();
        return textContent.length > 0;
      },
      { message: "Content cannot be empty" }
    ),
});

type FormData = z.infer<typeof formSchema>;

const PLATFORMS = [
  "YouTube",
  "Instagram",
  "Twitter",
  "LinkedIn",
  "Facebook",
  "TikTok",
  "Twitch",
  "Blog",
] as const;

const STAGES = [
  { value: "idea", label: "Idea" },
  { value: "script", label: "Script" },
  { value: "shoot", label: "Shoot" },
  { value: "edit", label: "Edit" },
  { value: "publish", label: "Publish" },
  { value: "completed", label: "Completed" },
] as const;

interface IdeaFormProps {
  initialData?: Partial<FormData>;
  onSuccess?: () => void;
}

export default function IdeaForm({ initialData, onSuccess }: IdeaFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      platform: initialData?.platform || "YouTube",
      stage: initialData?.stage || "idea",
      content: initialData?.content || "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      await createIdea(data);

      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/dashboard/ideas");
      }

      // Reset form on success
      reset();
    } catch (error) {
      console.error("Failed to create idea:", error);
      // You might want to show a toast notification here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-background shadow-sm"
    >
      {/* Title Field */}
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium">
          Title <span className="text-destructive">*</span>
        </Label>
        <Input
          id="title"
          placeholder="What's your idea called?"
          {...register("title")}
          className="text-sm"
          aria-describedby={errors.title ? "title-error" : undefined}
        />
        {errors.title && (
          <p id="title-error" className="text-xs text-destructive mt-1">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Platform and Stage Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="platform" className="text-sm font-medium">
            Platform <span className="text-destructive">*</span>
          </Label>
          <Controller
            name="platform"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="platform"
                  className="w-full"
                  aria-describedby={
                    errors.platform ? "platform-error" : undefined
                  }
                >
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  {PLATFORMS.map((platform) => (
                    <SelectItem key={platform} value={platform}>
                      {platform}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.platform && (
            <p id="platform-error" className="text-xs text-destructive mt-1">
              {errors.platform.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="stage" className="text-sm font-medium">
            Stage <span className="text-destructive">*</span>
          </Label>
          <Controller
            name="stage"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="stage"
                  className="w-full"
                  aria-describedby={errors.stage ? "stage-error" : undefined}
                >
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  {STAGES.map((stage) => (
                    <SelectItem key={stage.value} value={stage.value}>
                      {stage.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.stage && (
            <p id="stage-error" className="text-xs text-destructive mt-1">
              {errors.stage.message}
            </p>
          )}
        </div>
      </div>

      {/* Content Field */}
      <div className="space-y-2">
        <Label htmlFor="content" className="text-sm font-medium">
          Content <span className="text-destructive">*</span>
        </Label>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <TiptapEditor value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.content && (
          <p className="text-xs text-destructive mt-1">
            {errors.content.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="w-fit"
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? (
            <Loader2 className="animate-spin size-4" />
          ) : (
            "Save Idea"
          )}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => reset()}
          disabled={isSubmitting}
          className="w-fit"
        >
          Reset
        </Button>
      </div>
    </form>
  );
}
