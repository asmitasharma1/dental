"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X, ChevronLeft, ChevronRight, Menu, Mail, Phone, MapPin, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

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
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-teal-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  alt="Smile by Dr. Kareen Logo"
                  width={150}
                  height={80}
                  className="h-12 w-auto cursor-pointer"
                />
              </Link>
            </div>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
              </Link>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium">
                      About Us
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[300px] p-2">
                        <NavigationMenuLink asChild>
                          <Link
                            href="/about#clinic"
                            className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                          >
                            <div className="text-sm font-medium leading-none group-hover:underline">Our Clinic</div>
                            <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Learn about our state-of-the-art facility
                            </div>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/about#doctors"
                            className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                          >
                            <div className="text-sm font-medium leading-none group-hover:underline">Our Doctors</div>
                            <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Meet our experienced dental professionals
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium">
                      Price/Service
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[400px] p-2">
                        <NavigationMenuLink asChild>
                          <Link
                            href="/services"
                            className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                          >
                            <div className="text-sm font-medium leading-none group-hover:underline">All Services</div>
                            <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              View our complete range of dental services
                            </div>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/services/general-dentistry"
                            className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                          >
                            <div className="text-sm font-medium leading-none group-hover:underline">
                              General Dentistry
                            </div>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/services/cosmetic-dentistry"
                            className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                          >
                            <div className="text-sm font-medium leading-none group-hover:underline">
                              Cosmetic Dentistry
                            </div>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/services/restorative-dentistry"
                            className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                          >
                            <div className="text-sm font-medium leading-none group-hover:underline">
                              Restorative Dentistry
                            </div>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/services/pediatric-dentistry"
                            className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                          >
                            <div className="text-sm font-medium leading-none group-hover:underline">
                              Pediatric Dentistry
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <Link
                href="/why-us"
                className="text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium relative group"
              >
                Why Us
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
              </Link>
              <Link href="/gallery" className="text-teal-600 transition-all duration-300 font-medium relative group">
                Gallery
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full"></span>
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/book-now">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-6 py-3 font-semibold"
                >
                  Book Now
                </Button>
              </Link>
              {/* Mobile Menu Button */}
              <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-100">
              <nav className="flex flex-col space-y-4 pt-4">
                <Link href="/" className="text-gray-700 hover:text-teal-600 transition-colors">
                  Home
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-teal-600 transition-colors">
                  About Us
                </Link>
                <Link href="/services" className="text-gray-700 hover:text-teal-600 transition-colors">
                  Price/Service
                </Link>
                <Link href="/why-us" className="text-gray-700 hover:text-teal-600 transition-colors">
                  Why Us
                </Link>
                <Link href="/gallery" className="text-teal-600 transition-colors">
                  Gallery
                </Link>
                <Link href="/book-now">
                  <Button className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white">
                    Book Now
                  </Button>
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

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
                className="overflow-hidden border-0 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-[4/3] overflow-hidden">
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

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 to-cyan-900/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Logo and Description */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-2">
                <Image
                  src="/images/logo.png"
                  alt="Dr. Kareem's Clinic Logo"
                  width={120}
                  height={60}
                  className="h-12 w-auto"
                />
              </div>
              <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                Your trusted dental care partner in Lalitpur. We're committed to providing exceptional dental services
                with a personal touch.
              </p>
            </div>
            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">Quick Links</h3>
              <nav className="space-y-3">
                <Link href="/" className="block text-gray-300 hover:text-teal-400 transition-colors">
                  Home
                </Link>
                <Link href="/services" className="block text-gray-300 hover:text-teal-400 transition-colors">
                  Our Services
                </Link>
                <Link href="/why-us" className="block text-gray-300 hover:text-teal-400 transition-colors">
                  Why Us
                </Link>
                <Link href="/gallery" className="block text-gray-300 hover:text-teal-400 transition-colors">
                  Gallery
                </Link>
                <Link href="/book-now" className="block text-gray-300 hover:text-teal-400 transition-colors">
                  Book Appointment
                </Link>
              </nav>
            </div>
            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-teal-400" />
                  <span className="text-gray-300">drkareem@example.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-teal-400" />
                  <span className="text-gray-300">985-1359775</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-teal-400 mt-1" />
                  <span className="text-gray-300">Pulchowk Damkal, Lalitpur, Nepal</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-teal-400" />
                  <span className="text-gray-300">Mon-Sun: 9:00 AM - 8:00 PM</span>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom Footer */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">© 2024 Dr. Kareem's Dental Clinic. All rights reserved.</p>
              <div className="flex space-x-6 text-sm">
                <Link href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
