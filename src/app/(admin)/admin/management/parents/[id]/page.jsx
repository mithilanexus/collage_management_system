"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, 
  Edit, 
  UserPlus, 
  Users, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  FileText,
  Eye,
  Trash2,
  Search,
  GraduationCap,
  BookOpen,
  Award,
  Save,
  Settings
} from "lucide-react";

// Mock data - in real app, this would come from API
const mockParentData = {
  1: {
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
    students: [
      {
        id: 1,
        name: "Anil Shrestha",
        studentId: "STU2024001",
        class: "Grade 12",
        section: "A",
        rollNumber: "15",
        admissionDate: "2023-04-15",
        status: "Active",
        phone: "9841234567",
        email: "anil.shrestha@student.edu.np",
        dateOfBirth: "2006-05-15",
        bloodGroup: "A+",
        address: "Kathmandu-10, Bagbazar",
        previousSchool: "Shree Secondary School",
        slcGpa: "3.85",
        hostelResident: false,
        transportUser: true,
        scholarshipHolder: false
      },
      {
        id: 2,
        name: "Sunil Shrestha",
        studentId: "STU2024002",
        class: "Grade 10",
        section: "B",
        rollNumber: "22",
        admissionDate: "2022-04-20",
        status: "Active",
        phone: "9841234568",
        email: "sunil.shrestha@student.edu.np",
        dateOfBirth: "2008-08-10",
        bloodGroup: "B+",
        address: "Kathmandu-10, Bagbazar",
        previousSchool: "Shree Basic School",
        slcGpa: "3.65",
        hostelResident: false,
        transportUser: true,
        scholarshipHolder: true
      }
    ]
  },
  2: {
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
    students: [
      {
        id: 3,
        name: "Priya Poudel",
        studentId: "STU2024003",
        class: "Grade 11",
        section: "A",
        rollNumber: "08",
        admissionDate: "2023-04-20",
        status: "Active",
        phone: "9841234569",
        email: "priya.poudel@student.edu.np",
        dateOfBirth: "2007-08-22",
        bloodGroup: "B+",
        address: "Pokhara-15, Lakeside",
        previousSchool: "Shree Higher Secondary School",
        slcGpa: "3.92",
        hostelResident: true,
        transportUser: false,
        scholarshipHolder: true
      }
    ]
  }
};

