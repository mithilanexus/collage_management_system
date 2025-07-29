"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, 
  Save, 
  Search,
  UserPlus,
  Users,
  Plus,
  GraduationCap
} from "lucide-react";

// Mock available students (not assigned to this parent)
const mockAvailableStudents = [
  {
    id: 4,
    name: "Priya Poudel",
    studentId: "STU2024004",
    class: "Grade 11",
    section: "A",
    rollNumber: "08",
    phone: "9841234570",
    email: "priya.poudel@student.edu.np",
    address: "Pokhara-15, Lakeside",
    dateOfBirth: "2007-08-22",
    bloodGroup: "B+",
    status: "Active"
  },
  {
    id: 5,
    name: "Rajesh Gurung",
    studentId: "STU2024005",
    class: "Grade 9",
    section: "B",
    rollNumber: "12",
    phone: "9841234571",
    email: "rajesh.gurung@student.edu.np",
    address: "Gorkha-5, Arughat",
    dateOfBirth: "2008-12-10",
    bloodGroup: "O+",
    status: "Active"
  },
  {
    id: 6,
    name: "Suresh Gurung",
    studentId: "STU2024006",
    class: "Grade 7",
    section: "A",
    rollNumber: "25",
    phone: "9841234572",
    email: "suresh.gurung@student.edu.np",
    address: "Gorkha-5, Arughat",
    dateOfBirth: "2010-03-15",
    bloodGroup: "A+",
    status: "Active"
  }
];

