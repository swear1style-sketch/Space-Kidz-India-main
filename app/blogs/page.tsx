import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getAllBlogPosts } from "@/lib/blog"

export const metadata = {
  title: "Blogs | Space Kidz India",
  description: "Stories, updates, and deep dives from Space Kidz India.",
}

export default async function BlogsPage() {
  const posts = await getAllBlogPosts()

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#ff6b35] mb-4">Blogs</h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto">
              Long-form insights, stories, and updates from Space Kidz India.
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="max-w-3xl mx-auto rounded-2xl border border-white/10 bg-white/5 p-8 sm:p-10 text-center">
              <h2 className="text-2xl font-semibold text-white mb-3">No blogs published yet</h2>
              <p className="text-white/70">
                Add markdown files to the blogs folder and they will automatically appear here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden hover:border-[#ff6b35]/50 transition-all group"
                >
                  {post.coverImage ? (
                    <div className="relative overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : null}

                  <div className="p-6">
                    {post.date ? (
                      <div className="flex items-center gap-2 text-white/60 text-sm mb-3">
                        <Calendar size={16} />
                        <time dateTime={post.date}>{post.date}</time>
                      </div>
                    ) : null}

                    <h2 className="text-white font-semibold text-xl mb-3 group-hover:text-[#ff6b35] transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-white/80 mb-5 line-clamp-3">{post.excerpt}</p>

                    <Link
                      href={`/blogs/${post.slug}`}
                      className="inline-flex items-center gap-2 text-[#ff6b35] hover:text-[#ff8555] font-medium transition-colors"
                    >
                      Read Blog
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
