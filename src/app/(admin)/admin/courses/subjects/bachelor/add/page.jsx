
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  Save,
  GraduationCap,
  AlertCircle,
  Plus,
  X
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function AddBachelorSubject() {
  const [formData, setFormData] = useState({
    name: "",
    nepaliName: "",
    code: "",
    faculty: "",
    program: "",
    semester: "",
    year: "",
    type: "",
    mandatory: false,
    credits: "",
    weeklyHours: "",
    description: "",
    syllabus: "",
    status: "draft"
  });

  const [prerequisites, setPrerequisites] = useState([]);
  const [newPrerequisite, setNewPrerequisite] = useState("");
  const [learningOutcomes, setLearningOutcomes] = useState([]);
  const [newOutcome, setNewOutcome] = useState("");
  const [assessmentMethods, setAssessmentMethods] = useState([]);
  const [newAssessment, setNewAssessment] = useState("");

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addPrerequisite = () => {
    if (newPrerequisite.trim()) {
      setPrerequisites([...prerequisites, newPrerequisite.trim()]);
      setNewPrerequisite("");
    }
  };

  const removePrerequisite = (index) => {
    setPrerequisites(prerequisites.filter((_, i) => i !== index));
  };

  const addOutcome = () => {
    if (newOutcome.trim()) {
      setLearningOutcomes([...learningOutcomes, newOutcome.trim()]);
      setNewOutcome("");
    }
  };

  const removeOutcome = (index) => {
    setLearningOutcomes(learningOutcomes.filter((_, i) => i !== index));
  };

  const addAssessment = () => {
    if (newAssessment.trim()) {
      setAssessmentMethods([...assessmentMethods, newAssessment.trim()]);
      setNewAssessment("");
    }
  };

  const removeAssessment = (index) => {
    setAssessmentMethods(assessmentMethods.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.code || !formData.faculty || !formData.program) {
      toast.error("Please fill in all required fields");
      return;
    }

    const subjectData = {
      ...formData,
      prerequisites,
      learningOutcomes,
      assessmentMethods,
      id: `bach_${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    console.log("Adding bachelor subject:", subjectData);
    toast.success("Bachelor subject added successfully!");
    
    // Reset form
    setFormData({
      name: "",
      nepaliName: "",
      code: "",
      faculty: "",
      program: "",
      semester: "",
      year: "",
      type: "",
      mandatory: false,
      credits: "",
      weeklyHours: "",
      description: "",
      syllabus: "",
      status: "draft"
    });
    setPrerequisites([]);
    setLearningOutcomes([]);
    setAssessmentMethods([]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/courses/subjects/bachelor">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Bachelor Subjects
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-purple-600" />
            Add Bachelor Subject
          </h1>
          <p className="text-muted-foreground">
            Create a new subject for bachelor level programs
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
                  placeholder="e.g., Programming Fundamentals"
                  required
                />
              </div>
              <div>
                <Label htmlFor="nepaliName">Nepali Name *</Label>
                <Input
                  id="nepaliName"
                  value={formData.nepaliName}
                  onChange={(e) => handleInputChange("nepaliName", e.target.value)}
                  placeholder="e.g., प्रोग्रामिङ आधारभूत"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="code">Subject Code *</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => handleInputChange("code", e.target.value)}
                  placeholder="e.g., CSC-101"
                  required
                />
              </div>
              <div>
                <Label htmlFor="faculty">Faculty *</Label>
                <Select value={formData.faculty} onValueChange={(value) => handleInputChange("faculty", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select faculty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="Management">Management</SelectItem>
                    <SelectItem value="Humanities">Humanities</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="Law">Law</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="program">Program *</Label>
                <Select value={formData.program} onValueChange={(value) => handleInputChange("program", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select program" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BIT">Bachelor of Information Technology</SelectItem>
                    <SelectItem value="BBS">Bachelor of Business Studies</SelectItem>
                    <SelectItem value="BBA">Bachelor of Business Administration</SelectItem>
                    <SelectItem value="BA">Bachelor of Arts</SelectItem>
                    <SelectItem value="BSc">Bachelor of Science</SelectItem>
                    <SelectItem value="LLB">Bachelor of Laws</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="type">Subject Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Core">Core</SelectItem>
                    <SelectItem value="Major">Major</SelectItem>
                    <SelectItem value="Minor">Minor</SelectItem>
                    <SelectItem value="Elective">Elective</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="semester">Semester</Label>
                <Select value={formData.semester} onValueChange={(value) => handleInputChange("semester", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st">1st Semester</SelectItem>
                    <SelectItem value="2nd">2nd Semester</SelectItem>
                    <SelectItem value="3rd">3rd Semester</SelectItem>
                    <SelectItem value="4th">4th Semester</SelectItem>
                    <SelectItem value="5th">5th Semester</SelectItem>
                    <SelectItem value="6th">6th Semester</SelectItem>
                    <SelectItem value="7th">7th Semester</SelectItem>
                    <SelectItem value="8th">8th Semester</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="year">Academic Year</Label>
                <Select value={formData.year} onValueChange={(value) => handleInputChange("year", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st">1st Year</SelectItem>
                    <SelectItem value="2nd">2nd Year</SelectItem>
                    <SelectItem value="3rd">3rd Year</SelectItem>
                    <SelectItem value="4th">4th Year</SelectItem>
                  </SelectContent>
                </Select>
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
          </CardContent>
        </Card>

        {/* Academic Details */}
        <Card>
          <CardHeader>
            <CardTitle>Academic Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <Label htmlFor="weeklyHours">Weekly Hours</Label>
                <Input
                  id="weeklyHours"
                  type="number"
                  value={formData.weeklyHours}
                  onChange={(e) => handleInputChange("weeklyHours", e.target.value)}
                  placeholder="e.g., 6"
                  min="1"
                />
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
              <Label htmlFor="syllabus">Syllabus Overview</Label>
              <Textarea
                id="syllabus"
                value={formData.syllabus}
                onChange={(e) => handleInputChange("syllabus", e.target.value)}
                placeholder="Key topics and syllabus overview..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Prerequisites */}
        <Card>
          <CardHeader>
            <CardTitle>Prerequisites</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newPrerequisite}
                onChange={(e) => setNewPrerequisite(e.target.value)}
                placeholder="Add prerequisite subject..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPrerequisite())}
              />
              <Button type="button" onClick={addPrerequisite} variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {prerequisites.map((prereq, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {prereq}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => removePrerequisite(index)}
                  />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Learning Outcomes */}
        <Card>
          <CardHeader>
            <CardTitle>Learning Outcomes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newOutcome}
                onChange={(e) => setNewOutcome(e.target.value)}
                placeholder="Add learning outcome..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addOutcome())}
              />
              <Button type="button" onClick={addOutcome} variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {learningOutcomes.map((outcome, index) => (
                <div key={index} className="flex items-center gap-2 p-2 border rounded">
                  <span className="flex-1">{outcome}</span>
                  <X 
                    className="w-4 h-4 cursor-pointer text-red-500" 
                    onClick={() => removeOutcome(index)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Assessment Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Assessment Methods</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newAssessment}
                onChange={(e) => setNewAssessment(e.target.value)}
                placeholder="Add assessment method..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAssessment())}
              />
              <Button type="button" onClick={addAssessment} variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {assessmentMethods.map((method, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1">
                  {method}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => removeAssessment(index)}
                  />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Link href="/admin/courses/subjects/bachelor">
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
