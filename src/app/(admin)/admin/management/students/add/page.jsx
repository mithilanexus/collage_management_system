"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, User } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { toast } from "sonner";
import { DatePicker } from "@/components/DatePicker";
export default function AddStudent() {
  const [formData, setFormData] = useState({
    // Basic Information
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    caste: "",
    religion: "",
    nationality: "Nepali",
    bloodGroup: "",

    // Contact Information
    phone: "",
    email: "",
    permanentAddress: "",
    temporaryAddress: "",
    district: "",
    province: "",

    // Family Information
    fatherName: "",
    fatherOccupation: "",
    fatherPhone: "",
    motherName: "",
    motherOccupation: "",
    guardianName: "",
    guardianRelation: "",
    guardianPhone: "",
    guardianOccupation: "",

    // Academic Information
    class: "",
    section: "",
    rollNumber: "",
    admissionDate: new Date().toISOString(),
    previousSchool: "",
    slcGpa: "",

    // Additional Information
    hostelResident: false,
    transportUser: false,
    scholarshipHolder: false,
    medicalConditions: "",
    emergencyContact: "",
    emergencyContactRelation: "",
    remarks: ""
  });
  const router = useRouter()
  const parentId = useSearchParams().get("parent_id");
  console.log(parentId)
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await fetch(
        `/api/admin/management/students`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, parentId }),
        }
      );
      const data = await res.json();
      setTimeout(() => {
        console.log(data.success)
        console.log(data)
      }, 1000)

      if (data.success) {
        toast.success("Student added successfully");
        if (parentId) {
          router.push(`/admin/management/parents/${parentId}`);
        } else {
          router.push("/admin/management/students");
        }
      } else {
        toast.error(data.message || "Failed to add student information");
      }
    } catch (error) {
      toast.error(error.message);

    }
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Add New Student</h1>
          <p className="text-muted-foreground">Enter student information</p>
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
              <DatePicker
                label="Date of Birth"
                value={formData.dateOfBirth ? new Date(formData.dateOfBirth) : undefined}
                onChange={(date) =>
                  handleInputChange("dateOfBirth", date ? date.toISOString() : "")
                }
                required
              />


              <div>
                <Label htmlFor="gender">Gender *</Label>
                <Select
                  id="gender"
                  value={formData.gender}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, gender: value }))
                  }
                  required
                >
                  <SelectTrigger className="w-full p-2 border border-border rounded-md">
                    {formData.gender || "Select Gender"}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unknown">Select Gender</SelectItem>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>

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
              <div>
                <Label htmlFor="nationality">Nationality *</Label>
                <Input
                  id="nationality"
                  value={formData.nationality}
                  onChange={(e) => handleInputChange("nationality", e.target.value)}
                  placeholder="Nepali"
                  required
                />
              </div>
              <div>
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <Select
                  id="bloodGroup"
                  value={formData.bloodGroup}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, bloodGroup: value }))
                  }
                >
                  <SelectTrigger className="w-full p-2 border border-border rounded-md">
                    {formData.bloodGroup || "Select Blood Group"}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unknown">Select Blood Group</SelectItem>
                    {bloodGroups.map((group, index) => (
                      <SelectItem key={index} value={group}>{group}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                <Select
                  id="province"
                  value={formData.province}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, province: value }))
                  }
                  required
                >
                  <SelectTrigger className="w-full p-2 border border-border rounded-md">
                    {formData.province || "Select Province"}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unknown">Select Province</SelectItem>
                    {provinces.map((province, index) => (
                      <SelectItem key={index} value={province}>{province}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                <Label htmlFor="fatherOccupation">Father's Occupation</Label>
                <Input
                  id="fatherOccupation"
                  value={formData.fatherOccupation}
                  onChange={(e) => handleInputChange("fatherOccupation", e.target.value)}
                  placeholder="Business, Teacher, Farmer, etc."
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
                <Label htmlFor="motherOccupation">Mother's Occupation</Label>
                <Input
                  id="motherOccupation"
                  value={formData.motherOccupation}
                  onChange={(e) => handleInputChange("motherOccupation", e.target.value)}
                  placeholder="Housewife, Teacher, Nurse, etc."
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
                <Select
                  id="class"
                  value={formData.class}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, class: value }))
                  }
                  required
                >
                  <SelectTrigger className="w-full p-2 border border-border rounded-md">
                    {formData.class || "Select Class"}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unknown">Select Class</SelectItem>
                    {classes.map((cls, index) => (
                      <SelectItem key={index} value={cls}>{cls}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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

              <DatePicker
                label="Admission Date"
                value={formData.admissionDate ? new Date(formData.admissionDate) : undefined}
                onChange={(date) =>
                  handleInputChange("admissionDate", date ? date.toISOString() : "")
                }
              />

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
                  min="0"
                  max="4"
                  step="0.01"
                  type="number"
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
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button type="submit" className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Student
          </Button>
        </div>
      </form>
    </div>
  );
}
