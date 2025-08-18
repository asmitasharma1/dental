"use client";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight, ArrowUp } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

interface GalleryProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const categories = [
  "All",
  "Clinic Interior",
  "Equipment",
  "Treatment Rooms",
  "Procedures",
  "Opening Day",
  "Non Profit Camp",
  "Doctor",
  "Products",
];

export default function Gallery({ selectedCategory, setSelectedCategory }: GalleryProps) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoadStates, setImageLoadStates] = useState<Record<number, boolean>>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch("/api/gallery");
      if (response.ok) {
        const data: GalleryImage[] = await response.json();
        setImages(data);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredImages = images.filter(
    (image) => selectedCategory === "All" || image.category === selectedCategory
  );

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % filteredImages.length);
  };

  const showPrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + filteredImages.length) % filteredImages.length);
  };

  const handleImageLoad = (imageId: number) => {
    setImageLoadStates((prev) => ({ ...prev, [imageId]: true }));
  };

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "ArrowRight") {
        showNextImage();
      } else if (e.key === "ArrowLeft") {
        showPrevImage();
      } else if (e.key === "Escape") {
        closeLightbox();
      }
    };

    if (lightboxOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [lightboxOpen, filteredImages.length]);

  const handleScroll = useCallback(() => {
    const windowScrollY = window.scrollY || window.pageYOffset;
    const documentScrollTop = document.documentElement.scrollTop;
    const bodyScrollTop = document.body.scrollTop;

    const scrollTop = Math.max(windowScrollY, documentScrollTop, bodyScrollTop);

    if (scrollTop > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    const addScrollListeners = () => {
      window.addEventListener("scroll", handleScroll, { passive: true });
      document.addEventListener("scroll", handleScroll, { passive: true });
      document.body.addEventListener("scroll", handleScroll, { passive: true });
    };

    const removeScrollListeners = () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll);
      document.body.removeEventListener("scroll", handleScroll);
    };

    addScrollListeners();
    handleScroll();

    return () => {
      removeScrollListeners();
    };
  }, [handleScroll]);

  const scrollToTop = () => {
    try {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });

      setTimeout(() => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        window.pageYOffset = 0;
      }, 100);
    } catch (error) {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="py-24 bg-gradient-to-br from-teal-50 via-white to-cyan-50 relative overflow-hidden">
        <Navbar />
        <main className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-teal-700 bg-clip-text text-transparent mb-6">
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
                  className="overflow-hidden border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  onClick={() => openLightbox(index)}
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-[5/4] overflow-hidden bg-gray-100">
                      {!imageLoadStates[image.id] && (
                        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                          <div className="text-gray-400 text-sm">Loading...</div>
                        </div>
                      )}

                      <Image
                        src={image.src || "/placeholder.svg?height=400&width=500&query=gallery image"}
                        alt={image.alt}
                        fill
                        className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                          imageLoadStates[image.id] ? "opacity-100" : "opacity-0"
                        }`}
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        quality={75}
                        loading="lazy"
                        onLoad={() => handleImageLoad(image.id)}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
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

        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
          <DialogContent className="max-w-5xl h-[90vh] p-0 bg-transparent border-none shadow-none flex items-center justify-center">
            {filteredImages.length > 0 && (
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src={
                      filteredImages[currentImageIndex]?.src ||
                      "/placeholder.svg?height=800&width=1200&query=gallery lightbox"
                    }
                    alt={filteredImages[currentImageIndex]?.alt || "Gallery image"}
                    fill
                    className="object-contain"
                    quality={90}
                    priority
                    sizes="100vw"
                  />
                </div>

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
  );
}