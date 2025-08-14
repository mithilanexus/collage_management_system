
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  Save,
  Upload,
  User,
  School,
  BookOpen,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AddPrimaryTeacher() {
  const [formData, setFormData] = useState({
    // Personal Information
    nepaliName: "",
    name: "",
    email: "",
    phone: "",
    alternatePhone: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    citizenshipNumber: "",

    // Professional Information
    qualification: "",
    specialization: "",
    experience: "",
    previousSchool: "",
    joinDate: "",
    employeeId: "",

    // Teaching Details
    subjects: [],
    classes: [],

    // Salary Information
    basicSalary: "",
    allowances: "",

    // Additional Information
    emergencyContact: "",
    emergencyPhone: "",
    notes: ""
  });
  const router = useRouter()

  const availableSubjects = [
    "Nepali", "English", "Mathematics", "Science", "Social Studies",
    "Health & Physical Education", "Art", "Computer"
  ];

  const availableClasses = [
    "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5"
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubjectChange = (subject, checked) => {
    setFormData(prev => ({
      ...prev,
      subjects: checked
        ? [...prev.subjects, subject]
        : prev.subjects.filter(s => s !== subject)
    }));
  };

  const handleClassChange = (cls, checked) => {
    setFormData(prev => ({
      ...prev,
      classes: checked
        ? [...prev.classes, cls]
        : prev.classes.filter(c => c !== cls)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/management/teachers/primary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        console.log("Teacher added successfully:", data);
        toast.success("Teacher added successfully");
        router.push("/admin/management/teachers/primary");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/management/teachers/primary">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Primary Teachers
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
            <User className="w-8 h-8 text-green-600" />
            Add Primary Teacher
          </h1>
          <p className="text-muted-foreground">
            Create a new primary level teacher profile
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nepaliName">Full Name (Nepali) *</Label>
                <Input
                  id="nepaliName"
                  placeholder="पूरा नाम नेपालीमा"
                  value={formData.nepaliName}
                  onChange={(e) => handleInputChange("nepaliName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name (English) *</Label>
                <Input
                  id="name"
                  placeholder="Full Name in English"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="teacher@school.edu.np"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    placeholder="+977-98XXXXXXXX"
                    className="pl-10"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="alternatePhone">Alternate Phone</Label>
                <Input
                  id="alternatePhone"
                  placeholder="+977-98XXXXXXXX"
                  value={formData.alternatePhone}
                  onChange={(e) => handleInputChange("alternatePhone", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="citizenshipNumber">Citizenship Number</Label>
                <Input
                  id="citizenshipNumber"
                  placeholder="XX-XX-XX-XXXXX"
                  value={formData.citizenshipNumber}
                  onChange={(e) => handleInputChange("citizenshipNumber", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="dateOfBirth"
                    type="date"
                    className="pl-10"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <select
                  id="gender"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={formData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Textarea
                  id="address"
                  placeholder="Full address with ward number"
                  className="pl-10"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <School className="w-5 h-5" />
              Professional Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="qualification">Highest Qualification *</Label>
                <Input
                  id="qualification"
                  placeholder="e.g., Bachelor in Education (B.Ed)"
                  value={formData.qualification}
                  onChange={(e) => handleInputChange("qualification", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization</Label>
                <Input
                  id="specialization"
                  placeholder="e.g., Primary Education, Mathematics"
                  value={formData.specialization}
                  onChange={(e) => handleInputChange("specialization", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="experience">Teaching Experience</Label>
                <Input
                  id="experience"
                  placeholder="e.g., 5 years"
                  value={formData.experience}
                  onChange={(e) => handleInputChange("experience", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="previousSchool">Previous School/Institution</Label>
                <Input
                  id="previousSchool"
                  placeholder="Previous workplace"
                  value={formData.previousSchool}
                  onChange={(e) => handleInputChange("previousSchool", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="joinDate">Joining Date *</Label>
                <Input
                  id="joinDate"
                  type="date"
                  value={formData.joinDate}
                  onChange={(e) => handleInputChange("joinDate", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID</Label>
                <Input
                  id="employeeId"
                  placeholder="Auto-generated or manual"
                  value={formData.employeeId}
                  onChange={(e) => handleInputChange("employeeId", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Teaching Assignment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Teaching Assignment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-base font-medium">Subjects to Teach *</Label>
              <p className="text-sm text-muted-foreground mb-3">Select all subjects this teacher will handle</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {availableSubjects.map((subject) => (
                  <div key={subject} className="flex items-center space-x-2">
                    <Checkbox
                      id={`subject-${subject}`}
                      checked={formData.subjects.includes(subject)}
                      onCheckedChange={(checked) => handleSubjectChange(subject, checked)}
                    />
                    <Label htmlFor={`subject-${subject}`} className="text-sm">{subject}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">Classes to Teach *</Label>
              <p className="text-sm text-muted-foreground mb-3">Select all classes this teacher will handle</p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {availableClasses.map((cls) => (
                  <div key={cls} className="flex items-center space-x-2">
                    <Checkbox
                      id={`class-${cls}`}
                      checked={formData.classes.includes(cls)}
                      onCheckedChange={(checked) => handleClassChange(cls, checked)}
                    />
                    <Label htmlFor={`class-${cls}`} className="text-sm">{cls}</Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Salary Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Salary Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="basicSalary">Basic Salary (Monthly) *</Label>
                <Input
                  id="basicSalary"
                  placeholder="e.g., 45000"
                  value={formData.basicSalary}
                  onChange={(e) => handleInputChange("basicSalary", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="allowances">Allowances</Label>
                <Input
                  id="allowances"
                  placeholder="e.g., 5000"
                  value={formData.allowances}
                  onChange={(e) => handleInputChange("allowances", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card>
          <CardHeader>
            <CardTitle>Emergency Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                <Input
                  id="emergencyContact"
                  placeholder="Contact person's name"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                <Input
                  id="emergencyPhone"
                  placeholder="+977-98XXXXXXXX"
                  value={formData.emergencyPhone}
                  onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any additional information about the teacher"
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button type="submit" className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Teacher
          </Button>
          <Link href="/admin/management/teachers/primary">
            <Button variant="outline">Cancel</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
