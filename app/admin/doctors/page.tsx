"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Sidebar from "@/components/Sidebar"
import { Plus, Edit, Trash2, Upload } from "lucide-react"
import Image from "next/image"

interface Doctor {
  id: number
  name: string
  position: string
  degree: string
  nmc_number: string
  linkedin_url: string
  image_url: string
  specialties: string[]
  is_active: number
  created_at: string
  updated_at: string
}

const positions = [
  "Aesthetic and Restorative Dentist",
  "Orthodontist",
  "Oral and Maxillofacial Surgeon",
  "Endodontist",
  "General Dentist"
]

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null)
  const [uploadForm, setUploadForm] = useState({
    name: "",
    position: "",
    degree: "",
    nmcNumber: "",
    linkedin: "",
    specialties: "",
    file: null as File | null,
  })

  useEffect(() => {
    fetchDoctors()
  }, [])

  const fetchDoctors = async () => {
    try {
      const response = await fetch("/api/doctors", {
        credentials: "include",
      })
      if (response.ok) {
        const data = await response.json()
        const parsedData = data.map((doctor: any) => {
          let specialties: string[] = []
          try {
            specialties = JSON.parse(doctor.specialties || '[]')
            if (!Array.isArray(specialties)) {
              console.warn(`Invalid specialties format for doctor ${doctor.id}:`, doctor.specialties)
              specialties = [String(doctor.specialties || 'Unknown Specialty')]
            }
          } catch (error) {
            console.error(`Error parsing specialties for doctor ${doctor.id}:`, error)
            specialties = [String(doctor.specialties || 'Unknown Specialty')]
          }
          return {
            ...doctor,
            name: doctor.name || 'Unknown',
            degree: doctor.degree || 'Unknown',
            nmc_number: doctor.nmc_number || 'Unknown',
            linkedin_url: doctor.linkedin_url || '',
            specialties,
            image_url: doctor.image_url || '/placeholder.svg'
          }
        })
        setDoctors(parsedData)
      } else if (response.status === 401) {
        window.location.replace("/admin/login")
      }
    } catch (error) {
      console.error("Error fetching doctors:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!uploadForm.file) {
      alert("Please select an image file")
      return
    }
    if (!uploadForm.name.trim()) {
      alert("Please enter a name")
      return
    }
    if (!uploadForm.position) {
      alert("Please select a position")
      return
    }
    if (!uploadForm.degree.trim()) {
      alert("Please enter a degree")
      return
    }
    if (!uploadForm.nmcNumber.trim()) {
      alert("Please enter an NMC number")
      return
    }
    if (!uploadForm.specialties.trim()) {
      alert("Please enter specialties (comma-separated)")
      return
    }

    const specialtiesArray = uploadForm.specialties.split(",").map(s => s.trim()).filter(s => s)
    if (specialtiesArray.length === 0) {
      alert("Please enter at least one valid specialty")
      return
    }

    setUploading(true)

    const formData = new FormData()
    formData.append("file", uploadForm.file)
    formData.append("name", uploadForm.name.trim())
    formData.append("position", uploadForm.position)
    formData.append("degree", uploadForm.degree.trim())
    formData.append("nmcNumber", uploadForm.nmcNumber.trim())
    formData.append("linkedin", uploadForm.linkedin.trim())
    formData.append("specialties", JSON.stringify(specialtiesArray))

    try {
      const response = await fetch("/api/doctors", {
        method: "POST",
        body: formData,
        credentials: "include",
      })

      if (response.ok) {
        setIsUploadOpen(false)
        setUploadForm({ name: "", position: "", degree: "", nmcNumber: "", linkedin: "", specialties: "", file: null })
        fetchDoctors()
        alert("Doctor added successfully!")
      } else if (response.status === 401) {
        window.location.replace("/admin/login")
      } else {
        const errorData = await response.json()
        alert(`Upload failed: ${errorData.error || "Unknown error"}`)
      }
    } catch (error) {
      console.error("Error uploading doctor:", error)
      alert("Upload failed: Network error")
    } finally {
      setUploading(false)
    }
  }

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingDoctor) return

    const specialtiesArray = editingDoctor.specialties
      .filter(s => typeof s === 'string' && s.trim())
      .map(s => s.trim())
    if (specialtiesArray.length === 0) {
      alert("Please enter at least one valid specialty")
      return
    }

    try {
      const response = await fetch(`/api/doctors/${editingDoctor.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editingDoctor.name || 'Unknown',
          position: editingDoctor.position || positions[0],
          degree: editingDoctor.degree || 'Unknown',
          nmcNumber: editingDoctor.nmc_number || 'Unknown',
          linkedin: editingDoctor.linkedin_url || '',
          specialties: JSON.stringify(specialtiesArray),
        }),
        credentials: "include",
      })

      if (response.ok) {
        setIsEditOpen(false)
        setEditingDoctor(null)
        fetchDoctors()
        alert("Doctor updated successfully!")
      } else if (response.status === 401) {
        window.location.replace("/admin/login")
      } else {
        const errorData = await response.json()
        alert(`Update failed: ${errorData.error || "Unknown error"}`)
      }
    } catch (error) {
      console.error("Error updating doctor:", error)
      alert("Update failed")
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this doctor?")) return

    try {
      const response = await fetch(`/api/doctors/${id}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (response.ok) {
        fetchDoctors()
        alert("Doctor deleted successfully!")
      } else if (response.status === 401) {
        window.location.replace("/admin/login")
      } else {
        const errorData = await response.json()
        alert(`Delete failed: ${errorData.error || "Unknown error"}`)
      }
    } catch (error) {
      console.error("Error deleting doctor:", error)
      alert("Delete failed")
    }
  }

  const openEditModal = (doctor: Doctor) => {
    setEditingDoctor({
      ...doctor,
      name: doctor.name || 'Unknown',
      degree: doctor.degree || 'Unknown',
      nmc_number: doctor.nmc_number || 'Unknown',
      linkedin_url: doctor.linkedin_url || '',
      specialties: Array.isArray(doctor.specialties) ? doctor.specialties : ['Unknown Specialty']
    })
    setIsEditOpen(true)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setUploadForm({ ...uploadForm, file })
  }

  const handlePositionChange = (value: string) => {
    setUploadForm({ ...uploadForm, position: value })
  }

  const handleEditPositionChange = (value: string) => {
    if (editingDoctor) {
      setEditingDoctor({ ...editingDoctor, position: value })
    }
  }

  const resetUploadForm = () => {
    setUploadForm({ name: "", position: "", degree: "", nmcNumber: "", linkedin: "", specialties: "", file: null })
    const fileInput = document.getElementById("file") as HTMLInputElement
    if (fileInput) {
      fileInput.value = ""
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1 lg:ml-6">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-teal-700 bg-clip-text text-transparent">
              Doctors Management
            </h1>
            <Button
              onClick={() => {
                resetUploadForm()
                setIsUploadOpen(true)
              }}
              className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Doctor
            </Button>
          </div>
        </header>

        <main className="p-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {doctors.map((doctor) => (
                <Card key={doctor.id} className="overflow-hidden border-0 shadow-lg rounded-2xl">
                  <CardContent className="p-0">
                    <div className="relative aspect-[3/4]">
                      <Image
                        src={doctor.image_url || "/placeholder.svg"}
                        alt={doctor.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => openEditModal(doctor)}
                            className="bg-white/90 hover:bg-white text-gray-900"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(doctor.id)}
                            className="bg-red-600/90 hover:bg-red-700 text-white"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <p className="font-medium text-gray-900 mb-1">{doctor.name}</p>
                      <p className="text-sm text-gray-600 mb-1"><span className="font-medium">Position:</span> {doctor.position}</p>
                      <p className="text-sm text-gray-600 mb-1"><span className="font-medium">Degree:</span> {doctor.degree}</p>
                      <p className="text-sm text-gray-600 mb-1"><span className="font-medium">NMC Number:</span> {doctor.nmc_number}</p>
                      {doctor.linkedin_url && (
                        <p className="text-sm text-gray-600 mb-1">
                          <span className="font-medium">LinkedIn:</span>{" "}
                          <a
                            href={doctor.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-teal-600 hover:underline"
                          >
                            Profile
                          </a>
                        </p>
                      )}
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="font-medium">Specialties:</span>{" "}
                        <span className="inline-block bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">
                          {doctor.specialties.join(", ")}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600 mb-1"><span className="font-medium">Created:</span> {new Date(doctor.created_at).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-600 mb-1"><span className="font-medium">Updated:</span> {new Date(doctor.updated_at).toLocaleDateString()}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Upload Modal */}
      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Doctor</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <Label htmlFor="file">Profile Image</Label>
              <Input id="file" type="file" accept="image/*" onChange={handleFileChange} required className="mt-1" />
              {uploadForm.file && <p className="text-sm text-gray-500 mt-1">Selected: {uploadForm.file.name}</p>}
            </div>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={uploadForm.name}
                onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })}
                placeholder="Enter doctor's name"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="position">Position</Label>
              <Select value={uploadForm.position} onValueChange={handlePositionChange} required>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  {positions.map((position) => (
                    <SelectItem key={position} value={position}>
                      {position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="degree">Degree</Label>
              <Input
                id="degree"
                value={uploadForm.degree}
                onChange={(e) => setUploadForm({ ...uploadForm, degree: e.target.value })}
                placeholder="Enter degree"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="nmcNumber">NMC Number</Label>
              <Input
                id="nmcNumber"
                value={uploadForm.nmcNumber}
                onChange={(e) => setUploadForm({ ...uploadForm, nmcNumber: e.target.value })}
                placeholder="Enter NMC number"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="linkedin">LinkedIn URL (optional)</Label>
              <Input
                id="linkedin"
                value={uploadForm.linkedin}
                onChange={(e) => setUploadForm({ ...uploadForm, linkedin: e.target.value })}
                placeholder="Enter LinkedIn URL"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="specialties">Specialties (comma-separated)</Label>
              <Textarea
                id="specialties"
                value={uploadForm.specialties}
                onChange={(e) => setUploadForm({ ...uploadForm, specialties: e.target.value })}
                placeholder="Enter specialties (e.g., Cosmetic Dentistry, Restorative Dentistry)"
                required
                className="mt-1"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsUploadOpen(false)
                  resetUploadForm()
                }}
                disabled={uploading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800"
                disabled={uploading}
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Doctor</DialogTitle>
          </DialogHeader>
          {editingDoctor && (
            <form onSubmit={handleEdit} className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={editingDoctor.name || ''}
                  onChange={(e) => setEditingDoctor({ ...editingDoctor, name: e.target.value })}
                  placeholder="Enter doctor's name"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="edit-position">Position</Label>
                <Select value={editingDoctor.position || positions[0]} onValueChange={handleEditPositionChange} required>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.map((position) => (
                      <SelectItem key={position} value={position}>
                        {position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-degree">Degree</Label>
                <Input
                  id="edit-degree"
                  value={editingDoctor.degree || ''}
                  onChange={(e) => setEditingDoctor({ ...editingDoctor, degree: e.target.value })}
                  placeholder="Enter degree"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="edit-nmcNumber">NMC Number</Label>
                <Input
                  id="edit-nmcNumber"
                  value={editingDoctor.nmc_number || ''}
                  onChange={(e) => setEditingDoctor({ ...editingDoctor, nmc_number: e.target.value })}
                  placeholder="Enter NMC number"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="edit-linkedin">LinkedIn URL (optional)</Label>
                <Input
                  id="edit-linkedin"
                  value={editingDoctor.linkedin_url || ''}
                  onChange={(e) => setEditingDoctor({ ...editingDoctor, linkedin_url: e.target.value })}
                  placeholder="Enter LinkedIn URL"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="edit-specialties">Specialties (comma-separated)</Label>
                <Textarea
                  id="edit-specialties"
                  value={Array.isArray(editingDoctor.specialties) ? editingDoctor.specialties.join(", ") : ''}
                  onChange={(e) => setEditingDoctor({ ...editingDoctor, specialties: e.target.value.split(",").map(s => s.trim()).filter(s => s) })}
                  placeholder="Enter specialties"
                  required
                  className="mt-1"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800"
                >
                  Update
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}