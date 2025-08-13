
"use client";

import { useState, useEffect } from "react";
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
  School,
  AlertCircle,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function EditPrimarySubject({ params }) {
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    // Simulate loading existing subject data
    const loadSubjectData = () => {
      // Mock data - in real app, fetch from API
      const mockSubject = {
        id: params.id,
        name: "Nepali Language",
        nepaliName: "नेपाली भाषा",
        code: "NEP-101",
        gradeFrom: "1",
        gradeTo: "5",
        type: "core",
        mandatory: true,
        credits: "4",
        description: "Foundation course in Nepali language covering reading, writing, and comprehension",
        objectives: "Develop basic literacy skills in Nepali language",
        status: "active"
      };

      setFormData(mockSubject);
      setLoading(false);
    };

    setTimeout(loadSubjectData, 1000);
  }, [params.id]);

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

    console.log("Updating primary subject:", formData);
    toast.success("Primary subject updated successfully!");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin" />
          <p className="text-muted-foreground">Loading subject data...</p>
        </div>
      </div>
    );
  }

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
            Edit Primary Subject
          </h1>
          <p className="text-muted-foreground">
            Update subject information for primary level (Grades 1-5)
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Subject Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="e.g., Mathematics"
                  required
                />
              </div>
              <div>
                <Label htmlFor="nepaliName">Nepali Name *</Label>
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
              <div>
                <Label htmlFor="code">Subject Code *</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => handleInputChange("code", e.target.value)}
                  placeholder="e.g., MATH-101"
                  required
                />
              </div>
              <div>
                <Label htmlFor="gradeFrom">Grade From *</Label>
                <Select value={formData.gradeFrom} onValueChange={(value) => handleInputChange("gradeFrom", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
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
              <div>
                <Label htmlFor="gradeTo">Grade To *</Label>
                <Select value={formData.gradeTo} onValueChange={(value) => handleInputChange("gradeTo", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="type">Subject Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="core">Core Subject</SelectItem>
                    <SelectItem value="additional">Additional Subject</SelectItem>
                    <SelectItem value="activity">Activity</SelectItem>
                    <SelectItem value="art">Art & Craft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="credits">Credits</Label>
                <Input
                  id="credits"
                  type="number"
                  value={formData.credits}
                  onChange={(e) => handleInputChange("credits", e.target.value)}
                  placeholder="e.g., 4"
                  min="1"
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
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
              <Label htmlFor="mandatory">This is a mandatory subject</Label>
            </div>
          </CardContent>
        </Card>

        {/* Content Details */}
        <Card>
          <CardHeader>
            <CardTitle>Content Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Brief description of the subject..."
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="objectives">Learning Objectives</Label>
              <Textarea
                id="objectives"
                value={formData.objectives}
                onChange={(e) => handleInputChange("objectives", e.target.value)}
                placeholder="Key learning objectives for this subject..."
                rows={4}
              />
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
            Update Subject
          </Button>
        </div>
      </form>
    </div>
  );
}
