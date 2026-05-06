import { notFound } from "next/navigation"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { ChevronLeft, Calendar } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getBlogPostBySlug, getBlogSlugs } from "@/lib/blog"

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return { title: "Blog Not Found | Space Kidz India" }
  }

  return {
    title: `${post.title} | Blogs | Space Kidz India`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pt-24 pb-16">
        <article className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-white/70 hover:text-[#ff6b35] transition-colors mb-8"
          >
            <ChevronLeft size={16} />
            Back to Blogs
          </Link>

          <header className="mb-8 border-b border-white/10 pb-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#ff6b35] leading-tight mb-4">{post.title}</h1>

            {post.date ? (
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Calendar size={16} />
                <time dateTime={post.date}>{post.date}</time>
              </div>
            ) : null}
          </header>

          <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-white/90 prose-strong:text-white prose-a:text-[#ff6b35] prose-a:no-underline hover:prose-a:text-[#ff8555] prose-blockquote:border-l-[#ff6b35] prose-blockquote:text-white/80 prose-code:text-[#ffbe9f] prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-li:text-white/90 prose-hr:border-white/10">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                img: ({ src, alt }) => (
                  <img
                    src={src || ""}
                    alt={alt || ""}
                    className="w-full rounded-xl border border-white/10 my-6"
                    loading="lazy"
                  />
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
