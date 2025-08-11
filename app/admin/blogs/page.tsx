"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, Eye, Calendar, User } from "lucide-react"
import Image from "next/image"
import Sidebar from "@/components/Sidebar"

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

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    author: "",
    image_url: "",
    published_date: "",
    is_published: false,
  })

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blogs/admin", {
        credentials: "include",
      })
      if (response.ok) {
        const data = await response.json()
        setBlogs(data)
      } else if (response.status === 401) {
        window.location.replace("/admin/login")
      }
    } catch (error) {
      console.error("Error fetching blogs:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingBlog ? `/api/blogs/${editingBlog.id}` : "/api/blogs"
      const method = editingBlog ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      })

      if (response.ok) {
        fetchBlogs()
        resetForm()
      } else if (response.status === 401) {
        window.location.replace("/admin/login")
      }
    } catch (error) {
      console.error("Error saving blog:", error)
    }
  }

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog)
    setFormData({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      author: blog.author,
      image_url: blog.image_url,
      published_date: blog.published_date.split("T")[0],
      is_published: blog.is_published,
    })
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      try {
        const response = await fetch(`/api/blogs/${id}`, {
          method: "DELETE",
          credentials: "include",
        })
        if (response.ok) {
          fetchBlogs()
        } else if (response.status === 401) {
          window.location.replace("/admin/login")
        }
      } catch (error) {
        console.error("Error deleting blog:", error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      author: "",
      image_url: "",
      published_date: "",
      is_published: false,
    })
    setEditingBlog(null)
    setShowForm(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1 lg:ml-6">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-teal-700 bg-clip-text text-transparent">
              Blog Management
            </h1>
            <Button onClick={() => setShowForm(true)} className="bg-teal-600 hover:bg-teal-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add New Blog
            </Button>
          </div>
        </header>

        <main className="p-6">
          {showForm && (
            <Card className="mb-8 bg-white border-0 shadow-lg rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">{editingBlog ? "Edit Blog" : "Add New Blog"}</h2>
                  <Button variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="author">Author</Label>
                      <Input
                        id="author"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      rows={3}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={10}
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="image_url">Image URL</Label>
                      <Input
                        id="image_url"
                        value={formData.image_url}
                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="published_date">Published Date</Label>
                      <Input
                        id="published_date"
                        type="date"
                        value={formData.published_date}
                        onChange={(e) => setFormData({ ...formData, published_date: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_published"
                      checked={formData.is_published}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                    />
                    <Label htmlFor="is_published">Published</Label>
                  </div>
                  <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white">
                    {editingBlog ? "Update Blog" : "Create Blog"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          <Card className="bg-white border-0 shadow-lg rounded-2xl">
            <CardContent className="p-0">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">All Blogs</h2>
              </div>
              {loading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
                  <p className="text-gray-500 mt-2">Loading blogs...</p>
                </div>
              ) : blogs.length === 0 ? (
                <div className="p-8 text-center text-gray-500">No blogs found</div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                  {blogs.map((blog) => (
                    <Card key={blog.id} className="border border-gray-200 rounded-xl overflow-hidden">
                      <CardContent className="p-0">
                        {blog.image_url && (
                          <div className="relative aspect-[16/10]">
                            <Image
                              src={blog.image_url || "/placeholder.svg"}
                              alt={blog.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          </div>
                        )}
                        <div className="p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <span
                              className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                blog.is_published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {blog.is_published ? "Published" : "Draft"}
                            </span>
                          </div>
                          <h3 className="font-bold text-gray-900 line-clamp-2">{blog.title}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2">{blog.excerpt}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{formatDate(blog.published_date)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <User className="h-3 w-3" />
                              <span>{blog.author}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 pt-2">
                            <Button size="sm" variant="outline" onClick={() => handleEdit(blog)} className="flex-1">
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(blog.id)}
                              className="text-red-600 hover:bg-red-50 hover:border-red-300"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                            {blog.is_published && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open(`/blogs/${blog.id}`, "_blank")}
                                className="text-teal-600 hover:bg-teal-50 hover:border-teal-300"
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
