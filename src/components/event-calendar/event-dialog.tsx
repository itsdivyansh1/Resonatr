"use client";

import { useEffect, useState } from "react";
import { RiCalendarLine, RiDeleteBinLine } from "@remixicon/react";
import { format } from "date-fns";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { CalendarEvent, EventColor } from "@/components/event-calendar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { createEvent, updateEvent, deleteEvent } from "@/actions/events";

interface EventDialogProps {
  event: CalendarEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EventDialog({ event, isOpen, onClose }: EventDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [color, setColor] = useState<EventColor>("sky");
  const [platform, setPlatform] = useState("instagram");
  const [status, setStatus] = useState("scheduled");
  const [startDateOpen, setStartDateOpen] = useState(false);

  const queryClient = useQueryClient();

  // Create mutation
  const createMutation = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      onClose();
      resetForm();
    },
    onError: (error) => {
      console.error("Error creating event:", error);
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateEvent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      onClose();
      resetForm();
    },
    onError: (error) => {
      console.error("Error updating event:", error);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      onClose();
      resetForm();
    },
    onError: (error) => {
      console.error("Error deleting event:", error);
    },
  });

  useEffect(() => {
    if (event) {
      setTitle(event.title || "");
      setDescription(event.description || "");
      setStartDate(new Date(event.start));
      setColor(event.color as EventColor);
      setPlatform((event as any).platform || "instagram");
      setStatus((event as any).status || "scheduled");
    } else {
      resetForm();
    }
  }, [event]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStartDate(new Date());
    setColor("sky");
    setPlatform("instagram");
    setStatus("scheduled");
  };

  const handleSave = async () => {
    const start = new Date(startDate);
    start.setHours(9, 0, 0);
    const end = new Date(start);
    end.setHours(start.getHours() + 1);

    const payload = {
      title: title.trim() || "(no title)",
      description,
      start,
      end,
      color,
      platform,
      status,
    };

    if (event?.id) {
      updateMutation.mutate({ id: event.id, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleDelete = async () => {
    if (!event?.id) return;
    deleteMutation.mutate(event.id);
  };

  const colorOptions: Array<{
    value: EventColor;
    label: string;
    bgClass: string;
    borderClass: string;
  }> = [
    {
      value: "sky",
      label: "Sky",
      bgClass: "bg-sky-400",
      borderClass: "border-sky-400",
    },
    {
      value: "amber",
      label: "Amber",
      bgClass: "bg-amber-400",
      borderClass: "border-amber-400",
    },
    {
      value: "violet",
      label: "Violet",
      bgClass: "bg-violet-400",
      borderClass: "border-violet-400",
    },
    {
      value: "rose",
      label: "Rose",
      bgClass: "bg-rose-400",
      borderClass: "border-rose-400",
    },
    {
      value: "emerald",
      label: "Emerald",
      bgClass: "bg-emerald-400",
      borderClass: "border-emerald-400",
    },
    {
      value: "orange",
      label: "Orange",
      bgClass: "bg-orange-400",
      borderClass: "border-orange-400",
    },
  ];

  const isLoading =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;
  const error =
    createMutation.error || updateMutation.error || deleteMutation.error;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{event?.id ? "Edit Event" : "Create Event"}</DialogTitle>
        </DialogHeader>

        {error && (
          <div className="bg-destructive/15 text-destructive rounded-md px-3 py-2 text-sm">
            {error instanceof Error ? error.message : "An error occurred"}
          </div>
        )}

        <div className="grid gap-4 py-4">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
          />

          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            disabled={isLoading}
          />

          <Label htmlFor="publish-date">Publish Date</Label>
          <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-between px-3 font-normal")}
                disabled={isLoading}
              >
                {format(startDate, "PPP")} <RiCalendarLine size={16} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                defaultMonth={startDate}
                onSelect={(date) => date && setStartDate(date)}
                disabled={isLoading}
              />
            </PopoverContent>
          </Popover>

          <Label htmlFor="platform">Platform</Label>
          <Select
            value={platform}
            onValueChange={setPlatform}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="youtube">YouTube</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="tiktok">TikTok</SelectItem>
            </SelectContent>
          </Select>

          <Label htmlFor="status">Status</Label>
          <Select value={status} onValueChange={setStatus} disabled={isLoading}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="posted">Posted</SelectItem>
              <SelectItem value="missed">Missed</SelectItem>
            </SelectContent>
          </Select>

          <fieldset className="space-y-4">
            <legend className="text-sm font-medium">Color</legend>
            <RadioGroup
              className="flex gap-1.5"
              value={color}
              onValueChange={(val) => setColor(val as EventColor)}
              disabled={isLoading}
            >
              {colorOptions.map((opt) => (
                <RadioGroupItem
                  key={opt.value}
                  value={opt.value}
                  className={cn("size-6", opt.bgClass, opt.borderClass)}
                  aria-label={opt.label}
                />
              ))}
            </RadioGroup>
          </fieldset>
        </div>

        <DialogFooter className="flex-row sm:justify-between">
          {event?.id && (
            <Button
              variant="destructive"
              size="icon"
              onClick={handleDelete}
              disabled={isLoading}
            >
              <RiDeleteBinLine size={16} />
            </Button>
          )}
          <div className="flex flex-1 justify-end gap-2">
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
