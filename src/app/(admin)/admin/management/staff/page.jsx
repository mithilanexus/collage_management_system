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
  UserCheck,
  Phone,
  Mail,
  Calendar,
  Briefcase,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import DeleteDialog from "@/components/shared/DeleteDialog";

export default function StaffManagement() {
  const [staff, setStaff] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStaff, setSelectedStaff] = useState(null);

  const filteredStaff = staff.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const router = useRouter();

  useEffect(() => {
    fetchStaffsData();
  }, []);
  const handleView = (member) => {
    setSelectedStaff(member);
  };

  const handleEdit = (staffId) => {
    router.push(`/admin/management/staff/${staffId}/edit`);
  };

  const handleDelete = async (staffId) => {
    try {
      setStaff(staff.filter((s) => s._id !== staffId));
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/management/staff/${staffId}`,
        {
          method: "DELETE",
        }
      );
      const data = res.json();
      if (data.success) {
        toast.success("Staff deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete staff");
    }
  };
  const fetchStaffsData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/management/staff`
      );
      const data = await res.json();
      setStaff([...data.data]);
    } catch (error) {
      console.error("Error fetching staff data:", error);
      toast.error("Failed to fetch staff data");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Staff Management
          </h1>
          <p className="text-muted-foreground">
            Manage staff records and information
          </p>
        </div>
        <Button
          onClick={() => (window.location.href = "/admin/management/staff/add")}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New Staff
        </Button>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by name, employee ID, department or designation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {staff.length}
            </div>
            <div className="text-sm text-muted-foreground">Total Staff</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {staff.filter((s) => s.status === "Permanent").length}
            </div>
            <div className="text-sm text-muted-foreground">Permanent Staff</div>
          </CardContent>
        </Card>
      </div>

      {/* Staff Table */}
      <Card>
        <CardHeader>
          <CardTitle>Staff List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Staff Name</th>
                  <th className="text-left p-4">Employee ID</th>
                  <th className="text-left p-4">Designation</th>
                  <th className="text-left p-4">Department</th>
                  <th className="text-left p-4">Contact</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.map((member) => (
                  <tr key={member._id} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {member.qualification}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                        {member.employeeId}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="font-medium">{member.designation}</div>
                      <div className="text-sm text-muted-foreground">
                        {member.experience}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium">{member.department}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 mb-1">
                        <Phone className="w-3 h-3" />
                        <span className="text-sm">{member.phone}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        <span className="text-sm">{member.email}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          member.status === "Permanent"
                            ? "bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-300"
                        }`}
                      >
                        {member.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleView(member)}
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(member._id)}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        {/* <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(member._id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button> */}
                        <DeleteDialog
                          handleDelete={handleDelete}
                          id={member._id}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Staff Details Modal */}
      {selectedStaff && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="w-5 h-5" />
                Staff Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedStaff.name}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Employee ID</label>
                  <p className="text-sm text-muted-foreground font-mono">
                    {selectedStaff.employeeId}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Designation</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedStaff.designation}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Department</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedStaff.department}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Qualification</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedStaff.qualification}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Experience</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedStaff.experience}
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Phone Number</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedStaff.phone}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedStaff.email}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium">Address</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedStaff.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Work Information */}
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Work Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Joining Date</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedStaff.joiningDate}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Salary</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedStaff.salary}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Working Hours</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedStaff.workingHours}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Status</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedStaff.status}
                    </p>
                  </div>
                </div>
              </div>

              {/* Duties */}
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Duties & Responsibilities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedStaff.duties.map((duty, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Briefcase className="w-3 h-3 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        {duty}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setSelectedStaff(null)}
                >
                  Close
                </Button>
                <Button onClick={() => handleEdit(selectedStaff._id)}>
                  Edit Staff
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
