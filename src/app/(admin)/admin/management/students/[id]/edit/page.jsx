"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, GraduationCap } from "lucide-react";

// Mock data - in real app, this would come from API
const mockStudentData = {
  1: {
    id: 1,
    firstName: "Anil",
    lastName: "Shrestha",
    studentId: "STU2024001",
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
    scholarshipHolder: false,
    medicalConditions: "",
    emergencyContact: "9841234568",
    emergencyContactRelation: "Uncle",
    remarks: "Good student, active in sports"
  }
};

export default function EditStudent() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    studentId: "",
    fatherName: "",
    motherName: "",
    dateOfBirth: "",
    gender: "",
    caste: "",
    religion: "",
    nationality: "Nepali",
    phone: "",
    email: "",
    permanentAddress: "",
    temporaryAddress: "",
    district: "",
    province: "",
    guardianName: "",
    guardianRelation: "",
    guardianPhone: "",
    guardianOccupation: "",
    class: "",
    section: "",
    rollNumber: "",
    admissionDate: "",
    previousSchool: "",
    slcBoard: "",
    slcYear: "",
    slcGpa: "",
    bloodGroup: "",
    status: "Active",
    hostelResident: false,
    transportUser: false,
    scholarshipHolder: false,
    medicalConditions: "",
    emergencyContact: "",
    emergencyContactRelation: "",
    remarks: ""
  });

  useEffect(() => {
    // Simulate API call to fetch student data
    const studentId = parseInt(params.id);
    const studentData = mockStudentData[studentId];
    
    setTimeout(() => {
      if (studentData) {
        setFormData(studentData);
      }
      setLoading(false);
    }, 500);
  }, [params.id]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated student data:", formData);
    alert("Student information updated successfully!");
    window.history.back();
  };

  const provinces = [
    "Province No. 1", "Madhesh Province", "Bagmati Province", "Gandaki Province", 
    "Lumbini Province", "Karnali Province", "Sudurpashchim Province"
  ];

  const classes = [
    "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8",
    "Grade 9", "Grade 10", "Grade 11", "Grade 12"
  ];

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

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
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Edit Student</h1>
          <p className="text-muted-foreground">Update student information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Doe"
                  required
                />
              </div>
              <div>
                <Label htmlFor="studentId">Student ID</Label>
                <Input
                  id="studentId"
                  value={formData.studentId}
                  onChange={(e) => handleInputChange("studentId", e.target.value)}
                  placeholder="STU2024001"
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender *</Label>
                <select
                  className="w-full p-2 border border-border rounded-md"
                  value={formData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <select
                  className="w-full p-2 border border-border rounded-md"
                  value={formData.bloodGroup}
                  onChange={(e) => handleInputChange("bloodGroup", e.target.value)}
                >
                  <option value="">Select Blood Group</option>
                  {bloodGroups.map((group, index) => (
                    <option key={index} value={group}>{group}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="caste">Caste</Label>
                <Input
                  id="caste"
                  value={formData.caste}
                  onChange={(e) => handleInputChange("caste", e.target.value)}
                  placeholder="Brahmin, Chhetri, Newar, etc."
                />
              </div>
              <div>
                <Label htmlFor="religion">Religion</Label>
                <Input
                  id="religion"
                  value={formData.religion}
                  onChange={(e) => handleInputChange("religion", e.target.value)}
                  placeholder="Hindu, Buddhist, Christian, etc."
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="98XXXXXXXX"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="student@example.com"
                />
              </div>
              <div>
                <Label htmlFor="permanentAddress">Permanent Address *</Label>
                <Input
                  id="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={(e) => handleInputChange("permanentAddress", e.target.value)}
                  placeholder="Kathmandu-10, Bagbazar"
                  required
                />
              </div>
              <div>
                <Label htmlFor="temporaryAddress">Temporary Address</Label>
                <Input
                  id="temporaryAddress"
                  value={formData.temporaryAddress}
                  onChange={(e) => handleInputChange("temporaryAddress", e.target.value)}
                  placeholder="Same as permanent address"
                />
              </div>
              <div>
                <Label htmlFor="district">District *</Label>
                <Input
                  id="district"
                  value={formData.district}
                  onChange={(e) => handleInputChange("district", e.target.value)}
                  placeholder="Kathmandu"
                  required
                />
              </div>
              <div>
                <Label htmlFor="province">Province *</Label>
                <select
                  className="w-full p-2 border border-border rounded-md"
                  value={formData.province}
                  onChange={(e) => handleInputChange("province", e.target.value)}
                  required
                >
                  <option value="">Select Province</option>
                  {provinces.map((province, index) => (
                    <option key={index} value={province}>{province}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Family Information */}
        <Card>
          <CardHeader>
            <CardTitle>Family Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fatherName">Father's Name *</Label>
                <Input
                  id="fatherName"
                  value={formData.fatherName}
                  onChange={(e) => handleInputChange("fatherName", e.target.value)}
                  placeholder="Father's full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="motherName">Mother's Name *</Label>
                <Input
                  id="motherName"
                  value={formData.motherName}
                  onChange={(e) => handleInputChange("motherName", e.target.value)}
                  placeholder="Mother's full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="guardianName">Guardian Name</Label>
                <Input
                  id="guardianName"
                  value={formData.guardianName}
                  onChange={(e) => handleInputChange("guardianName", e.target.value)}
                  placeholder="If different from parents"
                />
              </div>
              <div>
                <Label htmlFor="guardianRelation">Guardian Relation</Label>
                <Input
                  id="guardianRelation"
                  value={formData.guardianRelation}
                  onChange={(e) => handleInputChange("guardianRelation", e.target.value)}
                  placeholder="Uncle, Aunt, Brother, etc."
                />
              </div>
              <div>
                <Label htmlFor="guardianPhone">Guardian Phone *</Label>
                <Input
                  id="guardianPhone"
                  value={formData.guardianPhone}
                  onChange={(e) => handleInputChange("guardianPhone", e.target.value)}
                  placeholder="98XXXXXXXX"
                  required
                />
              </div>
              <div>
                <Label htmlFor="guardianOccupation">Guardian Occupation</Label>
                <Input
                  id="guardianOccupation"
                  value={formData.guardianOccupation}
                  onChange={(e) => handleInputChange("guardianOccupation", e.target.value)}
                  placeholder="Guardian's occupation"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Academic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Academic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="class">Class *</Label>
                <select
                  className="w-full p-2 border border-border rounded-md"
                  value={formData.class}
                  onChange={(e) => handleInputChange("class", e.target.value)}
                  required
                >
                  <option value="">Select Class</option>
                  {classes.map((cls, index) => (
                    <option key={index} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="section">Section *</Label>
                <Input
                  id="section"
                  value={formData.section}
                  onChange={(e) => handleInputChange("section", e.target.value)}
                  placeholder="A, B, C, etc."
                  required
                />
              </div>
              <div>
                <Label htmlFor="rollNumber">Roll Number</Label>
                <Input
                  id="rollNumber"
                  value={formData.rollNumber}
                  onChange={(e) => handleInputChange("rollNumber", e.target.value)}
                  placeholder="15"
                />
              </div>
              <div>
                <Label htmlFor="admissionDate">Admission Date *</Label>
                <Input
                  id="admissionDate"
                  type="date"
                  value={formData.admissionDate}
                  onChange={(e) => handleInputChange("admissionDate", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="previousSchool">Previous School</Label>
                <Input
                  id="previousSchool"
                  value={formData.previousSchool}
                  onChange={(e) => handleInputChange("previousSchool", e.target.value)}
                  placeholder="Name of previous school"
                />
              </div>
              <div>
                <Label htmlFor="slcGpa">SLC/SEE GPA</Label>
                <Input
                  id="slcGpa"
                  value={formData.slcGpa}
                  onChange={(e) => handleInputChange("slcGpa", e.target.value)}
                  placeholder="3.85"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="hostelResident"
                  checked={formData.hostelResident}
                  onChange={(e) => handleInputChange("hostelResident", e.target.checked)}
                />
                <Label htmlFor="hostelResident">Hostel Resident</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="transportUser"
                  checked={formData.transportUser}
                  onChange={(e) => handleInputChange("transportUser", e.target.checked)}
                />
                <Label htmlFor="transportUser">Transport User</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="scholarshipHolder"
                  checked={formData.scholarshipHolder}
                  onChange={(e) => handleInputChange("scholarshipHolder", e.target.checked)}
                />
                <Label htmlFor="scholarshipHolder">Scholarship Holder</Label>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                  placeholder="98XXXXXXXX"
                />
              </div>
              <div>
                <Label htmlFor="emergencyContactRelation">Emergency Contact Relation</Label>
                <Input
                  id="emergencyContactRelation"
                  value={formData.emergencyContactRelation}
                  onChange={(e) => handleInputChange("emergencyContactRelation", e.target.value)}
                  placeholder="Uncle, Aunt, etc."
                />
              </div>
            </div>
            <div>
              <Label htmlFor="medicalConditions">Medical Conditions</Label>
              <Textarea
                id="medicalConditions"
                value={formData.medicalConditions}
                onChange={(e) => handleInputChange("medicalConditions", e.target.value)}
                placeholder="Any medical conditions or allergies..."
                rows={2}
              />
            </div>
            <div>
              <Label htmlFor="remarks">Remarks</Label>
              <Textarea
                id="remarks"
                value={formData.remarks}
                onChange={(e) => handleInputChange("remarks", e.target.value)}
                placeholder="Any additional remarks..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-4">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          <Button type="submit" className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Update Student
          </Button>
        </div>
      </form>
    </div>
  );
}
