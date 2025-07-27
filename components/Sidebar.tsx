"use client"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users, LogOut, Menu, X, ImageIcon } from "lucide-react" // Renamed Image to ImageIcon to avoid conflict
import Image from "next/image"
import Link from "next/link"

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })
      window.location.replace("/admin/login")
    } catch (error) {
      console.error("Logout error:", error)
      window.location.replace("/admin/login")
    }
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="lg:flex lg:flex-col lg:h-screen">
      <div className="flex items-center justify-between h-16 px-6 bg-gradient-to-r from-teal-600 to-teal-700 lg:bg-none">
        <div className="flex items-center space-x-3">
          <Image src="/images/logo.png" alt="Logo" width={40} height={40} className="rounded-full" />
          <span className="text-white font-bold lg:text-gray-700">Admin Panel</span>
        </div>
        <Button variant="ghost" className="lg:hidden text-white" onClick={toggleSidebar}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:transform-none transition-transform duration-300 ease-in-out flex flex-col h-screen`}
      >
        <div className="flex items-center justify-between h-16 px-6 bg-gradient-to-r from-teal-600 to-teal-700 lg:hidden">
          <div className="flex items-center space-x-3">
            <Image src="/images/logo.png" alt="Logo" width={40} height={40} className="rounded-full" />
            <span className="text-white font-bold">Admin Panel</span>
          </div>
          <Button variant="ghost" className="text-white" onClick={toggleSidebar}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="mt-8 px-4 space-y-2 flex-grow">
          <Link
            href="/admin/dashboard"
            onClick={() => setIsOpen(false)}
            className={`flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors ${
              isActive("/admin/dashboard") ? "bg-teal-50 border-l-4 border-teal-600" : ""
            }`}
          >
            <Calendar className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/admin/appointments"
            onClick={() => setIsOpen(false)}
            className={`flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors ${
              isActive("/admin/appointments") ? "bg-teal-50 border-l-4 border-teal-600" : ""
            }`}
          >
            <Clock className="h-5 w-5" />
            <span>Appointments</span>
          </Link>
          <Link
            href="/admin/services"
            onClick={() => setIsOpen(false)}
            className={`flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors ${
              isActive("/admin/services") ? "bg-teal-50 border-l-4 border-teal-600" : ""
            }`}
          >
            <Users className="h-5 w-5" />
            <span>Services</span>
          </Link>
          <Link
            href="/admin/testimonials"
            onClick={() => setIsOpen(false)}
            className={`flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors ${
              isActive("/admin/testimonials") ? "bg-teal-50 border-l-4 border-teal-600" : ""
            }`}
          >
            <Users className="h-5 w-5" />
            <span>Testimonials</span>
          </Link>
          <Link
            href="/admin/gallery"
            onClick={() => setIsOpen(false)}
            className={`flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors ${
              isActive("/admin/gallery") ? "bg-teal-50 border-l-4 border-teal-600" : ""
            }`}
          >
            <ImageIcon className="h-5 w-5" />
            <span>Gallery</span>
          </Link>
        </nav>
        <div className="p-4">
          <Button
            onClick={() => {
              handleLogout()
              setIsOpen(false)
            }}
            variant="outline"
            className="w-full flex items-center justify-center space-x-2 text-gray-700 border-gray-300 hover:bg-red-50 hover:border-red-300 hover:text-red-700"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
