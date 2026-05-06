import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogSubmitEditor } from "@/components/blog-submit-editor"

export const metadata = {
  title: "Submit Blog | Space Kidz India",
  description: "Hidden blog submission page for creating markdown blog posts.",
}

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-10 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#ff6b35] mb-4">Submit Blog</h1>
            <p className="mx-auto max-w-3xl text-lg text-white/80">
              Draft a markdown blog post, add images, and submit it to Supabase.
            </p>
          </div>

          <BlogSubmitEditor />
        </div>
      </main>
      <Footer />
    </div>
  )
}