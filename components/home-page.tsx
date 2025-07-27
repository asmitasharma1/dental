"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Phone,
  Mail,
  MapPin,
  Quote,
  Instagram,
  MessageCircle,
  ArrowRight,
  Heart,
  Clock,
  Shield,
  Award,
  Users,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Star,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const topServices = [
  {
    title: "Professional Teeth Cleaning & Scaling",
    description: "Deep cleaning to remove plaque and tartar buildup for optimal oral health",
    image: "/images/dental-instruments.avif",
    link: "/services/teeth-cleaning",
  },
  {
    title: "Dental Fillings & Cavity Treatment",
    description: "High-quality composite fillings to restore damaged teeth",
    image: "/images/dental-instruments.avif",
    link: "/services/dental-fillings",
  },
  {
    title: "Professional Teeth Whitening",
    description: "Advanced whitening treatments for a brighter, confident smile",
    image: "/images/dental-instruments.avif",
    link: "/services/teeth-whitening",
  },
]

const missionValues = [
  {
    title: "Quality Service",
    description: "Delivering exceptional dental care with precision and expertise",
    icon: Award,
    color: "from-teal-100 to-teal-200",
    iconColor: "text-teal-600",
  },
  {
    title: "Integrity",
    description: "Honest, transparent treatment recommendations and pricing",
    icon: Shield,
    color: "from-gray-100 to-gray-200",
    iconColor: "text-gray-600",
  },
  {
    title: "Empathy",
    description: "Understanding and caring for each patient's unique needs",
    icon: Heart,
    color: "from-teal-200 to-teal-300",
    iconColor: "text-teal-700",
  },
  {
    title: "Teamwork",
    description: "Collaborative approach ensuring comprehensive patient care",
    icon: Users,
    color: "from-gray-200 to-gray-300",
    iconColor: "text-gray-700",
  },
]

const testimonials = [
  {
    quote:
      "Dr. Kareen and her team provided exceptional care during my dental implant procedure. The results exceeded my expectations!",
    name: "Sarah Johnson",
    service: "Dental Implants",
  },
  {
    quote: "My children love coming here! The pediatric dentistry team makes every visit comfortable and fun for kids.",
    name: "Michael Chen",
    service: "Pediatric Dentistry",
  },
  {
    quote:
      "The restorative work done on my teeth was amazing. I can smile confidently again thanks to Dr. Kareen's expertise.",
    name: "Emma Rodriguez",
    service: "Restorative Dentistry",
  },
]

