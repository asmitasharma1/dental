"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Phone, Mail, MapPin, Clock, Menu, X, Calendar, User, MessageSquare } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import BookNowForm from "./book-now-form"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"


export default function BookNowPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
      <div className="min-h-screen bg-white">
        <Navbar />

      {/* Booking Section */}
      <section className="py-24 bg-gradient-to-br from-teal-50 via-white to-cyan-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-teal-700 bg-clip-text text-transparent mb-6">
              Book Your Appointment
            </h1>
            <p className="text-xl text-gray-600">
              Schedule your visit today and take the first step towards a healthier smile
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full mx-auto mt-6"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Booking Form */}
            <Card className="bg-white border-0 p-8 rounded-1xl shadow-2xl">
              <CardContent className="p-0">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-teal-600" />
                  </div>
                  <h3 className="text-1xl font-bold bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent">
                    Book Online Now
                  </h3>
                </div>

                <BookNowForm />
              </CardContent>
            </Card>

            {/* Map and Contact Info */}
            <div className="space-y-8">
              {/* Contact Information */}
              <Card className="bg-white border-0 p-8 rounded-1xl shadow-lg">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                        <Phone className="h-6 w-6 text-teal-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Phone</p>
                        <p className="text-gray-600">985-1359775</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                        <Mail className="h-6 w-6 text-cyan-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Email</p>
                        <p className="text-gray-600">smilebydrkareen@gmail.com</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-teal-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Address</p>
                        <p className="text-gray-600">Pulchowk Damkal, Lalitpur, Nepal</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center">
                        <Clock className="h-6 w-6 text-sky-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Hours</p>
                        <p className="text-gray-600">Mon-Sun: 9:00 AM - 8:00 PM</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Google Embedded Map */}
              <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-1xl overflow-hidden shadow-2xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.4324619938457!2d85.31550617492407!3d27.7348042242808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xae470c3861f9509f%3A0x6b9442455247ac3f!2sSmile%20360%20Dental%20Clinic!5e0!3m2!1sen!2snp!4v1753676757830!5m2!1sen!2snp"
                  width="100%"
                  height="525px"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}