"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, UserCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AddStaff() {
  const [formData, setFormData] = useState({
    // Basic Information
    name: "",
    employeeId: "",
    designation: "",
    department: "",
    qualification: "",
    experience: "",

    // Contact Information
    phone: "",
    email: "",
    address: "",
    district: "",
    province: "",

    // Work Information
    joiningDate: "",
    salary: "",
    workingHours: "",
    status: "",
    duties: "",

    // Personal Information
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
    maritalStatus: "",
    citizenship: "",
    panNumber: "",

    // Additional Information
    emergencyContact: "",
    emergencyContactRelation: "",
    bankAccount: "",
    bankName: "",
    remarks: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/management/staff`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success("Staff added successfully");
        router.push("/admin/management/staff");
      }
    } catch (error) {
      toast.error("Failed to add staff information. Please try again.");
    }
  };

  const provinces = [
    "Province No. 1",
    "Madhesh Province",
    "Bagmati Province",
    "Gandaki Province",
    "Lumbini Province",
    "Karnali Province",
    "Sudurpashchim Province",
  ];

  const departments = [
    "Administration Department",
    "Library Department",
    "Science Department",
    "Service Department",
    "Security Department",
    "IT Department",
    "Finance Department",
    "Maintenance Department",
  ];

  const designations = [
    "Office Assistant",
    "Librarian",
    "Lab Assistant",
    "Cleaning Staff",
    "Security Guard",
    "IT Support",
    "Accountant",
    "Maintenance Worker",
    "Driver",
    "Cook",
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
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Add New Staff
          </h1>
          <p className="text-muted-foreground">
            Enter staff member information
          </p>
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
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Shyam Bahadur Magar"
                  required
                />
              </div>
              <div>
                <Label htmlFor="employeeId">Employee ID *</Label>
                <Input
                  id="employeeId"
                  value={formData.employeeId}
                  onChange={(e) =>
                    handleInputChange("employeeId", e.target.value)
                  }
                  placeholder="STF001"
                  required
                />
              </div>
              <div>
                <Label htmlFor="designation">Designation *</Label>
                <select
                  className="w-full p-2 border border-border rounded-md"
                  value={formData.designation}
                  onChange={(e) =>
                    handleInputChange("designation", e.target.value)
                  }
                  required
                >
                  <option value="">Select Designation</option>
                  {designations.map((designation, index) => (
                    <option key={index} value={designation}>
                      {designation}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="department">Department *</Label>
                <select
                  className="w-full p-2 border border-border rounded-md"
                  value={formData.department}
                  onChange={(e) =>
                    handleInputChange("department", e.target.value)
                  }
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((department, index) => (
                    <option key={index} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="qualification">Qualification</Label>
                <Input
                  id="qualification"
                  value={formData.qualification}
                  onChange={(e) =>
                    handleInputChange("qualification", e.target.value)
                  }
                  placeholder="+2 Pass, SLC, Bachelor"
                />
              </div>
              <div>
                <Label htmlFor="experience">Experience</Label>
                <Input
                  id="experience"
                  value={formData.experience}
                  onChange={(e) =>
                    handleInputChange("experience", e.target.value)
                  }
                  placeholder="10 years"
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
                  placeholder="staff@college.edu.np"
                />
              </div>
              <div>
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Kathmandu-12, Kalimati"
                  required
                />
              </div>
              <div>
                <Label htmlFor="district">District *</Label>
                <Input
                  id="district"
                  value={formData.district}
                  onChange={(e) =>
                    handleInputChange("district", e.target.value)
                  }
                  placeholder="Kathmandu"
                  required
                />
              </div>
              <div>
                <Label htmlFor="province">Province *</Label>
                <select
                  className="w-full p-2 border border-border rounded-md"
                  value={formData.province}
                  onChange={(e) =>
                    handleInputChange("province", e.target.value)
                  }
                  required
                >
                  <option value="">Select Province</option>
                  {provinces.map((province, index) => (
                    <option key={index} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Work Information */}
        <Card>
          <CardHeader>
            <CardTitle>Work Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="joiningDate">Joining Date *</Label>
                <Input
                  id="joiningDate"
                  type="date"
                  value={formData.joiningDate}
                  onChange={(e) =>
                    handleInputChange("joiningDate", e.target.value)
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="salary">Monthly Salary</Label>
                <Input
                  id="salary"
                  value={formData.salary}
                  onChange={(e) => handleInputChange("salary", e.target.value)}
                  placeholder="Rs. 35,000"
                />
              </div>
              <div>
                <Label htmlFor="workingHours">Working Hours</Label>
                <Input
                  id="workingHours"
                  value={formData.workingHours}
                  onChange={(e) =>
                    handleInputChange("workingHours", e.target.value)
                  }
                  placeholder="10 AM - 5 PM"
                />
              </div>
              <div>
                <Label htmlFor="status">Employment Status *</Label>
                <select
                  className="w-full p-2 border border-border rounded-md"
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Permanent">Permanent</option>
                  <option value="Temporary">Temporary</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
            </div>
            <div>
              <Label htmlFor="duties">Duties & Responsibilities</Label>
              <Textarea
                id="duties"
                value={formData.duties}
                onChange={(e) => handleInputChange("duties", e.target.value)}
                placeholder="File Management, Data Entry, Photocopying (comma separated)"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    handleInputChange("dateOfBirth", e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <select
                  className="w-full p-2 border border-border rounded-md"
                  value={formData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
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
                  onChange={(e) =>
                    handleInputChange("bloodGroup", e.target.value)
                  }
                >
                  <option value="">Select Blood Group</option>
                  {bloodGroups.map((group, index) => (
                    <option key={index} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="maritalStatus">Marital Status</Label>
                <select
                  className="w-full p-2 border border-border rounded-md"
                  value={formData.maritalStatus}
                  onChange={(e) =>
                    handleInputChange("maritalStatus", e.target.value)
                  }
                >
                  <option value="">Select Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>
              <div>
                <Label htmlFor="citizenship">Citizenship Number</Label>
                <Input
                  id="citizenship"
                  value={formData.citizenship}
                  onChange={(e) =>
                    handleInputChange("citizenship", e.target.value)
                  }
                  placeholder="12-01-71-01238"
                />
              </div>
              <div>
                <Label htmlFor="panNumber">PAN Number</Label>
                <Input
                  id="panNumber"
                  value={formData.panNumber}
                  onChange={(e) =>
                    handleInputChange("panNumber", e.target.value)
                  }
                  placeholder="301234571"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) =>
                    handleInputChange("emergencyContact", e.target.value)
                  }
                  placeholder="98XXXXXXXX"
                />
              </div>
              <div>
                <Label htmlFor="emergencyContactRelation">
                  Emergency Contact Relation
                </Label>
                <Input
                  id="emergencyContactRelation"
                  value={formData.emergencyContactRelation}
                  onChange={(e) =>
                    handleInputChange(
                      "emergencyContactRelation",
                      e.target.value
                    )
                  }
                  placeholder="Spouse, Parent, Sibling"
                />
              </div>
              <div>
                <Label htmlFor="bankAccount">Bank Account Number</Label>
                <Input
                  id="bankAccount"
                  value={formData.bankAccount}
                  onChange={(e) =>
                    handleInputChange("bankAccount", e.target.value)
                  }
                  placeholder="Account number"
                />
              </div>
              <div>
                <Label htmlFor="bankName">Bank Name</Label>
                <Input
                  id="bankName"
                  value={formData.bankName}
                  onChange={(e) =>
                    handleInputChange("bankName", e.target.value)
                  }
                  placeholder="Nepal Bank Limited"
                />
              </div>
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
            Save Staff
          </Button>
        </div>
      </form>
    </div>
  );
}
