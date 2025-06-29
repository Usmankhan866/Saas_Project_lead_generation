"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Search,
  Plus,
  MapPin,
  Users,
  TrendingUp,
  Clock,
  Star,
  Building,
  Phone,
  Mail,
  Globe,
  ExternalLink,
} from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AuthHeader from "@/components/AuthHeader"

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUserName] = useState("")
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchLocation, setSearchLocation] = useState("")
  const [searchIndustry, setSearchIndustry] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = localStorage.getItem("isAuthenticated")
      const name = localStorage.getItem("userName") || ""

      if (!isAuth) {
        router.push("/login")
        return
      }

      setIsAuthenticated(!!isAuth)
      setUserName(name)
    }

    checkAuth()
  }, [router])

  const handleSearch = async () => {
    setIsSearching(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock search results
    const mockResults = [
      {
        id: 1,
        name: "TechCorp Solutions",
        industry: "Technology",
        location: "San Francisco, CA",
        employees: "50-100",
        website: "techcorp.com",
        phone: "+1 (555) 123-4567",
        email: "contact@techcorp.com",
        rating: 4.5,
        description: "Leading software development company specializing in AI solutions",
      },
      {
        id: 2,
        name: "Digital Marketing Pro",
        industry: "Marketing",
        location: "New York, NY",
        employees: "10-50",
        website: "digitalmarketingpro.com",
        phone: "+1 (555) 987-6543",
        email: "hello@digitalmarketingpro.com",
        rating: 4.2,
        description: "Full-service digital marketing agency helping businesses grow online",
      },
      {
        id: 3,
        name: "Green Energy Systems",
        industry: "Energy",
        location: "Austin, TX",
        employees: "100-500",
        website: "greenenergysys.com",
        phone: "+1 (555) 456-7890",
        email: "info@greenenergysys.com",
        rating: 4.8,
        description: "Renewable energy solutions for commercial and residential properties",
      },
    ]

    setSearchResults(mockResults)
    setIsSearching(false)
  }

  const recentSearches = [
    {
      id: 1,
      query: "Software companies in Silicon Valley",
      date: "2024-01-15",
      results: 45,
      status: "completed",
    },
    {
      id: 2,
      query: "Marketing agencies in NYC",
      date: "2024-01-14",
      results: 32,
      status: "completed",
    },
    {
      id: 3,
      query: "Startups in Austin",
      date: "2024-01-13",
      results: 28,
      status: "completed",
    },
  ]

  if (!isAuthenticated) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthHeader currentPage="dashboard" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {userName}!</h1>
          <p className="text-gray-600">Here's what's happening with your lead generation today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Searches</CardTitle>
              <Search className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">+3 new this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24.5%</div>
              <p className="text-xs text-muted-foreground">+2.1% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Credits Remaining</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">847</div>
              <p className="text-xs text-muted-foreground">Renews in 15 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Start</CardTitle>
                <CardDescription>Get started with your lead generation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Dialog open={isSearchModalOpen} onOpenChange={setIsSearchModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-[#3c3679] hover:bg-[#2d2a5f] text-white">
                      <Plus className="mr-2 h-4 w-4" />
                      Start New Search
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Find Google Listings</DialogTitle>
                      <DialogDescription>
                        Search for businesses and get detailed information including contact details.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="search-query">Search Query</Label>
                        <Input
                          id="search-query"
                          placeholder="e.g., restaurants, dentists, software companies"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          placeholder="e.g., New York, NY or 10001"
                          value={searchLocation}
                          onChange={(e) => setSearchLocation(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="industry">Industry (Optional)</Label>
                        <Input
                          id="industry"
                          placeholder="e.g., Technology, Healthcare, Retail"
                          value={searchIndustry}
                          onChange={(e) => setSearchIndustry(e.target.value)}
                        />
                      </div>
                      <Button
                        onClick={handleSearch}
                        disabled={!searchQuery || !searchLocation || isSearching}
                        className="w-full bg-[#3c3679] hover:bg-[#2d2a5f]"
                      >
                        {isSearching ? "Searching..." : "Search Google Listings"}
                      </Button>

                      {searchResults.length > 0 && (
                        <div className="mt-6">
                          <h3 className="text-lg font-semibold mb-4">Search Results ({searchResults.length})</h3>
                          <div className="space-y-4 max-h-96 overflow-y-auto">
                            {searchResults.map((result) => (
                              <Card key={result.id} className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-semibold text-lg">{result.name}</h4>
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                    <span className="text-sm">{result.rating}</span>
                                  </div>
                                </div>
                                <p className="text-gray-600 text-sm mb-3">{result.description}</p>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div className="flex items-center">
                                    <Building className="h-4 w-4 mr-2 text-gray-400" />
                                    {result.industry}
                                  </div>
                                  <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                                    {result.location}
                                  </div>
                                  <div className="flex items-center">
                                    <Users className="h-4 w-4 mr-2 text-gray-400" />
                                    {result.employees} employees
                                  </div>
                                  <div className="flex items-center">
                                    <Globe className="h-4 w-4 mr-2 text-gray-400" />
                                    <a
                                      href={`https://${result.website}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:underline"
                                    >
                                      {result.website}
                                    </a>
                                  </div>
                                  <div className="flex items-center">
                                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                                    {result.phone}
                                  </div>
                                  <div className="flex items-center">
                                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                                    {result.email}
                                  </div>
                                </div>
                              </Card>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="w-full bg-transparent">
                    <Search className="mr-2 h-4 w-4" />
                    Browse Templates
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Account Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Plan</span>
                <Badge variant="secondary">Pro</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Credits Used</span>
                <span className="text-sm font-medium">153/1000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-[#3c3679] h-2 rounded-full" style={{ width: "15.3%" }}></div>
              </div>
              <Button variant="outline" className="w-full bg-transparent">
                Upgrade Plan
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Searches */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Searches</CardTitle>
            <CardDescription>Your latest lead generation activities</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Search Query</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Results</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentSearches.map((search) => (
                  <TableRow key={search.id}>
                    <TableCell className="font-medium">{search.query}</TableCell>
                    <TableCell>{search.date}</TableCell>
                    <TableCell>{search.results}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{search.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
