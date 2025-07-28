import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import RestorativeFAQ from "@/components/faq-restorative"

export default function RestorativeDentistryFAQPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <RestorativeFAQ />
      <Footer />
    </div>
  )
}