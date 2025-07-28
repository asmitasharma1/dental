"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Shield, Heart, Users, Clock, Star, CheckCircle, Menu, X, MapPin, Phone, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

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
      <Navbar />

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-teal-50 via-white to-cyan-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
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
              Here's what makes Dr. Kareen's Clinic the right choice for your dental health
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
                  At Dr. Kareen's Clinic, we don't just treat teeth – we care for people. Our holistic approach ensures
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
              <div className="absolute inset-0 bg-gradient-to-br from-teal-200/30 to-cyan-200/30 rounded-3xl  blur-2xl transform rotate-6"></div>
              <Image
                src="/images/MPS__6.jpg"
                alt="Happy patients at Dr. Kareen's Clinic"
                width={600}
                height={750}
                className="rounded-1xl shadow-2xl relative z-10 hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />

    </div>
  )
}
