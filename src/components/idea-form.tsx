"use client";

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
import { useEffect, useState } from "react";
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

export type FormData = z.infer<typeof formSchema>;

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
  onSubmit: (data: FormData) => Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
  showResetButton?: boolean;
  isLoading?: boolean;
  disabled: boolean;
}

export default function IdeaForm({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = "Save Idea",
  showResetButton = true,
  isLoading: externalLoading = false,
}: IdeaFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Update form when initialData changes (useful for edit mode)
  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title || "",
        platform: initialData.platform || "YouTube",
        stage: initialData.stage || "idea",
        content: initialData.content || "",
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
    } catch (error) {
      console.error("Form submission error:", error);
      // Error handling is delegated to parent component
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    reset();
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      reset();
    }
  };

  const isLoading = isSubmitting || externalLoading;

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-2 bg-background shadow-sm"
    >
      {/* Title Field */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="space-y-2 col-span-2">
          <Label htmlFor="title" className="text-sm font-medium">
            Title
          </Label>
          <Input
            id="title"
            placeholder="What's your idea called?"
            {...register("title")}
            className="text-sm"
            disabled={isLoading}
            aria-describedby={errors.title ? "title-error" : undefined}
          />
          {errors.title && (
            <p id="title-error" className="text-xs text-destructive mt-1">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Platform and Stage Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="space-y-2">
            <Label htmlFor="platform" className="text-sm font-medium">
              Platform
            </Label>
            <Controller
              name="platform"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isLoading}
                >
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
              Stage
            </Label>
            <Controller
              name="stage"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isLoading}
                >
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
      </div>

      {/* Content Field */}
      <div className="space-y-2">
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <TiptapEditor
              value={field.value}
              onChange={field.onChange}
              // @ts-ignore
              disabled={isLoading}
            />
          )}
        />
        {errors.content && (
          <p className="text-xs text-destructive mt-1">
            {errors.content.message}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end">
        {showResetButton && (
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            disabled={isLoading}
            className="w-fit"
          >
            Reset
          </Button>
        )}

        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
            className="w-fit"
          >
            Cancel
          </Button>
        )}

        <Button
          type="submit"
          disabled={isLoading || !isValid}
          className="w-fit"
        >
          {isLoading ? (
            <Loader2 className="animate-spin size-4" />
          ) : (
            submitLabel
          )}
        </Button>
      </div>
    </form>
  );
}
