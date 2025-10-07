"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  Save,
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
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTeachers, useUpdateTeacher, useSubjects, useClasses } from "@/hooks/admin/management";

export default function EditPrimaryTeacher() {
  const params = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState({});

  const { data: teacherData, isLoading: teacherLoading } = useTeachers({
    id: params.id,
    level: "primary",
  });

  const { data: subjectsData, isLoading: subjectsLoading } = useSubjects({
    level: "primary",
  });
  const availableSubjects = subjectsData || [];

  const { data: classesData, isLoading: classesLoading } = useClasses({
    level: "primary",
  });
  const availableClasses = classesData || [];

  const { mutateAsync: updateTeacher } = useUpdateTeacher();

  useEffect(() => {
    if (teacherData) {
      setFormData(teacherData);
    }
  }, [teacherData]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubjectChange = (subjectId, checked) => {
    setFormData((prev) => ({
      ...prev,
      subjects: checked
        ? [...(prev.subjects || []), subjectId]
        : (prev.subjects || []).filter((s) => s !== subjectId),
    }));
  };

  const handleClassChange = (classId, checked) => {
    setFormData((prev) => ({
      ...prev,
      classes: checked
        ? [...(prev.classes || []), classId]
        : (prev.classes || []).filter((c) => c !== classId),
    }));
  };

  const handleSelectAllClasses = () => {
    setFormData((prev) => ({
      ...prev,
      classes: availableClasses.map((cls) => cls._id),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTeacher({ teacherId: params.id, payload: formData });
      toast.success("Teacher updated successfully");
      router.push(`/admin/management/teachers/primary`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/admin/management/teachers/primary/${params.id}`}>
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Teacher Details
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
            <User className="w-8 h-8 text-green-600" />
            Edit Teacher Profile
          </h1>
          <p className="text-muted-foreground">
            Update {formData?.name || "Teacher"}'s information
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Full Name in English"
                  value={formData?.name || ""}
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
                    value={formData.email || ""}
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
                    value={formData.phone || ""}
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
                  value={formData.alternatePhone || ""}
                  onChange={(e) => handleInputChange("alternatePhone", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="citizenship">Citizenship Number *</Label>
                <Input
                  id="citizenship"
                  placeholder="XX-XX-XX-XXXXX"
                  value={formData.citizenship || ""}
                  onChange={(e) => handleInputChange("citizenship", e.target.value)}
                  required
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
                    value={formData.dateOfBirth || ""}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <select
                  id="gender"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={formData.gender || ""}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
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
                  value={formData.address || ""}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="district">District *</Label>
                <Input
                  id="district"
                  placeholder="e.g., Kathmandu"
                  value={formData.district || ""}
                  onChange={(e) => handleInputChange("district", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="province">Province *</Label>
                <select
                  id="province"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={formData.province || ""}
                  onChange={(e) => handleInputChange("province", e.target.value)}
                  required
                >
                  <option value="">Select Province</option>
                  <option value="Province No. 1">Province No. 1</option>
                  <option value="Madhesh Province">Madhesh Province</option>
                  <option value="Bagmati Province">Bagmati Province</option>
                  <option value="Gandaki Province">Gandaki Province</option>
                  <option value="Lumbini Province">Lumbini Province</option>
                  <option value="Karnali Province">Karnali Province</option>
                  <option value="Sudurpashchim Province">Sudurpashchim Province</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maritalStatus">Marital Status *</Label>
                <select
                  id="maritalStatus"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={formData.maritalStatus || ""}
                  onChange={(e) => handleInputChange("maritalStatus", e.target.value)}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
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
                  value={formData.qualification || ""}
                  onChange={(e) => handleInputChange("qualification", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization</Label>
                <Input
                  id="specialization"
                  placeholder="e.g., Primary Education, Mathematics"
                  value={formData.specialization || ""}
                  onChange={(e) => handleInputChange("specialization", e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="designation">Designation *</Label>
                <Input
                  id="designation"
                  placeholder="e.g., Assistant Teacher"
                  value={formData.designation || ""}
                  onChange={(e) => handleInputChange("designation", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Input
                  id="department"
                  placeholder="e.g., Primary Department"
                  value={formData.department || ""}
                  onChange={(e) => handleInputChange("department", e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="experience">Teaching Experience</Label>
                <Input
                  id="experience"
                  placeholder="e.g., 5 years"
                  value={formData.experience || ""}
                  onChange={(e) => handleInputChange("experience", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="previousSchool">Previous School/Institution</Label>
                <Input
                  id="previousSchool"
                  placeholder="Previous workplace"
                  value={formData.previousSchool || ""}
                  onChange={(e) => handleInputChange("previousSchool", e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="joinDate">Joining Date *</Label>
                <Input
                  id="joinDate"
                  type="date"
                  value={formData.joinDate || ""}
                  onChange={(e) => handleInputChange("joinDate", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID</Label>
                <Input
                  id="employeeId"
                  placeholder="Auto-generated or manual"
                  value={formData.employeeId || ""}
                  onChange={(e) => handleInputChange("employeeId", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={formData.status || "Active"}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                >
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Suspended">Suspended</option>
                  <option value="Resigned">Resigned</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
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
                  <div key={subject._id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`subject-${subject._id}`}
                      checked={formData.subjects?.includes(subject._id)}
                      onCheckedChange={(checked) => handleSubjectChange(subject._id, checked)}
                    />
                    <Label htmlFor={`subject-${subject._id}`} className="text-sm">{subject.name}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">

                <div className="space-y-2">


                  <Label className="text-base font-medium">Classes to Teach *</Label>
                  <p className="text-sm text-muted-foreground mb-3">Select all classes this teacher will handle</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mb-3"
                  onClick={handleSelectAllClasses}
                >
                  Select All Classes
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {availableClasses.map((cls) => (
                  <div key={cls._id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`class-${cls._id}`}
                      checked={formData.classes?.includes(cls._id)}
                      onCheckedChange={(checked) => handleClassChange(cls._id, checked)}
                    />
                    <Label htmlFor={`class-${cls._id}`} className="text-sm">{cls.fullName}</Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
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
                  value={formData.basicSalary || ""}
                  onChange={(e) => handleInputChange("basicSalary", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="allowances">Allowances</Label>
                <Input
                  id="allowances"
                  placeholder="e.g., 5000"
                  value={formData.allowances || ""}
                  onChange={(e) => handleInputChange("allowances", e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="panNumber">PAN Number *</Label>
                <Input
                  id="panNumber"
                  placeholder="e.g., 301234567"
                  value={formData.panNumber || ""}
                  onChange={(e) => handleInputChange("panNumber", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bankAccount">Bank Account Number *</Label>
                <Input
                  id="bankAccount"
                  placeholder="Account number"
                  value={formData.bankAccount || ""}
                  onChange={(e) => handleInputChange("bankAccount", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name *</Label>
                <Input
                  id="bankName"
                  placeholder="e.g., Nepal Bank Limited"
                  value={formData.bankName || ""}
                  onChange={(e) => handleInputChange("bankName", e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>
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
                  value={formData.emergencyContact || ""}
                  onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                <Input
                  id="emergencyPhone"
                  placeholder="+977-98XXXXXXXX"
                  value={formData.emergencyPhone || ""}
                  onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any additional information about the teacher"
                value={formData.notes || ""}
                onChange={(e) => handleInputChange("notes", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyContactRelation">Emergency Contact Relation *</Label>
              <Input
                id="emergencyContactRelation"
                placeholder="e.g., Spouse, Parent"
                value={formData.emergencyContactRelation || ""}
                onChange={(e) => handleInputChange("emergencyContactRelation", e.target.value)}
                required
              />
            </div>
          </CardContent>
        </Card>
        <div className="flex gap-4">
          <Button type="submit" className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Update Teacher
          </Button>
          <Link href={`/admin/management/teachers/primary/${params.id}`}>
            <Button variant="outline">Cancel</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}