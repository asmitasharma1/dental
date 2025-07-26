"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import Sidebar from "@/components/Sidebar"

interface Testimonial {
    id: number
    name: string
    content: string
    rating: number
    created_at: string
}

export default function AdminTestimonials() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchTestimonials()
    }, [])

    const fetchTestimonials = async () => {
        try {
            const response = await fetch("/api/testimonials", {
                credentials: "include",
            })
            if (response.ok) {
                const data = await response.json()
                setTestimonials(data)
            } else if (response.status === 401) {
                window.location.replace("/admin/login")
            }
        } catch (error) {
            console.error("Error fetching testimonials:", error)
        } finally {
            setLoading(false)
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
            <Sidebar />
            <div className="flex-1 lg:ml-6">
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="px-6 py-4">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-teal-700 bg-clip-text text-transparent">
                            Testimonials
                        </h1>
                    </div>
                </header>
                <main className="p-6">
                    <Card className="bg-white border-0 shadow-lg rounded-2xl">
                        <CardContent className="p-0">
                            {loading ? (
                                <div className="p-8 text-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
                                    <p className="text-gray-500 mt-2">Loading testimonials...</p>
                                </div>
                            ) : testimonials.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">No testimonials found</div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Name
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Content
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Rating
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Date
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {testimonials.map((testimonial) => (
                                                <tr key={testimonial.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 text-sm text-gray-900">{testimonial.name}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">{testimonial.content}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">{testimonial.rating} / 5</td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">{formatDate(testimonial.created_at)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    )
}