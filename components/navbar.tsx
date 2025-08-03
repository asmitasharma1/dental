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

export default function Navbar({ isHomePage = false, scrolled = false }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    // Add or remove padding class to body based on isHomePage
    if (!isHomePage) {
      document.body.classList.add("non-homepage-padding")
    } else {
      document.body.classList.remove("non-homepage-padding")
    }

    // Cleanup on component unmount
    return () => {
      document.body.classList.remove("non-homepage-padding")
    }
  }, [isHomePage])

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
      return `relative w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-teal-100" : "bg-transparent"
      }`
    }
    return `fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white shadow-lg border-b border-teal-100`
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

  return (
    <header className={getNavbarClasses()}>
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center justify-between w-full">
              {/* Left Side Menu (3 items) */}
              <div className="flex items-center space-x-12">
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

              {/* Centered Logo */}
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

              {/* Right Side Menu (3 items) */}
              <div className="flex items-center space-x-12">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger
                        className={`${getTextClasses()} transition-all duration-300 font-medium text-lg tracking-wide bg-transparent`}
                      >
                        Price/Service
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid w-[300px] p-4 bg-white shadow-md">
                          <NavigationMenuLink asChild>
                            <Link
                              href="/services"
                              className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-teal-50 hover:text-teal-600 focus:bg-teal-50 focus:text-teal-600 focus:outline-none"
                            >
                              <div className="text-sm font-medium leading-none group-hover:underline">All Services</div>
                              <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                View our complete range of dental services
                              </div>
                            </Link>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/services/restorative-dentistry/faq"
                              className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-teal-50 hover:text-teal-600 focus:bg-teal-50 focus:text-teal-600 focus:outline-none"
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
                className={`${!isHomePage || scrolled ? "text-teal-700 hover:text-teal-600 hover:bg-teal-50" : "text-gray-800 hover:text-teal-700 hover:bg-gray-100/50"} rounded-full`}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
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
                className={`${!isHomePage || scrolled ? "text-teal-600 hover:text-teal-500 hover:bg-teal-50" : "text-gray-600 hover:text-teal-700 hover:bg-gray-100/50"} transition-colors text-sm px-8 py-2 rounded-md`}
              >
                Our Clinic
              </Link>
              <Link
                href="/about#doctors"
                onClick={handleMobileLinkClick}
                className={`${!isHomePage || scrolled ? "text-teal-600 hover:text-teal-500 hover:bg-teal-50" : "text-gray-600 hover:text-teal-700 hover:bg-gray-100/50"} transition-colors text-sm px-8 py-2 rounded-md`}
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
                href="/services/restorative-dentistry/faq"
                onClick={handleMobileLinkClick}
                className={`${!isHomePage || scrolled ? "text-teal-600 hover:text-teal-500 hover:bg-teal-50" : "text-gray-600 hover:text-teal-700 hover:bg-gray-100/50"} transition-colors text-sm px-8 py-2 rounded-md`}
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