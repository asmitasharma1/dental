"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Award,
  Shield,
  Users,
  Star,
  CheckCircle,
  Microscope,
  Monitor,
  Home,
  DollarSign,
  Music,
  CreditCard,
  ArrowUp,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import type { Variants } from "framer-motion"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
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

export default function WhyUsSection() {
  const [isVisible, setIsVisible] = useState(false)

  const handleScroll = useCallback(() => {
    const scrollTop = Math.max(
      window.scrollY || 0,
      document.documentElement.scrollTop || 0,
      document.body.scrollTop || 0
    )
    setIsVisible(scrollTop > 100)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-teal-50 via-white to-cyan-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100/50 bg-[size:40px_40px]" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            className="text-center mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 to-teal-700 bg-clip-text text-transparent mb-6">
              Why Choose Dr. Kareen&apos;s Clinic?
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover what makes us the preferred choice for dental care in Lalitpur. Our commitment to excellence,
              advanced technology, and patient satisfaction sets us apart.
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full mx-auto mt-8"></div>
          </motion.div>

          {/* Achievements Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-20">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon
              return (
                <motion.div
                  key={index}
                  custom={index}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Card className="bg-white/80 backdrop-blur-sm border-0 p-6 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-gradient-to-br hover:from-teal-50 hover:to-cyan-50">
                    <CardContent className="p-0">
                      <IconComponent className="h-8 w-8 text-teal-600 mx-auto mb-3" />
                      <h3 className="text-3xl font-bold text-gray-900 mb-1">{achievement.number}</h3>
                      <p className="text-gray-600 font-medium">{achievement.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Us Reasons */}
      <section className="py-24 bg-gradient-to-br from-teal-50 via-white to-cyan-50 relative">
        <div className="absolute top-0 left-0 w-40 h-40 bg-teal-200/30 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-cyan-200/40 blur-3xl rounded-full" />

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-teal-700 bg-clip-text text-transparent"
            >
              Our Expertise
            </motion.h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {whyUsReasons.map((reason, index) => {
              const IconComponent = reason.icon
              return (
                <motion.div
                  key={index}
                  custom={index}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-center p-6 hover:shadow-lg transition-all duration-300 rounded-xl bg-white hover:bg-gradient-to-br hover:from-teal-50 hover:to-cyan-50"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full flex items-center justify-center mb-6 mx-auto shadow-md hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 leading-tight">{reason.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{reason.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <motion.div
              className="space-y-8 text-center lg:text-left"
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-teal-700 bg-clip-text text-transparent">
                  Our Commitment to Excellence
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  At Dr. Kareen&apos;s Clinic, we don&apos;t just treat teeth – we care for people. Our holistic approach ensures
                  that every patient receives personalized attention and the highest quality care.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  {
                    title: "Modern Facilities",
                    desc: "State-of-the-art equipment and sterile environment for your safety and comfort.",
                  },
                  {
                    title: "Transparent Pricing",
                    desc: "No hidden costs or surprise bills. We provide clear, upfront pricing for all treatments.",
                  },
                  {
                    title: "Emergency Care",
                    desc: "Available for urgent dental needs with same-day appointments when possible.",
                  },
                  {
                    title: "Follow-up Care",
                    desc: "Comprehensive aftercare and regular check-ups to maintain your oral health.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex flex-col items-center lg:flex-row lg:items-start lg:space-x-4 text-center lg:text-left"
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="pt-6">
                <Link href="/book-now">
                  <Button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    Experience the Difference
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              className="relative flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-200/30 to-cyan-200/30 rounded-3xl blur-2xl transform rotate-6"></div>
              <Image
                src="/images/why.webp"
                alt="Happy patients at Dr. Kareen's Clinic"
                width={500}
                height={600}
                className="rounded-2xl shadow-2xl relative z-10 hover:scale-105 transition-transform duration-500 w-full h-auto max-w-md"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Scroll to Top Button */}
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-[9999] bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border-2 border-white/20"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </div>
  )
}
