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
import { usePathname } from "next/navigation"
import type { NavbarProps, Service } from "@/types"
import {
  getNavbarClasses,
  getTextClasses,
  getUnderlineClasses,
  getMobileBorderClasses,
  getMobileTextClasses,
  getMobileSubTextClasses,
} from "@/utils"

export default function Navbar({ isHomePage = false }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [services, setServices] = useState<Service[]>([])
  const [servicesLoading, setServicesLoading] = useState(true)
  const [blogs, setBlogs] = useState<any[]>([])
  const [blogsLoading, setBlogsLoading] = useState(true)
  const [isTablet, setIsTablet] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Fetch services and blogs
    fetchServices()
    fetchBlogs()

    // Check device size
    const checkDevice = () => {
      const width = window.innerWidth
      setIsTablet(width >= 768 && width < 1024)
      updatePadding()
    }

    // Update padding logic
    const updatePadding = () => {
      const isMobileView = window.innerWidth < 1280
      const shouldPad = !isHomePage || (isHomePage && scrolled && isMobileView)
      if (shouldPad) {
        document.body.classList.add("non-homepage-padding")
      } else {
        document.body.classList.remove("non-homepage-padding")
      }
    }

    // Handle scroll
    const handleScroll = () => {
      if (isHomePage) {
        const newScrolled = window.scrollY > 50
        setScrolled(newScrolled)
        updatePadding()
      }
    }

    checkDevice()
    window.addEventListener("resize", checkDevice)
    window.addEventListener("scroll", handleScroll)

    // Set initial scroll state
    handleScroll()

    // Cleanup on component unmount
    return () => {
      document.body.classList.remove("non-homepage-padding")
      window.removeEventListener("resize", checkDevice)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isHomePage, pathname, scrolled])

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/services")
      if (response.ok) {
        const data = await response.json()
        setServices(data)
      } else {
        console.error("Failed to fetch services")
      }
    } catch (error) {
      console.error("Error fetching services:", error)
    } finally {
      setServicesLoading(false)
    }
  }

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blogs")
      if (response.ok) {
        const data = await response.json()
        setBlogs(data.slice(0, 5)) // Show only first 5 blogs in navbar
      } else {
        console.error("Failed to fetch blogs")
      }
    } catch (error) {
      console.error("Error fetching blogs:", error)
    } finally {
      setBlogsLoading(false)
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

  return (
    <header className={getNavbarClasses(isHomePage, scrolled)}>
      <div className="relative z-10">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-5">
          <div className="relative flex items-center justify-between">
            {/* Desktop Navigation - Hidden on tablets and mobile */}
            <nav className="hidden xl:flex items-center justify-between w-full relative">
              {/* Left Side Menu (3 items) */}
              <div className="flex items-center space-x-8 2xl:space-x-12">
                <Link
                  href="/"
                  className={`${getTextClasses(isHomePage, scrolled)} transition-all duration-300 font-medium relative group text-base lg:text-lg tracking-wide`}
                >
                  Home
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-0.5 ${getUnderlineClasses(isHomePage, scrolled)} transition-all duration-300 group-hover:w-full rounded-full`}
                  ></span>
                </Link>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger
                        className={`${getTextClasses(isHomePage, scrolled)} transition-all duration-300 font-medium text-base lg:text-lg tracking-wide bg-transparent`}
                      >
                        About Us
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid w-[280px] lg:w-[320px] p-4 bg-white shadow-md">
                          <NavigationMenuLink asChild>
                            <Link
                              href="/about"
                              className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-3 lg:p-4 text-sm font-medium transition-colors hover:bg-teal-50 hover:text-teal-600 focus:bg-teal-50 focus:text-teal-600 focus:outline-none"
                            >
                              <div className="text-sm font-medium leading-none group-hover:underline">Our Clinic</div>
                              <div className="line-clamp-2 text-xs lg:text-sm leading-snug text-muted-foreground">
                                Learn about our state-of-the-art facility
                              </div>
                            </Link>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/about#doctors"
                              className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-3 lg:p-4 text-sm font-medium transition-colors hover:bg-teal-50 hover:text-teal-600 focus:bg-teal-50 focus:text-teal-600 focus:outline-none"
                            >
                              <div className="text-sm font-medium leading-none group-hover:underline">Our Doctors</div>
                              <div className="line-clamp-2 text-xs lg:text-sm leading-snug text-muted-foreground">
                                Meet our experienced dental professionals
                              </div>
                            </Link>
                          </NavigationMenuLink>
                          {/* Added Blogs link to About Us dropdown */}
                          <NavigationMenuLink asChild>
                            <Link
                              href="/blogs"
                              className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-3 lg:p-4 text-sm font-medium transition-colors hover:bg-teal-50 hover:text-teal-600 focus:bg-teal-50 focus:text-teal-600 focus:outline-none"
                            >
                              <div className="text-sm font-medium leading-none group-hover:underline">Blogs</div>
                              <div className="line-clamp-2 text-xs lg:text-sm leading-snug text-muted-foreground">
                                Read our latest dental health articles
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
                  className={`${getTextClasses(isHomePage, scrolled)} transition-all duration-300 font-medium relative group text-base lg:text-lg tracking-wide`}
                >
                  Why Us
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-0.5 ${getUnderlineClasses(isHomePage, scrolled)} transition-all duration-300 group-hover:w-full rounded-full`}
                  ></span>
                </Link>
              </div>

              {/* Centered Logo - Absolutely positioned to center of screen */}
              <Link href="/" className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                <Image
                  src="/images/logo.png"
                  alt="Smile by Dr. Kareen Logo"
                  width={100}
                  height={100}
                  className="cursor-pointer drop-shadow-lg transition-transform duration-300 hover:scale-105 lg:w-[100px] lg:h-[100px]"
                  priority
                />
              </Link>

              {/* Right Side Menu (3 items) */}
              <div className="flex items-center space-x-6 lg:space-x-8 2xl:space-x-12">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger
                        className={`${getTextClasses(isHomePage, scrolled)} transition-all duration-300 font-medium text-base lg:text-lg tracking-wide bg-transparent`}
                      >
                        Service
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid w-[350px] lg:w-[400px] p-4 bg-white shadow-md max-h-[400px] lg:max-h-[500px] overflow-y-auto">
                          <NavigationMenuLink asChild>
                            <Link
                              href="/services"
                              className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-3 lg:p-4 text-sm font-medium transition-colors hover:bg-teal-50 hover:text-teal-600 focus:bg-teal-50 focus:text-teal-600 focus:outline-none border-b border-gray-100"
                            >
                              <div className="text-sm font-medium leading-none group-hover:underline">All Services</div>
                              <div className="line-clamp-2 text-xs lg:text-sm leading-snug text-muted-foreground">
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
                                    className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-2 lg:p-3 text-sm font-medium transition-colors hover:bg-teal-50 hover:text-teal-600 focus:bg-teal-50 focus:text-teal-600 focus:outline-none"
                                  >
                                    <div className="flex items-center justify-between w-full">
                                      <div className="flex-1">
                                        <div className="text-xs lg:text-sm font-medium leading-none group-hover:underline line-clamp-1">
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
                              className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-3 lg:p-4 text-sm font-medium transition-colors hover:bg-teal-50 hover:text-teal-600 focus:bg-teal-50 focus:text-teal-600 focus:outline-none border-t border-gray-100 mt-2"
                            >
                              <div className="text-sm font-medium leading-none group-hover:underline">FAQs</div>
                              <div className="line-clamp-2 text-xs lg:text-sm leading-snug text-muted-foreground">
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
                  className={`${getTextClasses(isHomePage, scrolled)} transition-all duration-300 font-medium relative group text-base lg:text-lg tracking-wide`}
                >
                  Gallery
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-0.5 ${getUnderlineClasses(isHomePage, scrolled)} transition-all duration-300 group-hover:w-full rounded-full`}
                  ></span>
                </Link>
                <Link href="/book-now">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-4 lg:px-6 py-2 lg:py-3 font-semibold text-sm lg:text-base"
                  >
                    Book Now
                  </Button>
                </Link>
              </div>
            </nav>

            {/* Tablet/Mobile Navigation - Visible on xl and below */}
            <div className="xl:hidden flex items-center justify-between w-full">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/logo.png"
                  alt="Smile by Dr. Kareen Logo"
                  width={80}
                  height={80}
                  className="cursor-pointer drop-shadow-lg transition-transform duration-300 hover:scale-105 sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px]"
                  priority
                />
              </Link>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`${
                  !isHomePage || scrolled
                    ? "text-teal-700 hover:text-teal-600 hover:bg-teal-50"
                    : "text-gray-800 hover:text-teal-700 hover:bg-gray-100/50"
                } rounded-full p-2`}
              >
                {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile/Tablet Menu */}
          <div
            className={`xl:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            } ${isMenuOpen ? "bg-white shadow-lg border-b border-teal-100" : ""}`}
          >
            <nav
              className={`flex flex-col pt-6 pb-8 border-t ${isMenuOpen ? "border-teal-100" : getMobileBorderClasses(isHomePage, scrolled)}`}
            >
              {/* Home */}
              <Link
                href="/"
                onClick={handleMobileLinkClick}
                className={`${isMenuOpen ? "text-teal-700 hover:text-teal-600 hover:bg-teal-50" : getMobileTextClasses(isHomePage, scrolled)} transition-colors font-medium text-xl px-6 py-4 border-b ${isMenuOpen ? "border-teal-100" : getMobileBorderClasses(isHomePage, scrolled)}`}
              >
                Home
              </Link>

              {/* About Us Section */}
              <div
                className={`border-b ${isMenuOpen ? "border-teal-100" : getMobileBorderClasses(isHomePage, scrolled)}`}
              >
                <Link
                  href="/about"
                  onClick={handleMobileLinkClick}
                  className={`${isMenuOpen ? "text-teal-700 hover:text-teal-600 hover:bg-teal-50" : getMobileTextClasses(isHomePage, scrolled)} transition-colors font-medium text-xl px-6 py-4 block`}
                >
                  About Us
                </Link>
                <div className="pb-2">
                  <Link
                    href="/about"
                    onClick={handleMobileLinkClick}
                    className={`${isTablet ? "text-teal-600 hover:text-teal-500 hover:bg-teal-50" : getMobileSubTextClasses(isHomePage, scrolled)} transition-colors text-base px-8 py-3 block`}
                  >
                    Our Clinic
                  </Link>
                  <Link
                    href="/about#doctors"
                    onClick={handleMobileLinkClick}
                    className={`${isTablet ? "text-teal-600 hover:text-teal-500 hover:bg-teal-50" : getMobileSubTextClasses(isHomePage, scrolled)} transition-colors text-base px-8 py-3 block`}
                  >
                    Our Doctors
                  </Link>
                  {/* Added Blogs link to mobile About Us section */}
                  <Link
                    href="/blogs"
                    onClick={handleMobileLinkClick}
                    className={`${isTablet ? "text-teal-600 hover:text-teal-500 hover:bg-teal-50" : getMobileSubTextClasses(isHomePage, scrolled)} transition-colors text-base px-8 py-3 block`}
                  >
                    Blogs
                  </Link>
                </div>
              </div>

              {/* Services Section */}
              <div
                className={`border-b ${isMenuOpen ? "border-teal-100" : getMobileBorderClasses(isHomePage, scrolled)}`}
              >
                <Link
                  href="/services"
                  onClick={handleMobileLinkClick}
                  className={`${isMenuOpen ? "text-teal-700 hover:text-teal-600 hover:bg-teal-50" : getMobileTextClasses(isHomePage, scrolled)} transition-colors font-medium text-xl px-6 py-4 block`}
                >
                  Service
                </Link>
                <div className="pb-2">
                  <Link
                    href="/services"
                    onClick={handleMobileLinkClick}
                    className={`${isTablet ? "text-teal-600 hover:text-teal-500 hover:bg-teal-50" : getMobileSubTextClasses(isHomePage, scrolled)} transition-colors text-base px-8 py-3 block`}
                  >
                    All Services
                  </Link>
                  <Link
                    href="/services/restorative-dentistry/faq"
                    onClick={handleMobileLinkClick}
                    className={`${isTablet ? "text-teal-600 hover:text-teal-500 hover:bg-teal-50" : getMobileSubTextClasses(isHomePage, scrolled)} transition-colors text-base px-8 py-3 block`}
                  >
                    FAQs
                  </Link>
                </div>
              </div>

              {/* Why Us */}
              <Link
                href="/why-us"
                onClick={handleMobileLinkClick}
                className={`${isMenuOpen ? "text-teal-700 hover:text-teal-600 hover:bg-teal-50" : getMobileTextClasses(isHomePage, scrolled)} transition-colors font-medium text-xl px-6 py-4 border-b ${isMenuOpen ? "border-teal-100" : getMobileBorderClasses(isHomePage, scrolled)}`}
              >
                Why Us
              </Link>

              {/* Gallery */}
              <Link
                href="/gallery"
                onClick={handleMobileLinkClick}
                className={`${isMenuOpen ? "text-teal-700 hover:text-teal-600 hover:bg-teal-50" : getMobileTextClasses(isHomePage, scrolled)} transition-colors font-medium text-xl px-6 py-4 border-b ${isMenuOpen ? "border-teal-100" : getMobileBorderClasses(isHomePage, scrolled)}`}
              >
                Gallery
              </Link>

              {/* Book Now Button */}
              <div className="px-6 pt-6">
                <Link href="/book-now" onClick={handleMobileLinkClick}>
                  <Button className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-full py-4 font-semibold text-lg">
                    Book Now
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
