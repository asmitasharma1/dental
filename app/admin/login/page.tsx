"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { User, Lock, AlertCircle, Bug } from "lucide-react"
import Image from "next/image"

export default function AdminLogin() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [debugInfo, setDebugInfo] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setDebugInfo("")

    try {
      console.log("Attempting login...")
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      })

      const data = await response.json()
      console.log("Login response status:", response.status)
      console.log("Login response data:", data)

      if (response.ok) {
        console.log("Login successful, redirecting to dashboard...")
        // Use window.location.replace to avoid back button issues
        window.location.replace("/admin/dashboard")
      } else {
        console.log("Login failed:", data.error)
        setError(data.error || "Login failed")
      }
    } catch (error) {
      console.error("Login network error:", error)
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleDebug = async () => {
    setLoading(true)
    setError("")
    setDebugInfo("")

    try {
      const response = await fetch("/api/auth/debug", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()
      if (response.ok) {
        setDebugInfo(`Debug Results:
- User exists: ${data.userExists}
- User active: ${data.isActive}
- Password valid: ${data.passwordValid}
- User ID: ${data.debug?.userId}
- Role: ${data.debug?.role}
        `)
      } else {
        setError(`Debug Error: ${data.error}`)
        if (data.debug) {
          setDebugInfo(`Debug Info: ${data.debug}`)
        }
      }
    } catch (error) {
      setError("Debug request failed")

      // Alternative: try to check auth status
      try {
        const authResponse = await fetch("/api/auth/check", {
          credentials: "include",
        })
        const authData = await authResponse.json()
        setDebugInfo(`Auth Check Result:
Status: ${authResponse.status}
Response: ${JSON.stringify(authData, null, 2)}`)
      } catch (authError) {
        setDebugInfo("Could not check auth status")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white border-0 shadow-2xl rounded-3xl overflow-hidden">
        <CardContent className="p-0">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-8 text-center">
            <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
              <Image src="/images/logo.png" alt="Smile by Dr. Kareen" width={60} height={60} className="rounded-full" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-teal-100">Smile by Dr. Kareen</p>
          </div>

          {/* Login Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              )}

              {debugInfo && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <pre className="text-blue-700 text-xs whitespace-pre-wrap">{debugInfo}</pre>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-700 font-medium">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="pl-10 rounded-xl border-gray-200 focus:border-teal-500 focus:ring-teal-500 h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 rounded-xl border-gray-200 focus:border-teal-500 focus:ring-teal-500 h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white py-4 rounded-xl text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>

                <Button
                  type="button"
                  onClick={handleDebug}
                  disabled={loading}
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 bg-transparent"
                >
                  <Bug className="h-4 w-4 mr-2" />
                  Debug Login
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-gray-500">Default credentials: admin / admin123</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
