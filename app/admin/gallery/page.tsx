"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Sidebar from "@/components/Sidebar"
import { Plus, Edit, Trash2, Upload } from "lucide-react"
import Image from "next/image"

interface GalleryImage {
  id: number
  src: string
  alt: string
  category: string
  created_at: string
}

const categories = ["All", "Clinic Interior", "Equipment", "Treatment Rooms", "Procedures", "Opening Day", "Non Profit Camp", "Doctor","Products"]

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null)
  const [uploadForm, setUploadForm] = useState({
    alt: "",
    category: "",
    file: null as File | null,
  })

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const response = await fetch("/api/gallery", {
        credentials: "include",
      })
      if (response.ok) {
        const data = await response.json()
        setImages(data)
      } else if (response.status === 401) {
        window.location.replace("/admin/login")
      }
    } catch (error) {
      console.error("Error fetching images:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate form data
    if (!uploadForm.file) {
      alert("Please select an image file")
      return
    }
    if (!uploadForm.alt.trim()) {
      alert("Please enter a description")
      return
    }
    if (!uploadForm.category) {
      alert("Please select a category")
      return
    }

    setUploading(true)

    const formData = new FormData()
    formData.append("file", uploadForm.file)
    formData.append("alt", uploadForm.alt.trim())
    formData.append("category", uploadForm.category)

    try {
      const response = await fetch("/api/gallery", {
        method: "POST",
        body: formData,
        credentials: "include",
      })

      if (response.ok) {
        setIsUploadOpen(false)
        setUploadForm({ alt: "", category: "", file: null })
        fetchImages()
        alert("Image uploaded successfully!")
      } else if (response.status === 401) {
        window.location.replace("/admin/login")
      } else {
        const errorData = await response.json()
        alert(`Upload failed: ${errorData.error || "Unknown error"}`)
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("Upload failed: Network error")
    } finally {
      setUploading(false)
    }
  }

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingImage) return

    try {
      const response = await fetch(`/api/gallery/${editingImage.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          alt: editingImage.alt,
          category: editingImage.category,
        }),
        credentials: "include",
      })

      if (response.ok) {
        setIsEditOpen(false)
        setEditingImage(null)
        fetchImages()
        alert("Image updated successfully!")
      } else if (response.status === 401) {
        window.location.replace("/admin/login")
      }
    } catch (error) {
      console.error("Error updating image:", error)
      alert("Update failed")
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this image?")) return

    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (response.ok) {
        fetchImages()
        alert("Image deleted successfully!")
      } else if (response.status === 401) {
        window.location.replace("/admin/login")
      }
    } catch (error) {
      console.error("Error deleting image:", error)
      alert("Delete failed")
    }
  }

  const openEditModal = (image: GalleryImage) => {
    setEditingImage({ ...image })
    setIsEditOpen(true)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setUploadForm({ ...uploadForm, file })
  }

  const handleCategoryChange = (value: string) => {
    setUploadForm({ ...uploadForm, category: value })
  }

  const handleEditCategoryChange = (value: string) => {
    if (editingImage) {
      setEditingImage({ ...editingImage, category: value })
    }
  }

  const resetUploadForm = () => {
    setUploadForm({ alt: "", category: "", file: null })
    // Reset file input
    const fileInput = document.getElementById("file") as HTMLInputElement
    if (fileInput) {
      fileInput.value = ""
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1 lg:ml-6">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-teal-700 bg-clip-text text-transparent">
              Gallery Management
            </h1>
            <Button
              onClick={() => {
                resetUploadForm()
                setIsUploadOpen(true)
              }}
              className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Image
            </Button>
          </div>
        </header>

        <main className="p-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {images.map((image) => (
                <Card key={image.id} className="overflow-hidden border-0 shadow-lg rounded-2xl">
                  <CardContent className="p-0">
                    <div className="relative aspect-square">
                      <Image
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => openEditModal(image)}
                            className="bg-white/90 hover:bg-white text-gray-900"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(image.id)}
                            className="bg-red-600/90 hover:bg-red-700 text-white"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="font-medium text-gray-900 mb-1">{image.alt}</p>
                      <span className="inline-block bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">
                        {image.category}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Upload Modal */}
      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Image</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <Label htmlFor="file">Image File</Label>
              <Input id="file" type="file" accept="image/*" onChange={handleFileChange} required className="mt-1" />
              {uploadForm.file && <p className="text-sm text-gray-500 mt-1">Selected: {uploadForm.file.name}</p>}
            </div>
            <div>
              <Label htmlFor="alt">Description</Label>
              <Textarea
                id="alt"
                value={uploadForm.alt}
                onChange={(e) => setUploadForm({ ...uploadForm, alt: e.target.value })}
                placeholder="Enter image description"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={uploadForm.category} onValueChange={handleCategoryChange} required>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsUploadOpen(false)
                  resetUploadForm()
                }}
                disabled={uploading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800"
                disabled={uploading}
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Image</DialogTitle>
          </DialogHeader>
          {editingImage && (
            <form onSubmit={handleEdit} className="space-y-4">
              <div>
                <Label htmlFor="edit-alt">Description</Label>
                <Textarea
                  id="edit-alt"
                  value={editingImage.alt}
                  onChange={(e) => setEditingImage({ ...editingImage, alt: e.target.value })}
                  placeholder="Enter image description"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="edit-category">Category</Label>
                <Select value={editingImage.category} onValueChange={handleEditCategoryChange} required>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800"
                >
                  Update
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
