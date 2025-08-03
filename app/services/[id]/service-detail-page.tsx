"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Menu,
  X,
  ArrowLeft,
  SmileIcon as Tooth,
  Smile,
  Baby,
  Wrench,
  Mail,
  Phone,
  MapPin,
  Clock,
  Calendar,
  DollarSign,
  Timer,
} from "lucide-react"
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
  is_active: boolean
}

const categoryIcons = {
  "General Dentistry": Tooth,
  "Cosmetic Dentistry": Smile,
  "Pediatric Dentistry": Baby,
  "Restorative Dentistry": Wrench,
}

interface ServiceDetailPageProps {
  serviceId: string
}

export default function ServiceDetailPage({ serviceId }: ServiceDetailPageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [service, setService] = useState<Service | null>(null)
  const [relatedServices, setRelatedServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (serviceId) {
      fetchService()
      fetchRelatedServices()
    }
  }, [serviceId])

  const fetchService = async () => {
    try {
      const response = await fetch(`/api/services/${serviceId}`)
      if (response.ok) {
        const data = await response.json()
        setService(data)
      } else {
        console.error("Failed to fetch service")
      }
    } catch (error) {
      console.error("Error fetching service:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchRelatedServices = async () => {
    try {
      const response = await fetch("/api/services")
      if (response.ok) {
        const data = await response.json()
        // Get 3 random services excluding current one
        const filtered = data.filter((s: Service) => s.id !== Number.parseInt(serviceId))
        const shuffled = filtered.sort(() => 0.5 - Math.random())
        setRelatedServices(shuffled.slice(0, 3))
      }
    } catch (error) {
      console.error("Error fetching related services:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
        <p className="ml-4 text-gray-600">Loading service details...</p>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <Link href="/services">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white">Back to Services</Button>
          </Link>
        </div>
      </div>
    )
  }

  const IconComponent = categoryIcons[service.category as keyof typeof categoryIcons] || Tooth
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Service Detail Hero */}
      <section className="py-24 bg-gradient-to-br from-teal-50 via-white to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/services" className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-8">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Services
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center">
                    <IconComponent className="h-8 w-8 text-teal-600" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">{service.title}</h1>
                    <p className="text-teal-600 font-medium">{service.category}</p>
                  </div>
                </div>

                <p className="text-xl text-gray-600 leading-relaxed mb-8">{service.description}</p>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="text-2xl font-bold text-teal-600">NPR {service.price.toLocaleString()}</p>
                    </div>
                  </div>

                  {service.duration && (
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                        <Timer className="h-6 w-6 text-teal-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="text-xl font-bold text-gray-900">{service.duration}</p>
                      </div>
                    </div>
                  )}
                </div>

                <Link href="/book-now">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-8 py-4 font-semibold"
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    Book This Service
                  </Button>
                </Link>
              </div>

              <div className="relative">
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt={service.title}
                  width={500}
                  height={400}
                  className="rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Related Services</h2>
              <p className="text-gray-600">You might also be interested in these services</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedServices.map((relatedService) => {
                const RelatedIcon = categoryIcons[relatedService.category as keyof typeof categoryIcons] || Tooth
                return (
                  <Card
                    key={relatedService.id}
                    className="bg-gradient-to-br from-white to-teal-50 border-0 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 group"
                  >
                    <CardContent className="p-0 text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <RelatedIcon className="h-6 w-6 text-teal-600" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{relatedService.title}</h3>
                      <p className="text-sm text-teal-600 font-medium mb-3">{relatedService.category}</p>
                      <div className="text-xl font-bold text-teal-600 mb-4">
                        NPR {relatedService.price.toLocaleString()}
                      </div>
                      <Link href={`/services/${relatedService.id}`}>
                        <Button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-full px-4 py-2 text-sm group-hover:scale-105 transition-all duration-300">
                          Learn More
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
