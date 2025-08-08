import Image from "next/image"
import Link from "next/link"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 to-gray-900/20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div className="lg:col-span-2 space-y-6 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start lg:space-x-2">
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
            <p className="text-gray-300 text-lg leading-relaxed max-w-md mx-auto lg:mx-0 lg:max-w-md">
              Your trusted dental care partner in Lalitpur. We're committed to providing exceptional dental services
              with a personal touch.
            </p>
          </div>
          {/* Quick Links */}
          <div className="space-y-6 text-center lg:text-left">
            <h3 className="text-xl font-bold text-white">Quick Links</h3>
            <nav className="space-y-3">
              <Link href="/about" className="block text-gray-300 hover:text-teal-400 transition-colors">
                About Us
              </Link>
              <Link href="/services" className="block text-gray-300 hover:text-teal-400 transition-colors">
                Our Services
              </Link>
              <Link href="/why-us" className="block text-gray-300 hover:text-teal-400 transition-colors">
                Why Us
              </Link>
              <Link href="/gallery" className="block text-gray-300 hover:text-teal-400 transition-colors">
                Gallery
              </Link>
              <Link href="/book-now" className="block text-gray-300 hover:text-teal-400 transition-colors">
                Book Appointment
              </Link>
            </nav>
          </div>
          {/* Contact Info */}
          <div className="space-y-6 text-center lg:text-left">
            <h3 className="text-xl font-bold text-white">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <Mail className="h-5 w-5 text-teal-400" />
                <span className="text-gray-300">smilebydrkareen@gmail.com</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <Phone className="h-5 w-5 text-teal-400" />
                <span className="text-gray-300">985-1359775</span>
              </div>
              <div className="flex items-start justify-center lg:justify-start space-x-3">
                <MapPin className="h-5 w-5 text-teal-400 mt-1" />
                <span className="text-gray-300 text-center lg:text-left">Pulchowk Damkal, Lalitpur, Nepal</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <Clock className="h-5 w-5 text-teal-400" />
                <span className="text-gray-300">Mon-Sun: 9:00 AM - 8:00 PM</span>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Footer */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center md:text-left">
            <p className="text-gray-400 text-sm">© 2024 Smile by Dr. Kareen. All rights reserved.</p>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-sm">
              <Link href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}