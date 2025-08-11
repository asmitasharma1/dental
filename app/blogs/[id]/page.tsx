"use client"

import { useState, useEffect } from "react"
import { Calendar, User, ArrowLeft, ArrowUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"

interface Blog {
  id: number
  title: string
  content: string
  excerpt: string
  author: string
  image_url: string
  published_date: string
  is_published: boolean
  created_at: string
  updated_at: string
}

export default function BlogDetailPage() {
  const params = useParams()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchBlog(params.id as string)
    }

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [params.id])

  const fetchBlog = async (id: string) => {
    try {
      const response = await fetch(`/api/blogs/${id}`)
      if (response.ok) {
        const data = await response.json()
        setBlog(data)
      } else {
        console.error("Failed to fetch blog")
      }
    } catch (error) {
      console.error("Error fetching blog:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex justify-center items-center h-64 mt-24">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
        </div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog post not found</h1>
          <Link href="/blogs">
            <Button className="bg-teal-600 hover:bg-teal-700">Back to Blogs</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Blog Content */}
      <article className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <Link
            href="/blogs"
            className="inline-flex items-center space-x-2 text-teal-600 hover:text-teal-700 mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Blogs</span>
          </Link>

          {/* Blog Header */}
          <header className="mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">{blog.title}</h1>
            <div className="flex items-center space-x-6 text-gray-600 mb-8">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>{formatDate(blog.published_date)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>{blog.author}</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {blog.image_url && (
            <div className="relative aspect-[16/9] mb-8 rounded-2xl overflow-hidden">
              <Image
                src={blog.image_url || "/placeholder.svg"}
                alt={blog.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          )}

          {/* Blog Content */}
          <div className="prose prose-lg max-w-none">
            <div
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, "<br />") }}
            />
          </div>
        </div>
      </article>

      <Footer />

      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-[9999] bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border-2 border-white/20"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}
