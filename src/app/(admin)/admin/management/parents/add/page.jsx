"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCreateParent } from "@/hooks/admin/management";

export default function AddParent() {
  const [formData, setFormData] = useState({
    // Father's Information
    fatherName: "",
    fatherOccupation: "",
    fatherEducation: "",
    fatherPhone: "",

    // Mother's Information
    motherName: "",
    motherOccupation: "",
    motherEducation: "",
    motherPhone: "",

    // Guardian Information (if different)
    guardianName: "",
    guardianRelation: "",
    guardianPhone: "",
    guardianOccupation: "",

    // Contact Information
    primaryPhone: "",
    alternatePhone: "",
    email: "",

    // Address Information
    permanentAddress: "",
    temporaryAddress: "",
    district: "",
    province: "",
    ward: "",

    // Legal Information
    citizenshipNumber: "",
    citizenshipIssueDate: "",
    citizenshipIssueDistrict: "",

    // Financial Information
    annualIncome: "",
    occupation: "",

    // Additional Information
    emergencyContact: "",
    emergencyContactRelation: "",
    remarks: "",
  });

  const router = useRouter();
  const { mutateAsync: createParent, isLoading } = useCreateParent();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createParent(formData);
      router.push(`/admin/management/parents`);
      toast.success("Parent added successfully");
    } catch (error) {
      toast.error(error?.message || "Failed to add parent information. Please try again.");
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
            Add New Parent
          </h1>
          <p className="text-muted-foreground">Enter parent information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Father's Information */}
        <Card>
          <CardHeader>
            <CardTitle>Father's Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fatherName">Father's Full Name *</Label>
                <Input
                  id="fatherName"
                  value={formData.fatherName}
                  onChange={(e) =>
                    handleInputChange("fatherName", e.target.value)
                  }
                  placeholder="Ram Bahadur Shrestha"
                  required
                />
              </div>
              <div>
                <Label htmlFor="fatherOccupation">Father's Occupation *</Label>
                <Input
                  id="fatherOccupation"
                  value={formData.fatherOccupation}
                  onChange={(e) =>
                    handleInputChange("fatherOccupation", e.target.value)
                  }
                  placeholder="Business, Teacher, Farmer"
                  required
                />
              </div>
              <div>
                <Label htmlFor="fatherEducation">Father's Education</Label>
                <Input
                  id="fatherEducation"
                  value={formData.fatherEducation}
                  onChange={(e) =>
                    handleInputChange("fatherEducation", e.target.value)
                  }
                  placeholder="SLC, +2, Bachelor"
                />
              </div>
              <div>
                <Label htmlFor="fatherPhone">Father's Phone Number</Label>
                <Input
                  id="fatherPhone"
                  value={formData.fatherPhone}
                  onChange={(e) =>
                    handleInputChange("fatherPhone", e.target.value)
                  }
                  placeholder="98XXXXXXXX"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mother's Information */}
        <Card>
          <CardHeader>
            <CardTitle>Mother's Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="motherName">Mother's Full Name *</Label>
                <Input
                  id="motherName"
                  value={formData.motherName}
                  onChange={(e) =>
                    handleInputChange("motherName", e.target.value)
                  }
                  placeholder="Sita Shrestha"
                  required
                />
              </div>
              <div>
                <Label htmlFor="motherOccupation">Mother's Occupation *</Label>
                <Input
                  id="motherOccupation"
                  value={formData.motherOccupation}
                  onChange={(e) =>
                    handleInputChange("motherOccupation", e.target.value)
                  }
                  placeholder="Housewife, Teacher, Nurse"
                  required
                />
              </div>
              <div>
                <Label htmlFor="motherEducation">Mother's Education</Label>
                <Input
                  id="motherEducation"
                  value={formData.motherEducation}
                  onChange={(e) =>
                    handleInputChange("motherEducation", e.target.value)
                  }
                  placeholder="SLC, +2, Bachelor"
                />
              </div>
              <div>
                <Label htmlFor="motherPhone">Mother's Phone Number</Label>
                <Input
                  id="motherPhone"
                  value={formData.motherPhone}
                  onChange={(e) =>
                    handleInputChange("motherPhone", e.target.value)
                  }
                  placeholder="98XXXXXXXX"
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="primaryPhone">Primary Phone Number *</Label>
                <Input
                  id="primaryPhone"
                  value={formData.primaryPhone}
                  onChange={(e) =>
                    handleInputChange("primaryPhone", e.target.value)
                  }
                  placeholder="98XXXXXXXX"
                  required
                />
              </div>
              <div>
                <Label htmlFor="alternatePhone">Alternate Phone Number</Label>
                <Input
                  id="alternatePhone"
                  value={formData.alternatePhone}
                  onChange={(e) =>
                    handleInputChange("alternatePhone", e.target.value)
                  }
                  placeholder="98XXXXXXXX"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="example@gmail.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card>
          <CardHeader>
            <CardTitle>Address Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="permanentAddress">Permanent Address *</Label>
                <Input
                  id="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={(e) =>
                    handleInputChange("permanentAddress", e.target.value)
                  }
                  placeholder="Kathmandu-10, Bagbazar"
                  required
                />
              </div>
              <div>
                <Label htmlFor="temporaryAddress">Temporary Address</Label>
                <Input
                  id="temporaryAddress"
                  value={formData.temporaryAddress}
                  onChange={(e) =>
                    handleInputChange("temporaryAddress", e.target.value)
                  }
                  placeholder="Same as permanent address"
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

        {/* Legal & Financial Information */}
        <Card>
          <CardHeader>
            <CardTitle>Legal & Financial Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="citizenshipNumber">Citizenship Number *</Label>
                <Input
                  id="citizenshipNumber"
                  value={formData.citizenshipNumber}
                  onChange={(e) =>
                    handleInputChange("citizenshipNumber", e.target.value)
                  }
                  placeholder="12-01-68-01234"
                  required
                />
              </div>
              <div>
                <Label htmlFor="annualIncome">Annual Income</Label>
                <Input
                  id="annualIncome"
                  value={formData.annualIncome}
                  onChange={(e) =>
                    handleInputChange("annualIncome", e.target.value)
                  }
                  placeholder="Rs. 5,00,000"
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
                <Label htmlFor="emergencyContact">
                  Emergency Contact Number
                </Label>
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
                  placeholder="Brother, Sister, Uncle"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="remarks">Remarks</Label>
              <Textarea
                id="remarks"
                value={formData.remarks}
                onChange={(e) => handleInputChange("remarks", e.target.value)}
                placeholder="Any special remarks..."
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
          <Button type="submit" className="flex items-center gap-2" disabled={isLoading}>
            <Save className="w-4 h-4" />
            {isLoading ? "Saving..." : "Save Parent"}
          </Button>
        </div>
      </form>
    </div>
  );
}
