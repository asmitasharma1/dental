"use client"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Mail,
  Quote,
  Instagram,
  MessageCircle,
  ArrowRight,
  Heart,
  Clock,
  Shield,
  Phone,
  Award,
  Users,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Star,
  Microscope,
  Monitor,
  Home,
  DollarSign,
  Music,
  CreditCard,
  ArrowUp,
  Calendar,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

interface Testimonial {
  id: number
  name: string
  service: string
  quote: string
  rating: number
  is_active: boolean
  created_at: string
}

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
  { number: "5000+", label: "Happy Patients", icon: Users },
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
// const testimonials = [
//   {
//     quote:
//       "Dr. Kareen and her team provided exceptional care during my dental implant procedure. The results exceeded my expectations!",
//     name: "Priya Shrestha",
//     service: "Dental Implants",
//   },
//   {
//     quote: "My children love coming here! The pediatric dentistry team makes every visit comfortable and fun for kids.",
//     name: "Yogyata Neupane",
//     service: "Pediatric Dentistry",
//   },
//   {
//     quote:
//       "The restorative work done on my teeth was amazing. I can smile confidently again thanks to Dr. Kareen's expertise.",
//     name: "Sahas Maharjan",
//     service: "Restorative Dentistry",
//   },
// ]
export default function HomePage() {
  const [currentService, setCurrentService] = useState(0)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/testimonials/public")
        if (response.ok) {
          const data = await response.json()
          setTestimonials(data)
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error)
        // Fallback to static testimonials if API fails
        setTestimonials([
          {
            id: 1,
            quote:
              "Dr. Kareen and her team provided exceptional care during my dental implant procedure. The results exceeded my expectations!",
            name: "Priya Shrestha",
            service: "Dental Implants",
            rating: 5,
            is_active: true,
            created_at: new Date().toISOString(),
          },
          {
            id: 2,
            quote:
              "My children love coming here! The pediatric dentistry team makes every visit comfortable and fun for kids.",
            name: "Yogyata Neupane",
            service: "Pediatric Dentistry",
            rating: 5,
            is_active: true,
            created_at: new Date().toISOString(),
          },
          {
            id: 3,
            quote:
              "The restorative work done on my teeth was amazing. I can smile confidently again thanks to Dr. Kareen's expertise.",
            name: "Sahas Maharjan",
            service: "Restorative Dentistry",
            rating: 5,
            is_active: true,
            created_at: new Date().toISOString(),
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  const handleScroll = useCallback(() => {
    const windowScrollY = window.scrollY || window.pageYOffset
    const documentScrollTop = document.documentElement.scrollTop
    const bodyScrollTop = document.body.scrollTop

    // Use the maximum of all scroll positions
    const scrollTop = Math.max(windowScrollY, documentScrollTop, bodyScrollTop)

    if (scrollTop > 100) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [])
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

    // Check initial position
    handleScroll()

    return () => {
      removeScrollListeners()
    }
  }, [handleScroll])
  const scrollToTop = () => {
    // Try multiple scroll methods for better compatibility
    try {
      // Method 1: Smooth scroll
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      })

      // Method 2: Fallback for browsers that don't support smooth scroll
      setTimeout(() => {
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
        window.pageYOffset = 0
      }, 100)
    } catch (error) {
      // Method 3: Instant scroll fallback
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      window.scrollTo(0, 0)
    }
  }

  useEffect(() => {
    if (testimonials.length === 0) return

    const serviceInterval = setInterval(() => {
      setCurrentService((prev) => (prev + 1) % topServices.length)
    }, 8000)

    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 10000)

    return () => {
      clearInterval(serviceInterval)
      clearInterval(testimonialInterval)
    }
  }, [testimonials.length])

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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }
  const getDisplayedTestimonials = () => {
    const displayed = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentTestimonial + i) % testimonials.length;
      displayed.push(testimonials[index]);
    }
    return displayed;
  };


  return (
    <div className="min-h-screen relative">
      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
        body {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        body::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <Navbar isHomePage={true} />
      {/* Hero Section with Background */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image - Keep as fixed for navbar transparency */}
        <div className="fixed inset-0 z-0">
          <Image src="/images/MPS__5.webp" alt="Background" fill className="object-cover blur-sm" priority />
          <div className="absolute inset-0 bg-white/30"></div>
        </div>
        {/* Social Media Icons */}
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
            href="https://mail.google.com/mail/?view=cm&to=smilebydrkareen@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm shadow-lg rounded-full flex items-center justify-center hover:bg-teal-50 transition-all duration-300 hover:scale-105 md:hover:scale-110"
          >
  <Mail className="h-5 w-5 md:h-6 md:w-6 text-teal-600" />
</a>

        </div>
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-8 h-10 bg-white/20 rounded-t-full rounded-b-sm transform rotate-12 blur-sm animate-pulse"></div>
        <div className="absolute top-32 right-20 w-6 h-8 bg-teal-200/30 rounded-t-full rounded-b-sm transform -rotate-45 blur-sm animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-10 h-12 bg-gray-200/20 rounded-t-full rounded-b-sm transform rotate-45 blur-sm animate-pulse delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 animate-spin" style={{ animationDuration: "8s" }}>
          <Sparkles className="h-8 w-8 text-teal-300/30" />
        </div>
        <div className="absolute bottom-1/3 left-16">
          <Heart className="h-6 w-6 text-teal-300/40 animate-pulse" />
        </div>
        {/* Hero Content */}
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
                <Button className="bg-teal-700 hover:bg-teal-800 text-white px-10 py-4 text-lg rounded-full shadow-2xl hover:shadow-xl transition-all duration-300">
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
      {/* Services Section */}
      <section id="services" className="relative py-20 bg-white">
        <div className="absolute inset-0 z-0">
          <Image
            src={topServices[currentService].image || "/placeholder.svg"}
            alt={topServices[currentService].title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-white/20 bg-gradient-to-t from-black/10 to-transparent"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4">
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
                <h3 className="text-3xl font-bold text-gray-900 mb-4 drop-shadow-lg">
                  {topServices[currentService].title}
                </h3>
                <p className="text-lg text-gray-800 leading-relaxed drop-shadow-md font-medium">
                  {topServices[currentService].description}
                </p>
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
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentService ? "bg-teal-600" : "bg-gray-300"
                  }`}
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
      {/* Mission Section */}
      <section className="py-24 relative bg-white">
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 to-teal-700 bg-clip-text text-transparent mb-6">
                Dr. Kareen's Approach
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-teal-400 to-blue-400 mx-auto mt-6 rounded-full"></div>
            </div>
            <div className="grid lg:grid-cols-2 gap-16 items-center text-center md:text-left">
              <div className="relative group">
                <Card className="bg-gradient-to-br from-teal-50 to-gray-50 border-0 p-12 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:border-4 group-hover:border-teal-400 relative overflow-hidden border-glow">
                  <CardContent className="p-0">
                    <div className="space-y-6 transition-opacity duration-300 group-hover:opacity-0">
                      <p className="text-teal-600 text-lg font-medium">"What makes my practice special?"</p>
                      <h3 className="text-4xl font-bold text-gray-900">
                        Providing{" "}
                        <span className="bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent">
                          personalized, gentle care
                        </span>{" "}
                        with advanced techniques
                      </h3>
                      <p className="text-gray-600 text-lg text-justify">
                        I believe every patient deserves exceptional care tailored to their unique needs. My approach
                        combines cutting-edge technology with compassionate treatment to ensure your comfort and optimal
                        results.
                      </p>
                    </div>
                    <div className="absolute inset-0 p-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-teal-700 text-lg font-medium leading-relaxed text-justify">
                        As a Senior Dental Surgeon, I don’t just focus on treating diseases – I’m passionate about preventing them. Seeing young people losing their teeth at an early age and going through root canal treatment, bridges, and implants is heartbreaking, and many of these cases are preventable with the right lifestyle, dietary choices, proper brushing technique, good oral habits, and regular 6-month follow-ups. Awareness and counseling are the first basic but most important steps in preventing dental disease, which is still neglected in Nepal's health system.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Dr. Kareen's Photo Side */}
              <div className="relative">
                <div className="relative bg-gradient-to-br from-teal-100 to-cyan-100 p-6 rounded-3xl shadow-2xl">
                  <div className="relative overflow-hidden rounded-2xl bg-white p-2 shadow-xl">
                    <div className="relative h-96 md:h-[500px] overflow-hidden rounded-xl">
                      <img src="/images/kareen.webp" alt="Dr. Kareen" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
                    </div>
                  </div>

                  {/* Doctor info card */}
                  <div className="absolute -bottom-4 -left-4 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-teal-500 rounded-full animate-pulse"></div>
                      <div>
                        <p className="text-sm text-gray-500">Available for consultations</p>
                        <p className="font-semibold text-gray-900">Dr. Kareen</p>
                      </div>
                    </div>
                  </div>

                  {/* Decorative badge */}
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                    Expert Care
                  </div>
                </div>
              </div>

              {/* Methods Grid */}
              <div className="lg:col-span-2 mt-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {missionValues.map((value, index) => {
                    const IconComponent = value.icon;
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
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative bg-[radial-gradient(circle_at_center,#f7fdfd_0%,#e8f6f6_50%,#f0fcfc_100%)]">
        <div className="relative z-10">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 to-teal-700 bg-clip-text text-transparent mb-6">
                Why Choose Dr. Kareen's Clinic?
                <div className="w-32 h-1 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full mx-auto mt-8"></div>
              </h1>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-8">
                <p className="text-lg text-gray-600 max-w-3xl leading-relaxed text-justify">
                  At Dr. Kareen Clinic, we believe dental care should be comfortable, clear, and
                  focused on what’s best for you. We take the time to explain your options, use
                  modern tools to make treatments gentler, and never rush appointments. Whether
                  it’s a simple check-up or something more complex, our goal is to help you feel
                  at ease and leave with a healthier, happier smile.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => {
                    const IconComponent = achievement.icon;
                    return (
                      <Card
                        key={index}
                        className="bg-white/80 backdrop-blur-sm border-0 p-4 rounded-xl text-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                      >
                        <CardContent className="p-0">
                          <IconComponent className="h-6 w-6 text-teal-600 mx-auto mb-2" />
                          <h3 className="text-2xl font-bold text-gray-900 mb-1">{achievement.number}</h3>
                          <p className="text-gray-600 text-sm font-medium">{achievement.label}</p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
              <div className="flex justify-center items-center">
                <video
                  className="w-full max-w-[400px] h-[500px] md:h-[500px] rounded-2xl shadow-lg object-cover"
                  controls
                  preload="metadata"
                  playsInline
                  muted
                >
                  <source src="/images/video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative bg-white">
  <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 to-teal-50/90 backdrop-blur-sm"></div>
  <div className="relative z-10">
    <div className="container mx-auto px-4 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-teal-700 bg-clip-text text-transparent mb-6">
          What Our Patients Say
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full mx-auto"></div>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
          <p className="text-gray-500 mt-2">Loading testimonials...</p>
        </div>
      ) : testimonials.length > 0 ? (
        <div className="relative max-w-6xl mx-auto flex items-center">
          <button
            onClick={prevTestimonial}
            className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center hover:bg-teal-700 transition-all duration-300 hover:scale-110 shadow-lg mr-4"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow">
            {getDisplayedTestimonials().map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    {renderStars(testimonial.rating)}
                  </div>
                  <Quote className="h-6 w-6 text-teal-600 opacity-80" />
                </div>
                <div className="flex-grow">
                  <p className="text-gray-700 text-base leading-relaxed mb-4 line-clamp-4">
                    {testimonial.quote}
                  </p>
                </div>
                <div className="border-t border-gray-200 pt-4 mt-auto">
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm text-justify">{testimonial.service}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={nextTestimonial}
            className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center hover:bg-teal-700 transition-all duration-300 hover:scale-110 shadow-lg ml-4"
            aria-label="Next testimonials"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <p>No testimonials available at the moment.</p>
        </div>
      )}
      <div className="text-center mt-8">
        <a
          href="https://www.google.com/search?sca_esv=4978fba7b0bac1f0&rlz=1C1CHBD_enNP958NP958&biw=1536&bih=730&sxsrf=AE3TifPVUO1oRlbNP78cpFRRaK4onb_07w:1755073144495&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-EwZWVuYW0g8KF2vPu6clfA4Tc01fZMFebuAK3ewteCeJdi93Q--PKbfuKh7rd07C4XQp7o8Av51vqilN609w1zKXmLHbGIi09AdzJYdAYX-UNB49pKWx_i_pSu36LwV_o1fQkb0%3D&q=Smile+by+Dr+Kareen+-+Dental+Clinic+Reviews&sa=X&ved=2ahUKEwi0nNT6rIePAxXv4DgGHTQyEg0Q0bkNegQIHxAE"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-teal-700 text-white font-medium rounded-lg hover:bg-teal-800 transition-colors shadow-md"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google Logo"
            className="h-5 mr-2"
          />
          More on Google Reviews
        </a>
      </div>
    </div>
  </div>
</section>

      <section className="py-12 relative bg-teal-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Get Your FREE Dental Consultation Today</h2>
          <p className="text-lg mb-6">Achieve a healthy, confident smile with our expert team. Schedule your free consultation today to discuss your dental needs.</p>
          <div className="flex justify-center items-center space-x-4">
            <a
              href="tel:+977-9851359775"
              className="flex items-center gap-2 px-6 py-3 bg-teal-700 rounded-full text-base font-semibold hover:bg-teal-750 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
            >
              <Phone className="h-4 w-4" />
              Call: +977-9851359775
            </a>
            <a
              href="https://wa.me/9851359775"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-white text-teal-900 rounded-full text-base font-semibold hover:bg-teal-100 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
            >
              <MessageCircle className="h-4 w-4" />
              Message on WhatsApp
            </a>
          </div>
        </div>
      </section>


      {/* Location Section */}
      <section className="bg-white py-20 px-6 relative overflow-hidden">
        {/* Background Pattern Removed for Clean White */}
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-teal-600">Location</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-blue-400 mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Map Container */}
          <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-6 rounded-3xl shadow-2xl border border-teal-400/20 relative overflow-hidden group">
            {/* Animated Border */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-teal-400 via-blue-400 to-teal-400 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ padding: "2px" }}
            >
              <div className="bg-white rounded-3xl h-full w-full"></div>
            </div>

            <div className="relative z-10">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl overflow-hidden shadow-inner border border-slate-300 group-hover:shadow-teal-400/20 group-hover:shadow-2xl transition-all duration-500">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d220.83391289495006!2d85.31452701679683!3d27.675803989387717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1736a7e1d95f%3A0x562d6d11b052b9fe!2sSmile%20by%20Dr%20Kareen%20-%20Dental%20Clinic!5e0!3m2!1sne!2snp!4v1754719856531!5m2!1sne!2snp"
                  width="100%"
                  height="425px" // Smaller height
                  style={{
                    border: 0,
                    filter: "brightness(0.95) contrast(1.05) saturate(1.05)",
                  }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="transition-all duration-500 group-hover:scale-[1.02] group-hover:brightness-105"
                />
              </div>
            </div>
          </div>
        </div>
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
  )
}
