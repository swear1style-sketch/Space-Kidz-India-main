"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { toast } from "sonner"
import {
  CustomKeymap,
  EditorContent,
  EditorRoot,
  Placeholder,
  StarterKit,
  TiptapImage,
  createImageUpload,
  getAllContent,
  handleImageDrop,
  handleImagePaste,
  UploadImagesPlugin,
  type EditorInstance,
  type JSONContent,
} from "novel"
import { Button } from "@/components/ui/button"

type PendingImage = {
  objectUrl: string
  file: File
}

const emptyDoc: JSONContent = {
  type: "doc",
  content: [{ type: "paragraph" }],
}

const createSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")

const BlogImageExtension = TiptapImage.extend({
  addProseMirrorPlugins() {
    return [
      UploadImagesPlugin({
        imageClass: "opacity-60 rounded-xl border border-white/10",
      }),
    ]
  },
}).configure({
  allowBase64: true,
  HTMLAttributes: {
    class: "rounded-xl border border-white/10",
  },
})

export function BlogSubmitEditor() {
  const editorRef = useRef<EditorInstance | null>(null)
  const pendingImagesRef = useRef<PendingImage[]>([])
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [publishStatus, setPublishStatus] = useState("Draft")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [initialContent] = useState<JSONContent>(emptyDoc)

  useEffect(() => {
    if (!slug || slug === createSlug(title)) {
      setSlug(createSlug(title))
    }
  }, [title, slug])

  const uploadFn = useMemo(
    () =>
      createImageUpload({
        validateFn: (file) => {
          if (!file.type.startsWith("image/")) {
            toast.error("Only image files are supported.")
            return false
          }

          if (file.size > 20 * 1024 * 1024) {
            toast.error("Image must be 20MB or smaller.")
            return false
          }

          return true
        },
        onUpload: async (file) => {
          const objectUrl = URL.createObjectURL(file)
          pendingImagesRef.current.push({ objectUrl, file })
          return objectUrl
        },
      }),
    [],
  )

  const addImageFromPicker = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = () => {
      const file = input.files?.[0]
      if (!file || !editorRef.current) return

      uploadFn(file, editorRef.current.view, editorRef.current.state.selection.from)
    }
    input.click()
  }

  const submitPost = async () => {
    if (!editorRef.current) {
      toast.error("The editor is not ready yet.")
      return
    }

    if (!title.trim()) {
      toast.error("Please add a title.")
      return
    }

    const markdown = getAllContent(editorRef.current)
    if (!markdown.trim()) {
      toast.error("Please add some blog content.")
      return
    }

    setIsSubmitting(true)
    setPublishStatus("Submitting")

    try {
      const formData = new FormData()
      formData.append("title", title.trim())
      formData.append("slug", slug.trim() || createSlug(title))
      formData.append("excerpt", excerpt.trim())
      formData.append("markdown", markdown)
      formData.append("imageUrls", JSON.stringify(pendingImagesRef.current.map((image) => image.objectUrl)))

      pendingImagesRef.current.forEach((image) => {
        formData.append("images", image.file, image.file.name)
      })

      const response = await fetch("/api/submit", {
        method: "POST",
        body: formData,
      })

      const result = (await response.json()) as { ok?: boolean; message?: string; error?: string }

      if (!response.ok || !result.ok) {
        throw new Error(result.error || result.message || "Failed to submit blog post.")
      }

      toast.success(result.message || "Blog submitted successfully.")
      setPublishStatus("Published")
      pendingImagesRef.current.forEach((image) => URL.revokeObjectURL(image.objectUrl))
      pendingImagesRef.current = []
      setTitle("")
      setSlug("")
      setExcerpt("")
    } catch (error) {
      setPublishStatus("Draft")
      toast.error(error instanceof Error ? error.message : "Failed to submit blog post.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-[#ff6b35]/10 backdrop-blur-sm sm:p-6">
      <div className="mb-5 flex flex-col gap-3 border-b border-white/10 pb-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-white/40">Hidden authoring form</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Novel markdown editor</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/60">
            {publishStatus}
          </div>
          <Button type="button" variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10" onClick={addImageFromPicker}>
            Add Image
          </Button>
          <Button type="button" className="bg-[#ff6b35] text-white hover:bg-[#ff8555]" onClick={submitPost} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-white/80">Title</span>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Your blog title"
            className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-[#ff6b35]/60"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-white/80">Slug</span>
          <input
            value={slug}
            onChange={(event) => setSlug(createSlug(event.target.value))}
            placeholder="your-blog-slug"
            className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-[#ff6b35]/60"
          />
        </label>
      </div>

      <label className="mt-4 block space-y-2">
        <span className="text-sm font-medium text-white/80">Excerpt</span>
        <textarea
          value={excerpt}
          onChange={(event) => setExcerpt(event.target.value)}
          placeholder="Short summary for the blog listing"
          rows={3}
          className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-[#ff6b35]/60"
        />
      </label>

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black/70">
        <EditorRoot>
          <EditorContent
            initialContent={initialContent}
            extensions={[
              StarterKit.configure({
                heading: {
                  levels: [1, 2, 3, 4],
                },
              }),
              Placeholder.configure({
                placeholder: "Write your blog post here. Use markdown-style content, headings, lists, and images.",
              }),
              BlogImageExtension,
              CustomKeymap,
            ]}
            className="min-h-[520px]"
            editorProps={{
              handlePaste: (view, event) => handleImagePaste(view, event, uploadFn),
              handleDrop: (view, event, _slice, moved) => handleImageDrop(view, event, moved, uploadFn),
              attributes: {
                class:
                  "ProseMirror prose prose-invert max-w-none min-h-[520px] px-6 py-6 prose-headings:text-white prose-p:text-white/90 prose-li:text-white/90 prose-strong:text-white prose-a:text-[#ff6b35] focus:outline-none",
              },
            }}
            onCreate={({ editor }) => {
              editorRef.current = editor
            }}
            onUpdate={({ editor }) => {
              editorRef.current = editor
            }}
          >
          </EditorContent>
        </EditorRoot>
      </div>

      <p className="mt-4 text-sm text-white/50">
        Images inserted here are held locally until you press Submit, then uploaded with the markdown to Supabase.
      </p>
    </div>
  )
}