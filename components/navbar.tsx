"use client"

import { Button } from "@/components/ui/button"
import type React from "react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

interface NavbarProps {
  isHomePage?: boolean
  scrolled?: boolean
}

interface Service {
  id: number
  title: string
  description: string
  category: string
  price: number
  duration: string
  image_url: string
  is_active: boolean
}

export default function Navbar({ isHomePage = false, scrolled = false }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [services, setServices] = useState<Service[]>([])
  const [servicesLoading, setServicesLoading] = useState(true)

  useEffect(() => {
    // Add or remove padding class to body based on isHomePage
    if (!isHomePage) {
      document.body.classList.add("non-homepage-padding")
    } else {
      document.body.classList.remove("non-homepage-padding")
    }

    // Fetch services
    fetchServices()

    // Cleanup on component unmount
    return () => {
      document.body.classList.remove("non-homepage-padding")
    }
  }, [isHomePage])

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/services")
      if (response.ok) {
        const data = await response.json()
        setServices(data) // Removed .slice(0, 8)
      } else {
        console.error("Failed to fetch services")
      }
    } catch (error) {
      console.error("Error fetching services:", error)
    } finally {
      setServicesLoading(false)
    }
  }

  const handleScrollLink = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const target = document.querySelector(targetId)
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }

  const handleMobileLinkClick = () => {
    setIsMenuOpen(false)
  }

  const getNavbarClasses = () => {
    if (isHomePage) {
      return `relative w-full z-50 transition-all duration-300 mt-8 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-teal-100" : "bg-transparent"
        }`
    }
    return `fixed top-8 left-0 w-full z-50 transition-all duration-300 bg-white shadow-lg border-b border-teal-100`
  }

  const getTextClasses = () => {
    if (!isHomePage || scrolled) {
      return "text-teal-700 hover:text-teal-600"
    }
    return "text-gray-800 hover:text-teal-700 drop-shadow-lg"
  }

  const getUnderlineClasses = () => {
    if (!isHomePage || scrolled) {
      return "bg-gradient-to-r from-teal-400 to-teal-300"
    }
    return "bg-gradient-to-r from-gray-800 to-teal-700"
  }

  const getMobileTextClasses = () => {
    if (!isHomePage || scrolled) {
      return "text-teal-700 hover:text-teal-600 hover:bg-teal-50"
    }
    return "text-gray-800 hover:text-teal-700 hover:bg-gray-100/50"
  }

  const getMobileBorderClasses = () => {
    if (!isHomePage || scrolled) {
      return "border-teal-100"
    }
    return "border-gray-300/50"
  }

  const getMobileSubTextClasses = () => {
    if (!isHomePage || scrolled) {
      return "text-teal-600 hover:text-teal-500 hover:bg-teal-50"
    }
    return "text-gray-600 hover:text-teal-700 hover:bg-gray-100/50"
  }

  return (
    <header className={getNavbarClasses()}>
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
  {/* Desktop Navigation */}
  <nav className="hidden md:flex items-center w-full relative">
    {/* Left Side Menu (3 items) */}
    <div className="flex items-center space-x-8 lg:space-x-12 flex-1 justify-start">
      <Link
        href="/"
        className={`${getTextClasses()} transition-all duration-300 font-medium relative group text-lg tracking-wide`}
      >
        Home
        <span
          className={`absolute -bottom-1 left-0 w-0 h-0.5 ${getUnderlineClasses()} transition-all duration-300 group-hover:w-full rounded-full`}
        ></span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={`${getTextClasses()} transition-all duration-300 font-medium text-lg tracking-wide bg-transparent`}
            >
              About Us
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[300px] p-4 bg-white shadow-md">
                <NavigationMenuLink asChild>
                  <Link
                    href="/about"
                    className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-teal-50 hover:text-teal-600 focus:bg-teal-50 focus:text-teal-600 focus:outline-none"
                  >
                    <div className="text-sm font-medium leading-none group-hover:underline">Our Clinic</div>
                    <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Learn about our state-of-the-art facility
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link
                    href="/about#doctors"
                    className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-teal-50 hover:text-teal-600 focus:bg-teal-50 focus:text-teal-600 focus:outline-none"
                  >
                    <div className="text-sm font-medium leading-none group-hover:underline">Our Doctors</div>
                    <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Meet our experienced dental professionals
                    </div>
                  </Link>
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Link
        href="/why-us"
        className={`${getTextClasses()} transition-all duration-300 font-medium relative group text-lg tracking-wide`}
      >
        Why Us
        <span
          className={`absolute -bottom-1 left-0 w-0 h-0.5 ${getUnderlineClasses()} transition-all duration-300 group-hover:w-full rounded-full`}
        ></span>
      </Link>
    </div>

    {/* Centered Logo - Absolutely positioned for perfect centering */}
    <div className="absolute left-1/2 transform -translate-x-1/2">
      <Link href="/" className="flex items-center justify-center">
        <Image
          src="/images/logo.png"
          alt="Smile by Dr. Kareen Logo"
          width={100}
          height={100}
          className="cursor-pointer drop-shadow-lg transition-transform duration-300 hover:scale-105"
          priority
        />
      </Link>
    </div>

    {/* Right Side Menu (3 items) */}
    <div className="flex items-center space-x-8 lg:space-x-12 flex-1 justify-end">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={`${getTextClasses()} transition-all duration-300 font-medium text-lg tracking-wide bg-transparent`}
            >
              Service
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[400px] p-4 bg-white shadow-md max-h-[500px] overflow-y-auto">
                <NavigationMenuLink asChild>
                  <Link
                    href="/services"
                    className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-teal-50 hover:text-teal-600 focus:bg-teal-50 focus:text-teal-600 focus:outline-none border-b border-gray-100"
                  >
                    <div className="text-sm font-medium leading-none group-hover:underline">All Services</div>
                    <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      View our complete range of dental services
                    </div>
                  </Link>
                </NavigationMenuLink>

                {/* Services from Database */}
                {servicesLoading ? (
                  <div className="p-4 text-center text-sm text-gray-500">Loading services...</div>
                ) : (
                  <>
                    {services.map((service) => (
                      <NavigationMenuLink key={service.id} asChild>
                        <Link
                          href={`/services/${service.id}`}
                          className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-3 text-sm font-medium transition-colors hover:bg-teal-50 hover:text-teal-600 focus:bg-teal-50 focus:text-teal-600 focus:outline-none"
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className="flex-1">
                              <div className="text-xs font-medium leading-none group-hover:underline line-clamp-1">
                                {service.title}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                    {services.length === 0 && (
                      <div className="p-4 text-center text-sm text-gray-500">No services available</div>
                    )}
                  </>
                )}

                <NavigationMenuLink asChild>
                  <Link
                    href="/services/restorative-dentistry/faq"
                    className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-teal-50 hover:text-teal-600 focus:bg-teal-50 focus:text-teal-600 focus:outline-none border-t border-gray-100 mt-2"
                  >
                    <div className="text-sm font-medium leading-none group-hover:underline">FAQs</div>
                    <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Frequently Asked Questions
                    </div>
                  </Link>
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Link
        href="/gallery"
        className={`${getTextClasses()} transition-all duration-300 font-medium relative group text-lg tracking-wide`}
      >
        Gallery
        <span
          className={`absolute -bottom-1 left-0 w-0 h-0.5 ${getUnderlineClasses()} transition-all duration-300 group-hover:w-full rounded-full`}
        ></span>
      </Link>
      <Link href="/book-now">
        <Button
          size="lg"
          className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-6 py-3 font-semibold"
        >
          Book Now
        </Button>
      </Link>
    </div>
  </nav>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center justify-between w-full">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/logo.png"
                  alt="Smile by Dr. Kareen Logo"
                  width={70}
                  height={70}
                  className="cursor-pointer drop-shadow-lg transition-transform duration-300 hover:scale-105"
                  priority
                />
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`${!isHomePage || scrolled
                    ? "text-teal-700 hover:text-teal-600 hover:bg-teal-50"
                    : "text-gray-800 hover:text-teal-700 hover:bg-gray-100/50"
                  } rounded-full`}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
              }`}
          >
            <nav className={`flex flex-col space-y-4 pt-6 pb-8 border-t ${getMobileBorderClasses()}`}>
              <Link
                href="/"
                onClick={handleMobileLinkClick}
                className={`${getMobileTextClasses()} transition-colors font-medium text-lg px-6 py-3 rounded-md`}
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={handleMobileLinkClick}
                className={`${getMobileTextClasses()} transition-colors font-medium text-lg px-6 py-3 rounded-md`}
              >
                About Us
              </Link>
              <Link
                href="/about"
                onClick={handleMobileLinkClick}
                className={`${getMobileSubTextClasses()} transition-colors text-sm px-8 py-2 rounded-md`}
              >
                Our Clinic
              </Link>
              <Link
                href="/about#doctors"
                onClick={handleMobileLinkClick}
                className={`${getMobileSubTextClasses()} transition-colors text-sm px-8 py-2 rounded-md`}
              >
                Our Doctors
              </Link>
              <Link
                href="/services"
                onClick={handleMobileLinkClick}
                className={`${getMobileTextClasses()} transition-colors font-medium text-lg px-6 py-3 rounded-md`}
              >
                Price/Service
              </Link>
              <Link
                href="/services"
                onClick={handleMobileLinkClick}
                className={`${getMobileSubTextClasses()} transition-colors text-sm px-8 py-2 rounded-md`}
              >
                All Services
              </Link>

              <Link
                href="/services/restorative-dentistry/faq"
                onClick={handleMobileLinkClick}
                className={`${getMobileSubTextClasses()} transition-colors text-sm px-8 py-2 rounded-md`}
              >
                FAQs
              </Link>
              <Link
                href="/why-us"
                onClick={handleMobileLinkClick}
                className={`${getMobileTextClasses()} transition-colors font-medium text-lg px-6 py-3 rounded-md`}
              >
                Why Us
              </Link>
              <Link
                href="/gallery"
                onClick={handleMobileLinkClick}
                className={`${getMobileTextClasses()} transition-colors font-medium text-lg px-6 py-3 rounded-md`}
              >
                Gallery
              </Link>
              <Link href="/book-now" onClick={handleMobileLinkClick}>
                <Button className="mx-6 mt-4 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-full py-4 font-semibold">
                  Book Now
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}