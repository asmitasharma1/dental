"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

interface Service {
  id: number
  title: string
  description: string
  category: string
  price: number
  duration: string
  image_url: string
  is_active: boolean
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const servicesPerPage = 6

  // Calculate pagination
  const totalPages = Math.ceil(services.length / servicesPerPage)
  const startIndex = (currentPage - 1) * servicesPerPage
  const currentServices = services.slice(startIndex, startIndex + servicesPerPage)

  const beforeAfterImages = {
    before: "/images/before.jpg",
    after: "/images/after.jpg",
    title: "Complete Smile Transformation",
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/services")
      if (response.ok) {
        const data = await response.json()
        setServices(data)
      } else {
        console.error("Failed to fetch services")
      }
    } catch (error) {
      console.error("Error fetching services:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section with Interactive Slider */}
      <section className="py-24 bg-gradient-to-br from-teal-50 via-white to-cyan-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 to-teal-700 bg-clip-text text-transparent mb-6">
              Our Services & Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive dental care with transparent pricing and exceptional results
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full mx-auto mt-8"></div>
          </div>

          {/* Before/After Comparison */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-8 text-gray-900">Professional Teeth Whitening Results</h3>
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="relative h-80">
                  <Image
                    src={beforeAfterImages.before || "/placeholder.svg"}
                    alt="Before Teeth Whitening Treatment"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Before
                  </div>
                </div>
                <div className="relative h-80">
                  <Image
                    src={beforeAfterImages.after || "/placeholder.svg"}
                    alt="After Teeth Whitening Treatment"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    After
                  </div>
                </div>
              </div>
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full px-6 py-2">
                <p className="text-gray-800 font-medium">{beforeAfterImages.title}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Individual Services with Pagination */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-teal-700 bg-clip-text text-transparent mb-6">
              All Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Comprehensive dental care tailored to your needs</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
              <p className="ml-4 text-gray-600">Loading services...</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {currentServices.map((service) => (
                  <Card
                    key={service.id}
                    className="bg-gradient-to-br from-white to-teal-50 border-0 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 group"
                  >
                    <CardContent className="p-0">
                      <div className="text-center">
                        <div className="w-full h-48 mb-4 rounded-2xl overflow-hidden">
                          <Image
                            src={service.image_url || "/placeholder.svg?height=200&width=300&query=dental service"}
                            alt={service.title}
                            width={300}
                            height={200}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                        <p className="text-sm text-teal-600 font-medium mb-3 capitalize">{service.category}</p>
                        <p className="text-gray-600 mb-4 leading-relaxed text-sm line-clamp-3">{service.description}</p>
                        <div className="flex items-center justify-center space-x-4 mb-6">
                          <div className="text-2xl font-bold text-teal-600">NPR {service.price.toLocaleString()}</div>
                        </div>
                        <Link href={`/services/${service.id}`}>
                          <Button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-full px-6 py-2 group-hover:scale-105 transition-all duration-300 w-full">
                            Learn More
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="rounded-full"
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  <div className="flex space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-full ${
                          currentPage === page ? "bg-teal-600 hover:bg-teal-700 text-white" : "hover:bg-teal-50"
                        }`}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="rounded-full"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
