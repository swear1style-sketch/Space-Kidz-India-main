import { promises as fs } from "fs"
import path from "path"
import matter from "gray-matter"

const blogsDirectory = path.join(process.cwd(), "blogs")

export type BlogPost = {
  slug: string
  title: string
  date: string
  excerpt: string
  coverImage?: string
  content: string
}

type BlogFrontmatter = {
  title?: string
  date?: string
  excerpt?: string
  coverImage?: string
}

function toExcerpt(content: string, fallbackTitle: string): string {
  const plainText = content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/[#>*_-]/g, "")
    .replace(/\s+/g, " ")
    .trim()

  if (!plainText) return `Read ${fallbackTitle} on the Space Kidz India blog.`

  return plainText.length > 180 ? `${plainText.slice(0, 177)}...` : plainText
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const files = await fs.readdir(blogsDirectory)
    const markdownFiles = files.filter((file) => file.endsWith(".md"))

    const posts = await Promise.all(
      markdownFiles.map(async (fileName) => {
        const fullPath = path.join(blogsDirectory, fileName)
        const fileContents = await fs.readFile(fullPath, "utf8")
        const { data, content } = matter(fileContents)
        const frontmatter = data as BlogFrontmatter
        const slug = fileName.replace(/\.md$/, "")
        const title = frontmatter.title?.trim() || slug.replace(/[-_]/g, " ")
        const excerpt = frontmatter.excerpt?.trim() || toExcerpt(content, title)

        return {
          slug,
          title,
          date: frontmatter.date?.trim() || "",
          excerpt,
          coverImage: frontmatter.coverImage,
          content,
        }
      }),
    )

    return posts.sort((a, b) => {
      const aDate = a.date ? new Date(a.date).getTime() : 0
      const bDate = b.date ? new Date(b.date).getTime() : 0
      return bDate - aDate
    })
  } catch {
    return []
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllBlogPosts()
  return posts.find((post) => post.slug === slug) ?? null
}

export async function getBlogSlugs(): Promise<string[]> {
  const posts = await getAllBlogPosts()
  return posts.map((post) => post.slug)
}
