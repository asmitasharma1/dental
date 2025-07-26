"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, RefreshCw, Filter, X } from "lucide-react"
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
  message: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  created_at: string
}

interface Filters {
  status: string
  service: string
  dateFrom: string
  dateTo: string
  search: string
}

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    status: "all",
    service: "all",
    dateFrom: "",
    dateTo: "",
    search: "",
  })

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    setLoading(true)
    setError("")
    try {
      console.log("Fetching appointments...") // Debug log
      const response = await fetch("/api/appointments", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
      console.log("Response status:", response.status) // Debug log
      if (response.ok) {
        const data = await response.json()
        console.log("Fetched appointments data:", data) // Debug log
        setAppointments(Array.isArray(data) ? data : [])
      } else if (response.status === 401) {
        window.location.replace("/admin/login")
      } else {
        const errorData = await response.json()
        console.error("API Error:", errorData)
        setError(`Failed to fetch appointments: ${errorData.error || "Unknown error"}`)
      }
    } catch (error) {
      console.error("Network error:", error)
      setError("Network error. Please check your connection.")
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
        // Update the local state immediately
        setAppointments((prev) => prev.map((apt) => (apt.id === id ? { ...apt, status: status as any } : apt)))
        // Also refetch to ensure consistency
        fetchAppointments()
      } else if (response.status === 401) {
        window.location.replace("/admin/login")
      } else {
        const errorData = await response.json()
        setError(`Failed to update appointment: ${errorData.error || "Unknown error"}`)
      }
    } catch (error) {
      console.error("Error updating appointment:", error)
      setError("Failed to update appointment")
    }
  }

  // Get unique services for filter dropdown
  const uniqueServices = useMemo(() => {
    const services = appointments.map((apt) => apt.service_title).filter((service) => service && service.trim() !== "")
    return [...new Set(services)].sort()
  }, [appointments])

  // Filter appointments based on current filters
  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      // Status filter
      if (filters.status !== "all" && appointment.status !== filters.status) {
        return false
      }

      // Service filter
      if (filters.service !== "all" && appointment.service_title !== filters.service) {
        return false
      }

      // Date range filter
      if (filters.dateFrom) {
        const appointmentDate = new Date(appointment.preferred_date)
        const fromDate = new Date(filters.dateFrom)
        if (appointmentDate < fromDate) {
          return false
        }
      }

      if (filters.dateTo) {
        const appointmentDate = new Date(appointment.preferred_date)
        const toDate = new Date(filters.dateTo)
        if (appointmentDate > toDate) {
          return false
        }
      }

      // Search filter (name, email, phone)
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        const fullName = `${appointment.first_name} ${appointment.last_name}`.toLowerCase()
        const email = appointment.email.toLowerCase()
        const phone = appointment.phone.toLowerCase()

        if (!fullName.includes(searchTerm) && !email.includes(searchTerm) && !phone.includes(searchTerm)) {
          return false
        }
      }

      return true
    })
  }, [appointments, filters])

  const clearFilters = () => {
    setFilters({
      status: "all",
      service: "all",
      dateFrom: "",
      dateTo: "",
      search: "",
    })
  }

  const hasActiveFilters =
    filters.status !== "all" ||
    filters.service !== "all" ||
    filters.dateFrom !== "" ||
    filters.dateTo !== "" ||
    filters.search !== ""

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not specified"
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
          <div className="px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-teal-700 bg-clip-text text-transparent">
                Appointments ({filteredAppointments.length}
                {appointments.length !== filteredAppointments.length && ` of ${appointments.length}`})
              </h1>
              {hasActiveFilters && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                  Filtered
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="border-teal-300 text-teal-700 hover:bg-teal-50"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button
                onClick={fetchAppointments}
                disabled={loading}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </div>
        </header>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search */}
              <div className="space-y-2">
                <Label htmlFor="search" className="text-sm font-medium text-gray-700">
                  Search
                </Label>
                <Input
                  id="search"
                  placeholder="Name, email, or phone..."
                  value={filters.search}
                  onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                  className="h-9"
                />
              </div>

              {/* Status Filter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Status</Label>
                <Select
                  value={filters.status}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, status: value }))}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Service Filter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Service</Label>
                <Select
                  value={filters.service}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, service: value }))}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="All services" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Services</SelectItem>
                    {uniqueServices.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date From */}
              <div className="space-y-2">
                <Label htmlFor="dateFrom" className="text-sm font-medium text-gray-700">
                  From Date
                </Label>
                <Input
                  id="dateFrom"
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters((prev) => ({ ...prev, dateFrom: e.target.value }))}
                  className="h-9"
                />
              </div>

              {/* Date To */}
              <div className="space-y-2">
                <Label htmlFor="dateTo" className="text-sm font-medium text-gray-700">
                  To Date
                </Label>
                <Input
                  id="dateTo"
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => setFilters((prev) => ({ ...prev, dateTo: e.target.value }))}
                  className="h-9"
                />
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <div className="mt-4 flex justify-end">
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  size="sm"
                  className="text-gray-600 hover:text-gray-800 bg-transparent"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        )}

        <main className="p-6">
          {error && (
            <Card className="bg-red-50 border-red-200 mb-6">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <p className="text-red-800">{error}</p>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="bg-white border-0 shadow-lg rounded-2xl">
            <CardContent className="p-0">
              {loading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
                  <p className="text-gray-500 mt-2">Loading appointments...</p>
                </div>
              ) : filteredAppointments.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium">
                    {hasActiveFilters ? "No appointments match your filters" : "No appointments found"}
                  </p>
                  <p className="text-sm">
                    {hasActiveFilters
                      ? "Try adjusting your filter criteria to see more results."
                      : "Appointments will appear here once patients book them."}
                  </p>
                  {hasActiveFilters && (
                    <Button onClick={clearFilters} variant="outline" size="sm" className="mt-4 bg-transparent">
                      Clear Filters
                    </Button>
                  )}
                </div>
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
                      {filteredAppointments.map((appointment) => (
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
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {appointment.service_title || "General Consultation"}
                            </div>
                            {appointment.message && (
                              <div className="text-xs text-gray-500 mt-1 max-w-xs truncate">{appointment.message}</div>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            <div>{formatDate(appointment.preferred_date)}</div>
                            <div className="text-gray-500">{formatTime(appointment.preferred_time)}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                                appointment.status,
                              )}`}
                            >
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
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
                              {appointment.status !== "cancelled" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateAppointmentStatus(appointment.id, "cancelled")}
                                  className="border-red-300 text-red-600 hover:bg-red-50 text-xs px-3 py-1"
                                >
                                  Cancel
                                </Button>
                              )}
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
