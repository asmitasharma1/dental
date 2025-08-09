"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Quote, Instagram, MessageCircle, ArrowRight, Heart, Clock, Shield, Award, Users, ChevronRight, ChevronLeft, Sparkles, Star, Microscope, Monitor, Home, DollarSign, Music, CreditCard } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const whyUsReasons = [
  {
    icon: Award,
    title: "Certified Dental Surgeons",
    description: "Nepal Medical Council and NDA certified Dentists with years of professional experience",
  },
  {
    icon: Microscope,
    title: "Evidence Based Practice",
    description: "Integration of best scientific evidence with clinical expertise and patient values",
  },
  {
    icon: Shield,
    title: "Assurance of Quality",
    description: "Patient's Satisfaction is our highest priority & we give 100% to ensure best Quality of Treatment",
  },
  {
    icon: Monitor,
    title: "Modern Equipments",
    description: "State of the art, high quality portable instruments for utmost efficiency & care",
  },
  {
    icon: Home,
    title: "Professional Home Services",
    description: "One of the 1st institutes in Nepal to provide home treatments with great success",
  },
  {
    icon: DollarSign,
    title: "Affordable and Accessible",
    description: "Our services are affordable & accessible through online booking or social media platforms",
  },
  {
    icon: Music,
    title: "Sound & Hassle Free Experience",
    description: "Beverages & Calm music at our Reception will help you relax before & after the treatment",
  },
  {
    icon: CreditCard,
    title: "Flexible Payment Options",
    description: "We offer all kinds of Digital Payment options. EMI payment is available for local residents",
  },
]

const achievements = [
  { number: "500+", label: "Happy Patients", icon: Users },
  { number: "10+", label: "Years Experience", icon: Award },
  { number: "100%", label: "Safe Procedures", icon: Shield },
  { number: "4.9/5", label: "Patient Rating", icon: Star },
]

