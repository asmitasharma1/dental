"use client"

import React from "react"
import type { ReactElement } from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Pencil, Trash2 } from "lucide-react"
import Sidebar from "@/components/Sidebar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const VALID_CATEGORIES = ["general", "cosmetic", "pediatric", "restorative"]

interface Service {
  id: number
  title: string
  description: string
  category: string
  price: number
  duration: string
  image_url: string
  why_use_service: string
  what_if_not_used: string
  before_appointment: string
  after_service: string
}

export default function AdminServices(): ReactElement {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [newService, setNewService] = useState<Partial<Service>>({
    title: "",
    description: "",
    category: "",
    price: 0,
    duration: "",
    image_url: "",
    why_use_service: "",
    what_if_not_used: "",
    before_appointment: "",
    after_service: "",
  })

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
      toast({ title: "Error", description: "Failed to fetch services.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (service: Service) => {
    setEditingService({ ...service }) // Create a copy
    setIsEditModalOpen(true)
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingService) return

    try {
      const response = await fetch(`/api/services/${editingService.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingService),
        credentials: "include",
      })

      if (response.ok) {
        setServices(services.map((s) => (s.id === editingService.id ? editingService : s)))
        setIsEditModalOpen(false)
        setEditingService(null)
        toast({ title: "Success", description: "Service updated successfully." })
      } else {
        throw new Error("Failed to update service")
      }
    } catch (error) {
      console.error("Error updating service:", error)
      toast({ title: "Error", description: "Failed to update service.", variant: "destructive" })
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this service?")) return

    try {
      const response = await fetch(`/api/services/${id}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (response.ok) {
        setServices(services.filter((s) => s.id !== id))
        toast({ title: "Success", description: "Service deleted successfully." })
      } else {
        throw new Error("Failed to delete service")
      }
    } catch (error) {
      console.error("Error deleting service:", error)
      toast({ title: "Error", description: "Failed to delete service.", variant: "destructive" })
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newService.title) {
      toast({ title: "Error", description: "Title is required.", variant: "destructive" })
      return
    }

    try {
      const response = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newService),
        credentials: "include",
      })

      if (response.ok) {
        const { id } = await response.json()
        setServices([...services, { ...newService, id } as Service])
        setIsAddModalOpen(false)
        setNewService({
          title: "",
          description: "",
          category: "",
          price: 0,
          duration: "",
          image_url: "",
          why_use_service: "",
          what_if_not_used: "",
          before_appointment: "",
          after_service: "",
        })
        toast({ title: "Success", description: "Service added successfully." })
      } else {
        throw new Error("Failed to add service")
      }
    } catch (error) {
      console.error("Error adding service:", error)
      toast({ title: "Error", description: "Failed to add service.", variant: "destructive" })
    }
  }

  // Wrapper functions to handle type conversion
  const updateEditingService = (updates: Partial<Service>) => {
    if (editingService) {
      setEditingService({ ...editingService, ...updates })
    }
  }

  const updateNewService = (updates: Partial<Service>) => {
    setNewService((prev) => ({ ...prev, ...updates }))
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1 lg:ml-6">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-teal-700 bg-clip-text text-transparent">
              Services Management
            </h1>
            <Button onClick={() => setIsAddModalOpen(true)} className="bg-teal-600 hover:bg-teal-700 text-white">
              <Plus className="h-4 w-4 mr-2" /> Add New Service
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
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {services.map((service) => (
                        <tr key={service.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-900">{service.title}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 capitalize">{service.category}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">NPR {service.price}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{service.duration} min</td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            <Button variant="ghost" size="sm" onClick={() => handleEdit(service)}>
                              <Pencil className="h-4 w-4 mr-1" /> Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleDelete(service.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" /> Delete
                            </Button>
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

        {/* Edit Modal */}
        {editingService && (
          <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Service</DialogTitle>
              </DialogHeader>
              <ServiceForm
                service={editingService}
                updateService={updateEditingService}
                onSubmit={handleUpdate}
                submitText="Save Changes"
                isEdit={true}
              />
            </DialogContent>
          </Dialog>
        )}

        {/* Add Modal */}
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
            </DialogHeader>
            <ServiceForm
              service={newService}
              updateService={updateNewService}
              onSubmit={handleAdd}
              submitText="Add Service"
              isEdit={false}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

// Separate ServiceForm component to prevent re-renders
const ServiceForm = React.memo(
  ({
    service,
    updateService,
    onSubmit,
    submitText,
    isEdit,
  }: {
    service: Partial<Service>
    updateService: (updates: Partial<Service>) => void
    onSubmit: (e: React.FormEvent) => void
    submitText: string
    isEdit: boolean
  }) => {
    const [activeTab, setActiveTab] = useState("basic")

    const handleFieldChange = (field: keyof Service, value: any) => {
      updateService({ [field]: value })
    }

    return (
      <form onSubmit={onSubmit}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="qa">Q&A Content</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={service.title || ""}
                onChange={(e) => handleFieldChange("title", e.target.value)}
                className="col-span-3"
                autoComplete="off"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={service.description || ""}
                onChange={(e) => handleFieldChange("description", e.target.value)}
                className="col-span-3"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select value={service.category || ""} onValueChange={(value) => handleFieldChange("category", value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {VALID_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                type="number"
                value={service.price || 0}
                onChange={(e) => handleFieldChange("price", Number.parseFloat(e.target.value) || 0)}
                className="col-span-3"
                autoComplete="off"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right">
                Duration
              </Label>
              <Input
                id="duration"
                value={service.duration || ""}
                onChange={(e) => handleFieldChange("duration", e.target.value)}
                className="col-span-3"
                placeholder="e.g., 30 minutes"
                autoComplete="off"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image_url" className="text-right">
                Image URL
              </Label>
              <Input
                id="image_url"
                value={service.image_url || ""}
                onChange={(e) => handleFieldChange("image_url", e.target.value)}
                className="col-span-3"
                placeholder="Add image url"
                autoComplete="off"
              />
            </div>
          </TabsContent>

          <TabsContent value="qa" className="space-y-4">
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="why_use" className="text-right pt-2">
                Why use this service?
              </Label>
              <Textarea
                id="why_use"
                value={service.why_use_service || ""}
                onChange={(e) => handleFieldChange("why_use_service", e.target.value)}
                className="col-span-3"
                rows={3}
                placeholder="Explain the benefits and importance of this service..."
              />
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="what_if_not" className="text-right pt-2">
                What happens if not used?
              </Label>
              <Textarea
                id="what_if_not"
                value={service.what_if_not_used || ""}
                onChange={(e) => handleFieldChange("what_if_not_used", e.target.value)}
                className="col-span-3"
                rows={3}
                placeholder="Describe potential consequences of not getting this service..."
              />
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="before_appointment" className="text-right pt-2">
                Before appointment
              </Label>
              <Textarea
                id="before_appointment"
                value={service.before_appointment || ""}
                onChange={(e) => handleFieldChange("before_appointment", e.target.value)}
                className="col-span-3"
                rows={3}
                placeholder="Instructions for patients before their appointment..."
              />
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="after_service" className="text-right pt-2">
                After service care
              </Label>
              <Textarea
                id="after_service"
                value={service.after_service || ""}
                onChange={(e) => handleFieldChange("after_service", e.target.value)}
                className="col-span-3"
                rows={3}
                placeholder="Post-treatment care instructions..."
              />
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white">
            {submitText}
          </Button>
        </DialogFooter>
      </form>
    )
  },
)

ServiceForm.displayName = "ServiceForm"
