"use client";

// WYSIWYG rich-text editor for blog article bodies. Outputs HTML (stored in the
// post's `body`). Toolbar: headings, bold/italic/underline/strike, clear format,
// link, lists, blockquote, alignment, image upload (→ Supabase), table, hr,
// undo/redo.
//
// The editor is UNCONTROLLED after mount: it initializes from `value` once, owns
// its state, and reports edits via onChange. Switching to a different post
// remounts this component (keyed on the selected post in BlogTab), so content
// loads correctly without re-syncing `value` on every render — syncing fought
// with typing and could reset the cursor or flip the view.

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextAlign } from "@tiptap/extension-text-align";
import { Image } from "@tiptap/extension-image";
import { TableKit } from "@tiptap/extension-table";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Youtube } from "@tiptap/extension-youtube";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { getSupabase } from "@/lib/supabase/client";
import { BUCKET } from "@/lib/tables";
import { site } from "@/data/site";
import { landingPages } from "@/data/landingPages";
import {
  Bold, Italic, Underline, Strikethrough, Eraser, Link2, List, ListOrdered,
  Quote, AlignLeft, AlignCenter, AlignRight, Image as ImageIcon, Table as TableIcon,
  Minus, Undo, Redo, Film,
} from "lucide-react";

// Internal pages offered in the link picker.
const INTERNAL_PAGES: { label: string; href: string }[] = [
  ...site.nav.map((n) => ({ label: n.label, href: `${n.href}` })),
  ...Object.values(landingPages).map((p) => ({ label: p.navLabel, href: `/${p.slug}/` })),
];

function Btn({
  onClick, active, title, children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`flex h-8 w-8 items-center justify-center rounded transition ${
        active ? "bg-amber-100 text-amber-800" : "text-neutral-600 hover:bg-neutral-100"
      }`}
    >
      {children}
    </button>
  );
}

const Divider = () => <span className="mx-1 h-5 w-px self-center bg-neutral-200" />;

function Toolbar({
  editor, onPickImage, onLink, onYoutube,
}: {
  editor: Editor;
  onPickImage: () => void;
  onLink: () => void;
  onYoutube: () => void;
}) {
  // Re-render on selection/content changes so active states stay in sync.
  const [, force] = useState(0);
  useEffect(() => {
    const h = () => force((n) => n + 1);
    editor.on("transaction", h);
    editor.on("selectionUpdate", h);
    return () => {
      editor.off("transaction", h);
      editor.off("selectionUpdate", h);
    };
  }, [editor]);

  const headingValue = editor.isActive("heading", { level: 2 })
    ? "h2"
    : editor.isActive("heading", { level: 3 })
      ? "h3"
      : editor.isActive("heading", { level: 4 })
        ? "h4"
        : "p";

  const setBlock = (v: string) => {
    const c = editor.chain().focus();
    if (v === "p") c.setParagraph().run();
    else c.toggleHeading({ level: Number(v[1]) as 2 | 3 | 4 }).run();
  };

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-neutral-200 bg-neutral-50 px-2 py-1.5">
      <select
        value={headingValue}
        onChange={(e) => setBlock(e.target.value)}
        className="h-8 rounded border border-neutral-300 bg-white px-2 text-sm text-neutral-700 focus:outline-none"
        title="Paragraph style"
      >
        <option value="p">Paragraph</option>
        <option value="h2">Heading 2</option>
        <option value="h3">Heading 3</option>
        <option value="h4">Heading 4</option>
      </select>
      <Divider />
      <Btn title="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><Bold size={16} /></Btn>
      <Btn title="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic size={16} /></Btn>
      <Btn title="Underline" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}><Underline size={16} /></Btn>
      <Btn title="Strikethrough" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}><Strikethrough size={16} /></Btn>
      <Btn title="Clear formatting" onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}><Eraser size={16} /></Btn>
      <Divider />
      <Btn title="Link" active={editor.isActive("link")} onClick={onLink}><Link2 size={16} /></Btn>
      <Btn title="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}><List size={16} /></Btn>
      <Btn title="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered size={16} /></Btn>
      <Btn title="Quote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote size={16} /></Btn>
      <Divider />
      <Btn title="Align left" active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()}><AlignLeft size={16} /></Btn>
      <Btn title="Align center" active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()}><AlignCenter size={16} /></Btn>
      <Btn title="Align right" active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()}><AlignRight size={16} /></Btn>
      <Divider />
      <Btn title="Insert image" onClick={onPickImage}><ImageIcon size={16} /></Btn>
      <Btn title="Embed YouTube video" onClick={onYoutube}><Film size={16} /></Btn>
      <Btn title="Insert table" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}><TableIcon size={16} /></Btn>
      <Btn title="Horizontal line" onClick={() => editor.chain().focus().setHorizontalRule().run()}><Minus size={16} /></Btn>
      <Divider />
      <Btn title="Undo" onClick={() => editor.chain().focus().undo().run()}><Undo size={16} /></Btn>
      <Btn title="Redo" onClick={() => editor.chain().focus().redo().run()}><Redo size={16} /></Btn>
    </div>
  );
}

