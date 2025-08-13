
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ArrowLeft,
  Save,
  BookOpen,
  School,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function AddPrimarySubject() {
  const [formData, setFormData] = useState({
    name: "",
    nepaliName: "",
    code: "",
    gradeFrom: "",
    gradeTo: "",
    type: "",
    mandatory: false,
    credits: "",
    description: "",
    objectives: "",
    status: "draft"
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.code || !formData.gradeFrom || !formData.gradeTo) {
      toast.error("Please fill in all required fields");
      return;
    }

    console.log("Adding primary subject:", formData);
    toast.success("Primary subject added successfully!");
    
    // Reset form or redirect
    setFormData({
      name: "",
      nepaliName: "",
      code: "",
      gradeFrom: "",
      gradeTo: "",
      type: "",
      mandatory: false,
      credits: "",
      description: "",
      objectives: "",
      status: "draft"
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/courses/subjects/primary">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Primary Subjects
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
            <School className="w-8 h-8 text-green-600" />
            Add Primary Subject
          </h1>
          <p className="text-muted-foreground">
            Create a new subject for primary level (Grades 1-5)
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Subject Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="e.g., Mathematics"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nepaliName">
                  Nepali Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="nepaliName"
                  value={formData.nepaliName}
                  onChange={(e) => handleInputChange("nepaliName", e.target.value)}
                  placeholder="e.g., गणित"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code">
                  Subject Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => handleInputChange("code", e.target.value)}
                  placeholder="e.g., MAT-101"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">
                  Subject Type <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="core">Core Subject</SelectItem>
                    <SelectItem value="optional">Optional Subject</SelectItem>
                    <SelectItem value="extracurricular">Extra-curricular</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="credits">Credits</Label>
                <Input
                  id="credits"
                  type="number"
                  value={formData.credits}
                  onChange={(e) => handleInputChange("credits", e.target.value)}
                  placeholder="e.g., 4"
                  min="1"
                  max="10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gradeFrom">
                  From Grade <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.gradeFrom} onValueChange={(value) => handleInputChange("gradeFrom", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select starting grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Grade 1</SelectItem>
                    <SelectItem value="2">Grade 2</SelectItem>
                    <SelectItem value="3">Grade 3</SelectItem>
                    <SelectItem value="4">Grade 4</SelectItem>
                    <SelectItem value="5">Grade 5</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gradeTo">
                  To Grade <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.gradeTo} onValueChange={(value) => handleInputChange("gradeTo", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ending grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Grade 1</SelectItem>
                    <SelectItem value="2">Grade 2</SelectItem>
                    <SelectItem value="3">Grade 3</SelectItem>
                    <SelectItem value="4">Grade 4</SelectItem>
                    <SelectItem value="5">Grade 5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="mandatory"
                checked={formData.mandatory}
                onCheckedChange={(checked) => handleInputChange("mandatory", checked)}
              />
              <Label htmlFor="mandatory" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                This is a mandatory subject
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle>Subject Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Subject Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe the subject content and purpose..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="objectives">Learning Objectives</Label>
              <Textarea
                id="objectives"
                value={formData.objectives}
                onChange={(e) => handleInputChange("objectives", e.target.value)}
                placeholder="List the main learning objectives for this subject..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Subject Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notice */}
        <Card className="border-orange-200 bg-orange-50/50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-orange-800">
                  Primary Level Guidelines
                </p>
                <p className="text-sm text-orange-700">
                  Primary subjects should focus on foundational skills. Core subjects (Nepali, English, Mathematics) 
                  are typically mandatory across all grades. Consider age-appropriate content and teaching methods.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Link href="/admin/courses/subjects/primary">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Add Subject
          </Button>
        </div>
      </form>
    </div>
  );
}
