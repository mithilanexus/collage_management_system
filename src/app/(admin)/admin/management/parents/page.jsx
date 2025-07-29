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
  Users,
  Phone,
  MapPin,
  Mail,
  UserPlus
} from "lucide-react";

// Mock data for parents (English interface, Nepali college system fields)
const mockParents = [
  {
    id: 1,
    fatherName: "Ram Bahadur Shrestha",
    motherName: "Sita Shrestha",
    guardianName: "Ram Bahadur Shrestha",
    fatherOccupation: "Business",
    motherOccupation: "Housewife",
    guardianOccupation: "Business",
    phone: "9841234567",
    alternatePhone: "9851234567",
    email: "ram.shrestha@gmail.com",
    address: "Kathmandu-10, Bagbazar",
    district: "Kathmandu",
    province: "Bagmati Province",
    citizenship: "12-01-68-01234",
    annualIncome: "Rs. 5,00,000",
    studentsCount: 2,
    students: ["Anil Shrestha", "Sunil Shrestha"]
  },
  {
    id: 2,
    fatherName: "Hari Prasad Poudel",
    motherName: "Gita Poudel",
    guardianName: "Hari Prasad Poudel",
    fatherOccupation: "Teacher",
    motherOccupation: "Nurse",
    guardianOccupation: "Teacher",
    phone: "9841234568",
    alternatePhone: "9851234568",
    email: "hari.poudel@gmail.com",
    address: "Pokhara-15, Lakeside",
    district: "Kaski",
    province: "Gandaki Province",
    citizenship: "23-01-70-01235",
    annualIncome: "Rs. 8,00,000",
    studentsCount: 1,
    students: ["Priya Poudel"]
  },
  {
    id: 3,
    fatherName: "Krishna Bahadur Gurung",
    motherName: "Maya Gurung",
    guardianName: "Krishna Bahadur Gurung",
    fatherOccupation: "Farmer",
    motherOccupation: "Farmer",
    guardianOccupation: "Farmer",
    phone: "9841234569",
    alternatePhone: "9851234569",
    email: "krishna.gurung@gmail.com",
    address: "Gorkha-5, Arughat",
    district: "Gorkha",
    province: "Gandaki Province",
    citizenship: "28-01-65-01236",
    annualIncome: "Rs. 3,00,000",
    studentsCount: 3,
    students: ["Rajesh Gurung", "Suresh Gurung", "Dinesh Gurung"]
  }
];

export default function ParentsManagement() {
  const [parents, setParents] = useState(mockParents);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredParents = parents.filter(parent =>
    parent.fatherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parent.motherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parent.phone.includes(searchTerm) ||
    parent.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (parent) => {
    // Redirect to parent detail page for better UX
    window.location.href = `/admin/management/parents/${parent.id}`;
  };

  const handleEdit = (parentId) => {
    window.location.href = `/admin/management/parents/${parentId}/edit`;
  };

  const handleDelete = (parentId) => {
    if (confirm("Are you sure you want to delete this parent record?")) {
      setParents(parents.filter(p => p.id !== parentId));
    }
  };

  const handleAddStudent = (parentId) => {
    window.location.href = `/admin/management/parents/${parentId}/add-student`;
  };

  const handleManageStudents = (parentId) => {
    window.location.href = `/admin/management/parents/${parentId}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Parents Management</h1>
          <p className="text-muted-foreground">Manage parent records and information</p>
        </div>
        <Button onClick={() => window.location.href = '/admin/management/parents/add'} className="flex items-center gap-2">
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
            <div className="text-2xl font-bold text-primary">{parents.length}</div>
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
                  <tr key={parent.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <div className="font-medium">{parent.fatherName}</div>
                      <div className="text-sm text-muted-foreground">{parent.fatherOccupation}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium">{parent.motherName}</div>
                      <div className="text-sm text-muted-foreground">{parent.motherOccupation}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 mb-1">
                        <Phone className="w-3 h-3" />
                        <span className="text-sm">{parent.phone}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        <span className="text-sm">{parent.email}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span className="text-sm">{parent.address}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="font-medium">{parent.studentsCount}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleManageStudents(parent.id)}
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
                          onClick={() => handleEdit(parent.id)}
                          title="Edit Parent"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(parent.id)}
                          className="text-destructive hover:text-destructive"
                          title="Delete Parent"
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


    </div>
  );
}
