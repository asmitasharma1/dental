"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { User, Mail, Phone, MessageSquare, CheckCircle } from "lucide-react"

export default function BookNowForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    serviceId: "",
    message: "",
    agreeToTerms: false,
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (!formData.agreeToTerms) {
      setError("Please agree to the terms and conditions")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSuccess(true)
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          preferredDate: "",
          preferredTime: "",
          serviceId: "",
          message: "",
          agreeToTerms: false,
        })
      } else {
        const data = await response.json()
        setError(data.error || "Failed to book appointment")
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  if (success) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Appointment Booked!</h3>
        <p className="text-gray-600 mb-6">
          Thank you for booking with us. We'll contact you soon to confirm your appointment.
        </p>
        <Button
          onClick={() => setSuccess(false)}
          className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white"
        >
          Book Another Appointment
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">{error}</div>}

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-gray-700 font-medium">
            First name *
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter your first name"
              className="pl-10 rounded-xl border-gray-200 focus:border-teal-500 focus:ring-teal-500 h-12"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-gray-700 font-medium">
            Last name *
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Enter your last name"
              className="pl-10 rounded-xl border-gray-200 focus:border-teal-500 focus:ring-teal-500 h-12"
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-700 font-medium">
          Email *
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            className="pl-10 rounded-xl border-gray-200 focus:border-teal-500 focus:ring-teal-500 h-12"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-gray-700 font-medium">
          Phone Number *
        </Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
            className="pl-10 rounded-xl border-gray-200 focus:border-teal-500 focus:ring-teal-500 h-12"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-gray-700 font-medium">Preferred Date and Time</Label>
        <div className="grid grid-cols-2 gap-4">
          <Input
            name="preferredDate"
            type="date"
            value={formData.preferredDate}
            onChange={handleInputChange}
            className="rounded-xl border-gray-200 focus:border-teal-500 focus:ring-teal-500 h-12"
          />
          <Input
            name="preferredTime"
            type="time"
            value={formData.preferredTime}
            onChange={handleInputChange}
            className="rounded-xl border-gray-200 focus:border-teal-500 focus:ring-teal-500 h-12"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="serviceId" className="text-gray-700 font-medium">
          Service Needed
        </Label>
        <select
          id="serviceId"
          name="serviceId"
          value={formData.serviceId}
          onChange={handleInputChange}
          className="w-full rounded-xl border-gray-200 focus:border-teal-500 focus:ring-teal-500 h-12 px-3"
        >
          <option value="">Select a service</option>
          <option value="1">Teeth Cleaning & Scaling</option>
          <option value="2">Dental Filling</option>
          <option value="3">Teeth Whitening</option>
          <option value="4">Porcelain Veneers</option>
          <option value="5">Dental Crowns</option>
          <option value="6">Dental Implants</option>
          <option value="7">Children's Dental Cleaning</option>
          <option value="8">Root Canal Treatment</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-gray-700 font-medium">
          Additional Message (Optional)
        </Label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Any specific concerns or requests..."
            rows={4}
            className="w-full pl-10 pt-3 rounded-xl border-gray-200 focus:border-teal-500 focus:ring-teal-500 resize-none"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="agreeToTerms"
          checked={formData.agreeToTerms}
          onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, agreeToTerms: checked as boolean }))}
          className="border-gray-300"
        />
        <Label htmlFor="agreeToTerms" className="text-sm text-gray-600">
          I agree to the terms and conditions and privacy policy
        </Label>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white py-4 rounded-xl text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        {loading ? "Booking Appointment..." : "Book Appointment"}
      </Button>
    </form>
  )
}
