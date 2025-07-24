"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Shield, Heart, Users, Clock, Star, CheckCircle, Menu, X, MapPin, Phone, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const whyUsReasons = [
  {
    icon: Award,
    title: "Expert Dental Professionals",
    description:
      "Our team consists of highly qualified dentists with years of experience and specialized training in various dental fields.",
    color: "from-teal-100 to-teal-200",
    iconColor: "text-teal-600",
  },
  {
    icon: Shield,
    title: "State-of-the-Art Technology",
    description:
      "We use the latest dental equipment and advanced techniques to ensure precise, comfortable, and effective treatments.",
    color: "from-teal-100 to-teal-200",
    iconColor: "text-teal-600",
  },
  {
    icon: Heart,
    title: "Patient-Centered Care",
    description:
      "Every treatment plan is personalized to meet your unique needs, ensuring optimal results and maximum comfort.",
    color: "from-teal-100 to-teal-200",
    iconColor: "text-teal-600",
  },
  {
    icon: Users,
    title: "Comprehensive Services",
    description:
      "From routine cleanings to complex procedures, we offer a full range of dental services under one roof.",
    color: "from-teal-100 to-teal-200",
    iconColor: "text-teal-600",
  },
  {
    icon: Clock,
    title: "Convenient Hours",
    description:
      "Open 7 days a week with flexible scheduling to accommodate your busy lifestyle and urgent dental needs.",
    color: "from-teal-100 to-teal-200",
    iconColor: "text-teal-600",
  },
  {
    icon: Star,
    title: "Proven Track Record",
    description: "With over 500 satisfied patients and a 4.9/5 rating, our commitment to excellence speaks for itself.",
    color: "from-teal-100 to-teal-200",
    iconColor: "text-teal-600",
  },
]

const achievements = [
  { number: "500+", label: "Happy Patients", icon: Users },
  { number: "10+", label: "Years Experience", icon: Award },
  { number: "100%", label: "Safe Procedures", icon: Shield },
  { number: "4.9/5", label: "Patient Rating", icon: Star },
]

export default function WhyUsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
                  alt="Dr. Kareem's Clinic Logo"
                  width={150}
                  height={60}
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

              <Link
                href="/about"
                className="text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium relative group"
              >
                About Us
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
              </Link>

              <Link
                href="/services"
                className="text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium relative group"
              >
                Price/Service
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
              </Link>

              <span className="text-teal-600 font-medium">Why Us</span>
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
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-teal-50 via-white to-cyan-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 to-teal-700 bg-clip-text text-transparent mb-6">
              Why Choose Dr. Kareem's Clinic?
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover what makes us the preferred choice for dental care in Lalitpur. Our commitment to excellence,
              advanced technology, and patient satisfaction sets us apart.
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full mx-auto mt-8"></div>
          </div>

          {/* Achievements Stats */}
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
      </section>

      {/* Why Us Reasons */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-teal-700 bg-clip-text text-transparent mb-6">
              Our Unique Value Propositions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Here's what makes Dr. Kareem's Clinic the right choice for your dental health
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyUsReasons.map((reason, index) => {
              const IconComponent = reason.icon
              return (
                <Card
                  key={index}
                  className={`bg-gradient-to-br ${reason.color} border-0 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 group`}
                >
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <IconComponent className={`h-8 w-8 ${reason.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{reason.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{reason.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-teal-700 bg-clip-text text-transparent">
                  Our Commitment to Excellence
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  At Dr. Kareem's Clinic, we don't just treat teeth – we care for people. Our holistic approach ensures
                  that every patient receives personalized attention and the highest quality care.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Modern Facilities</h4>
                    <p className="text-gray-600">
                      State-of-the-art equipment and sterile environment for your safety and comfort.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Transparent Pricing</h4>
                    <p className="text-gray-600">
                      No hidden costs or surprise bills. We provide clear, upfront pricing for all treatments.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Emergency Care</h4>
                    <p className="text-gray-600">
                      Available for urgent dental needs with same-day appointments when possible.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Follow-up Care</h4>
                    <p className="text-gray-600">
                      Comprehensive aftercare and regular check-ups to maintain your oral health.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Link href="/book-now">
                  <Button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    Experience the Difference
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-200/30 to-cyan-200/30 rounded-3xl blur-2xl transform rotate-6"></div>
              <Image
                src="/placeholder.svg?height=600&width=500&text=Happy+Patient+Testimonial"
                alt="Happy patients at Dr. Kareem's Clinic"
                width={500}
                height={600}
                className="rounded-3xl shadow-2xl relative z-10 hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
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
                <Link href="/about" className="block text-gray-300 hover:text-teal-400 transition-colors">
                  About Us
                </Link>
                <Link href="/services" className="block text-gray-300 hover:text-teal-400 transition-colors">
                  Our Services
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
