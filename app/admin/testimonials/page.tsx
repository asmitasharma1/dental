"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, Star, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Sidebar from "@/components/Sidebar"

interface Testimonial {
    id: number
    name: string
    service: string | null
    quote: string
    rating: number
    is_active: boolean
    created_at: string
    updated_at: string
}

interface TestimonialFormData {
    name: string
    service: string
    quote: string
    rating: number
    is_active: boolean
}

export default function AdminTestimonials() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([])
    const [loading, setLoading] = useState(true)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
    const [formData, setFormData] = useState<TestimonialFormData>({
        name: "",
        service: "",
        quote: "",
        rating: 5,
        is_active: true,
    })
    const { toast } = useToast()

    useEffect(() => {
        fetchTestimonials()
    }, [])

    const fetchTestimonials = async () => {
        try {
            const response = await fetch("/api/testimonials")
            if (response.ok) {
                const data = await response.json()
                setTestimonials(data)
            } else {
                toast({
                    title: "Error",
                    description: "Failed to fetch testimonials",
                    variant: "destructive",
                })
            }
        } catch (error) {
            console.error("Error fetching testimonials:", error)
            toast({
                title: "Error",
                description: "Failed to fetch testimonials",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const url = editingTestimonial ? `/api/testimonials/${editingTestimonial.id}` : "/api/testimonials"

            const method = editingTestimonial ? "PUT" : "POST"

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                toast({
                    title: "Success",
                    description: `Testimonial ${editingTestimonial ? "updated" : "created"} successfully`,
                })
                setIsDialogOpen(false)
                resetForm()
                fetchTestimonials()
            } else {
                const error = await response.json()
                toast({
                    title: "Error",
                    description: error.error || "Failed to save testimonial",
                    variant: "destructive",
                })
            }
        } catch (error) {
            console.error("Error saving testimonial:", error)
            toast({
                title: "Error",
                description: "Failed to save testimonial",
                variant: "destructive",
            })
        }
    }

    const handleEdit = (testimonial: Testimonial) => {
        setEditingTestimonial(testimonial)
        setFormData({
            name: testimonial.name,
            service: testimonial.service || "",
            quote: testimonial.quote,
            rating: testimonial.rating,
            is_active: testimonial.is_active,
        })
        setIsDialogOpen(true)
    }

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`/api/testimonials/${id}`, {
                method: "DELETE",
            })

            if (response.ok) {
                toast({
                    title: "Success",
                    description: "Testimonial deleted successfully",
                })
                fetchTestimonials()
            } else {
                toast({
                    title: "Error",
                    description: "Failed to delete testimonial",
                    variant: "destructive",
                })
            }
        } catch (error) {
            console.error("Error deleting testimonial:", error)
            toast({
                title: "Error",
                description: "Failed to delete testimonial",
                variant: "destructive",
            })
        }
    }

    const resetForm = () => {
        setFormData({
            name: "",
            service: "",
            quote: "",
            rating: 5,
            is_active: true,
        })
        setEditingTestimonial(null)
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
        ))
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
            <Sidebar />
            <div className="flex-1 lg:ml-6">
                <div className="px-6 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-teal-700 bg-clip-text text-transparent">
                            Testimonials Management
                        </h1>
                        <p className="text-gray-600 mt-2">Manage patient testimonials and reviews</p>
                    </div>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                onClick={resetForm}
                                className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Testimonial
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>{editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="name">Patient Name *</Label>
                                        <Input
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="service">Service</Label>
                                        <Input
                                            id="service"
                                            value={formData.service}
                                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                            placeholder="e.g., Dental Implants"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="quote">Testimonial *</Label>
                                    <Textarea
                                        id="quote"
                                        value={formData.quote}
                                        onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                                        rows={4}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="rating">Rating *</Label>
                                    <select
                                        id="rating"
                                        value={formData.rating}
                                        onChange={(e) => setFormData({ ...formData, rating: Number.parseInt(e.target.value) })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    >
                                        {[1, 2, 3, 4, 5].map((num) => (
                                            <option key={num} value={num}>
                                                {num} Star{num > 1 ? "s" : ""}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex items-center space-x-6">
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="is_active"
                                            checked={formData.is_active}
                                            onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                                        />
                                        <Label htmlFor="is_active">Active</Label>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-2 pt-4">
                                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit">{editingTestimonial ? "Update" : "Create"} Testimonial</Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <Card className="bg-white border-0 shadow-lg rounded-2xl">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>All Testimonials ({testimonials.length})</span>
                            <div className="text-sm text-gray-500">{testimonials.filter((t) => t.is_active).length} active</div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        {loading ? (
                            <div className="p-8 text-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
                                <p className="text-gray-500 mt-2">Loading testimonials...</p>
                            </div>
                        ) : testimonials.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                                <p>No testimonials found. Add your first testimonial to get started.</p>
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
                                                Testimonial
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Rating
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {testimonials.map((testimonial) => (
                                            <tr key={testimonial.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{testimonial.name}</div>
                                                        {testimonial.service && <div className="text-sm text-gray-500">{testimonial.service}</div>}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900 max-w-xs truncate">{testimonial.quote}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-1">
                                                        {renderStars(testimonial.rating)}
                                                        <span className="text-sm text-gray-500 ml-2">({testimonial.rating}/5)</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-2">
                                                        <Badge variant={testimonial.is_active ? "default" : "secondary"}>
                                                            {testimonial.is_active ? (
                                                                <>
                                                                    <Eye className="h-3 w-3 mr-1" /> Active
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <EyeOff className="h-3 w-3 mr-1" /> Inactive
                                                                </>
                                                            )}
                                                        </Badge>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">{formatDate(testimonial.created_at)}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-2">
                                                        <Button variant="outline" size="sm" onClick={() => handleEdit(testimonial)}>
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="text-red-600 hover:text-red-700 bg-transparent"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Delete Testimonial</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        Are you sure you want to delete this testimonial from {testimonial.name}? This
                                                                        action cannot be undone.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        onClick={() => handleDelete(testimonial.id)}
                                                                        className="bg-red-600 hover:bg-red-700"
                                                                    >
                                                                        Delete
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
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
            </div>
        </div>
    )
}
