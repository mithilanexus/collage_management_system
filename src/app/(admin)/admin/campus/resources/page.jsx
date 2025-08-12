"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  BookOpen,
  Monitor,
  Wifi,
  Car,
  Utensils,
  Stethoscope,
  Shield,
  Zap,
  Download,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export default function ResourcesManagement() {
  const [resources, setResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResource, setSelectedResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    getResources();
  }, []);
  const getResources = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/campus/resources`);
      const data = await res.json();
      setResources(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };
  const filteredResources = resources.filter(resource =>
    resource.resourceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.provider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (resource) => {
    setSelectedResource(resource);
  };

  const handleEdit = (resourceId) => {
    router.push(`/admin/campus/resources/${resourceId}/edit`);
  };

  const handleDelete = async (resourceId) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/campus/resources/${resourceId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Resource deleted");
        const updatedResources = resources.filter(resource => resource._id !== resourceId);
        setResources(updatedResources);

        router.push("/admin/campus/resources");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error deleting resource:", error);
      toast.error(error.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300";
      case "Inactive": return "bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-300";
      case "Maintenance": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-950/30 dark:text-gray-300";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Academic": return <BookOpen className="w-5 h-5" />;
      case "Technology": return <Monitor className="w-5 h-5" />;
      case "Transportation": return <Car className="w-5 h-5" />;
      case "Healthcare": return <Stethoscope className="w-5 h-5" />;
      case "Security": return <Shield className="w-5 h-5" />;
      case "Food & Dining": return <Utensils className="w-5 h-5" />;
      default: return <Zap className="w-5 h-5" />;
    }
  };

  const totalResources = resources.length;
  const activeResources = resources.filter(r => r.status === "Active").length;
  const totalCost = resources.reduce((sum, r) => {
    const cost = parseInt(r.cost.replace(/[^\d]/g, '')) || 0;
    return sum + cost;
  }, 0);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Campus Resources</h1>
              <p className="text-muted-foreground">Manage campus resources and services</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Report
              </Button>
              <Button onClick={() => window.location.href = '/admin/campus/resources/add'} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Resource
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Resources</p>
                    <p className="text-2xl font-bold text-primary">{totalResources}</p>
                  </div>
                  <Zap className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Resources</p>
                    <p className="text-2xl font-bold text-green-600">{activeResources}</p>
                  </div>
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Categories</p>
                    <p className="text-2xl font-bold text-blue-600">6</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Annual Cost</p>
                    <p className="text-2xl font-bold text-orange-600">Rs. {totalCost.toLocaleString()}</p>
                  </div>
                  <Monitor className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by resource name, category, type or provider..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <Card key={resource._id} className="hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img
                    src={resource.image}
                    alt={resource.resourceName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(resource.status)}`}>
                      {resource.status}
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg line-clamp-2">{resource.resourceName}</CardTitle>
                      <p className="text-sm text-muted-foreground">{resource.category} • {resource.type}</p>
                    </div>
                    {getCategoryIcon(resource.category)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">{resource.description}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Availability:</span>
                      <span className="font-medium">{resource.availability}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location:</span>
                      <span className="font-medium text-xs">{resource.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cost:</span>
                      <span className="font-medium text-primary">{resource.cost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Provider:</span>
                      <span className="font-medium text-xs">{resource.provider}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Key Features</p>
                    <div className="flex flex-wrap gap-1">
                      {resource.features.slice(0, 2).map((feature, index) => (
                        <span key={index} className="px-2 py-1 bg-muted rounded-full text-xs">
                          {feature}
                        </span>
                      ))}
                      {resource.features.length > 2 && (
                        <span className="px-2 py-1 bg-muted rounded-full text-xs">
                          +{resource.features.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleView(resource)}
                      className="flex-1"
                    >
                      <Eye className="w-3 h-3 mr-2" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(resource._id)}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(resource._id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Resource Details Modal */}
          {selectedResource && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getCategoryIcon(selectedResource.category)}
                    Resource Details - {selectedResource.resourceName}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Resource Image */}
                  <div className="aspect-video relative overflow-hidden rounded-lg">
                    <img
                      src={selectedResource.image}
                      alt={selectedResource.resourceName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium">Resource Name</label>
                      <p className="text-sm text-muted-foreground">{selectedResource.resourceName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Category</label>
                      <p className="text-sm text-muted-foreground">{selectedResource.category}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Type</label>
                      <p className="text-sm text-muted-foreground">{selectedResource.type}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Status</label>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedResource.status)}`}>
                        {selectedResource.status}
                      </span>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Availability</label>
                      <p className="text-sm text-muted-foreground">{selectedResource.availability}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Location</label>
                      <p className="text-sm text-muted-foreground">{selectedResource.location}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Capacity</label>
                      <p className="text-sm text-muted-foreground">{selectedResource.capacity}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Current Usage</label>
                      <p className="text-sm text-muted-foreground">{selectedResource.currentUsage}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Cost</label>
                      <p className="text-sm text-muted-foreground font-bold text-primary">{selectedResource.cost}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="font-medium mb-3">Description</h3>
                    <p className="text-sm text-muted-foreground">{selectedResource.description}</p>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="font-medium mb-3">Features</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedResource.features.map((feature, index) => (
                        <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Provider & Support */}
                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-3">Provider & Support</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Provider</label>
                        <p className="text-sm text-muted-foreground">{selectedResource.provider}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Access Method</label>
                        <p className="text-sm text-muted-foreground">{selectedResource.accessMethod}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Support Contact</label>
                        <p className="text-sm text-muted-foreground">{selectedResource.supportContact}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Last Updated</label>
                        <p className="text-sm text-muted-foreground">{selectedResource.lastUpdated}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={() => setSelectedResource(null)}>
                      Close
                    </Button>
                    <Button onClick={() => handleEdit(selectedResource._id)}>
                      Edit Resource
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}
    </>
  );
}
