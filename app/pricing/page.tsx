"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUp, Check, Star, Clock, Shield } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"

interface PricingCategory {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  services: PricingService[]
}

interface PricingService {
  name: string
  price: string
  description?: string
  features?: string[]
  popular?: boolean
}

export default function PricingPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")

  const handleScroll = useCallback(() => {
    const windowScrollY = window.scrollY || window.pageYOffset
    const documentScrollTop = document.documentElement.scrollTop
    const bodyScrollTop = document.body.scrollTop

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
    handleScroll()

    return () => {
      removeScrollListeners()
    }
  }, [handleScroll])

  const scrollToTop = () => {
    try {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      })

      setTimeout(() => {
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
        window.pageYOffset = 0
      }, 100)
    } catch (error) {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      window.scrollTo(0, 0)
    }
  }

  const pricingCategories: PricingCategory[] = [
    {
      id: "diagnosis",
      title: "Diagnosis & Investigation",
      description: "Comprehensive dental examinations and diagnostic services",
      icon: <Shield className="h-6 w-6" />,
      services: [
        {
          name: "Registration",
          price: "Rs. 300",
          description: "Initial registration with free 6-month checkup reminders",
        },
        {
          name: "Dental Checkup",
          price: "Rs. 200",
          description: "Free for 6 months after registration, Rs. 300 after",
        },
        {
          name: "Consultation Charge",
          price: "Rs. 800",
          description: "Professional dental consultation",
        },
        {
          name: "IOPA X-ray",
          price: "Rs. 400",
          description: "Intraoral periapical radiograph",
        },
      ],
    },
    {
      id: "preventive",
      title: "Preventive Care",
      description: "Preventive treatments to maintain optimal oral health",
      icon: <Check className="h-6 w-6" />,
      services: [
        {
          name: "Scaling (Minor deposits)",
          price: "Rs. 1,500",
          description: "Basic plaque and tartar removal",
        },
        {
          name: "Scaling (Intermediate deposits)",
          price: "Rs. 2,500 - 3,000",
          description: "Moderate plaque and tartar removal",
        },
        {
          name: "Scaling (Major deposits)",
          price: "Rs. 3,500",
          description: "Extensive plaque and tartar removal",
        },
        {
          name: "Polishing",
          price: "Rs. 500",
          description: "Tooth surface polishing",
        },
        {
          name: "Pit and Fissure Sealant",
          price: "Rs. 2,000",
          description: "Protective coating for molars",
        },
        {
          name: "Alginate Impression (per arch)",
          price: "Rs. 2,000",
          description: "Traditional dental impressions",
        },
        {
          name: "Digital Impression (aligners)",
          price: "Rs. 5,000",
          description: "Advanced digital scanning for aligners",
        },
      ],
    },
    {
      id: "restoration",
      title: "Restorative Dentistry",
      description: "Tooth restoration and repair services",
      icon: <Star className="h-6 w-6" />,
      services: [
        {
          name: "Interim GIC",
          price: "Rs. 1,000 - 2,500",
          description: "Temporary glass ionomer cement filling",
        },
        {
          name: "Class I, Class V Fillings",
          price: "Rs. 2,000 - 3,500",
          description: "Simple cavity fillings",
        },
        {
          name: "Class II Fillings",
          price: "Rs. 3,000 - 3,500",
          description: "Moderate cavity fillings",
        },
        {
          name: "Class III Fillings",
          price: "Rs. 4,000 - 6,000",
          description: "Front tooth cavity fillings",
        },
        {
          name: "Class IV Fillings",
          price: "Rs. 5,000 - 7,000",
          description: "Complex front tooth restorations",
        },
      ],
    },
    {
      id: "rct",
      title: "Root Canal Treatment",
      description: "Advanced endodontic treatments",
      icon: <Clock className="h-6 w-6" />,
      services: [
        {
          name: "RCT Anterior (Resin Sealer)",
          price: "Rs. 8,000",
          description: "Front tooth root canal with resin sealer",
          popular: true,
        },
        {
          name: "RCT Premolars (Resin Sealer)",
          price: "Rs. 9,000",
          description: "Premolar root canal with resin sealer",
        },
        {
          name: "RCT Molars (Resin Sealer)",
          price: "Rs. 10,000",
          description: "Molar root canal with resin sealer",
        },
        {
          name: "Re-RCT",
          price: "Extra Rs. 4,000",
          description: "Additional charge for GP removal",
        },
        {
          name: "Baby Tooth RCT (Anterior)",
          price: "Rs. 4,000",
          description: "Primary tooth front root canal",
        },
        {
          name: "Baby Tooth RCT (Posterior)",
          price: "Rs. 6,000",
          description: "Primary tooth back root canal",
        },
        {
          name: "Ceramic Based Sealer RCT",
          price: "Rs. 15,000",
          description: "Premium ceramic sealer treatment",
        },
        {
          name: "Single Visit RCT",
          price: "Rs. 15,000",
          description: "Complete treatment in one session",
        },
      ],
    },
    {
      id: "orthodontics",
      title: "Braces & Aligners",
      description: "Orthodontic treatments for perfect smiles",
      icon: <Star className="h-6 w-6" />,
      services: [
        {
          name: "Metal Braces (Non-extraction)",
          price: "Rs. 70,000",
          description: "Traditional metal braces without extractions",
          features: ["Free retainers included", "4 tooth extractions included"],
        },
        {
          name: "Metal Braces (Extraction case)",
          price: "Rs. 80,000",
          description: "Traditional metal braces with extractions",
          features: ["Free retainers included", "4 tooth extractions included"],
        },
        {
          name: "Self Ligating Braces (Non-extraction)",
          price: "Rs. 80,000",
          description: "Advanced self-ligating system",
          features: ["Free retainers included", "4 tooth extractions included"],
        },
        {
          name: "Self Ligating Braces (Extraction case)",
          price: "Rs. 90,000",
          description: "Self-ligating braces with extractions",
          features: ["Free retainers included", "4 tooth extractions included"],
        },
        {
          name: "Ceramic Braces (Non-extraction)",
          price: "Rs. 1,20,000",
          description: "Tooth-colored ceramic braces",
          features: ["Free retainers included", "4 tooth extractions included"],
          popular: true,
        },
        {
          name: "Ceramic Braces (Extraction)",
          price: "Rs. 1,30,000",
          description: "Ceramic braces with extractions",
          features: ["Free retainers included", "4 tooth extractions included"],
        },
        {
          name: "Aligners",
          price: "Rs. 1,50,000 - 2,00,000",
          description: "Clear aligner treatment",
          features: ["Free retainers included", "4 tooth extractions included"],
        },
      ],
    },
    {
      id: "surgery",
      title: "Extraction & Surgery",
      description: "Surgical procedures and tooth extractions",
      icon: <Shield className="h-6 w-6" />,
      services: [
        {
          name: "Baby Tooth (Simple)",
          price: "Rs. 800",
          description: "Simple primary tooth extraction",
        },
        {
          name: "Baby Tooth (Complicated)",
          price: "Rs. 1,500",
          description: "Complex primary tooth extraction",
        },
        {
          name: "Mobile Tooth",
          price: "Rs. 1,000 - 3,000",
          description: "Loose tooth extraction",
        },
        {
          name: "Intact Tooth (Simple)",
          price: "Rs. 2,000 - 3,500",
          description: "Simple permanent tooth extraction",
        },
        {
          name: "Wisdom Tooth (Simple)",
          price: "Rs. 5,000",
          description: "Simple wisdom tooth removal",
        },
        {
          name: "Surgical Removal",
          price: "Rs. 8,000 - 15,000",
          description: "Complex surgical extractions",
        },
        {
          name: "Apicoectomy",
          price: "Rs. 10,000",
          description: "Root tip surgical removal",
        },
        {
          name: "Cyst Tumor Enucleation",
          price: "Rs. 25,000",
          description: "Surgical cyst/tumor removal",
        },
        {
          name: "Irrigation and Suture Removal",
          price: "Rs. 500",
          description: "Post-surgical care",
        },
      ],
    },
    {
      id: "crowns",
      title: "Crowns & Prosthetics",
      description: "Dental crowns and prosthetic solutions",
      icon: <Star className="h-6 w-6" />,
      services: [
        {
          name: "Metal Crown",
          price: "Rs. 7,000",
          description: "Durable metal crown per unit",
        },
        {
          name: "PFM Crown",
          price: "Rs. 9,000",
          description: "Porcelain fused to metal crown",
        },
        {
          name: "PFM Premium Crown",
          price: "Rs. 13,000",
          description: "Premium porcelain fused to metal",
        },
        {
          name: "EMAX Crown",
          price: "Rs. 25,000",
          description: "Premium ceramic crown",
          popular: true,
        },
        {
          name: "Zirconia Crown",
          price: "Rs. 16,000",
          description: "Strong zirconia crown",
        },
        {
          name: "Zirconia Crown Premium",
          price: "Rs. 25,000 - 30,000",
          description: "Premium zirconia crown",
        },
        {
          name: "Temporary Crown",
          price: "Rs. 2,500",
          description: "Temporary crown per unit",
        },
        {
          name: "Crown Cementation",
          price: "Rs. 1,000",
          description: "Crown placement per unit",
        },
      ],
    },
    {
      id: "cosmetic",
      title: "Cosmetic & Veneers",
      description: "Aesthetic dental treatments",
      icon: <Star className="h-6 w-6" />,
      services: [
        {
          name: "Composite Veneer",
          price: "Rs. 10,000",
          description: "Composite resin veneer",
        },
        {
          name: "EMAX Veneer",
          price: "Rs. 20,000",
          description: "Premium ceramic veneer",
          popular: true,
        },
        {
          name: "Ceramage Veneer",
          price: "Rs. 20,000 - 25,000",
          description: "Advanced ceramic veneer",
        },
        {
          name: "Office Whitening/Bleaching",
          price: "Rs. 16,000",
          description: "Professional teeth whitening",
        },
        {
          name: "Tooth Diamond",
          price: "Rs. 5,000",
          description: "Decorative tooth jewelry",
        },
      ],
    },
    {
      id: "implants",
      title: "Dental Implants",
      description: "Permanent tooth replacement solutions",
      icon: <Shield className="h-6 w-6" />,
      services: [
        {
          name: "Neodent Implant (PFM)",
          price: "Rs. 85,000",
          description: "Neodent implant with PFM crown",
        },
        {
          name: "Neodent Implant (Zirconia)",
          price: "Rs. 1,10,000",
          description: "Neodent implant with zirconia crown",
          popular: true,
        },
        {
          name: "Straumann Implant (PFM)",
          price: "Rs. 1,00,000",
          description: "Premium Straumann implant with PFM",
        },
        {
          name: "Straumann Implant (Zirconia)",
          price: "Rs. 1,20,000 - 1,30,000",
          description: "Premium Straumann with zirconia",
        },
        {
          name: "Bone Graft and Membrane",
          price: "Rs. 15,000 - 30,000",
          description: "Bone augmentation procedures",
        },
        {
          name: "Guided Surgery",
          price: "Rs. 20,000",
          description: "Computer-guided implant placement",
        },
      ],
    },
    {
      id: "dentures",
      title: "Dentures & Partials",
      description: "Removable prosthetic solutions",
      icon: <Check className="h-6 w-6" />,
      services: [
        {
          name: "Complete Denture (per arch)",
          price: "Rs. 20,000 - 25,000",
          description: "Full denture for one arch",
        },
        {
          name: "Denture Repair",
          price: "Rs. 3,000",
          description: "Denture repair service",
        },
        {
          name: "Acrylic RPD (1 base plate)",
          price: "Rs. 2,500",
          description: "Additional tooth Rs. 500 each",
        },
        {
          name: "Cast Partial Denture (CPD)",
          price: "Rs. 25,000",
          description: "Metal framework partial denture",
        },
        {
          name: "Post and Core",
          price: "Rs. 5,000 - 7,000",
          description: "Foundation for crown placement",
        },
      ],
    },
    {
      id: "miscellaneous",
      title: "Miscellaneous Services",
      description: "Additional dental services and accessories",
      icon: <Clock className="h-6 w-6" />,
      services: [
        {
          name: "Night Guard",
          price: "Rs. 5,000",
          description: "Custom night guard for teeth grinding",
        },
        {
          name: "Clear Retainer",
          price: "Rs. 6,000",
          description: "Digital scanner impression included",
        },
        {
          name: "Irrigation",
          price: "Rs. 500",
          description: "Cleaning and irrigation service",
        },
        {
          name: "Infiltration/Block",
          price: "Rs. 100",
          description: "Local anesthesia administration",
        },
      ],
    },
  ]

  const categoryNavigation = [
    { id: "all", label: "All" },
    { id: "diagnosis", label: "Diagnosis" },
    { id: "preventive", label: "Preventive" },
    { id: "restoration", label: "Restoration" },
    { id: "rct", label: "Root Canal" },
    { id: "orthodontics", label: "Braces" },
    { id: "surgery", label: "Surgery" },
    { id: "crowns", label: "Crowns" },
    { id: "cosmetic", label: "Cosmetic" },
    { id: "implants", label: "Implants" },
    { id: "dentures", label: "Dentures" },
    { id: "miscellaneous", label: "Other" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-16 pb-4 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Our Pricing</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Transparent pricing for all our dental services</p>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-4 bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categoryNavigation.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className={`rounded-full px-4 py-2 text-sm ${
                  activeCategory === category.id
                    ? "bg-teal-600 hover:bg-teal-700 text-white"
                    : "hover:bg-teal-50 hover:text-teal-600"
                }`}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {pricingCategories.map((category) => (
            <div
              key={category.id}
              id={category.id}
              className={`mb-16 ${activeCategory === "all" || activeCategory === category.id ? "block" : "hidden"}`}
            >
              <div className="text-center mb-12">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-teal-600">{category.icon}</div>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">{category.title}</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">{category.description}</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.services.map((service, index) => (
                  <Card
                    key={index}
                    className={`relative bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                      service.popular ? "ring-2 ring-teal-500" : ""
                    }`}
                  >
                    {service.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-teal-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                          Popular
                        </span>
                      </div>
                    )}
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl font-bold text-gray-900 mb-2">{service.name}</CardTitle>
                      <div className="text-3xl font-bold text-teal-600">{service.price}</div>
                    </CardHeader>
                    <CardContent>
                      {service.description && <p className="text-gray-600 mb-4">{service.description}</p>}
                      {service.features && (
                        <ul className="space-y-2">
                          {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                              <Check className="h-4 w-4 text-teal-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-16 bg-teal-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Important Notes</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                    <Shield className="h-5 w-5 text-teal-600 mr-2" />
                    Registration Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    After registration, enjoy free dental checkups every 6 months with reminder calls. If you exceed 6
                    months, a follow-up visit fee of Rs. 300 applies.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                    <Star className="h-5 w-5 text-teal-600 mr-2" />
                    Variable Pricing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Some prices may vary based on complexity, materials used, tooth position, and individual case
                    requirements. Final pricing will be discussed during consultation.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-700">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h3>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Schedule a consultation to discuss your treatment options and get a personalized quote.
          </p>
          <Link href="/book-now">
            <Button
              size="lg"
              className="bg-white text-teal-600 hover:bg-gray-100 rounded-full px-8 py-3 font-semibold text-lg"
            >
              Book Consultation
            </Button>
          </Link>
        </div>
      </section>

      <Footer />

      {/* Scroll to Top Button */}
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
