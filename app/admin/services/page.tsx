"use client"

import React from "react"
import type { ReactElement } from "react"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Pencil, Trash2, Search, Eye, AlertTriangle, CheckCircle } from "lucide-react"
import Sidebar from "@/components/Sidebar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"

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

interface ValidationErrors {
  title?: string
  description?: string
  category?: string
  price?: string
  duration?: string
  image_url?: string
}

export default function AdminServices(): ReactElement {
  const [services, setServices] = useState<Service[]>([])
  const [filteredServices, setFilteredServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false)
  const [previewService, setPreviewService] = useState<Service | null>(null)
  
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  
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

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})

  // Fetch services on component mount
  useEffect(() => {
    fetchServices()
  }, [])

  // Filter services based on search and category
  useEffect(() => {
    let filtered = services

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(service => service.category === selectedCategory)
    }

    setFilteredServices(filtered)
  }, [services, searchTerm, selectedCategory])

  const fetchServices = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/services", {
        credentials: "include",
      })
      
      if (response.ok) {
        const data = await response.json()
        setServices(data)
      } else if (response.status === 401) {
        window.location.replace("/admin/login")
      } else {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    } catch (error) {
      console.error("Error fetching services:", error)
      toast({ 
        title: "Error", 
        description: "Failed to fetch services. Please try again.", 
        variant: "destructive" 
      })
    } finally {
      setLoading(false)
    }
  }

  const validateService = (service: Partial<Service>): ValidationErrors => {
    const errors: ValidationErrors = {}

    // Title validation
    if (!service.title?.trim()) {
      errors.title = "Title is required"
    } else if (service.title.trim().length < 3) {
      errors.title = "Title must be at least 3 characters long"
    } else if (service.title.trim().length > 100) {
      errors.title = "Title must be less than 100 characters"
    }

    // Description validation
    if (service.description && service.description.length > 500) {
      errors.description = "Description must be less than 500 characters"
    }

    // Category validation
    if (!service.category) {
      errors.category = "Category is required"
    } else if (!VALID_CATEGORIES.includes(service.category)) {
      errors.category = "Invalid category selected"
    }

    // Price validation
    if (service.price === undefined || service.price === null || service.price < 0) {
      errors.price = "Price must be a positive number"
    } else if (service.price > 1000000) {
      errors.price = "Price must be less than 1,000,000"
    }

    // Duration validation
    if (!service.duration?.trim()) {
      errors.duration = "Duration is required"
    } else if (service.duration.trim().length > 50) {
      errors.duration = "Duration must be less than 50 characters"
    }

    // Image URL validation (basic)
    if (service.image_url && service.image_url.trim()) {
      const urlPattern = /^https?:\/\/.+/
      if (!urlPattern.test(service.image_url.trim())) {
        errors.image_url = "Please enter a valid HTTP/HTTPS URL"
      }
    }

    return errors
  }

  const handleEdit = (service: Service) => {
    setEditingService({ ...service })
    setValidationErrors({})
    setHasUnsavedChanges(false)
    setIsEditModalOpen(true)
  }

  const handlePreview = (service: Service) => {
    setPreviewService(service)
    setIsPreviewModalOpen(true)
  }

  const handleCloseEditModal = () => {
    if (hasUnsavedChanges) {
      if (confirm("You have unsaved changes. Are you sure you want to close?")) {
        setIsEditModalOpen(false)
        setEditingService(null)
        setValidationErrors({})
        setHasUnsavedChanges(false)
      }
    } else {
      setIsEditModalOpen(false)
      setEditingService(null)
      setValidationErrors({})
    }
  }

  const handleCloseAddModal = () => {
    const hasChanges = Object.values(newService).some(value => 
      value !== "" && value !== 0 && value !== null && value !== undefined
    )
    
    if (hasChanges) {
      if (confirm("You have unsaved changes. Are you sure you want to close?")) {
        setIsAddModalOpen(false)
        resetNewService()
        setValidationErrors({})
      }
    } else {
      setIsAddModalOpen(false)
      resetNewService()
      setValidationErrors({})
    }
  }

  const resetNewService = () => {
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
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingService) return

    const errors = validateService(editingService)
    setValidationErrors(errors)

    if (Object.keys(errors).length > 0) {
      toast({ 
        title: "Validation Error", 
        description: "Please fix the errors before saving.", 
        variant: "destructive" 
      })
      return
    }

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
        setValidationErrors({})
        setHasUnsavedChanges(false)
        toast({ 
          title: "Success", 
          description: "Service updated successfully." 
        })
      } else {
        throw new Error("Failed to update service")
      }
    } catch (error) {
      console.error("Error updating service:", error)
      toast({ 
        title: "Error", 
        description: "Failed to update service. Please try again.", 
        variant: "destructive" 
      })
    }
  }

  const handleDelete = async (id: number) => {
    const service = services.find(s => s.id === id)
    const serviceName = service?.title || "this service"
    
    if (!confirm(`Are you sure you want to delete "${serviceName}"? This action cannot be undone.`)) {
      return
    }

    try {
      const response = await fetch(`/api/services/${id}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (response.ok) {
        setServices(services.filter((s) => s.id !== id))
        toast({ 
          title: "Success", 
          description: `Service "${serviceName}" deleted successfully.` 
        })
      } else {
        throw new Error("Failed to delete service")
      }
    } catch (error) {
      console.error("Error deleting service:", error)
      toast({ 
        title: "Error", 
        description: "Failed to delete service. Please try again.", 
        variant: "destructive" 
      })
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const errors = validateService(newService)
    setValidationErrors(errors)

    if (Object.keys(errors).length > 0) {
      toast({ 
        title: "Validation Error", 
        description: "Please fix the errors before adding the service.", 
        variant: "destructive" 
      })
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
        const addedService = { ...newService, id } as Service
        setServices([...services, addedService])
        setIsAddModalOpen(false)
        resetNewService()
        setValidationErrors({})
        toast({ 
          title: "Success", 
          description: `Service "${addedService.title}" added successfully.` 
        })
      } else {
        throw new Error("Failed to add service")
      }
    } catch (error) {
      console.error("Error adding service:", error)
      toast({ 
        title: "Error", 
        description: "Failed to add service. Please try again.", 
        variant: "destructive" 
      })
    }
  }

  const updateEditingService = useCallback((updates: Partial<Service>) => {
    if (editingService) {
      setEditingService({ ...editingService, ...updates })
      setHasUnsavedChanges(true)
    }
  }, [editingService])

  const updateNewService = useCallback((updates: Partial<Service>) => {
    setNewService((prev) => ({ ...prev, ...updates }))
  }, [])

  const clearSearch = () => {
    setSearchTerm("")
    setSelectedCategory("all")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      <Sidebar />
      
      <div className="flex-1 lg:ml-6">
        {/* Header Section */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-teal-700 bg-clip-text text-transparent">
                Services Management
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage your dental services, pricing, and content
              </p>
            </div>
            
            <Button 
              onClick={() => setIsAddModalOpen(true)} 
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" /> 
              Add New Service
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 space-y-6">
          {/* Search and Filter Section */}
          <Card className="bg-white border-0 shadow-sm rounded-lg">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search services by title, description, or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Category Filter */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {VALID_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Clear Filters Button */}
                {(searchTerm || selectedCategory !== "all") && (
                  <Button variant="outline" onClick={clearSearch} size="sm">
                    Clear Filters
                  </Button>
                )}
              </div>

              {/* Results Summary */}
              {services.length > 0 && (
                <div className="mt-4 text-sm text-gray-600">
                  Showing {filteredServices.length} of {services.length} services
                  {searchTerm && (
                    <span className="ml-1">
                      matching "{searchTerm}"
                    </span>
                  )}
                  {selectedCategory !== "all" && (
                    <span className="ml-1">
                      in "{selectedCategory}" category
                    </span>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Services Table */}
          <Card className="bg-white border-0 shadow-lg rounded-2xl">
            <CardContent className="p-0">
              {loading ? (
                <div className="p-8 text-center space-y-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
                  <p className="text-gray-500">Loading services...</p>
                </div>
              ) : services.length === 0 ? (
                <div className="p-8 text-center space-y-4">
                  <div className="text-gray-400">
                    <Plus className="h-16 w-16 mx-auto mb-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
                    <p className="text-gray-500 mb-6">Get started by adding your first service.</p>
                    <Button 
                      onClick={() => setIsAddModalOpen(true)}
                      className="bg-teal-600 hover:bg-teal-700 text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Service
                    </Button>
                  </div>
                </div>
              ) : filteredServices.length === 0 ? (
                <div className="p-8 text-center space-y-4">
                  <div className="text-gray-400">
                    <Search className="h-16 w-16 mx-auto mb-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No matching services</h3>
                    <p className="text-gray-500 mb-6">
                      Try adjusting your search terms or filters.
                    </p>
                    <Button variant="outline" onClick={clearSearch}>
                      Clear Filters
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Service Details
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price & Duration
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredServices.map((service) => (
                        <tr key={service.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <div className="text-sm font-medium text-gray-900">
                                {service.title}
                              </div>
                              {service.description && (
                                <div className="text-sm text-gray-500 max-w-xs truncate">
                                  {service.description}
                                </div>
                              )}
                              {service.image_url && (
                                <div className="flex items-center gap-1 text-xs text-green-600">
                                  <CheckCircle className="h-3 w-3" />
                                  Image available
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800 capitalize">
                              {service.category}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <div className="text-sm font-medium text-gray-900">
                                NPR {service.price?.toLocaleString() || '0'}
                              </div>
                              <div className="text-xs text-gray-500">
                                {service.duration}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handlePreview(service)}
                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleEdit(service)}
                                className="text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleDelete(service.id)}
                              >
                                <Trash2 className="h-4 w-4" />
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

        {/* Edit Modal */}
        {editingService && (
          <Dialog open={isEditModalOpen} onOpenChange={handleCloseEditModal}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Pencil className="h-5 w-5" />
                  Edit Service
                </DialogTitle>
                {hasUnsavedChanges && (
                  <p className="text-sm text-amber-600 flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4" />
                    You have unsaved changes
                  </p>
                )}
              </DialogHeader>
              <ServiceForm
                service={editingService}
                updateService={updateEditingService}
                onSubmit={handleUpdate}
                submitText="Save Changes"
                isEdit={true}
                validationErrors={validationErrors}
              />
            </DialogContent>
          </Dialog>
        )}

        {/* Add Modal */}
        <Dialog open={isAddModalOpen} onOpenChange={handleCloseAddModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Service
              </DialogTitle>
            </DialogHeader>
            <ServiceForm
              service={newService}
              updateService={updateNewService}
              onSubmit={handleAdd}
              submitText="Add Service"
              isEdit={false}
              validationErrors={validationErrors}
            />
          </DialogContent>
        </Dialog>

        {/* Preview Modal */}
        {previewService && (
          <Dialog open={isPreviewModalOpen} onOpenChange={setIsPreviewModalOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Service Preview
                </DialogTitle>
              </DialogHeader>
              <ServicePreview service={previewService} />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}

// Enhanced ServiceForm component with validation
const ServiceForm = React.memo(
  ({
    service,
    updateService,
    onSubmit,
    submitText,
    isEdit,
    validationErrors = {}
  }: {
    service: Partial<Service>
    updateService: (updates: Partial<Service>) => void
    onSubmit: (e: React.FormEvent) => void
    submitText: string
    isEdit: boolean
    validationErrors?: ValidationErrors
  }) => {
    const [activeTab, setActiveTab] = useState("basic")

    const handleFieldChange = (field: keyof Service, value: any) => {
      updateService({ [field]: value })
    }

    const getFieldError = (field: keyof ValidationErrors) => {
      return validationErrors[field]
    }

    return (
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Validation Summary */}
        {Object.keys(validationErrors).length > 0 && (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              Please fix the following errors before proceeding:
              
              <ul className="list-disc list-inside mt-2 space-y-1">
                {Object.entries(validationErrors).map(([field, error]) => (
                  <li key={field} className="text-sm">
                    <strong className="capitalize">{field.replace('_', ' ')}:</strong> {error}
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic" className="flex items-center gap-2">
              Basic Info
              {(getFieldError('title') || getFieldError('category') || getFieldError('price') || getFieldError('duration') || getFieldError('image_url')) && (
                <AlertTriangle className="h-3 w-3 text-red-500" />
              )}
            </TabsTrigger>
            <TabsTrigger value="qa">Q&A Content</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6 mt-6">
            {/* Title Field */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right font-medium">
                Title *
              </Label>
              <div className="col-span-3 space-y-1">
                <Input
                  id="title"
                  value={service.title || ""}
                  onChange={(e) => handleFieldChange("title", e.target.value)}
                  className={`${getFieldError('title') ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder="Enter service title"
                  autoComplete="off"
                />
                {getFieldError('title') && (
                  <p className="text-sm text-red-600">{getFieldError('title')}</p>
                )}
                <p className="text-xs text-gray-500">
                  {service.title?.length || 0}/100 characters
                </p>
              </div>
            </div>

            {/* Description Field */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right font-medium pt-2">
                Description
              </Label>
              <div className="col-span-3 space-y-1">
                <Textarea
                  id="description"
                  value={service.description || ""}
                  onChange={(e) => handleFieldChange("description", e.target.value)}
                  className={`${getFieldError('description') ? 'border-red-500 focus:border-red-500' : ''}`}
                  rows={3}
                  placeholder="Brief description of the service"
                />
                {getFieldError('description') && (
                  <p className="text-sm text-red-600">{getFieldError('description')}</p>
                )}
                <p className="text-xs text-gray-500">
                  {service.description?.length || 0}/500 characters
                </p>
              </div>
            </div>

            {/* Category Field */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right font-medium">
                Category *
              </Label>
              <div className="col-span-3 space-y-1">
                <Select 
                  value={service.category || ""} 
                  onValueChange={(value) => handleFieldChange("category", value)}
                >
                  <SelectTrigger className={`${getFieldError('category') ? 'border-red-500 focus:border-red-500' : ''}`}>
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
                {getFieldError('category') && (
                  <p className="text-sm text-red-600">{getFieldError('category')}</p>
                )}
              </div>
            </div>

            {/* Price Field */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right font-medium">
                Price (NPR) *
              </Label>
              <div className="col-span-3 space-y-1">
                <Input
                  id="price"
                  type="number"
                  value={service.price || 0}
                  onChange={(e) => handleFieldChange("price", Number.parseFloat(e.target.value) || 0)}
                  className={`${getFieldError('price') ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder="0"
                  min="0"
                  max="1000000"
                  step="0.01"
                  autoComplete="off"
                />
                {getFieldError('price') && (
                  <p className="text-sm text-red-600">{getFieldError('price')}</p>
                )}
                <p className="text-xs text-gray-500">
                  Enter price in Nepali Rupees
                </p>
              </div>
            </div>

            {/* Duration Field */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right font-medium">
                Duration *
              </Label>
              <div className="col-span-3 space-y-1">
                <Input
                  id="duration"
                  value={service.duration || ""}
                  onChange={(e) => handleFieldChange("duration", e.target.value)}
                  className={`${getFieldError('duration') ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder="e.g., 30 minutes, 1 hour"
                  autoComplete="off"
                />
                {getFieldError('duration') && (
                  <p className="text-sm text-red-600">{getFieldError('duration')}</p>
                )}
                <p className="text-xs text-gray-500">
                  Estimated time for the procedure
                </p>
              </div>
            </div>

            {/* Image URL Field */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="image_url" className="text-right font-medium pt-2">
                Image URL
              </Label>
              <div className="col-span-3 space-y-2">
                <Input
                  id="image_url"
                  value={service.image_url || ""}
                  onChange={(e) => handleFieldChange("image_url", e.target.value)}
                  className={`${getFieldError('image_url') ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder="https://example.com/image.jpg"
                  autoComplete="off"
                />
                {getFieldError('image_url') && (
                  <p className="text-sm text-red-600">{getFieldError('image_url')}</p>
                )}
                
                {/* Image Preview */}
                {service.image_url && !getFieldError('image_url') && (
                  <div className="mt-2 p-3 border border-gray-200 rounded-lg bg-gray-50">
                    <p className="text-xs font-medium text-gray-600 mb-2">Image Preview:</p>
                    <img 
                      src={service.image_url} 
                      alt="Service preview"
                      className="max-w-full h-32 object-cover rounded-md border"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling!.classList.remove('hidden');
                      }}
                    />
                    <div className="hidden text-sm text-red-600 mt-2">
                      Failed to load image. Please check the URL.
                    </div>
                  </div>
                )}
                
                <p className="text-xs text-gray-500">
                  Optional: Add an image URL to display with this service
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="qa" className="space-y-6 mt-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-medium text-blue-900 mb-2">Q&A Content Guidelines</h3>
              <p className="text-sm text-blue-800">
                These fields help educate patients about your services. Provide clear, informative content that addresses common questions and concerns.
              </p>
            </div>

            {/* Why Use Service Field */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="why_use" className="text-right pt-2 font-medium">
                Why use this service?
              </Label>
              <div className="col-span-3 space-y-1">
                <Textarea
                  id="why_use"
                  value={service.why_use_service || ""}
                  onChange={(e) => handleFieldChange("why_use_service", e.target.value)}
                  className="min-h-[100px]"
                  rows={4}
                  placeholder="Explain the benefits and importance of this service...

• What problems does it solve?
• What are the key benefits?
• Why is it recommended?"
                />
                <p className="text-xs text-gray-500">
                  Help patients understand the value and benefits of this service
                </p>
              </div>
            </div>

            {/* What If Not Used Field */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="what_if_not" className="text-right pt-2 font-medium">
                What happens if not used?
              </Label>
              <div className="col-span-3 space-y-1">
                <Textarea
                  id="what_if_not"
                  value={service.what_if_not_used || ""}
                  onChange={(e) => handleFieldChange("what_if_not_used", e.target.value)}
                  className="min-h-[100px]"
                  rows={4}
                  placeholder="Describe potential consequences of not getting this service...

• What risks or complications might arise?
• How might the condition worsen?
• What are the long-term implications?"
                />
                <p className="text-xs text-gray-500">
                  Educate patients about the importance of timely treatment
                </p>
              </div>
            </div>

            {/* Before Appointment Field */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="before_appointment" className="text-right pt-2 font-medium">
                Before appointment
              </Label>
              <div className="col-span-3 space-y-1">
                <Textarea
                  id="before_appointment"
                  value={service.before_appointment || ""}
                  onChange={(e) => handleFieldChange("before_appointment", e.target.value)}
                  className="min-h-[100px]"
                  rows={4}
                  placeholder="Instructions for patients before their appointment...

• What should they avoid eating/drinking?
• What medications should they take/avoid?
• What should they bring?
• How should they prepare?"
                />
                <p className="text-xs text-gray-500">
                  Pre-appointment instructions and preparation guidelines
                </p>
              </div>
            </div>

            {/* After Service Care Field */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="after_service" className="text-right pt-2 font-medium">
                After service care
              </Label>
              <div className="col-span-3 space-y-1">
                <Textarea
                  id="after_service"
                  value={service.after_service || ""}
                  onChange={(e) => handleFieldChange("after_service", e.target.value)}
                  className="min-h-[100px]"
                  rows={4}
                  placeholder="Post-treatment care instructions...

• What activities should they avoid?
• What foods/drinks are recommended?
• How to manage pain or discomfort?
• When to schedule follow-up?
• Warning signs to watch for?"
                />
                <p className="text-xs text-gray-500">
                  Post-treatment care and recovery instructions
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-8 pt-6 border-t">
          <div className="flex justify-between items-center w-full">
            <div className="text-sm text-gray-500">
              * Required fields
            </div>
            <div className="flex gap-3">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => {
                  // Handle cancel - could trigger parent close handler
                }}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-teal-600 hover:bg-teal-700 text-white"
                disabled={Object.keys(validationErrors).length > 0}
              >
                {isEdit ? <CheckCircle className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                {submitText}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </form>
    )
  },
)

// Service Preview Component
const ServicePreview = ({ service }: { service: Service }) => {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="border-b pb-6">
        <div className="flex items-start gap-6">
          {/* Service Image */}
          {service.image_url && (
            <div className="flex-shrink-0">
              <img 
                src={service.image_url} 
                alt={service.title}
                className="w-32 h-32 object-cover rounded-lg border shadow-sm"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          )}
          
          {/* Service Details */}
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {service.title}
              </h2>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800 capitalize">
                {service.category}
              </span>
            </div>
            
            {service.description && (
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Price</h3>
                <p className="text-lg font-semibold text-gray-900">
                  NPR {service.price?.toLocaleString() || '0'}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Duration</h3>
                <p className="text-lg font-semibold text-gray-900">
                  {service.duration}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Q&A Content */}
      <div className="space-y-8">
        {service.why_use_service && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Why choose this service?
            </h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                {service.why_use_service}
              </p>
            </div>
          </div>
        )}

        {service.what_if_not_used && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              What if you don't get this treatment?
            </h3>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                {service.what_if_not_used}
              </p>
            </div>
          </div>
        )}

        {service.before_appointment && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Plus className="h-5 w-5 text-blue-600" />
              Before your appointment
            </h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                {service.before_appointment}
              </p>
            </div>
          </div>
        )}

        {service.after_service && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-purple-600" />
              After treatment care
            </h3>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                {service.after_service}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t pt-6 text-center">
        <p className="text-sm text-gray-500">
          This is how your service will appear to patients
        </p>
      </div>
    </div>
  )
}

ServiceForm.displayName = "ServiceForm"