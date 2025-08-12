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
  Building,
  MapPin,
  Users,
  Calendar,
  Clock,
  Wifi,
  Car,
  BookOpen,
  Coffee,
  Zap,
  Loader2
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export default function CampusManagement() {
  const [facilities, setFacilities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();


  const getFacilities = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/campus`);
      const data = await res.json();
      setFacilities(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching facilities:', error);
    }
  };

  useEffect(() => {
    getFacilities();

  }, []);

  const handleView = (facility) => {
    setSelectedFacility(facility);
  };

  const handleEdit = (facilityId) => {
    router.push(`/admin/campus/${facilityId}/edit`);
  };

  const filteredFacilities = facilities?.filter(facility =>
    facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    facility.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    facility.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    facility.manager.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (facilityId) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/campus/${facilityId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Facility deleted");
        const updatedFacilities = facilities.filter(f => f._id !== facilityId);
        setFacilities(updatedFacilities);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error deleting facility:", error);
      toast.error(error.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300";
      case "Under Maintenance": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-300";
      case "Inactive": return "bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-950/30 dark:text-gray-300";
    }
  };

  const getFacilityIcon = (type) => {
    switch (type) {
      case "Academic": return <Building className="w-5 h-5" />;
      case "Laboratory": return <Zap className="w-5 h-5" />;
      case "Library": return <BookOpen className="w-5 h-5" />;
      case "Dining": return <Coffee className="w-5 h-5" />;
      case "Recreation": return <Users className="w-5 h-5" />;
      case "Technology": return <Wifi className="w-5 h-5" />;
      default: return <Building className="w-5 h-5" />;
    }
  };
  // Calculate stats dynamically
  const totalCapacity = facilities.reduce((sum, f) => sum + (f.capacity || 0), 0);
  const totalRooms = facilities.reduce((sum, f) => sum + (f.totalRooms || 0), 0);
  const availableRooms = facilities.reduce((sum, f) => sum + (f.availableRooms || 0), 0);
  const activeFacilities = facilities.filter(f => f.status === "Active").length;


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
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Campus Facilities</h1>
              <p className="text-muted-foreground">Manage campus buildings and facilities</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => router.push('/admin/campus/add')} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Facility
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Facilities</p>
                    <p className="text-2xl font-bold text-primary">{facilities?.length}</p>
                  </div>
                  <Building className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Capacity</p>
                    <p className="text-2xl font-bold text-blue-600">{totalCapacity.toLocaleString()}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Available Rooms</p>
                    <p className="text-2xl font-bold text-green-600">{availableRooms}/{totalRooms}</p>
                  </div>
                  <MapPin className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Facilities</p>
                    <p className="text-2xl font-bold text-orange-600">{activeFacilities}</p>
                  </div>
                  <Clock className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by facility name, type, location or manager..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Facilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFacilities.map((facility) => (
              <Card key={facility._id} className="hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(facility.status)}`}>
                      {facility.status}
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{facility.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{facility.location}</p>
                    </div>
                    {getFacilityIcon(facility.type)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{facility.capacity} Capacity</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{facility.availableRooms}/{facility.totalRooms} Rooms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs">{facility.operatingHours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-muted-foreground" />
                      <span>{facility.type}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Manager</p>
                    <p className="text-sm font-medium">{facility.manager}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Key Facilities</p>
                    <div className="flex flex-wrap gap-1">
                      {facility.facilities.slice(0, 3).map((fac, index) => (
                        <span key={index} className="px-2 py-1 bg-muted rounded-full text-xs">
                          {fac}
                        </span>
                      ))}
                      {facility.facilities.length > 3 && (
                        <span className="px-2 py-1 bg-muted rounded-full text-xs">
                          +{facility.facilities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleView(facility)}
                      className="flex-1"
                    >
                      <Eye className="w-3 h-3 mr-2" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(facility._id)}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(facility._id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Facility Details Modal */}
          {selectedFacility && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getFacilityIcon(selectedFacility.type)}
                    Facility Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Facility Image */}
                  <div className="aspect-video relative overflow-hidden rounded-lg">
                    <img
                      src={selectedFacility.image}
                      alt={selectedFacility.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium">Facility Name</label>
                      <p className="text-sm text-muted-foreground">{selectedFacility.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Type</label>
                      <p className="text-sm text-muted-foreground">{selectedFacility.type}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Location</label>
                      <p className="text-sm text-muted-foreground">{selectedFacility.location}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Capacity</label>
                      <p className="text-sm text-muted-foreground">{selectedFacility.capacity} people</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Total Rooms</label>
                      <p className="text-sm text-muted-foreground">{selectedFacility.totalRooms}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Available Rooms</label>
                      <p className="text-sm text-muted-foreground">{selectedFacility.availableRooms}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Operating Hours</label>
                      <p className="text-sm text-muted-foreground">{selectedFacility.operatingHours}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Year Built</label>
                      <p className="text-sm text-muted-foreground">{selectedFacility.yearBuilt}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Last Maintenance</label>
                      <p className="text-sm text-muted-foreground">{selectedFacility.maintenanceDate}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="font-medium mb-3">Description</h3>
                    <p className="text-sm text-muted-foreground">{selectedFacility.description}</p>
                  </div>

                  {/* Facilities */}
                  <div>
                    <h3 className="font-medium mb-3">Available Facilities</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedFacility.facilities.map((facility, index) => (
                        <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                          {facility}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Manager Information */}
                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-3">Manager Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Manager Name</label>
                        <p className="text-sm text-muted-foreground">{selectedFacility.manager}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Contact Number</label>
                        <p className="text-sm text-muted-foreground">{selectedFacility.contact}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={() => setSelectedFacility(null)}>
                      Close
                    </Button>
                    <Button onClick={() => handleEdit(selectedFacility._id)}>
                      Edit Facility
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>)} </>
  );
}
