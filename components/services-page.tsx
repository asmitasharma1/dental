"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Menu,
  X,
  ArrowRight,
  SmileIcon as Tooth,
  Smile,
  Baby,
  Wrench,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react"
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

interface Service {
  id: number
  title: string
  description: string
  category: string
  price: number
  duration: string
  is_active: boolean
}

interface ServiceCategory {
  title: string
  description: string
  icon: any
  services: Service[]
  link: string
}

const categoryIcons = {
  "General Dentistry": Tooth,
  "Cosmetic Dentistry": Smile,
  "Pediatric Dentistry": Baby,
  "Restorative Dentistry": Wrench,
}

const categoryDescriptions = {
  "General Dentistry": "Comprehensive oral health care including cleanings, fillings, and preventive treatments",
  "Cosmetic Dentistry": "Enhance your smile with veneers, whitening, and aesthetic treatments",
  "Pediatric Dentistry": "Specialized dental care for children in a comfortable, friendly environment",
  "Restorative Dentistry": "Restore damaged teeth with crowns, bridges, and implant solutions",
}

export default function ServicesPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const servicesPerPage = 6

  // Calculate pagination
  const totalPages = Math.ceil(services.length / servicesPerPage)
  const startIndex = (currentPage - 1) * servicesPerPage
  const currentServices = services.slice(startIndex, startIndex + servicesPerPage)

  const beforeAfterImages = [
    {
      before: "/placeholder.svg?height=320&width=400",
      after: "/placeholder.svg?height=320&width=400",
      title: "Complete Smile Transformation",
    },
    {
      before: "/placeholder.svg?height=320&width=400",
      after: "/placeholder.svg?height=320&width=400",
      title: "Professional Teeth Whitening",
    },
  ]

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % beforeAfterImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + beforeAfterImages.length) % beforeAfterImages.length)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-teal-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="#hero">
                <Image
                  src="/images/logo.png"
                  alt="Smile by Dr. Kareen Logo"
                  width={80}
                  height={80}
                  className="cursor-pointer"
                />
              </Link>
            </div>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/#hero"
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
              <Link
                href="/gallery"
                className="text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium relative group"
              >
                Gallery
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
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
                <Link href="#hero" className="text-gray-700 hover:text-teal-600 transition-colors">
                  Home
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-teal-600 transition-colors">
                  About Us
                </Link>
                <Link href="/services" className="text-gray-700 hover:text-teal-600 transition-colors">
                  Services
                </Link>
                <Link href="/why-us" className="text-gray-700 hover:text-teal-600 transition-colors">
                  Why Us
                </Link>
                <Link href="/gallery" className="block text-gray-300 hover:text-teal-400 transition-colors">
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
          {/* Interactive Before/After Slider */}
          <div className="max-w-4xl mx-auto mb-20">
            <h3 className="text-3xl font-bold text-center mb-8 text-gray-900">See the Transformation</h3>
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="relative h-80">
                  <Image
                    src={beforeAfterImages[currentSlide].before || "/placeholder.svg"}
                    alt="Before Treatment"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Before
                  </div>
                </div>
                <div className="relative h-80">
                  <Image
                    src={beforeAfterImages[currentSlide].after || "/placeholder.svg"}
                    alt="After Treatment"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    After
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full px-6 py-2">
                <p className="text-gray-800 font-medium">{beforeAfterImages[currentSlide].title}</p>
              </div>
              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm shadow-lg rounded-full flex items-center justify-center hover:bg-white transition-all duration-300"
              >
                <ChevronLeft className="h-6 w-6 text-gray-600" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm shadow-lg rounded-full flex items-center justify-center hover:bg-white transition-all duration-300"
              >
                <ChevronRight className="h-6 w-6 text-gray-600" />
              </button>
              {/* Dots Indicator */}
              <div className="absolute bottom-4 right-4 flex space-x-2">
                {beforeAfterImages.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-teal-600" : "bg-gray-300"
                      }`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
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
                        <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                          {(() => {
                            const IconComponent = categoryIcons[service.category as keyof typeof categoryIcons] || Tooth
                            return <IconComponent className="h-8 w-8 text-teal-600" />
                          })()}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                        <p className="text-sm text-teal-600 font-medium mb-3">{service.category}</p>
                        <p className="text-gray-600 mb-4 leading-relaxed text-sm line-clamp-3">{service.description}</p>
                        <div className="flex items-center justify-center space-x-4 mb-6">
                          <div className="text-2xl font-bold text-teal-600">NPR {service.price.toLocaleString()}</div>
                          {/* {service.duration && <div className="text-sm text-gray-500">{service.duration}</div>} */}
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
                        className={`w-10 h-10 rounded-full ${currentPage === page ? "bg-teal-600 hover:bg-teal-700 text-white" : "hover:bg-teal-50"
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
                  alt="Dr. Kareen's Clinic Logo"
                  width={120}
                  height={48}
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
                <Link href="/about" className="block text-gray-300 hover:text-teal-400 transition-colors">
                  About Us
                </Link>
                <Link href="/why-us" className="block text-gray-300 hover:text-teal-400 transition-colors">
                  Why Us
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
                  <span className="text-gray-300">drkareen@example.com</span>
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
              <p className="text-gray-400 text-sm">© 2024 Dr. Kareen's Dental Clinic. All rights reserved.</p>
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
