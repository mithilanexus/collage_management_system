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
  User
} from "lucide-react";

// Mock data for students (Nepali college system fields)
const mockStudents = [
  {
    id: 1,
    studentId: "STU2024001",
    firstName: "Anil",
    lastName: "Shrestha",
    fatherName: "Ram Bahadur Shrestha",
    motherName: "Sita Shrestha",
    dateOfBirth: "2006-05-15",
    gender: "Male",
    caste: "Newar",
    religion: "Hindu",
    nationality: "Nepali",
    phone: "9841234567",
    email: "anil.shrestha@student.edu.np",
    permanentAddress: "Kathmandu-10, Bagbazar",
    temporaryAddress: "Kathmandu-10, Bagbazar",
    district: "Kathmandu",
    province: "Bagmati Province",
    guardianName: "Ram Bahadur Shrestha",
    guardianRelation: "Father",
    guardianPhone: "9841234567",
    guardianOccupation: "Business",
    class: "Grade 12",
    section: "A",
    rollNumber: "15",
    admissionDate: "2023-04-15",
    previousSchool: "Shree Secondary School",
    slcBoard: "NEB",
    slcYear: "2022",
    slcGpa: "3.85",
    bloodGroup: "A+",
    status: "Active",
    hostelResident: false,
    transportUser: true,
    scholarshipHolder: false
  },
  {
    id: 2,
    studentId: "STU2024002",
    firstName: "Priya",
    lastName: "Poudel",
    fatherName: "Hari Prasad Poudel",
    motherName: "Gita Poudel",
    dateOfBirth: "2007-08-22",
    gender: "Female",
    caste: "Brahmin",
    religion: "Hindu",
    nationality: "Nepali",
    phone: "9841234568",
    email: "priya.poudel@student.edu.np",
    permanentAddress: "Pokhara-15, Lakeside",
    temporaryAddress: "Kathmandu-5, New Baneshwor",
    district: "Kaski",
    province: "Gandaki Province",
    guardianName: "Hari Prasad Poudel",
    guardianRelation: "Father",
    guardianPhone: "9841234568",
    guardianOccupation: "Teacher",
    class: "Grade 11",
    section: "A",
    rollNumber: "08",
    admissionDate: "2023-04-20",
    previousSchool: "Shree Higher Secondary School",
    slcBoard: "NEB",
    slcYear: "2023",
    slcGpa: "3.92",
    bloodGroup: "B+",
    status: "Active",
    hostelResident: true,
    transportUser: false,
    scholarshipHolder: true
  },
  {
    id: 3,
    studentId: "STU2024003",
    firstName: "Rajesh",
    lastName: "Gurung",
    fatherName: "Krishna Bahadur Gurung",
    motherName: "Maya Gurung",
    dateOfBirth: "2008-12-10",
    gender: "Male",
    caste: "Gurung",
    religion: "Buddhist",
    nationality: "Nepali",
    phone: "9841234569",
    email: "rajesh.gurung@student.edu.np",
    permanentAddress: "Gorkha-5, Arughat",
    temporaryAddress: "Gorkha-5, Arughat",
    district: "Gorkha",
    province: "Gandaki Province",
    guardianName: "Krishna Bahadur Gurung",
    guardianRelation: "Father",
    guardianPhone: "9841234569",
    guardianOccupation: "Farmer",
    class: "Grade 9",
    section: "B",
    rollNumber: "12",
    admissionDate: "2023-04-25",
    previousSchool: "Shree Basic School",
    slcBoard: "NEB",
    slcYear: "2023",
    slcGpa: "3.45",
    bloodGroup: "O+",
    status: "Active",
    hostelResident: false,
    transportUser: true,
    scholarshipHolder: true
  }
];

export default function StudentsManagement() {
  const [students, setStudents] = useState(mockStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredStudents = students.filter(student =>
    student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.phone.includes(searchTerm) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (student) => {
    setSelectedStudent(student);
  };

  const handleEdit = (studentId) => {
    window.location.href = `/admin/management/students/${studentId}/edit`;
  };

  const handleDelete = (studentId) => {
    if (confirm("Are you sure you want to delete this student record?")) {
      setStudents(students.filter(s => s.id !== studentId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Students Management</h1>
          <p className="text-muted-foreground">Manage student records and information</p>
        </div>
        <Button onClick={() => window.location.href = '/admin/management/students/add'} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New Student
        </Button>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by name, student ID, class, phone or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{students.length}</div>
            <div className="text-sm text-muted-foreground">Total Students</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {students.filter(s => s.status === "Active").length}
            </div>
            <div className="text-sm text-muted-foreground">Active Students</div>
          </CardContent>
        </Card>
      </div>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>Students List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Student</th>
                  <th className="text-left p-4">Student ID</th>
                  <th className="text-left p-4">Class</th>
                  <th className="text-left p-4">Contact</th>
                  <th className="text-left p-4">Guardian</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{student.firstName} {student.lastName}</div>
                        <div className="text-sm text-muted-foreground">{student.email}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                        {student.studentId}
                      </span>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{student.class}</div>
                        <div className="text-sm text-muted-foreground">Section {student.section} - Roll {student.rollNumber}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 mb-1">
                        <Phone className="w-3 h-3" />
                        <span className="text-sm">{student.phone}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{student.district}</div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium text-sm">{student.guardianName}</div>
                        <div className="text-sm text-muted-foreground">{student.guardianRelation}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        student.status === "Active" 
                          ? "bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300"
                          : "bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-300"
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleView(student)}
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(student.id)}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(student.id)}
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

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Student Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <p className="text-sm text-muted-foreground">{selectedStudent.firstName} {selectedStudent.lastName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Student ID</label>
                  <p className="text-sm text-muted-foreground font-mono">{selectedStudent.studentId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Date of Birth</label>
                  <p className="text-sm text-muted-foreground">{selectedStudent.dateOfBirth}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Gender</label>
                  <p className="text-sm text-muted-foreground">{selectedStudent.gender}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Caste</label>
                  <p className="text-sm text-muted-foreground">{selectedStudent.caste}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Religion</label>
                  <p className="text-sm text-muted-foreground">{selectedStudent.religion}</p>
                </div>
              </div>

              {/* Academic Information */}
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Academic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Class</label>
                    <p className="text-sm text-muted-foreground">{selectedStudent.class}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Section</label>
                    <p className="text-sm text-muted-foreground">{selectedStudent.section}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Roll Number</label>
                    <p className="text-sm text-muted-foreground">{selectedStudent.rollNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Admission Date</label>
                    <p className="text-sm text-muted-foreground">{selectedStudent.admissionDate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Previous School</label>
                    <p className="text-sm text-muted-foreground">{selectedStudent.previousSchool}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">SLC GPA</label>
                    <p className="text-sm text-muted-foreground">{selectedStudent.slcGpa}</p>
                  </div>
                </div>
              </div>

              {/* Guardian Information */}
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Guardian Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Father's Name</label>
                    <p className="text-sm text-muted-foreground">{selectedStudent.fatherName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Mother's Name</label>
                    <p className="text-sm text-muted-foreground">{selectedStudent.motherName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Guardian Name</label>
                    <p className="text-sm text-muted-foreground">{selectedStudent.guardianName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Guardian Occupation</label>
                    <p className="text-sm text-muted-foreground">{selectedStudent.guardianOccupation}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedStudent(null)}>
                  Close
                </Button>
                <Button onClick={() => handleEdit(selectedStudent.id)}>
                  Edit Student
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
