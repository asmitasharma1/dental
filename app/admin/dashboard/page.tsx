"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, AlertCircle } from "lucide-react"
import Sidebar from "@/components/Sidebar"

interface Appointment {
    id: number
    first_name: string
    last_name: string
    email: string
    phone: string
    preferred_date: string
    preferred_time: string
    service_title: string
    status: "pending" | "confirmed" | "completed" | "cancelled"
    created_at: string
}

interface Stats {
    totalAppointments: number
    pendingAppointments: number
    confirmedAppointments: number
    completedAppointments: number
}

export default function AdminDashboard() {
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [stats, setStats] = useState<Stats>({
        totalAppointments: 0,
        pendingAppointments: 0,
        confirmedAppointments: 0,
        completedAppointments: 0,
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchAppointments()
    }, [])

    const fetchAppointments = async () => {
        try {
            const response = await fetch("/api/appointments", {
                credentials: "include",
            })
            if (response.ok) {
                const data = await response.json()
                setAppointments(data)
                const stats = data.reduce(
                    (acc: Stats, appointment: Appointment) => {
                        acc.totalAppointments++
                        switch (appointment.status) {
                            case "pending":
                                acc.pendingAppointments++
                                break
                            case "confirmed":
                                acc.confirmedAppointments++
                                break
                            case "completed":
                                acc.completedAppointments++
                                break
                        }
                        return acc
                    },
                    {
                        totalAppointments: 0,
                        pendingAppointments: 0,
                        confirmedAppointments: 0,
                        completedAppointments: 0,
                    },
                )
                setStats(stats)
            } else if (response.status === 401) {
                window.location.replace("/admin/login")
            }
        } catch (error) {
            console.error("Error fetching appointments:", error)
        } finally {
            setLoading(false)
        }
    }

    const updateAppointmentStatus = async (id: number, status: string) => {
        try {
            const response = await fetch(`/api/appointments/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
                credentials: "include",
            })
            if (response.ok) {
                fetchAppointments()
            } else if (response.status === 401) {
                window.location.replace("/admin/login")
            }
        } catch (error) {
            console.error("Error updating appointment:", error)
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-800"
            case "confirmed":
                return "bg-blue-100 text-blue-800"
            case "completed":
                return "bg-green-100 text-green-800"
            case "cancelled":
                return "bg-red-100 text-red-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    const formatTime = (timeString: string) => {
        if (!timeString) return "Not specified"
        return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })
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
                    </div>
                </header>
                <main className="p-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-0 shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-teal-600 text-sm font-medium">Total Appointments</p>
                                        <p className="text-3xl font-bold text-gray-900">{stats.totalAppointments}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-0 shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-yellow-600 text-sm font-medium">Pending</p>
                                        <p className="text-3xl font-bold text-gray-900">{stats.pendingAppointments}</p>
                                    </div>
                                    <AlertCircle className="h-8 w-8 text-yellow-600" />
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-blue-600 text-sm font-medium">Confirmed</p>
                                        <p className="text-3xl font-bold text-gray-900">{stats.confirmedAppointments}</p>
                                    </div>
                                    <CheckCircle className="h-8 w-8 text-blue-600" />
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-green-600 text-sm font-medium">Completed</p>
                                        <p className="text-3xl font-bold text-gray-900">{stats.completedAppointments}</p>
                                    </div>
                                    <CheckCircle className="h-8 w-8 text-green-600" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <Card className="bg-white border-0 shadow-lg rounded-2xl">
                        <CardContent className="p-0">
                            <div className="p-6 border-b border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900">Recent Appointments</h2>
                            </div>
                            {loading ? (
                                <div className="p-8 text-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
                                    <p className="text-gray-500 mt-2">Loading appointments...</p>
                                </div>
                            ) : appointments.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">No appointments found</div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Patient
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Service
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Date & Time
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {appointments.slice(0, 10).map((appointment) => (
                                                <tr key={appointment.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4">
                                                        <div>
                                                            <div className="font-medium text-gray-900">
                                                                {appointment.first_name} {appointment.last_name}
                                                            </div>
                                                            <div className="text-sm text-gray-500">{appointment.email}</div>
                                                            <div className="text-sm text-gray-500">{appointment.phone}</div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">
                                                        {appointment.service_title || "General Consultation"}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">
                                                        <div>{formatDate(appointment.preferred_date)}</div>
                                                        <div className="text-gray-500">{formatTime(appointment.preferred_time)}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span
                                                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                                                appointment.status,
                                                            )}`}
                                                        >
                                                            {appointment.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex space-x-2">
                                                            {appointment.status === "pending" && (
                                                                <Button
                                                                    size="sm"
                                                                    onClick={() => updateAppointmentStatus(appointment.id, "confirmed")}
                                                                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1"
                                                                >
                                                                    Confirm
                                                                </Button>
                                                            )}
                                                            {appointment.status === "confirmed" && (
                                                                <Button
                                                                    size="sm"
                                                                    onClick={() => updateAppointmentStatus(appointment.id, "completed")}
                                                                    className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1"
                                                                >
                                                                    Complete
                                                                </Button>
                                                            )}
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => updateAppointmentStatus(appointment.id, "cancelled")}
                                                                className="border-red-300 text-red-600 hover:bg-red-50 text-xs px-3 py-1"
                                                            >
                                                                Cancel
                                                            </Button>
                                                        </div>
                                                    </td>
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