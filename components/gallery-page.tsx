"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X, ChevronLeft, ChevronRight, Menu, Mail, Phone, MapPin, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"


interface GalleryImage {
  id: number
  src: string
  alt: string
  category: string
}

const categories = ["All", "Clinic Interior", "Equipment", "Treatment Rooms", "Procedures"]

export default function GalleryPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const response = await fetch("/api/gallery")
      if (response.ok) {
        const data: GalleryImage[] = await response.json()
        setImages(data)
      }
    } catch (error) {
      console.error("Error fetching images:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredImages = images.filter((image) => selectedCategory === "All" || image.category === selectedCategory)

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % filteredImages.length)
  }

  const showPrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + filteredImages.length) % filteredImages.length)
  }

  // Fix the keyboard event handler
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (!lightboxOpen) return
      if (e.key === "ArrowRight") {
        showNextImage()
      } else if (e.key === "ArrowLeft") {
        showPrevImage()
      } else if (e.key === "Escape") {
        closeLightbox()
      }
    }

    if (lightboxOpen) {
      window.addEventListener("keydown", handleKeyDown)
      return () => {
        window.removeEventListener("keydown", handleKeyDown)
      }
    }
  }, [lightboxOpen, currentImageIndex, filteredImages.length])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 to-teal-700 bg-clip-text text-transparent mb-6">
            Our Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our clinic, state-of-the-art equipment, and the comfortable environment we provide for your dental
            care.
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full mx-auto mt-8"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category
                  ? "bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-md"
                  : "border-teal-300 text-teal-700 hover:bg-teal-50"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
            <p className="ml-4 text-gray-500">Loading images...</p>
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">No images found for this category.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <Card
                key={image.id}
                className="overflow-hidden border-0 rounded-1xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-[5/4] overflow-hidden">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="text-white text-sm font-medium">{image.alt}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Lightbox Modal */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-5xl h-[90vh] p-0 bg-transparent border-none shadow-none flex items-center justify-center">
          {filteredImages.length > 0 && (
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={filteredImages[currentImageIndex]?.src || "/placeholder.svg"}
                alt={filteredImages[currentImageIndex]?.alt || "Gallery image"}
                fill
                className="object-contain"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/20 z-20"
                onClick={closeLightbox}
              >
                <X className="h-6 w-6" />
              </Button>
              {filteredImages.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-20"
                    onClick={showPrevImage}
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-20"
                    onClick={showNextImage}
                  >
                    <ChevronRight className="h-8 w-8" />
                  </Button>
                </>
              )}
              <div className="absolute bottom-4 left-0 right-0 text-center text-white text-lg bg-black/50 p-2 z-10">
                {filteredImages[currentImageIndex]?.alt}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
      
    </div>
  )
}
