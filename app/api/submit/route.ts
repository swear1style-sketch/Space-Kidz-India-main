import { promises as fs } from "fs"
import path from "path"
import { NextResponse } from "next/server"
import { getSupabaseAdminClient } from "@/lib/supabase"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type UploadImageRecord = {
  objectUrl: string
  file: File
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

function safeName(value: string) {
  return value.replace(/[^a-zA-Z0-9._-]/g, "-")
}

function buildFrontmatter(title: string, excerpt: string, coverImage: string | null) {
  const lines = ["---", `title: ${JSON.stringify(title)}`]

  if (excerpt) {
    lines.push(`excerpt: ${JSON.stringify(excerpt)}`)
  }

  if (coverImage) {
    lines.push(`coverImage: ${JSON.stringify(coverImage)}`)
  }

  lines.push("---")
  return lines.join("\n")
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const title = String(formData.get("title") || "").trim()
    const rawSlug = String(formData.get("slug") || "").trim()
    const excerpt = String(formData.get("excerpt") || "").trim()
    const markdown = String(formData.get("markdown") || "").trim()
    const imageUrls = JSON.parse(String(formData.get("imageUrls") || "[]")) as string[]
    const imageFiles = formData.getAll("images").filter((item): item is File => item instanceof File)

    if (!title || !markdown) {
      return NextResponse.json({ ok: false, error: "title and markdown are required" }, { status: 400 })
    }

    const slug = rawSlug ? slugify(rawSlug) : slugify(title)
    const supabase = getSupabaseAdminClient()
    const bucket = process.env.SUPABASE_BLOG_BUCKET || "blogs"

    const blogsDirectory = path.join(process.cwd(), "blogs")
    const publicImagesDirectory = path.join(process.cwd(), "public", "img", "blogs")
    const supabaseAssetsDirectory = `blogs/${slug}`

    await fs.mkdir(blogsDirectory, { recursive: true })
    await fs.mkdir(publicImagesDirectory, { recursive: true })

    let localMarkdown = markdown
    let remoteMarkdown = markdown
    let firstLocalImage: string | null = null

    const imageUploads: UploadImageRecord[] = imageFiles.map((file, index) => ({
      objectUrl: imageUrls[index] || "",
      file,
    }))

    for (let index = 0; index < imageUploads.length; index += 1) {
      const upload = imageUploads[index]
      const file = upload.file
      const ext = path.extname(file.name) || `.${file.type.split("/")[1] || "png"}`
      const fileName = `${slug}-${Date.now()}-${index}-${safeName(path.basename(file.name, ext))}${ext}`
      const localPath = `/img/blogs/${fileName}`
      const localFilePath = path.join(publicImagesDirectory, fileName)
      const fileBuffer = Buffer.from(await file.arrayBuffer())

      await fs.writeFile(localFilePath, fileBuffer)

      if (!firstLocalImage) {
        firstLocalImage = localPath
      }

      localMarkdown = upload.objectUrl ? localMarkdown.replaceAll(upload.objectUrl, localPath) : localMarkdown

      if (supabase) {
        const supabasePath = `${supabaseAssetsDirectory}/${fileName}`
        const uploadResult = await supabase.storage.from(bucket).upload(supabasePath, fileBuffer, {
          contentType: file.type || "application/octet-stream",
          upsert: true,
        })

        if (uploadResult.error) {
          throw new Error(uploadResult.error.message)
        }

        const { data } = supabase.storage.from(bucket).getPublicUrl(supabasePath)
        const publicUrl = data.publicUrl
        remoteMarkdown = upload.objectUrl ? remoteMarkdown.replaceAll(upload.objectUrl, publicUrl) : remoteMarkdown
      }
    }

    const frontmatter = buildFrontmatter(title, excerpt, firstLocalImage)
    const localMarkdownPath = path.join(blogsDirectory, `${slug}.md`)
    await fs.writeFile(localMarkdownPath, `${frontmatter}\n\n${localMarkdown}\n`, "utf8")

    if (supabase) {
      const markdownFileName = `${slug}.md`
      const markdownPath = `${supabaseAssetsDirectory}/${markdownFileName}`
      const markdownBuffer = Buffer.from(`${frontmatter}\n\n${remoteMarkdown}\n`, "utf8")
      const uploadResult = await supabase.storage.from(bucket).upload(markdownPath, markdownBuffer, {
        contentType: "text/markdown; charset=utf-8",
        upsert: true,
      })

      if (uploadResult.error) {
        throw new Error(uploadResult.error.message)
      }
    }

    return NextResponse.json({
      ok: true,
      message: supabase
        ? "Blog saved locally and uploaded to Supabase."
        : "Blog saved locally. Set Supabase credentials to upload it remotely too.",
      slug,
    })
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Failed to submit blog post.",
      },
      { status: 500 },
    )
  }
}