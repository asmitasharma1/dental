"use client"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useEffect, useState } from "react"

export default function PricingPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const services = [
    { name: "Registration", price: "Rs. 300" },
    { name: "Dental Checkup and Treatment Planning", price: "Rs. 200" },
    { name: "IOPA X-ray", price: "Rs. 400" },
    { name: "Scaling", price: "Rs. 2000 - Rs. 5000" },
    { name: "Polishing", price: "Rs. 500" },
    { name: "Full Mouth Fluoride Application/Varnish", price: "Rs. 2000 - Rs. 3000" },
    { name: "Night Guard", price: "Rs. 7000" },
    { name: "Filling", price: "Rs. 2,000 - Rs. 6,000" },
    { name: "Cosmetic Restoration", price: "Rs. 6,000 -Rs. 10,000" },
    { name: "RCT", price: "Rs. 8,000 - Rs. 15,000" },
    { name: "Orthodontic /Braces", price: "Rs. 70,000 - Rs. 1,35,000", note: "(Including free retainers)" },
    { name: "Aligners", price: "Rs. 1,40,000 - Rs. 3,00,000" },
    { name: "Extraction Tooth", price: "Rs. 1500 - Rs. 6000" },
    { name: "Surgical Removal", price: "Rs. 8,000- Rs. 15,000" },
    { name: "(Wisdom/ Impacted/ RCT Treated) Irrigation and Suture Removal", price: "Rs. 500" },
    { name: "Crown", price: "Rs. 9000 - Rs. 30,000" },
    { name: "Veneer (Composite) Per Tooth", price: "Rs.10,000" },
    { name: "Complete Denture (Per Arch)", price: "Rs. 20,000 - Rs. 25,000" },
    { name: "Acrylic I Base Plate", price: "Rs. 2500", note: "Per Additional Tooth (Rs.1500-2000)" },
    { name: "CPD ( CAST PARTIAL DENTURE)", price: "Rs. 25,000" },
    { name: "Post and Core", price: "Rs. 5000 - Rs. 7000" },
    { name: "Implant", price: "Rs. 85,000- Rs. 1,20,00" },
    { name: "Office Whitening/ Bleaching", price: "Rs.20,000" },
    { name: "Clear/Fixed Retainer", price: "Rs. 7,000 - Rs. 9,000" },
    { name: "FIXED Fretainer", price: "Rs. 7,000" },
    { name: "Gum Treatments and Surgeries", price: "Rs. 3,000- Rs. 15,000" },
    { name: "Tooth Diamond", price: "Rs. 5000" },
    { name: "Subgingival Debridement", price: "Rs. 15,000" },
    { name: "Splinting", price: "Rs. 12,000" },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <Navbar />
      </div>

      <div className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div
            className={`bg-white rounded-lg shadow-lg overflow-hidden mb-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >            

            {/* Services Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr
                    className={`bg-teal-500 text-white transition-all duration-500 delay-300 ${
                      isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                    }`}
                  >
                    <th className="px-6 py-3 text-left font-semibold">SERVICES (सेवाहरू)</th>
                    <th className="px-6 py-3 text-right font-semibold">PRICES (मूल्यहरू)</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service, index) => (
                    <tr
                      key={index}
                      className={`${index % 2 === 0 ? "bg-teal-50" : "bg-white"} 
                        transition-all duration-500 hover:bg-teal-100 hover:scale-[1.01] hover:shadow-sm cursor-pointer
                        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                      style={{
                        transitionDelay: `${400 + index * 50}ms`,
                      }}
                    >
                      <td className="px-6 py-3 border-b border-teal-200">
                        <div className="font-medium text-gray-900">{service.name}</div>
                        {service.note && <div className="text-sm text-gray-600 mt-1">{service.note}</div>}
                      </td>
                      <td className="px-6 py-3 border-b border-teal-200 text-right font-semibold text-gray-900 hover:text-teal-600 transition-colors duration-200">
                        {service.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div
              className={`bg-white p-4 text-center transition-all duration-500 delay-1100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <p className="text-red-600 font-semibold">Pricing may varies according to the treatment complications</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
