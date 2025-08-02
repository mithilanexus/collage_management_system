"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft,
  Plus,
  X,
  Building,
  Save,
  Users,
  BookOpen,
  FlaskConical,
  Briefcase,
  Globe,
  Scale
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function AddFaculty() {
  const [formData, setFormData] = useState({
    name: "",
    nepaliName: "",
    description: "",
    icon: "building",
    color: "bg-blue-500",
    targetStudents: "",
    duration: "2", // Years for grades 11-12
    eligibility: ""
  });

  const [compulsorySubjects, setCompulsorySubjects] = useState([]);
  const [optionalSubjects, setOptionalSubjects] = useState([]);
  const [customSubject, setCustomSubject] = useState("");
  const [subjectType, setSubjectType] = useState("compulsory");

  const availableSubjects = [
    // Science subjects
    { name: "Physics", code: "PHY", category: "Science" },
    { name: "Chemistry", code: "CHEM", category: "Science" },
    { name: "Biology", code: "BIO", category: "Science" },
    { name: "Mathematics", code: "MATH", category: "Science" },
    
    // Management subjects
    { name: "Accountancy", code: "ACC", category: "Management" },
    { name: "Economics", code: "ECO", category: "Management" },
    { name: "Business Studies", code: "BS", category: "Management" },
    { name: "Business Mathematics", code: "BMATH", category: "Management" },
    
    // Humanities subjects
    { name: "Sociology", code: "SOC", category: "Humanities" },
    { name: "Psychology", code: "PSY", category: "Humanities" },
    { name: "History", code: "HIST", category: "Humanities" },
    { name: "Geography", code: "GEO", category: "Humanities" },
    { name: "Political Science", code: "POL", category: "Humanities" },
    
    // Education subjects
    { name: "Education", code: "EDU", category: "Education" },
    { name: "Teaching Methods", code: "TM", category: "Education" },
    { name: "Child Psychology", code: "CP", category: "Education" },
    
    // Common subjects
    { name: "English", code: "ENG", category: "Language" },
    { name: "Nepali", code: "NEP", category: "Language" },
    { name: "Computer Science", code: "COMP", category: "Technology" }
  ];

  const iconOptions = [
    { value: "flask-conical", label: "Science", icon: FlaskConical },
    { value: "briefcase", label: "Business", icon: Briefcase },
    { value: "globe", label: "Humanities", icon: Globe },
    { value: "book-open", label: "Education", icon: BookOpen },
    { value: "scale", label: "Law", icon: Scale },
    { value: "building", label: "General", icon: Building }
  ];

  const colorOptions = [
    { value: "bg-blue-500", label: "Blue", color: "bg-blue-500" },
    { value: "bg-green-500", label: "Green", color: "bg-green-500" },
    { value: "bg-purple-500", label: "Purple", color: "bg-purple-500" },
    { value: "bg-orange-500", label: "Orange", color: "bg-orange-500" },
    { value: "bg-red-500", label: "Red", color: "bg-red-500" },
    { value: "bg-indigo-500", label: "Indigo", color: "bg-indigo-500" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubjectToggle = (subject, type) => {
    if (type === "compulsory") {
      setCompulsorySubjects(prev => {
        const exists = prev.find(s => s.code === subject.code);
        if (exists) {
          return prev.filter(s => s.code !== subject.code);
        } else {
          return [...prev, subject];
        }
      });
    } else {
      setOptionalSubjects(prev => {
        const exists = prev.find(s => s.code === subject.code);
        if (exists) {
          return prev.filter(s => s.code !== subject.code);
        } else {
          return [...prev, subject];
        }
      });
    }
  };

  const addCustomSubject = () => {
    if (customSubject.trim()) {
      const newSubject = {
        name: customSubject,
        code: customSubject.toUpperCase().replace(/\s+/g, ''),
        category: "Custom"
      };
      
      if (subjectType === "compulsory") {
        setCompulsorySubjects(prev => [...prev, newSubject]);
      } else {
        setOptionalSubjects(prev => [...prev, newSubject]);
      }
      
      setCustomSubject("");
    }
  };

  const removeSubject = (subjectCode, type) => {
    if (type === "compulsory") {
      setCompulsorySubjects(prev => prev.filter(s => s.code !== subjectCode));
    } else {
      setOptionalSubjects(prev => prev.filter(s => s.code !== subjectCode));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.nepaliName) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (compulsorySubjects.length === 0) {
      toast.error("Please select at least one compulsory subject");
      return;
    }

    const facultyData = {
      ...formData,
      compulsorySubjects,
      optionalSubjects,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };

    console.log("New Faculty:", facultyData);
    toast.success("Faculty added successfully!");
  };

  const selectedIcon = iconOptions.find(icon => icon.value === formData.icon);
  const SelectedIconComponent = selectedIcon ? selectedIcon.icon : Building;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/courses/secondary">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Secondary Level
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
            <Building className="w-8 h-8 text-blue-600" />
            Add New Faculty
          </h1>
          <p className="text-muted-foreground">
            Create a new faculty for higher secondary level (Grades 11-12)
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Faculty Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Faculty Name *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g., Science Faculty"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="nepaliName">Nepali Name *</Label>
                <Input
                  id="nepaliName"
                  name="nepaliName"
                  placeholder="e.g., विज्ञान संकाय"
                  value={formData.nepaliName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="icon">Faculty Icon</Label>
                <Select value={formData.icon} onValueChange={(value) => setFormData(prev => ({...prev, icon: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((option) => {
                      const IconComponent = option.icon;
                      return (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <IconComponent className="w-4 h-4" />
                            {option.label}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="color">Faculty Color</Label>
                <Select value={formData.color} onValueChange={(value) => setFormData(prev => ({...prev, color: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded ${option.color}`}></div>
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="targetStudents">Target Students</Label>
                <Input
                  id="targetStudents"
                  name="targetStudents"
                  type="number"
                  placeholder="150"
                  value={formData.targetStudents}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="eligibility">Eligibility Criteria</Label>
              <Input
                id="eligibility"
                name="eligibility"
                placeholder="e.g., Minimum C+ in SEE with Science subjects"
                value={formData.eligibility}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Brief description of the faculty and its focus areas..."
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Subject Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Subject Configuration</CardTitle>
            <p className="text-sm text-muted-foreground">
              Configure compulsory and optional subjects for this faculty
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Compulsory Subjects */}
            <div>
              <Label className="text-base font-medium">Compulsory Subjects</Label>
              <p className="text-sm text-muted-foreground mb-3">
                These subjects are mandatory for all students in this faculty
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {availableSubjects.map((subject) => {
                  const isSelected = compulsorySubjects.find(s => s.code === subject.code);
                  return (
                    <div key={subject.code} className="flex items-center space-x-2 p-3 border rounded-lg">
                      <Checkbox
                        id={`comp-${subject.code}`}
                        checked={isSelected}
                        onCheckedChange={() => handleSubjectToggle(subject, "compulsory")}
                      />
                      <div className="flex-1">
                        <Label htmlFor={`comp-${subject.code}`} className="font-medium">
                          {subject.name}
                        </Label>
                        <p className="text-xs text-muted-foreground">{subject.category}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Optional Subjects */}
            <div>
              <Label className="text-base font-medium">Optional Subjects</Label>
              <p className="text-sm text-muted-foreground mb-3">
                Students can choose from these subjects based on their interests
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {availableSubjects.map((subject) => {
                  const isSelected = optionalSubjects.find(s => s.code === subject.code);
                  const isCompulsory = compulsorySubjects.find(s => s.code === subject.code);
                  return (
                    <div key={subject.code} className="flex items-center space-x-2 p-3 border rounded-lg">
                      <Checkbox
                        id={`opt-${subject.code}`}
                        checked={isSelected}
                        onCheckedChange={() => handleSubjectToggle(subject, "optional")}
                        disabled={isCompulsory}
                      />
                      <div className="flex-1">
                        <Label htmlFor={`opt-${subject.code}`} className="font-medium">
                          {subject.name}
                        </Label>
                        <p className="text-xs text-muted-foreground">{subject.category}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Add Custom Subject */}
            <div>
              <Label className="text-base font-medium">Add Custom Subject</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  placeholder="Enter subject name"
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                />
                <Select value={subjectType} onValueChange={setSubjectType}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compulsory">Compulsory</SelectItem>
                    <SelectItem value="optional">Optional</SelectItem>
                  </SelectContent>
                </Select>
                <Button type="button" onClick={addCustomSubject}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Selected Subjects Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Compulsory Subjects Summary */}
              {compulsorySubjects.length > 0 && (
                <div>
                  <Label className="text-base font-medium">Selected Compulsory Subjects ({compulsorySubjects.length})</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {compulsorySubjects.map((subject) => (
                      <Badge key={subject.code} variant="default" className="flex items-center gap-1">
                        {subject.name}
                        <button
                          type="button"
                          onClick={() => removeSubject(subject.code, "compulsory")}
                          className="ml-1 hover:text-red-200"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Optional Subjects Summary */}
              {optionalSubjects.length > 0 && (
                <div>
                  <Label className="text-base font-medium">Selected Optional Subjects ({optionalSubjects.length})</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {optionalSubjects.map((subject) => (
                      <Badge key={subject.code} variant="secondary" className="flex items-center gap-1">
                        {subject.name}
                        <button
                          type="button"
                          onClick={() => removeSubject(subject.code, "optional")}
                          className="ml-1 hover:text-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Faculty Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className={`p-3 ${formData.color} rounded-lg`}>
                <SelectedIconComponent className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{formData.name || "Faculty Name"}</h3>
                <p className="text-sm text-muted-foreground">{formData.nepaliName || "नेपाली नाम"}</p>
                <p className="text-sm mt-1">{formData.description || "Faculty description will appear here..."}</p>
                <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                  <span>Compulsory: {compulsorySubjects.length}</span>
                  <span>Optional: {optionalSubjects.length}</span>
                  <span>Target: {formData.targetStudents || "0"} students</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Link href="/admin/courses/secondary">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Create Faculty
          </Button>
        </div>
      </form>
    </div>
  );
}
