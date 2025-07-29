"use client";

import { useState } from "react";
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
  Clock
} from "lucide-react";

// Mock data for staff (English interface, Nepali college system fields)
const mockStaff = [
  {
    id: 1,
    name: "Shyam Bahadur Magar",
    employeeId: "STF001",
    designation: "Office Assistant",
    department: "Administration Department",
    qualification: "+2 Pass",
    experience: "10 years",
    phone: "9841234571",
    email: "shyam.magar@college.edu.np",
    address: "Kathmandu-12, Kalimati",
    joiningDate: "2014-05-15",
    salary: "Rs. 35,000",
    workingHours: "10 AM - 5 PM",
    status: "Permanent",
    citizenship: "12-01-71-01238",
    panNumber: "301234571",
    bloodGroup: "B+",
    maritalStatus: "Married",
    duties: ["File Management", "Data Entry", "Photocopying", "Office Cleaning"]
  },
  {
    id: 2,
    name: "Sunita Lama",
    employeeId: "STF002",
    designation: "Librarian",
    department: "Library Department",
    qualification: "Bachelor (Library Science)",
    experience: "7 years",
    phone: "9841234572",
    email: "sunita.lama@college.edu.np",
    address: "Lalitpur-8, Kupondole",
    joiningDate: "2017-03-20",
    salary: "Rs. 45,000",
    workingHours: "9 AM - 5 PM",
    status: "Permanent",
    citizenship: "23-01-73-01239",
    panNumber: "301234572",
    bloodGroup: "A+",
    maritalStatus: "Single",
    duties: ["Book Management", "Student Assistance", "Book Purchase", "Digital Resources"]
  },
  {
    id: 3,
    name: "Rajesh Shrestha",
    employeeId: "STF003",
    designation: "Lab Assistant",
    department: "Science Department",
    qualification: "Diploma in Science",
    experience: "5 years",
    phone: "9841234573",
    email: "rajesh.shrestha@college.edu.np",
    address: "Bhaktapur-6, Suryabinayak",
    joiningDate: "2019-08-10",
    salary: "Rs. 40,000",
    workingHours: "8 AM - 4 PM",
    status: "Temporary",
    citizenship: "25-01-75-01240",
    panNumber: "301234573",
    bloodGroup: "O+",
    maritalStatus: "Married",
    duties: ["Lab Preparation", "Equipment Maintenance", "Chemical Management", "Safety Inspection"]
  },
  {
    id: 4,
    name: "Maya Tamang",
    employeeId: "STF004",
    designation: "Cleaning Staff",
    department: "Service Department",
    qualification: "Class 8 Pass",
    experience: "12 years",
    phone: "9841234574",
    email: "maya.tamang@college.edu.np",
    address: "Kathmandu-16, Gokarneshwor",
    joiningDate: "2012-01-05",
    salary: "Rs. 25,000",
    workingHours: "6 AM - 2 PM",
    status: "Permanent",
    citizenship: "12-01-69-01241",
    panNumber: "301234574",
    bloodGroup: "AB+",
    maritalStatus: "Married",
    duties: ["Classroom Cleaning", "Toilet Cleaning", "Campus Cleaning", "Waste Management"]
  },
  {
    id: 5,
    name: "Dipak Gurung",
    employeeId: "STF005",
    designation: "Security Guard",
    department: "Security Department",
    qualification: "SLC Pass",
    experience: "8 years",
    phone: "9841234575",
    email: "dipak.gurung@college.edu.np",
    address: "Kathmandu-25, Budhanilkantha",
    joiningDate: "2016-06-01",
    salary: "Rs. 30,000",
    workingHours: "24 Hours (Shift)",
    status: "Permanent",
    citizenship: "12-01-72-01242",
    panNumber: "301234575",
    bloodGroup: "B-",
    maritalStatus: "Married",
    duties: ["Campus Security", "Gate Inspection", "Visitor Control", "Property Security"]
  }
];

export default function StaffManagement() {
  const [staff, setStaff] = useState(mockStaff);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStaff, setSelectedStaff] = useState(null);

  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.phone.includes(searchTerm) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (member) => {
    setSelectedStaff(member);
  };

  const handleEdit = (staffId) => {
    window.location.href = `/admin/management/staff/${staffId}/edit`;
  };

  const handleDelete = (staffId) => {
    if (confirm("Are you sure you want to delete this staff record?")) {
      setStaff(staff.filter(s => s.id !== staffId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Staff Management</h1>
          <p className="text-muted-foreground">Manage staff records and information</p>
        </div>
        <Button onClick={() => window.location.href = '/admin/management/staff/add'} className="flex items-center gap-2">
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
            <div className="text-2xl font-bold text-primary">{staff.length}</div>
            <div className="text-sm text-muted-foreground">Total Staff</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {staff.filter(s => s.status === "Permanent").length}
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
                  <tr key={member.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.qualification}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                        {member.employeeId}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="font-medium">{member.designation}</div>
                      <div className="text-sm text-muted-foreground">{member.experience}</div>
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
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        member.status === "Permanent" 
                          ? "bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-300"
                      }`}>
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
                          onClick={() => handleEdit(member.id)}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(member.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
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
                  <p className="text-sm text-muted-foreground">{selectedStaff.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Employee ID</label>
                  <p className="text-sm text-muted-foreground font-mono">{selectedStaff.employeeId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Designation</label>
                  <p className="text-sm text-muted-foreground">{selectedStaff.designation}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Department</label>
                  <p className="text-sm text-muted-foreground">{selectedStaff.department}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Qualification</label>
                  <p className="text-sm text-muted-foreground">{selectedStaff.qualification}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Experience</label>
                  <p className="text-sm text-muted-foreground">{selectedStaff.experience}</p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Phone Number</label>
                    <p className="text-sm text-muted-foreground">{selectedStaff.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-sm text-muted-foreground">{selectedStaff.email}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium">Address</label>
                    <p className="text-sm text-muted-foreground">{selectedStaff.address}</p>
                  </div>
                </div>
              </div>

              {/* Work Information */}
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Work Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Joining Date</label>
                    <p className="text-sm text-muted-foreground">{selectedStaff.joiningDate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Salary</label>
                    <p className="text-sm text-muted-foreground">{selectedStaff.salary}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Working Hours</label>
                    <p className="text-sm text-muted-foreground">{selectedStaff.workingHours}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Status</label>
                    <p className="text-sm text-muted-foreground">{selectedStaff.status}</p>
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
                      <span className="text-sm text-muted-foreground">{duty}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedStaff(null)}>
                  Close
                </Button>
                <Button onClick={() => handleEdit(selectedStaff.id)}>
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