export default function AddStudentToParent() {
  const params = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [availableStudents, setAvailableStudents] = useState(mockAvailableStudents);
  const [showNewStudentForm, setShowNewStudentForm] = useState(false);
  const [newStudentData, setNewStudentData] = useState({
    name: "",
    class: "",
    section: "",
    rollNumber: "",
    phone: "",
    email: "",
    address: "",
    dateOfBirth: "",
    bloodGroup: ""
  });

  const filteredStudents = availableStudents.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.includes(searchTerm)
  );

  const handleStudentSelect = (student) => {
    if (selectedStudents.find(s => s.id === student.id)) {
      setSelectedStudents(selectedStudents.filter(s => s.id !== student.id));
    } else {
      setSelectedStudents([...selectedStudents, student]);
    }
  };

  const handleNewStudentInputChange = (field, value) => {
    setNewStudentData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddNewStudent = () => {
    if (newStudentData.name && newStudentData.class) {
      const newStudent = {
        id: Date.now(),
        ...newStudentData,
        studentId: `STU${Date.now()}`,
        status: "Active",
        isNew: true
      };
      setSelectedStudents([...selectedStudents, newStudent]);
      setNewStudentData({
        name: "",
        class: "",
        section: "",
        rollNumber: "",
        phone: "",
        email: "",
        address: "",
        dateOfBirth: "",
        bloodGroup: ""
      });
      setShowNewStudentForm(false);
    }
  };

  const handleSubmit = () => {
    if (selectedStudents.length === 0) {
      alert("Please select at least one student.");
      return;
    }

    console.log("Adding students to parent:", params.id, selectedStudents);
    alert(`${selectedStudents.length} students added successfully!`);
    window.location.href = `/admin/management/parents/${params.id}`;
  };

  const classes = [
    "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8",
    "Grade 9", "Grade 10", "Grade 11", "Grade 12"
  ];

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Add Students to Parent</h1>
          <p className="text-muted-foreground">Select existing students or create new ones</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Available Students */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search */}
          <Card>
            <CardHeader>
              <CardTitle>Available Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search by student name, ID or class..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    {filteredStudents.length} students found
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowNewStudentForm(!showNewStudentForm)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Student
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* New Student Form */}
          {showNewStudentForm && (
            <Card>
              <CardHeader>
                <CardTitle>Add New Student</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="newName">Full Name *</Label>
                    <Input
                      id="newName"
                      value={newStudentData.name}
                      onChange={(e) => handleNewStudentInputChange("name", e.target.value)}
                      placeholder="Ram Shrestha"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newClass">Class *</Label>
                    <select
                      className="w-full p-2 border border-border rounded-md"
                      value={newStudentData.class}
                      onChange={(e) => handleNewStudentInputChange("class", e.target.value)}
                    >
                      <option value="">Select Class</option>
                      {classes.map((cls, index) => (
                        <option key={index} value={cls}>{cls}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="newSection">Section</Label>
                    <Input
                      id="newSection"
                      value={newStudentData.section}
                      onChange={(e) => handleNewStudentInputChange("section", e.target.value)}
                      placeholder="A"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newRoll">Roll Number</Label>
                    <Input
                      id="newRoll"
                      value={newStudentData.rollNumber}
                      onChange={(e) => handleNewStudentInputChange("rollNumber", e.target.value)}
                      placeholder="15"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newPhone">Phone Number</Label>
                    <Input
                      id="newPhone"
                      value={newStudentData.phone}
                      onChange={(e) => handleNewStudentInputChange("phone", e.target.value)}
                      placeholder="98XXXXXXXX"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newEmail">Email</Label>
                    <Input
                      id="newEmail"
                      type="email"
                      value={newStudentData.email}
                      onChange={(e) => handleNewStudentInputChange("email", e.target.value)}
                      placeholder="student@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newDob">Date of Birth</Label>
                    <Input
                      id="newDob"
                      type="date"
                      value={newStudentData.dateOfBirth}
                      onChange={(e) => handleNewStudentInputChange("dateOfBirth", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="newBloodGroup">Blood Group</Label>
                    <select
                      className="w-full p-2 border border-border rounded-md"
                      value={newStudentData.bloodGroup}
                      onChange={(e) => handleNewStudentInputChange("bloodGroup", e.target.value)}
                    >
                      <option value="">Select Blood Group</option>
                      {bloodGroups.map((group, index) => (
                        <option key={index} value={group}>{group}</option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="newAddress">Address</Label>
                    <Input
                      id="newAddress"
                      value={newStudentData.address}
                      onChange={(e) => handleNewStudentInputChange("address", e.target.value)}
                      placeholder="Kathmandu-10, Bagbazar"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setShowNewStudentForm(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddNewStudent}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Student
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Students List */}
          <Card>
            <CardContent className="p-0">
              <div className="space-y-2 p-4">
                {filteredStudents.map((student) => (
                  <div 
                    key={student.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedStudents.find(s => s.id === student.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-muted/50"
                    }`}
                    onClick={() => handleStudentSelect(student)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <GraduationCap className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-mono">{student.studentId}</p>
                        <p className="text-sm text-muted-foreground">{student.class} - {student.section}</p>
                      </div>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                      <p>Roll: {student.rollNumber}</p>
                      <p>Phone: {student.phone}</p>
                      <p>Blood Group: {student.bloodGroup}</p>
                      <p>DOB: {student.dateOfBirth}</p>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      <p>Address: {student.address}</p>
                    </div>
                  </div>
                ))}

                {filteredStudents.length === 0 && (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No students found</p>
                    <Button 
                      size="sm" 
                      className="mt-2"
                      onClick={() => setShowNewStudentForm(true)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create New Student
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Selected Students */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Selected Students ({selectedStudents.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedStudents.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No students selected</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedStudents.map((student) => (
                    <div key={student.id} className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-sm">{student.name}</h5>
                          <p className="text-xs text-muted-foreground">{student.email}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleStudentSelect(student)}
                          className="text-destructive hover:text-destructive"
                        >
                          ×
                        </Button>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        <p>{student.studentId} | {student.class}</p>
                        {student.isNew && (
                          <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs mt-1">
                            New Student
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="space-y-3">
            <Button 
              onClick={handleSubmit}
              className="w-full"
              disabled={selectedStudents.length === 0}
            >
              <Save className="w-4 h-4 mr-2" />
              Add Students ({selectedStudents.length})
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.history.back()}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
