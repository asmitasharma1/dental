"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Award, Shield, Heart, Menu, X, Linkedin, MapPin, Phone, Mail, Clock, ArrowUp } from "lucide-react"
import Image from "next/image"
import { useState, useEffect, useCallback } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

interface Doctor {
  id: number
  name: string
  position: string
  degree: string
  nmc_number: string
  linkedin_url: string
  image_url: string
  specialties: string[]
  is_active: number
  created_at: string
  updated_at: string
}

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)


  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("/api/doctors")
        if (response.ok) {
          const data = await response.json()
          const parsedData = data.map((doctor: any) => {
            let specialties: string[] = []
            try {
              specialties = JSON.parse(doctor.specialties || '[]')
              if (!Array.isArray(specialties)) {
                console.warn(`Invalid specialties format for doctor ${doctor.id}:`, doctor.specialties)
                specialties = [doctor.specialties] // Fallback to single string as array
              }
            } catch (error) {
              console.error(`Error parsing specialties for doctor ${doctor.id}:`, error)
              specialties = [doctor.specialties || ''] // Fallback to single string or empty array
            }
            return {
              ...doctor,
              specialties
            }
          })
          setDoctors(parsedData)
        }
      } catch (error) {
        console.error("Error fetching doctors:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchDoctors()
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* About Clinic Section */}
      <section
  id="clinic"
  className="py-24 bg-gradient-to-br from-teal-50 via-white to-cyan-50 relative overflow-hidden"
>
  <div className="container mx-auto px-4">
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      {/* Left Content */}
      <div className="space-y-8 text-center lg:text-left">
        <div className="space-y-6">
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 to-teal-700 bg-clip-text text-transparent">
            About Our Clinic
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed text-justify">
            Dr. Kareen's Dental Clinic in Lalitpur is a state-of-the-art facility dedicated to providing
            comprehensive dental care with the latest technology and a patient-centered approach.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-x-0 sm:space-x-4">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mb-3 sm:mb-0">
              <Award className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Excellence in Care</h3>
              <p className="text-gray-600">
                Our clinic has been serving the Lalitpur community for over 10 years, building a reputation for
                exceptional dental care and patient satisfaction.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-x-0 sm:space-x-4">
            <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0 mb-3 sm:mb-0">
              <Shield className="h-6 w-6 text-cyan-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Advanced Technology</h3>
              <p className="text-gray-600">
                We use cutting-edge dental equipment and the latest techniques to ensure precise, comfortable, and
                effective treatments for all our patients.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-x-0 sm:space-x-4">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mb-3 sm:mb-0">
              <Heart className="h-6 w-6 text-pink-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Patient-Centered Approach</h3>
              <p className="text-gray-600">
                Every treatment plan is customized to meet individual needs, ensuring optimal results and patient
                comfort throughout the entire process.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className="relative flex justify-center lg:justify-end">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-200/30 to-cyan-200/30 rounded-3xl blur-2xl transform -rotate-6"></div>
        <Image
          src="/images/MPS__3.webp"
          alt="Dr. Kareen's Clinic Interior"
          width={500}
          height={600}
          placeholder="blur"
          blurDataURL="/images/MPS__3-small.webp" 
          className="rounded-1xl shadow-2xl relative z-10 hover:scale-105 transition-transform duration-500"
        />
      </div>
    </div>
  </div>
      </section>


      {/* Our Doctors Section */}
      <section
        id="doctors"
        className="py-24 bg-gradient-to-br from-teal-50 via-white to-cyan-50 relative overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 to-teal-700 bg-clip-text text-transparent mb-6">
              Our Doctors
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet our team of experienced dental professionals committed to your oral health
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full mx-auto mt-8"></div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors.map((doctor) => (
                <Card
                  key={doctor.id}
                  className="bg-gradient-to-br from-white to-teal-50 border-0 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 group overflow-hidden"
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={doctor.image_url || "/placeholder.svg"}
                        alt={doctor.name}
                        fill
                        className="object-cover object-top group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      {doctor.specialties.length > 0 && (
                        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="flex flex-wrap gap-2">
                            {doctor.specialties.slice(0, 2).map((specialty, idx) => (
                              <span key={idx} className="bg-teal-600/90 text-white px-3 py-1.5 rounded-full text-xs font-medium">
                                {specialty}
                              </span>
                            ))}
                            {doctor.specialties.length > 2 && (
                              <span className="bg-gray-600/90 text-white px-3 py-1.5 rounded-full text-xs font-medium">
                                +{doctor.specialties.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
                        <p className="text-teal-600 font-medium">{doctor.position}</p>
                      </div>

                      <div className="space-y-2 text-sm text-gray-600">
                        <p>
                          <span className="font-medium">Degree:</span> {doctor.degree}
                        </p>
                        <p>
                          <span className="font-medium">NMC Number:</span> {doctor.nmc_number}
                        </p>
                      </div>

                      {doctor.linkedin_url && (
                        <div className="pt-4">
                          <a
                            href={doctor.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 text-teal-600 hover:text-teal-700 transition-colors"
                          >
                            <Linkedin className="h-4 w-4" />
                            <span className="text-sm font-medium">LinkedIn Profile</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
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
    </div >
  )
}