"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Calendar, User, ArrowRight, ArrowUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useCallback, useEffect, useState } from "react"

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

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)


  const handleScroll = useCallback(() => {
    const windowScrollY = window.scrollY || window.pageYOffset
    const documentScrollTop = document.documentElement.scrollTop
    const bodyScrollTop = document.body.scrollTop

    // Use the maximum of all scroll positions
    const scrollTop = Math.max(windowScrollY, documentScrollTop, bodyScrollTop)

    if (scrollTop > 100) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [])

  useEffect(() => {
    fetchBlogs()

    const addScrollListeners = () => {
      window.addEventListener("scroll", handleScroll, { passive: true })
      document.addEventListener("scroll", handleScroll, { passive: true })
      document.body.addEventListener("scroll", handleScroll, { passive: true })
    }

    const removeScrollListeners = () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("scroll", handleScroll)
      document.body.removeEventListener("scroll", handleScroll)
    }

    addScrollListeners()

    // Check initial position
    handleScroll()

    return () => {
      removeScrollListeners()
    }
  }, [handleScroll])

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blogs")
      if (response.ok) {
        const data = await response.json()
        setBlogs(data.filter((blog: Blog) => blog.is_published))
      } else {
        console.error("Failed to fetch blogs")
      }
    } catch (error) {
      console.error("Error fetching blogs:", error)
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
    // Try multiple scroll methods for better compatibility
    try {
      // Method 1: Smooth scroll
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      })

      // Method 2: Fallback for browsers that don't support smooth scroll
      setTimeout(() => {
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
        window.pageYOffset = 0
      }, 100)
    } catch (error) {
      // Method 3: Instant scroll fallback
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      window.scrollTo(0, 0)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-teal-50 via-white to-cyan-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 to-teal-700 bg-clip-text text-transparent mb-6">
              Our Blog
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Stay informed with the latest dental health tips, treatment insights, and oral care advice from our expert
              team.
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full mx-auto mt-8"></div>
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">No blog posts available at the moment.</p>
              <p className="text-gray-500 mt-2">Check back soon for new articles!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <Card
                  key={blog.id}
                  className="bg-white border-0 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 group overflow-hidden"
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={blog.image_url || "/placeholder.svg?height=300&width=400&query=dental blog"}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(blog.published_date)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{blog.author}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-teal-700 transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-3 leading-relaxed">{blog.excerpt}</p>
                      <Link
                        href={`/blogs/${blog.id}`}
                        className="inline-flex items-center space-x-2 text-teal-600 hover:text-teal-700 font-medium transition-colors group/link"
                      >
                        <span>Read More</span>
                        <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

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
