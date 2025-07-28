"use client"

import { Button } from "@/components/ui/button"
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
import { useState } from "react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-teal-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="#hero">
              <Image
                src="/images/logo.png"
                alt="Smile by Dr. Kareen Logo"
                width={500}
                height={300}
                className="cursor-pointer"
                style={{ width: "80px", height: "80px" }}
              />
            </Link>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/#hero"
              className="text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium">
                    About Us
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[300px] p-2">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/about#clinic"
                          className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
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
                          className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
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
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium">
                    Price/Service
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] p-2">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/services"
                          className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                        >
                          <div className="text-sm font-medium leading-none group-hover:underline">All Services</div>
                          <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            View our complete range of dental services
                          </div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/services/general-dentistry"
                          className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                        >
                          <div className="text-sm font-medium leading-none group-hover:underline">
                            General Dentistry
                          </div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/services/cosmetic-dentistry"
                          className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                        >
                          <div className="text-sm font-medium leading-none group-hover:underline">
                            Cosmetic Dentistry
                          </div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/services/restorative-dentistry"
                          className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                        >
                          <div className="text-sm font-medium leading-none group-hover:underline">
                            Restorative Dentistry
                          </div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/services/pediatric-dentistry"
                          className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                        >
                          <div className="text-sm font-medium leading-none group-hover:underline">
                            Pediatric Dentistry
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
              className="text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium relative group"
            >
              Why Us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
            <Link
              href="/gallery"
              className="text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium relative group"
            >
              Gallery
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/book-now">
              <Button
                size="lg"
                className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-6 py-3 font-semibold"
              >
                Book Now
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4 pt-4">
              <Link href="#hero" className="text-gray-700 hover:text-teal-600 transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-teal-600 transition-colors">
                About Us
              </Link>
              <Link href="/services" className="text-gray-700 hover:text-teal-600 transition-colors">
                Price/Service
              </Link>
              <Link href="/why-us" className="text-gray-700 hover:text-teal-600 transition-colors">
                Why Us
              </Link>
              <Link href="/book-now">
                <Button className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white">
                  Book Now
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
