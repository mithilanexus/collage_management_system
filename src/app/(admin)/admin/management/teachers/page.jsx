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
  GraduationCap,
  Phone,
  Mail,
  Calendar,
  BookOpen,
  Award
} from "lucide-react";

// Mock data for teachers (English interface, Nepali college system fields)
const mockTeachers = [
  {
    id: 1,
    name: "Dr. Ram Prasad Sharma",
    employeeId: "TCH001",
    designation: "Professor",
    department: "English Department",
    qualification: "Ph.D. in English Literature",
    experience: "15 years",
    phone: "9841234567",
    email: "ram.sharma@college.edu.np",
    address: "Kathmandu-5, New Baneshwor",
    joiningDate: "2009-07-15",
    salary: "Rs. 85,000",
    subjects: ["English Literature", "Creative Writing", "Research Methodology"],
    status: "Permanent",
    citizenship: "12-01-70-01234",
    panNumber: "301234567",
    bloodGroup: "A+",
    maritalStatus: "Married"
  },
  {
    id: 2,
    name: "Mrs. Gita Poudel",
    employeeId: "TCH002",
    designation: "Associate Professor",
    department: "Mathematics Department",
    qualification: "M.Sc. Mathematics, M.Ed.",
    experience: "12 years",
    phone: "9841234568",
    email: "gita.poudel@college.edu.np",
    address: "Lalitpur-3, Jawalakhel",
    joiningDate: "2012-08-20",
    salary: "Rs. 75,000",
    subjects: ["Calculus", "Statistics", "Applied Mathematics"],
    status: "Permanent",
    citizenship: "23-01-72-01235",
    panNumber: "301234568",
    bloodGroup: "B+",
    maritalStatus: "Married"
  },
  {
    id: 3,
    name: "Hari Bahadur Tamang",
    employeeId: "TCH003",
    designation: "Assistant Professor",
    department: "Nepali Department",
    qualification: "M.A. Nepali Literature",
    experience: "8 years",
    phone: "9841234569",
    email: "hari.tamang@college.edu.np",
    address: "Bhaktapur-4, Dudhpati",
    joiningDate: "2016-01-10",
    salary: "Rs. 65,000",
    subjects: ["Nepali Literature", "Grammar", "Poetry"],
    status: "Temporary",
    citizenship: "25-01-74-01236",
    panNumber: "301234569",
    bloodGroup: "O+",
    maritalStatus: "Single"
  },
  {
    id: 4,
    name: "Dr. Sunita Rai",
    employeeId: "TCH004",
    designation: "Professor",
    department: "Physics Department",
    qualification: "Ph.D. in Physics",
    experience: "18 years",
    phone: "9841234570",
    email: "sunita.rai@college.edu.np",
    address: "Kathmandu-8, Kalimati",
    joiningDate: "2006-03-25",
    salary: "Rs. 90,000",
    subjects: ["Quantum Physics", "Thermodynamics", "Electronics"],
    status: "Permanent",
    citizenship: "12-01-68-01237",
    panNumber: "301234570",
    bloodGroup: "AB+",
    maritalStatus: "Married"
  }
];

export default function TeachersManagement() {
  const [teachers, setTeachers] = useState(mockTeachers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.phone.includes(searchTerm) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (teacher) => {
    setSelectedTeacher(teacher);
  };

  const handleEdit = (teacherId) => {
    window.location.href = `/admin/management/teachers/${teacherId}/edit`;
  };

  const handleDelete = (teacherId) => {
    if (confirm("Are you sure you want to delete this teacher record?")) {
      setTeachers(teachers.filter(t => t.id !== teacherId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Teachers Management</h1>
          <p className="text-muted-foreground">Manage teacher records and information</p>
        </div>
        <Button onClick={() => window.location.href = '/admin/management/teachers/add'} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New Teacher
        </Button>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by name, employee ID, department or contact..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{teachers.length}</div>
            <div className="text-sm text-muted-foreground">Total Teachers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {teachers.filter(t => t.status === "Permanent").length}
            </div>
            <div className="text-sm text-muted-foreground">Permanent Teachers</div>
          </CardContent>
        </Card>
      </div>

      {/* Teachers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Teachers List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Teacher Name</th>
                  <th className="text-left p-4">Employee ID</th>
                  <th className="text-left p-4">Designation</th>
                  <th className="text-left p-4">Department</th>
                  <th className="text-left p-4">Contact</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeachers.map((teacher) => (
                  <tr key={teacher.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{teacher.name}</div>
                        <div className="text-sm text-muted-foreground">{teacher.qualification}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                        {teacher.employeeId}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="font-medium">{teacher.designation}</div>
                      <div className="text-sm text-muted-foreground">{teacher.experience}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium">{teacher.department}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 mb-1">
                        <Phone className="w-3 h-3" />
                        <span className="text-sm">{teacher.phone}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        <span className="text-sm">{teacher.email}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        teacher.status === "Permanent" 
                          ? "bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-300"
                      }`}>
                        {teacher.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleView(teacher)}
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(teacher.id)}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(teacher.id)}
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

      {/* Teacher Details Modal */}
      {selectedTeacher && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Teacher Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <p className="text-sm text-muted-foreground">{selectedTeacher.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Employee ID</label>
                  <p className="text-sm text-muted-foreground font-mono">{selectedTeacher.employeeId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Designation</label>
                  <p className="text-sm text-muted-foreground">{selectedTeacher.designation}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Department</label>
                  <p className="text-sm text-muted-foreground">{selectedTeacher.department}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Qualification</label>
                  <p className="text-sm text-muted-foreground">{selectedTeacher.qualification}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Experience</label>
                  <p className="text-sm text-muted-foreground">{selectedTeacher.experience}</p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Phone Number</label>
                    <p className="text-sm text-muted-foreground">{selectedTeacher.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-sm text-muted-foreground">{selectedTeacher.email}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium">Address</label>
                    <p className="text-sm text-muted-foreground">{selectedTeacher.address}</p>
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Professional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Joining Date</label>
                    <p className="text-sm text-muted-foreground">{selectedTeacher.joiningDate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Salary</label>
                    <p className="text-sm text-muted-foreground">{selectedTeacher.salary}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Status</label>
                    <p className="text-sm text-muted-foreground">{selectedTeacher.status}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Blood Group</label>
                    <p className="text-sm text-muted-foreground">{selectedTeacher.bloodGroup}</p>
                  </div>
                </div>
              </div>

              {/* Subjects */}
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Teaching Subjects</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedTeacher.subjects.map((subject, index) => (
                    <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedTeacher(null)}>
                  Close
                </Button>
                <Button onClick={() => handleEdit(selectedTeacher.id)}>
                  Edit Teacher
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
