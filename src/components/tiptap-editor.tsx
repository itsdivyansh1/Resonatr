"use client";

import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Highlighter,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Strikethrough,
  Type,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Toggle } from "./ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

interface TiptapEditorProps {
  value?: string;
  onChange?: (value: string) => void;
}

const HIGHLIGHT_COLORS = [
  "#fef3c7", // yellow
  "#fecaca", // red
  "#bfdbfe", // blue
  "#bbf7d0", // green
  "#e9d5ff", // purple
  "#fed7aa", // orange
  "#f3e8ff", // lavender
  "#fce7f3", // pink
];

const TEXT_COLORS = [
  "#000000", // black
  "#374151", // gray
  "#dc2626", // red
  "#ea580c", // orange
  "#ca8a04", // yellow
  "#16a34a", // green
  "#2563eb", // blue
  "#7c3aed", // purple
  "#c2410c", // brown
  "#be185d", // pink
];

export default function TiptapEditor({
  value = "",
  onChange,
}: TiptapEditorProps) {
  const [linkUrl, setLinkUrl] = useState("");
  const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2] },
      }),
      Typography,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          class: "text-blue-600 underline hover:text-blue-800 cursor-pointer",
        },
      }),
      Placeholder.configure({
        placeholder: "Write your story...",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert max-w-none min-h-[300px] p-2 focus:outline-none",
      },
    },
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
  });

  // Sync external value changes with editor
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  const handleLinkSubmit = useCallback(() => {
    if (!editor) return;

    if (linkUrl) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkUrl })
        .run();
    } else {
      editor.chain().focus().unsetLink().run();
    }

    setLinkUrl("");
    setIsLinkPopoverOpen(false);
  }, [editor, linkUrl]);

  const handleLinkClick = useCallback(() => {
    if (!editor) return;

    const currentUrl = editor.getAttributes("link").href || "";
    setLinkUrl(currentUrl);
    setIsLinkPopoverOpen(true);
  }, [editor]);

  const setHighlightColor = useCallback(
    (color: string) => {
      if (!editor) return;
      editor
        .chain()
        .focus()
        .toggleHighlight({ color })
        .setColor("#000000")
        .run();
    },
    [editor]
  );

  const setTextColor = useCallback(
    (color: string) => {
      if (!editor) return;
      editor.chain().focus().setColor(color).run();
    },
    [editor]
  );

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-md bg-white dark:bg-zinc-900 shadow-sm w-full">
      <div className="flex items-center flex-wrap gap-2 p-2 border-b">
        {/* Text Format Group */}
        <ToggleGroup
          type="single"
          variant="outline"
          value={
            editor.isActive("heading", { level: 1 })
              ? "h1"
              : editor.isActive("heading", { level: 2 })
                ? "h2"
                : editor.isActive("blockquote")
                  ? "quote"
                  : "paragraph"
          }
          onValueChange={(val) => {
            if (!val) return;
            editor.chain().focus().run();
            switch (val) {
              case "h1":
                editor.chain().focus().toggleHeading({ level: 1 }).run();
                break;
              case "h2":
                editor.chain().focus().toggleHeading({ level: 2 }).run();
                break;
              case "quote":
                editor.chain().focus().toggleBlockquote().run();
                break;
              case "paragraph":
              default:
                editor.chain().focus().setParagraph().run();
                break;
            }
          }}
        >
          <ToggleGroupItem value="paragraph" aria-label="Paragraph">
            P
          </ToggleGroupItem>
          <ToggleGroupItem value="h1" aria-label="Heading 1">
            <Heading1 className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="h2" aria-label="Heading 2">
            <Heading2 className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="quote" aria-label="Quote">
            <Quote className="size-4" />
          </ToggleGroupItem>
        </ToggleGroup>

        <div className="w-px h-6 bg-border" />

        {/* Style Group */}
        <div className="flex gap-1">
          <Toggle
            pressed={editor.isActive("bold")}
            onPressedChange={() => editor.chain().focus().toggleBold().run()}
            aria-label="Bold"
          >
            <Bold className="w-4 h-4" />
          </Toggle>
          <Toggle
            pressed={editor.isActive("italic")}
            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            aria-label="Italic"
          >
            <Italic className="w-4 h-4" />
          </Toggle>
          <Toggle
            pressed={editor.isActive("strike")}
            onPressedChange={() => editor.chain().focus().toggleStrike().run()}
            aria-label="Strikethrough"
          >
            <Strikethrough className="w-4 h-4" />
          </Toggle>
        </div>

        <div className="w-px h-6 bg-border" />

        {/* Color Group */}
        <div className="flex gap-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" aria-label="Text Color">
                <Type className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-44">
              <div className="space-y-2">
                <Label className="text-xs font-medium">Text Color</Label>
                <div className="grid grid-cols-5 gap-1">
                  {TEXT_COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className="w-6 h-6 rounded-full border-2 border-gray-200 hover:border-gray-400 transition-colors hover:scale-110"
                      style={{ backgroundColor: color }}
                      onClick={() => setTextColor(color)}
                      aria-label={`Set text color to ${color}`}
                    />
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => editor.chain().focus().unsetColor().run()}
                  className="w-full text-xs h-7"
                >
                  Reset
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                aria-label="Highlight"
                className={editor.isActive("highlight") ? "bg-accent" : ""}
              >
                <Highlighter className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40">
              <div className="space-y-2">
                <Label className="text-xs font-medium">Highlight</Label>
                <div className="grid grid-cols-4 gap-1">
                  {HIGHLIGHT_COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className="w-6 h-6 rounded-full border-2 border-gray-200 hover:border-gray-400 transition-colors hover:scale-110"
                      style={{ backgroundColor: color }}
                      onClick={() => setHighlightColor(color)}
                      aria-label={`Highlight with ${color}`}
                    />
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => editor.chain().focus().unsetHighlight().run()}
                  className="w-full text-xs h-7"
                >
                  Remove
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="w-px h-6 bg-border" />

        {/* Lists and Links */}
        <div className="flex gap-1">
          <Toggle
            pressed={editor.isActive("bulletList")}
            onPressedChange={() =>
              editor.chain().focus().toggleBulletList().run()
            }
            aria-label="Bullet List"
          >
            <List className="w-4 h-4" />
          </Toggle>
          <Toggle
            pressed={editor.isActive("orderedList")}
            onPressedChange={() =>
              editor.chain().focus().toggleOrderedList().run()
            }
            aria-label="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </Toggle>

          <Popover open={isLinkPopoverOpen} onOpenChange={setIsLinkPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLinkClick}
                className={editor.isActive("link") ? "bg-accent" : ""}
                aria-label="Add Link"
              >
                <LinkIcon className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72">
              <div className="space-y-2">
                <Label htmlFor="link-url" className="text-xs font-medium">
                  Link URL
                </Label>
                <Input
                  id="link-url"
                  type="url"
                  placeholder="https://example.com"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleLinkSubmit();
                    }
                  }}
                  className="text-xs"
                />
                <div className="flex gap-1">
                  <Button
                    onClick={handleLinkSubmit}
                    size="sm"
                    className="text-xs h-7 flex-1"
                  >
                    {linkUrl ? "Update" : "Add"}
                  </Button>
                  {editor.isActive("link") && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-7 flex-1"
                      onClick={() => {
                        editor.chain().focus().unsetLink().run();
                        setLinkUrl("");
                        setIsLinkPopoverOpen(false);
                      }}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="w-px h-6 bg-border" />

        {/* Alignment Group */}
        <ToggleGroup
          type="single"
          variant="outline"
          value={
            editor.isActive({ textAlign: "center" })
              ? "center"
              : editor.isActive({ textAlign: "right" })
                ? "right"
                : editor.isActive({ textAlign: "justify" })
                  ? "justify"
                  : "left"
          }
          onValueChange={(val) => {
            if (!val) return;
            editor.chain().focus().setTextAlign(val).run();
          }}
        >
          <ToggleGroupItem value="left" aria-label="Align Left">
            <AlignLeft className="w-4 h-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align Center">
            <AlignCenter className="w-4 h-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align Right">
            <AlignRight className="w-4 h-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="justify" aria-label="Justify">
            <AlignJustify className="w-4 h-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div
        className="prose dark:prose-invert max-w-none p-4 min-h-[80vh] focus:outline-none [&_h1]:mt-0 [&_h2]:mt-0 [&_.ProseMirror]:focus:outline-none [&_.ProseMirror]:selection:bg-blue-100 [&_.ProseMirror]:dark:selection:bg-blue-900/50 [&_.ProseMirror]:selection:text-blue-900 [&_.ProseMirror]:dark:selection:text-blue-100 [&_p]:my-2 [&_p]:leading-snug"
        onClick={() => editor.commands.focus()}
      >
        <EditorContent
          editor={editor}
          className="focus:outline-none focus:ring-0 focus:border-none max-h-[80vh] overflow-y-auto"
        />
      </div>
    </div>
  );
}