export function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        link: { openOnClick: false, autolink: true },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image,
      TableKit.configure({ table: { resizable: true } }),
      Youtube.configure({ width: 640, height: 360, nocookie: true, HTMLAttributes: { class: "rte-youtube" } }),
      Placeholder.configure({ placeholder: "Write the article…" }),
    ],
    content: value || "",
    editorProps: { attributes: { class: "rte-content article-body" } },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  const onImageSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    const sb = getSupabase();
    if (!sb) return;
    const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const key = `blog/${Date.now()}-${safe}`;
    const { error } = await sb.storage.from(BUCKET).upload(key, file, {
      cacheControl: "3600",
      upsert: false,
    });
    if (error) {
      alert(`Image upload failed: ${error.message}`);
      return;
    }
    const url = sb.storage.from(BUCKET).getPublicUrl(key).data.publicUrl;
    editor.chain().focus().setImage({ src: url, alt: file.name }).run();
    e.target.value = "";
  };

  const openLink = () => {
    if (!editor) return;
    setLinkUrl((editor.getAttributes("link").href as string) || "");
    setLinkOpen(true);
  };
  const applyLink = () => {
    if (!editor) return;
    const u = linkUrl.trim();
    if (!u) editor.chain().focus().extendMarkRange("link").unsetLink().run();
    else editor.chain().focus().extendMarkRange("link").setLink({ href: u }).run();
    setLinkOpen(false);
  };
  const addYoutube = () => {
    if (!editor) return;
    const url = window.prompt("Paste a YouTube video URL");
    if (url) editor.commands.setYoutubeVideo({ src: url });
  };

  if (!editor) {
    return <div className="rounded-md border border-neutral-300 p-4 text-sm text-neutral-400">Loading editor…</div>;
  }

  return (
    <div className="relative overflow-hidden rounded-md border border-neutral-300 bg-white">
      <Toolbar editor={editor} onPickImage={() => fileRef.current?.click()} onLink={openLink} onYoutube={addYoutube} />
      <input ref={fileRef} type="file" accept="image/*" hidden onChange={onImageSelected} />
      <EditorContent editor={editor} />

      {linkOpen && (
        <div className="absolute inset-0 z-10 flex items-start justify-center bg-black/20 p-4" onClick={() => setLinkOpen(false)}>
          <div className="mt-10 w-full max-w-md rounded-lg border border-neutral-200 bg-white p-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <p className="mb-2 text-sm font-semibold text-neutral-700">Add link</p>
            <label className="mb-1 block text-xs text-neutral-500">Pick an internal page…</label>
            <select
              onChange={(e) => e.target.value && setLinkUrl(e.target.value)}
              className="mb-3 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
              defaultValue=""
            >
              <option value="">— choose a page —</option>
              {INTERNAL_PAGES.map((p) => (
                <option key={p.href} value={p.href}>{p.label} ({p.href})</option>
              ))}
            </select>
            <label className="mb-1 block text-xs text-neutral-500">…or type a URL</label>
            <input
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="/services/ or https://…"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && applyLink()}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none"
            />
            <div className="mt-3 flex justify-end gap-2">
              <button type="button" onClick={() => setLinkOpen(false)} className="rounded-md border border-neutral-300 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-100">Cancel</button>
              <button type="button" onClick={applyLink} className="rounded-md bg-amber-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-amber-700">{linkUrl.trim() ? "Apply link" : "Remove link"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
