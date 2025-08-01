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
  Users,
  Phone,
  MapPin,
  Mail,
  UserPlus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
} from "@/components/ui/alert-dialog";

export default function ParentsManagement() {
  const [parents, setParents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchParentsData();
  }, []);

  const filteredParents = parents.filter(
    (parent) =>
      parent.fatherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parent.motherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parent.fatherPhone.includes(searchTerm) ||
      parent.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (parent) => {
    // Redirect to parent detail page for better UX
    // window.location.href = `/admin/management/parents/${parent.id}`;
    router.push(`/admin/management/parents/${parent._id}`);
  };

  const handleEdit = (parentId) => {
    // window.location.href = `/admin/management/parents/${parentId}/edit`;
    router.push(`/admin/management/parents/${parentId}/edit`);
  };

  const handleDelete = async (parentId) => {
    setParents(parents.filter((p) => p._id !== parentId));
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/management/parent/${parentId}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        toast.success("Parent deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting parent:", error);
      toast.error("Failed to delete parent");
    }
  };

  const handleManageStudents = (parentId) => {
    router.push(`/admin/management/parents/${parentId}`);
  };

  const fetchParentsData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/management/parent`
      );
      const data = await res.json();
      setParents([...data.data]);
      console.log(parents);
    } catch (error) {
      console.error("Error fetching parents data:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Parents Management
          </h1>
          <p className="text-muted-foreground">
            Manage parent records and information
          </p>
        </div>
        <Button
          onClick={() => router.push("/admin/management/parents/add")}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New Parent
        </Button>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by parent name, phone number or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {parents.length}
            </div>
            <div className="text-sm text-muted-foreground">Total Parents</div>
          </CardContent>
        </Card>
      </div>

      {/* Parents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Parents List</CardTitle>
        </CardHeader>
        <CardContent>
          {parents.length === 0 ? (
            <div className="flex flex-col items-center justify-center space-y-3">
              <UserPlus className="w-12 h-12 text-muted-foreground/50" />
              <div className="text-xl font-medium text-muted-foreground">
                No parents found
              </div>
              <div className="text-sm text-muted-foreground">
                Get started by adding a new parent record
              </div>
              <Button
                onClick={() => router.push("/admin/management/parents/add")}
                className="mt-2"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Parent
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Father's Name</th>
                    <th className="text-left p-4">Mother's Name</th>
                    <th className="text-left p-4">Contact</th>
                    <th className="text-left p-4">Address</th>
                    <th className="text-left p-4">Students</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredParents.map((parent) => (
                    <tr key={parent._id} className="border-b hover:bg-muted/50">
                      <td className="p-4">
                        <div className="font-medium">{parent.fatherName}</div>
                        <div className="text-sm text-muted-foreground">
                          {parent.fatherOccupation}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium">{parent.motherName}</div>
                        <div className="text-sm text-muted-foreground">
                          {parent.motherOccupation}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1 mb-1">
                          <Phone className="w-3 h-3" />
                          <span className="text-sm">{parent.fatherPhone}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          <span className="text-sm">{parent.email}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span className="text-sm">
                            {parent.permanentAddress}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-primary" />
                          <span className="font-medium">
                            {parent.studentsCount || 0}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleManageStudents(parent._id)}
                            title="Manage Students"
                          >
                            <Users className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleView(parent)}
                            title="View Details"
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(parent._id)}
                            title="Edit Parent"
                          >
                            <Edit className="w-3 h-3" />
                          </Button>

                          <AlertDialog>
                            <AlertDialogTrigger>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete your account and remove
                                  your data from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(parent._id)}
                                >
                                  Continue
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
  );
}
