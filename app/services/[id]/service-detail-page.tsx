"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, DollarSign, Timer, HelpCircle, AlertTriangle, Clock, Heart, ArrowUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface Service {
  id: number
  title: string
  description: string
  category: string
  price: number
  duration: string
  image_url: string
  why_use_service: string
  what_if_not_used: string
  before_appointment: string
  after_service: string
  is_active: boolean
}

interface ServiceDetailPageProps {
  serviceId: string
}

export default function ServiceDetailPage({ serviceId }: ServiceDetailPageProps) {
  const [service, setService] = useState<Service | null>(null)
  const [relatedServices, setRelatedServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  // Add scroll detection logic
  const handleScroll = useCallback(() => {
    const windowScrollY = window.scrollY || window.pageYOffset
    const documentScrollTop = document.documentElement.scrollTop
    const bodyScrollTop = document.body.scrollTop
    const scrollTop = Math.max(windowScrollY, documentScrollTop, bodyScrollTop)

    if (scrollTop > 100) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [])

  // Add useEffect to set up scroll listeners
  useEffect(() => {
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
    handleScroll()

    return () => {
      removeScrollListeners()
    }
  }, [handleScroll])

  const scrollToTop = () => {
    try {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      })

      setTimeout(() => {
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
        window.pageYOffset = 0
      }, 100)
    } catch (error) {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      window.scrollTo(0, 0)
    }
  }

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

  const qaItems = [
    {
      id: "why-use",
      question: "Why use this service?",
      answer: service.why_use_service,
      icon: HelpCircle,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      id: "what-if-not",
      question: "What would happen if you don't use this service?",
      answer: service.what_if_not_used,
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      id: "before-appointment",
      question: "What to do before going to the appointment?",
      answer: service.before_appointment,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      id: "after-service",
      question: "What to do after the service?",
      answer: service.after_service,
      icon: Heart,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Service Detail Hero */}
      <section className="py-24 bg-gradient-to-br from-teal-50 via-white to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Link href="/services" className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-8">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Services
            </Link>
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{service.title}</h1>
                <p className="text-teal-600 font-medium mb-6 capitalize">{service.category} Dentistry</p>
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
                        <p className="text-xl font-bold text-gray-900">{service.duration} min</p>
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
                  src={service.image_url || "/placeholder.svg?height=500&width=600&query=dental service"}
                  alt={service.title}
                  width={600}
                  height={500}
                  className="rounded-3xl shadow-2xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Q&A Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600">Everything you need to know about {service.title}</p>
            </div>
            <Accordion type="single" collapsible className="space-y-4">
              {qaItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <AccordionItem
                    key={item.id}
                    value={item.id}
                    className="border border-gray-200 rounded-2xl px-6 py-2 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 ${item.bgColor} rounded-full flex items-center justify-center`}>
                          <IconComponent className={`h-5 w-5 ${item.color}`} />
                        </div>
                        <span className="text-left font-semibold text-gray-900">{item.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 pb-2">
                      <div className="ml-14">
                        <p className="text-gray-600 leading-relaxed">
                          {item.answer || "Information not available. Please contact us for more details."}
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Related Services</h2>
              <p className="text-gray-600">You might also be interested in these services</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedServices.map((relatedService) => (
                <Card
                  key={relatedService.id}
                  className="bg-white border-0 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 group"
                >
                  <CardContent className="p-0 text-center">
                    <div className="w-full h-40 mb-4 rounded-2xl overflow-hidden">
                      <Image
                        src={relatedService.image_url || "/placeholder.svg?height=160&width=240&query=dental service"}
                        alt={relatedService.title}
                        width={240}
                        height={160}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{relatedService.title}</h3>
                    <p className="text-sm text-teal-600 font-medium mb-3 capitalize">{relatedService.category}</p>
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
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />

      {/* Scroll to Top Button */}
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
