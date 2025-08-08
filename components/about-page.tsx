"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Award, Shield, Heart, Menu, X, Linkedin, MapPin, Phone, Mail, Clock } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
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
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 to-teal-700 bg-clip-text text-transparent">
                  About Our Clinic
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Dr. Kareen's Dental Clinic in Lalitpur is a state-of-the-art facility dedicated to providing
                  comprehensive dental care with the latest technology and a patient-centered approach.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
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

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
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

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
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

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-200/30 to-cyan-200/30 rounded-3xl blur-2xl transform -rotate-6"></div>
              <Image
                src="/images/MPS__3.jpg"
                alt="Dr. Kareen's Clinic Interior"
                width={500}
                height={600}
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
    </div >
  )
}