export default function ParentDetail() {
  const params = useParams();
  const [parent, setParent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [newStudentData, setNewStudentData] = useState({
    name: "",
    studentId: "",
    class: "",
    section: "",
    rollNumber: "",
    phone: "",
    email: "",
    dateOfBirth: "",
    bloodGroup: "",
    address: "",
    previousSchool: "",
    slcGpa: "",
    status: "Active"
  });

  useEffect(() => {
    // Simulate API call
    const parentId = parseInt(params.id);
    const parentData = mockParentData[parentId];
    
    setTimeout(() => {
      setParent(parentData);
      setLoading(false);
    }, 500);
  }, [params.id]);

  const filteredStudents = parent?.students?.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleEdit = () => {
    window.location.href = `/admin/management/parents/${params.id}/edit`;
  };

  const handleAddStudent = () => {
    setShowAddStudentForm(true);
    setNewStudentData({
      name: "",
      studentId: `STU${Date.now()}`,
      class: "",
      section: "",
      rollNumber: "",
      phone: "",
      email: "",
      dateOfBirth: "",
      bloodGroup: "",
      address: "",
      previousSchool: "",
      slcGpa: "",
      status: "Active"
    });
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setNewStudentData({...student});
    setShowAddStudentForm(true);
  };

  const handleRemoveStudent = (studentId) => {
    if (confirm("Are you sure you want to remove this student from this parent?")) {
      const updatedStudents = parent.students.filter(s => s.id !== studentId);
      setParent({...parent, students: updatedStudents, studentsCount: updatedStudents.length});
    }
  };

  const handleStudentInputChange = (field, value) => {
    setNewStudentData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveStudent = () => {
    if (!newStudentData.name || !newStudentData.class) {
      alert("Please fill in required fields (Name and Class)");
      return;
    }

    if (editingStudent) {
      // Update existing student
      const updatedStudents = parent.students.map(s =>
        s.id === editingStudent.id ? {...newStudentData} : s
      );
      setParent({...parent, students: updatedStudents});
      alert("Student updated successfully!");
    } else {
      // Add new student
      const newStudent = {
        ...newStudentData,
        id: Date.now()
      };
      const updatedStudents = [...parent.students, newStudent];
      setParent({...parent, students: updatedStudents, studentsCount: updatedStudents.length});
      alert("Student added successfully!");
    }

    setShowAddStudentForm(false);
    setEditingStudent(null);
  };

  const handleCancelStudentForm = () => {
    setShowAddStudentForm(false);
    setEditingStudent(null);
    setNewStudentData({
      name: "",
      studentId: "",
      class: "",
      section: "",
      rollNumber: "",
      phone: "",
      email: "",
      dateOfBirth: "",
      bloodGroup: "",
      address: "",
      previousSchool: "",
      slcGpa: "",
      status: "Active"
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!parent) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-foreground mb-2">Parent Not Found</h2>
        <p className="text-muted-foreground mb-4">This parent record does not exist.</p>
        <Button onClick={() => window.history.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Parent Management</h1>
            <p className="text-muted-foreground">{parent.fatherName} - Student Management</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleEdit}>
            <Edit className="w-4 h-4 mr-2" />
            Edit Parent
          </Button>
          <Button onClick={handleAddStudent}>
            <UserPlus className="w-4 h-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Parent Information */}
        <div className="lg:col-span-1 space-y-6">
          {/* Parent Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Parent Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Father's Name</label>
                <p className="font-medium">{parent.fatherName}</p>
                <p className="text-sm text-muted-foreground">{parent.fatherOccupation}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Mother's Name</label>
                <p className="font-medium">{parent.motherName}</p>
                <p className="text-sm text-muted-foreground">{parent.motherOccupation}</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary" />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Primary Phone</label>
                  <p className="font-medium">{parent.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="font-medium">{parent.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary" />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Address</label>
                  <p className="font-medium">{parent.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold text-primary">{parent.studentsCount}</div>
              <div className="text-sm text-muted-foreground">Total Students</div>
            </CardContent>
          </Card>
        </div>

        {/* Students Management */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search and Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Students Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search students by name, ID or class..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button onClick={handleAddStudent} className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Add Student
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Add/Edit Student Form */}
          {showAddStudentForm && (
            <Card>
              <CardHeader>
                <CardTitle>{editingStudent ? 'Edit Student' : 'Add New Student'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="studentName">Full Name *</Label>
                    <Input
                      id="studentName"
                      value={newStudentData.name}
                      onChange={(e) => handleStudentInputChange("name", e.target.value)}
                      placeholder="Student full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input
                      id="studentId"
                      value={newStudentData.studentId}
                      onChange={(e) => handleStudentInputChange("studentId", e.target.value)}
                      placeholder="STU2024001"
                      disabled={editingStudent}
                    />
                  </div>
                  <div>
                    <Label htmlFor="studentClass">Class *</Label>
                    <select
                      className="w-full p-2 border border-border rounded-md"
                      value={newStudentData.class}
                      onChange={(e) => handleStudentInputChange("class", e.target.value)}
                    >
                      <option value="">Select Class</option>
                      {["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"].map((cls, index) => (
                        <option key={index} value={cls}>{cls}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="studentSection">Section</Label>
                    <Input
                      id="studentSection"
                      value={newStudentData.section}
                      onChange={(e) => handleStudentInputChange("section", e.target.value)}
                      placeholder="A"
                    />
                  </div>
                  <div>
                    <Label htmlFor="studentRoll">Roll Number</Label>
                    <Input
                      id="studentRoll"
                      value={newStudentData.rollNumber}
                      onChange={(e) => handleStudentInputChange("rollNumber", e.target.value)}
                      placeholder="15"
                    />
                  </div>
                  <div>
                    <Label htmlFor="studentPhone">Phone Number</Label>
                    <Input
                      id="studentPhone"
                      value={newStudentData.phone}
                      onChange={(e) => handleStudentInputChange("phone", e.target.value)}
                      placeholder="98XXXXXXXX"
                    />
                  </div>
                  <div>
                    <Label htmlFor="studentEmail">Email</Label>
                    <Input
                      id="studentEmail"
                      type="email"
                      value={newStudentData.email}
                      onChange={(e) => handleStudentInputChange("email", e.target.value)}
                      placeholder="student@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="studentDob">Date of Birth</Label>
                    <Input
                      id="studentDob"
                      type="date"
                      value={newStudentData.dateOfBirth}
                      onChange={(e) => handleStudentInputChange("dateOfBirth", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="studentBloodGroup">Blood Group</Label>
                    <select
                      className="w-full p-2 border border-border rounded-md"
                      value={newStudentData.bloodGroup}
                      onChange={(e) => handleStudentInputChange("bloodGroup", e.target.value)}
                    >
                      <option value="">Select Blood Group</option>
                      {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group, index) => (
                        <option key={index} value={group}>{group}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="studentGpa">SLC/SEE GPA</Label>
                    <Input
                      id="studentGpa"
                      value={newStudentData.slcGpa}
                      onChange={(e) => handleStudentInputChange("slcGpa", e.target.value)}
                      placeholder="3.85"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="studentAddress">Address</Label>
                    <Input
                      id="studentAddress"
                      value={newStudentData.address}
                      onChange={(e) => handleStudentInputChange("address", e.target.value)}
                      placeholder="Student address"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="studentPreviousSchool">Previous School</Label>
                    <Input
                      id="studentPreviousSchool"
                      value={newStudentData.previousSchool}
                      onChange={(e) => handleStudentInputChange("previousSchool", e.target.value)}
                      placeholder="Previous school name"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={handleCancelStudentForm}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveStudent}>
                    <Save className="w-4 h-4 mr-2" />
                    {editingStudent ? 'Update Student' : 'Add Student'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Students List */}
          <Card>
            <CardHeader>
              <CardTitle>Students ({filteredStudents.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredStudents.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No students found</p>
                  <Button size="sm" className="mt-2" onClick={handleAddStudent}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add First Student
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredStudents.map((student) => (
                    <div key={student.id} className="p-4 border border-border rounded-lg hover:bg-muted/50">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <GraduationCap className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-lg">{student.name}</h4>
                            <p className="text-sm text-muted-foreground">{student.email}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-sm font-mono bg-muted px-2 py-1 rounded">
                                {student.studentId}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {student.class} - Section {student.section}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                Roll: {student.rollNumber}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => window.location.href = `/admin/management/parents/${parent.id}/student/${student.id}`}
                            className="flex items-center gap-1"
                          >
                            <Settings className="w-3 h-3" />
                            Manage
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleViewStudent(student)}>
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleEditStudent(student)}>
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRemoveStudent(student.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Status:</span>
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                            student.status === "Active" 
                              ? "bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300"
                              : "bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-300"
                          }`}>
                            {student.status}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Phone:</span>
                          <p className="font-medium">{student.phone}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Blood Group:</span>
                          <p className="font-medium">{student.bloodGroup}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">SLC GPA:</span>
                          <p className="font-medium">{student.slcGpa}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-border">
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            <span className="text-muted-foreground">Admission: {student.admissionDate}</span>
                          </div>
                          {student.scholarshipHolder && (
                            <div className="flex items-center gap-2">
                              <Award className="w-3 h-3 text-yellow-600" />
                              <span className="text-yellow-600">Scholarship</span>
                            </div>
                          )}
                          {student.hostelResident && (
                            <div className="flex items-center gap-2">
                              <BookOpen className="w-3 h-3 text-blue-600" />
                              <span className="text-blue-600">Hostel</span>
                            </div>
                          )}
                          {student.transportUser && (
                            <div className="flex items-center gap-2">
                              <FileText className="w-3 h-3 text-green-600" />
                              <span className="text-green-600">Transport</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Student Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <p className="text-sm text-muted-foreground">{selectedStudent.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Student ID</label>
                  <p className="text-sm text-muted-foreground font-mono">{selectedStudent.studentId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Class</label>
                  <p className="text-sm text-muted-foreground">{selectedStudent.class} - Section {selectedStudent.section}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Roll Number</label>
                  <p className="text-sm text-muted-foreground">{selectedStudent.rollNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Date of Birth</label>
                  <p className="text-sm text-muted-foreground">{selectedStudent.dateOfBirth}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Blood Group</label>
                  <p className="text-sm text-muted-foreground">{selectedStudent.bloodGroup}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <p className="text-sm text-muted-foreground">{selectedStudent.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="text-sm text-muted-foreground">{selectedStudent.email}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium">Address</label>
                  <p className="text-sm text-muted-foreground">{selectedStudent.address}</p>
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
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedStudent(null)}>
                  Close
                </Button>
                <Button onClick={() => handleEditStudent(selectedStudent.id)}>
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