const topServices = [
  {
    title: "Professional Teeth Cleaning & Scaling",
    description: "Deep cleaning to remove plaque and tartar buildup for optimal oral health",
    image: "/images/MPS__40.jpg",
    link: "/services/teeth-cleaning",
  },
  {
    title: "Dental Fillings & Cavity Treatment",
    description: "High-quality composite fillings to restore damaged teeth",
    image: "/images/MPS__40.jpg",
    link: "/services/dental-fillings",
  },
  {
    title: "Professional Teeth Whitening",
    description: "Advanced whitening treatments for a brighter, confident smile",
    image: "/images/MPS__40.jpg",
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

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/MPS__5.webp"
          alt="Background"
          fill
          className="object-cover blur-sm"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-white/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar isHomePage={true} />

        <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
          <div className="fixed left-4 md:left-6 top-1/2 transform -translate-y-1/2 z-40 flex flex-col space-y-3 md:space-y-4">
            <a
              href="https://www.instagram.com/smilebydrkareen_dentalclinic/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm shadow-lg rounded-full flex items-center justify-center hover:bg-teal-50 transition-all duration-300 hover:scale-105 md:hover:scale-110"
            >
              <Instagram className="h-5 w-5 md:h-6 md:w-6 text-teal-600" />
            </a>
            <a
              href="https://www.tiktok.com/@smilebydrkareen_dental"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-all duration-300 hover:scale-105 md:hover:scale-110"
            >
              <div className="w-5 h-5 md:w-6 md:h-6 bg-gray-800 rounded-sm flex items-center justify-center">
                <span className="text-white text-xs font-bold">T</span>
              </div>
            </a>
            <a
              href="https://wa.me/9851359775"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm shadow-lg rounded-full flex items-center justify-center hover:bg-teal-50 transition-all duration-300 hover:scale-105 md:hover:scale-110"
            >
              <MessageCircle className="h-5 w-5 md:h-6 md:w-6 text-teal-600" />
            </a>
            <a
              href="mailto:smilebydrkareen@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm shadow-lg rounded-full flex items-center justify-center hover:bg-teal-50 transition-all duration-300 hover:scale-105 md:hover:scale-110"
            >
              <Mail className="h-5 w-5 md:h-6 md:w-6 text-teal-600" />
            </a>
          </div>

          <div className="absolute top-10 left-10 w-8 h-10 bg-white/20 rounded-t-full rounded-b-sm transform rotate-12 blur-sm animate-pulse"></div>
          <div className="absolute top-32 right-20 w-6 h-8 bg-teal-200/30 rounded-t-full rounded-b-sm transform -rotate-45 blur-sm animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-1/4 w-10 h-12 bg-gray-200/20 rounded-t-full rounded-b-sm transform rotate-45 blur-sm animate-pulse delay-2000"></div>
          <div className="absolute bottom-1/4 right-1/3 animate-spin" style={{ animationDuration: "8s" }}>
            <Sparkles className="h-8 w-8 text-teal-300/30" />
          </div>
          <div className="absolute bottom-1/3 left-16">
            <Heart className="h-6 w-6 text-teal-300/40 animate-pulse" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-gray-800 leading-tight drop-shadow-2xl">
                  YOUR SMILE
                </h1>
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-teal-700 leading-tight drop-shadow-2xl">
                  NEEDS EXPERT
                </h2>
                <h3 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-gray-800 leading-tight drop-shadow-2xl">
                  CARE
                </h3>
              </div>
              <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed drop-shadow-lg font-semibold mt-8">
                Experience exceptional dental care with our team of expert surgeons using cutting-edge technology
              </p>
              <div className="flex justify-center mt-8">
                <Link href="/book-now">
                  <Button className="bg-teal-700 hover:bg-teal-800 text-white px-10 py-4 text-lg rounded-full shadow-2xl transition-all duration-300 hover:scale-105">
                    Book An Appointment
                  </Button>
                </Link>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/30 max-w-xl mx-auto mt-8">
                <div className="flex items-center justify-center space-x-4 text-white">
                  <Clock className="h-6 w-6 text-teal-600" />
                  <div className="text-center">
                    <p className="font-semibold text-teal-700">Open 7 Days a Week</p>
                    <p className="text-base text-teal-700">Monday - Sunday: 10:00 AM - 6:00 PM</p>
                    <p className="text-base text-teal-700">Saturday: 10:00 AM - 3:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="relative py-20">
          <div className="absolute inset-0 z-0">
            <Image
              src={topServices[currentService].image || "/placeholder.svg"}
              alt={topServices[currentService].title}
              fill
              className="object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-white/20 bg-gradient-to-t from-black/10 to-transparent"></div>
          </div>

          <div className="relative z-10 container mx-auto px-4 ipad-pro-adjust">
            <div className="text-center mb-12">
              <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
                Our Services
              </h2>
              <p className="text-xl text-gray-900 max-w-3xl mx-auto">
                Comprehensive dental care with state-of-the-art technology and personalized treatment plans
              </p>
              <div className="w-32 h-1 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full mx-auto mt-4"></div>
            </div>

            <div className="relative flex items-center justify-center mb-12">
              <button 
                onClick={prevService}
                className="absolute left-0 z-10 p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl"
                aria-label="Previous service"
              >
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="w-full max-w-4xl text-center mx-8">
                <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-6 shadow-lg">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 drop-shadow-lg">{topServices[currentService].title}</h3>
                  <p className="text-lg text-gray-800 leading-relaxed drop-shadow-md font-medium">{topServices[currentService].description}</p>
                </div>
              </div>

              <button 
                onClick={nextService}
                className="absolute right-0 z-10 p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl"
                aria-label="Next service"
              >
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="flex justify-center space-x-2 mb-12">
              {topServices.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentService ? "bg-teal-600" : "bg-gray-300"}`}
                  onClick={() => setCurrentService(index)}
                />
              ))}
            </div>

            <div className="max-w-4xl mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-8 mt-20">
                <Link href="/services" className="block">
                  <Card className="bg-white/20 backdrop-blur-md border border-white/30 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 group hover:bg-white/25 lg:-translate-x-48 cursor-pointer">
                    <CardContent className="p-0">
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="text-3xl font-bold text-gray-900 drop-shadow-lg">Dental Care</h3>
                        <div className="w-20 h-20 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 border border-white/40">
                          <Image src="/images/dental-instruments.avif" alt="Dental care" width={30} height={30} />
                        </div>
                      </div>
                      <ul className="space-y-4 text-gray-800">
                        <li className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full"></div>
                          <span className="drop-shadow font-medium">Professional Teeth Cleaning & Scaling</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full"></div>
                          <span className="drop-shadow font-medium">Dental Fillings & Cavity Treatment</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full"></div>
                          <span className="drop-shadow font-medium">Oral Health Consultation</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/services" className="block">
                  <Card className="bg-white/20 backdrop-blur-md border border-white/30 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 group hover:bg-white/25 lg:translate-x-48 cursor-pointer">
                    <CardContent className="p-0">
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="text-3xl font-bold text-gray-900 drop-shadow-lg">Aesthetic Care</h3>
                        <div className="w-20 h-20 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 border border-white/40">
                          <Image src="/images/dental-instruments.avif" alt="Aesthetic care" width={30} height={30} />
                        </div>
                      </div>
                      <ul className="space-y-4 text-gray-800">
                        <li className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full"></div>
                          <span className="drop-shadow font-medium">Premium Porcelain Veneers</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full"></div>
                          <span className="drop-shadow font-medium">Professional Teeth Whitening</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full"></div>
                          <span className="drop-shadow font-medium">Invisalign Clear Aligners</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mt-20">
              <Link href="/services" className="block">
                <Card className="bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-3xl text-center shadow-lg hover:shadow-2xl transition-all duration-500 group hover:bg-white/25 cursor-pointer">
                  <CardContent className="p-0">
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-white/40 backdrop-blur-sm rounded-full mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-white/50">
                        <Image src="/images/dental-instruments.avif" alt="Restorative" width={32} height={32} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 drop-shadow-lg">Restorative Dentistry</h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/services" className="block">
                <Card className="bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-3xl text-center shadow-lg hover:shadow-2xl transition-all duration-500 group hover:bg-white/25 cursor-pointer">
                  <CardContent className="p-0">
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-white/40 backdrop-blur-sm rounded-full mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-white/50">
                        <Image src="/images/dental-instruments.avif" alt="Pediatric" width={32} height={32} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 drop-shadow-lg">Pediatric Dentistry</h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/services" className="block">
                <Card className="bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-3xl text-center shadow-lg hover:shadow-2xl transition-all duration-500 group hover:bg-white/25 cursor-pointer">
                  <CardContent className="p-0">
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-white/40 backdrop-blur-sm rounded-full mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-white/50">
                        <Image src="/images/dental-instruments.avif" alt="Implants" width={32} height={32} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 drop-shadow-lg">Dental Implants</h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>

            <div className="text-center mt-12">
              <Link href="/services">
                <Button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  More Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-24 relative">
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <div className="container mx-auto px-4 relative z-10">
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
                        We believe everyone deserves a beautiful smile. Our comprehensive approach focuses on
                        prevention, treatment, and long-term oral health.
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
          </div>
        </section>

        <section className="py-24 relative">
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-20">
                <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 to-teal-700 bg-clip-text text-transparent mb-6">
                  Why Choose Dr. Kareen's Clinic?
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Discover what makes us the preferred choice for dental care in Lalitpur. Our commitment to excellence,
                  advanced technology, and patient satisfaction sets us apart.
                </p>
                <div className="w-32 h-1 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full mx-auto mt-8"></div>
              </div>
              <div className="grid md:grid-cols-4 gap-6 mb-20">
                {achievements.map((achievement, index) => {
                  const IconComponent = achievement.icon
                  return (
                    <Card
                      key={index}
                      className="bg-white/80 backdrop-blur-sm border-0 p-6 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <CardContent className="p-0">
                        <IconComponent className="h-8 w-8 text-teal-600 mx-auto mb-3" />
                        <h3 className="text-3xl font-bold text-gray-900 mb-1">{achievement.number}</h3>
                        <p className="text-gray-600 font-medium">{achievement.label}</p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 to-teal-50/90 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-teal-700 bg-clip-text text-transparent mb-6">
                  What Our Patients Say
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full mx-auto"></div>
              </div>

              <div className="relative max-w-4xl mx-auto">
                <Card className="bg-gradient-to-br from-teal-600 to-gray-700 text-white p-8 rounded-3xl shadow-2xl">
                  <CardContent className="p-0 text-center">
                    <Quote className="h-12 w-12 mx-auto mb-6 opacity-80" />
                    <p className="text-xl mb-6 leading-relaxed">{testimonials[currentTestimonial].quote}</p>
                    <div className="space-y-2">
                      <p className="font-bold text-lg">{testimonials[currentTestimonial].name}</p>
                      <p className="text-gray-200">{testimonials[currentTestimonial].service}</p>
                    </div>

                    <div className="flex items-center justify-center space-x-6 mt-8">
                      <button
                        onClick={prevTestimonial}
                        className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110 shadow-lg"
                        aria-label="Previous testimonial"
                      >
                        <ChevronLeft className="h-6 w-6 text-white" />
                      </button>

                      <div className="flex space-x-2">
                        {testimonials.map((_, index) => (
                          <button
                            key={index}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentTestimonial ? "bg-white" : "bg-white/40"}`}
                            onClick={() => setCurrentTestimonial(index)}
                          />
                        ))}
                      </div>

                      <button
                        onClick={nextTestimonial}
                        className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110 shadow-lg"
                        aria-label="Next testimonial"
                      >
                        <ChevronRight className="h-6 w-6 text-white" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}