export default function HomePage() {
  const [currentService, setCurrentService] = useState(0)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const serviceInterval = setInterval(() => {
      setCurrentService((prev) => (prev + 1) % topServices.length)
    }, 10000)

    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 10000)

    return () => {
      clearInterval(serviceInterval)
      clearInterval(testimonialInterval)
    }
  }, [])

  const nextService = () => {
    setCurrentService((prev) => (prev + 1) % topServices.length)
  }

  const prevService = () => {
    setCurrentService((prev) => (prev - 1 + topServices.length) % topServices.length)
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
                  width={500}
                  height={300}
                  className="cursor-pointer"
                  style={{ width: '80px', height: '80px' }}
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

      {/* Hero Section */}
      <section
        id="hero"
        className="bg-gradient-to-br from-teal-50 via-white to-gray-50 py-20 min-h-screen flex items-center relative overflow-hidden"
      >
        {/* Social Media Links - Right Side */}
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 flex flex-col space-y-4">
          <a
            href="https://www.instagram.com/smilebydrkareen_dentalclinic/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-teal-50 transition-all duration-300 hover:scale-110"
          >
            <Instagram className="h-6 w-6 text-teal-600" />
          </a>
          <a
            href="https://www.tiktok.com/@smilebydrkareen_dental"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-all duration-300 hover:scale-110"
          >
            <div className="w-6 h-6 bg-gray-800 rounded-sm flex items-center justify-center">
              <span className="text-white text-xs font-bold">T</span>
            </div>
          </a>
          <a
            href="https://wa.me/9851359775"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-teal-50 transition-all duration-300 hover:scale-110"
          >
            <MessageCircle className="h-6 w-6 text-teal-600" />
          </a>
          <a
            href="mailto:smilebydrkareen@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-teal-50 transition-all duration-300 hover:scale-110"
          >
            <Mail className="h-6 w-6 text-teal-600" />
          </a>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-8 h-10 bg-white/30 rounded-t-full rounded-b-sm transform rotate-12 blur-sm animate-pulse"></div>
        <div className="absolute top-32 right-20 w-6 h-8 bg-teal-200/40 rounded-t-full rounded-b-sm transform -rotate-45 blur-sm animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-10 h-12 bg-gray-200/30 rounded-t-full rounded-b-sm transform rotate-45 blur-sm animate-pulse delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 animate-spin" style={{ animationDuration: "8s" }}>
          <Sparkles className="h-8 w-8 text-teal-300/40" />
        </div>
        <div className="absolute bottom-1/3 left-16">
          <Heart className="h-6 w-6 text-teal-300/60 animate-pulse" />
        </div>

        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">WELCOME TO</h1>
                <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent leading-tight">
                  Smile By Dr. Kareen
                </h2>
              </div>
              <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                With our team of exceptional dental surgeons, we promise to provide the best service with cutting-edge
                technology and personalized care for every patient.
              </p>
              <div className="flex justify-center">
                <Link href="/book-now">
                  <Button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    Book An Appointment
                  </Button>
                </Link>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="flex items-center space-x-4 text-gray-700">
                  <Clock className="h-5 w-5 text-teal-600" />
                  <div>
                    <p className="font-semibold">Open 7 Days a Week</p>
                    <p className="text-sm">Monday - Sunday: 9:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-200/20 to-gray-200/20 rounded-3xl blur-2xl transform rotate-3 animate-pulse"></div>
              <Image
                src="/images/dental-hero.jpeg"
                alt="Professional dental care"
                width={600}
                height={600}
                className="rounded-3xl shadow-2xl relative z-10 hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive dental care with state-of-the-art technology and personalized treatment plans
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full mx-auto mt-8"></div>
          </div>

          {/* Wrapper with extra space for arrows */}
          <div className="relative flex items-center justify-center">
            {/* Left Arrow */}
            <button
              onClick={prevService}
              className="z-10 absolute -left-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-all duration-300"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>

            {/* Service Carousel */}
            <div className="w-full max-w-4xl overflow-hidden rounded-3xl shadow-2xl relative">
              <div className="relative h-96 bg-gradient-to-br from-teal-50 to-gray-50">
                <Image
                  src={topServices[currentService].image || "/placeholder.svg"}
                  alt={topServices[currentService].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-3xl font-bold mb-4">{topServices[currentService].title}</h3>
                  <p className="text-lg mb-6">{topServices[currentService].description}</p>
                  <div className="flex space-x-4">
                    <Link href={topServices[currentService].link}>
                      <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-6 py-2">
                        Read More
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={nextService}
              className="z-10 absolute -right-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-all duration-300"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {topServices.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentService ? "bg-teal-600" : "bg-gray-300"}`}
                onClick={() => setCurrentService(index)}
              />
            ))}
          </div>

          {/* More Services Button */}
          <div className="text-center mt-12">
            <Link href="/services">
              <Button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                More Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Main Services Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mt-20">
            <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-0 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 group">
              <CardContent className="p-0">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-3xl font-bold text-gray-900">Basic Dental Care</h3>
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Image src="/images/dental-instruments.avif" alt="Dental care" width={40} height={40} />
                  </div>
                </div>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full"></div>
                    <span>Professional Teeth Cleaning & Scaling</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full"></div>
                    <span>Dental Fillings & Cavity Treatment</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full"></div>
                    <span>Oral Health Consultation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-0 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 group">
              <CardContent className="p-0">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-3xl font-bold text-gray-900">Aesthetic Care</h3>
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Image src="/images/dental-instruments.avif" alt="Aesthetic care" width={40} height={40} />
                  </div>
                </div>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full"></div>
                    <span>Premium Porcelain Veneers</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full"></div>
                    <span>Professional Teeth Whitening</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full"></div>
                    <span>Invisalign Clear Aligners</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mt-20">
            <Card className="bg-gradient-to-br from-teal-100 to-teal-200 border-0 p-6 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <Users className="h-8 w-8 text-teal-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-gray-900 mb-1">500+</h3>
                <p className="text-gray-600">Happy Patients</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-gray-100 to-gray-200 border-0 p-6 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <Award className="h-8 w-8 text-gray-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-gray-900 mb-1">10+</h3>
                <p className="text-gray-600">Years Experience</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-teal-200 to-teal-300 border-0 p-6 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <Shield className="h-8 w-8 text-teal-700 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-gray-900 mb-1">100%</h3>
                <p className="text-gray-600">Safe Procedures</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-gray-200 to-gray-300 border-0 p-6 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <Star className="h-8 w-8 text-gray-700 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-gray-900 mb-1">4.9/5</h3>
                <p className="text-gray-600">Patient Rating</p>
              </CardContent>
            </Card>
          </div>

          {/* Specialized Services */}
          <div className="grid lg:grid-cols-3 gap-8 mt-20">
            <Card className="bg-gradient-to-br from-gray-50 to-white border-0 p-6 rounded-3xl text-center shadow-lg hover:shadow-2xl transition-all duration-500 group">
              <CardContent className="p-0">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Image src="/images/dental-instruments.avif" alt="Restorative" width={32} height={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Restorative Dentistry</h3>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-gray-50 to-white border-0 p-6 rounded-3xl text-center shadow-lg hover:shadow-2xl transition-all duration-500 group">
              <CardContent className="p-0">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Image src="/images/dental-instruments.avif" alt="Pediatric" width={32} height={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Pediatric Dentistry</h3>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-gray-50 to-white border-0 p-6 rounded-3xl text-center shadow-lg hover:shadow-2xl transition-all duration-500 group">
              <CardContent className="p-0">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-200 to-teal-300 rounded-full mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Image src="/images/dental-instruments.avif" alt="Implants" width={32} height={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Dental Implants</h3>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 to-teal-700 bg-clip-text text-transparent mb-6">
              Our Mission
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Card className="bg-gradient-to-br from-teal-50 to-gray-50 border-0 p-12 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500">
              <CardContent className="p-0">
                <div className="space-y-6">
                  <p className="text-teal-600 text-lg font-medium">Our Mission</p>
                  <h3 className="text-4xl font-bold text-gray-900">
                    Help you achieve a{" "}
                    <span className="bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent">
                      healthy, confident smile
                    </span>{" "}
                    that lasts a lifetime
                  </h3>
                  <p className="text-gray-600 text-lg">
                    We believe everyone deserves a beautiful smile. Our comprehensive approach focuses on prevention,
                    treatment, and long-term oral health.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {missionValues.map((value, index) => {
                const IconComponent = value.icon
                return (
                  <Card
                    key={index}
                    className={`bg-gradient-to-br ${value.color} border-0 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 group text-center`}
                  >
                    <CardContent className="p-0">
                      <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <IconComponent className={`h-8 w-8 ${value.iconColor}`} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                      <p className="text-gray-700 leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-teal-700 bg-clip-text text-transparent mb-6">
              What Our Patients Say
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full mx-auto"></div>
          </div>

          <Card className="bg-gradient-to-br from-teal-600 to-gray-700 text-white p-8 rounded-3xl shadow-2xl max-w-4xl mx-auto">
            <CardContent className="p-0 text-center">
              <Quote className="h-12 w-12 mx-auto mb-6 opacity-80" />
              <p className="text-xl mb-6 leading-relaxed">{testimonials[currentTestimonial].quote}</p>
              <div className="space-y-2">
                <p className="font-bold text-lg">{testimonials[currentTestimonial].name}</p>
                <p className="text-gray-200">{testimonials[currentTestimonial].service}</p>
              </div>
              <div className="flex justify-center space-x-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentTestimonial ? "bg-white" : "bg-white/40"
                      }`}
                    onClick={() => setCurrentTestimonial(index)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 to-gray-900/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Logo and Description */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-2">
                <Image
                  src="/images/logo.png"
                  alt="Smile by Dr. Kareen Logo"
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
                <Link href="/about" className="block text-gray-300 hover:text-teal-400 transition-colors">
                  About Us
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
                  <span className="text-gray-300">smilebydrkareen@gmail.com</span>
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
              <p className="text-gray-400 text-sm">© 2024 Smile by Dr. Kareen. All rights reserved.</p>
              <div className="flex space-x-6 text-sm">
                <Link href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Terms of Service
                </Link>
                <Link href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}