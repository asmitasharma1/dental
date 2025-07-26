"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"
import Sidebar from "@/components/Sidebar"
import Link from "next/link"

interface Service {
    id: number
    title: string
    description: string
    category: string
    price: number
    duration: string
}

export default function AdminServices() {
    const [services, setServices] = useState<Service[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchServices()
    }, [])

    const fetchServices = async () => {
        try {
            const response = await fetch("/api/services", {
                credentials: "include",
            })
            if (response.ok) {
                const data = await response.json()
                setServices(data)
            } else if (response.status === 401) {
                window.location.replace("/admin/login")
            }
        } catch (error) {
            console.error("Error fetching services:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
            <Sidebar />
            <div className="flex-1 lg:ml-6">
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="px-6 py-4">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-teal-700 bg-clip-text text-transparent">
                            Dashboard
                        </h1>
                        <Button asChild>
                            <Link href="/admin/services/new" className="bg-teal-600 hover:bg-teal-700 text-white">
                                <Plus className="h-4 w-4 mr-2" /> Add New Service
                            </Link>
                        </Button>
                    </div>
                </header>
                <main className="p-6">

                    <Card className="bg-white border-0 shadow-lg rounded-2xl">
                        <CardContent className="p-0">
                            {loading ? (
                                <div className="p-8 text-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
                                    <p className="text-gray-500 mt-2">Loading services...</p>
                                </div>
                            ) : services.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">No services found</div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Title
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Category
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Price
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Duration
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {services.map((service) => (
                                                <tr key={service.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 text-sm text-gray-900">{service.title}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">{service.category}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">${service.price}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">{service.duration}</td>
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