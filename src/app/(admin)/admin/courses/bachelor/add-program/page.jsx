"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft,
  Plus,
  X,
  GraduationCap,
  Save,
  Users,
  Clock,
  BookOpen,
  Computer,
  Briefcase,
  FlaskConical,
  Scale,
  Globe
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function AddBachelorProgram() {
  const [formData, setFormData] = useState({
    name: "",
    shortName: "",
    nepaliName: "",
    description: "",
    duration: "4",
    semesters: "8",
    icon: "graduation-cap",
    color: "bg-blue-500",
    targetStudents: "",
    eligibility: "",
    totalCredits: "128",
    degreeType: "bachelor"
  });

  const [specializations, setSpecializations] = useState([]);
  const [careerPaths, setCareerPaths] = useState([]);
  const [coreSubjects, setCoreSubjects] = useState([]);
  const [newSpecialization, setNewSpecialization] = useState("");
  const [newCareerPath, setNewCareerPath] = useState("");
  const [newSubject, setNewSubject] = useState("");

  const iconOptions = [
    { value: "computer", label: "Technology", icon: Computer },
    { value: "briefcase", label: "Business", icon: Briefcase },
    { value: "flask-conical", label: "Science", icon: FlaskConical },
    { value: "scale", label: "Law", icon: Scale },
    { value: "globe", label: "Arts", icon: Globe },
    { value: "graduation-cap", label: "General", icon: GraduationCap }
  ];

  const colorOptions = [
    { value: "bg-blue-500", label: "Blue", color: "bg-blue-500" },
    { value: "bg-green-500", label: "Green", color: "bg-green-500" },
    { value: "bg-purple-500", label: "Purple", color: "bg-purple-500" },
    { value: "bg-orange-500", label: "Orange", color: "bg-orange-500" },
    { value: "bg-red-500", label: "Red", color: "bg-red-500" },
    { value: "bg-indigo-500", label: "Indigo", color: "bg-indigo-500" }
  ];

  const durationOptions = [
    { value: "3", label: "3 Years", semesters: "6" },
    { value: "4", label: "4 Years", semesters: "8" },
    { value: "5", label: "5 Years", semesters: "10" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDurationChange = (value) => {
    const duration = durationOptions.find(d => d.value === value);
    setFormData(prev => ({
      ...prev,
      duration: value,
      semesters: duration.semesters
    }));
  };

  const addSpecialization = () => {
    if (newSpecialization.trim() && !specializations.includes(newSpecialization.trim())) {
      setSpecializations(prev => [...prev, newSpecialization.trim()]);
      setNewSpecialization("");
    }
  };

  const removeSpecialization = (spec) => {
    setSpecializations(prev => prev.filter(s => s !== spec));
  };

  const addCareerPath = () => {
    if (newCareerPath.trim() && !careerPaths.includes(newCareerPath.trim())) {
      setCareerPaths(prev => [...prev, newCareerPath.trim()]);
      setNewCareerPath("");
    }
  };

  const removeCareerPath = (career) => {
    setCareerPaths(prev => prev.filter(c => c !== career));
  };

  const addSubject = () => {
    if (newSubject.trim() && !coreSubjects.includes(newSubject.trim())) {
      setCoreSubjects(prev => [...prev, newSubject.trim()]);
      setNewSubject("");
    }
  };

  const removeSubject = (subject) => {
    setCoreSubjects(prev => prev.filter(s => s !== subject));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.shortName || !formData.nepaliName) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (specializations.length === 0) {
      toast.error("Please add at least one specialization");
      return;
    }

    if (careerPaths.length === 0) {
      toast.error("Please add at least one career path");
      return;
    }

    const programData = {
      ...formData,
      specializations,
      careerPaths,
      coreSubjects,
      id: formData.shortName.toLowerCase(),
      createdAt: new Date().toISOString()
    };

    console.log("New Bachelor Program:", programData);
    toast.success("Bachelor program added successfully!");
  };

  const selectedIcon = iconOptions.find(icon => icon.value === formData.icon);
  const SelectedIconComponent = selectedIcon ? selectedIcon.icon : GraduationCap;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/courses/bachelor">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Bachelor Level
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-purple-600" />
            Add New Bachelor Program
          </h1>
          <p className="text-muted-foreground">
            Create a new undergraduate degree program
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Program Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Program Name *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g., Bachelor of Information Technology"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="shortName">Short Name *</Label>
                <Input
                  id="shortName"
                  name="shortName"
                  placeholder="e.g., BIT"
                  value={formData.shortName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="nepaliName">Nepali Name *</Label>
              <Input
                id="nepaliName"
                name="nepaliName"
                placeholder="e.g., सूचना प्रविधि स्नातक"
                value={formData.nepaliName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Select value={formData.duration} onValueChange={handleDurationChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {durationOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="semesters">Semesters</Label>
                <Input
                  id="semesters"
                  name="semesters"
                  value={formData.semesters}
                  readOnly
                  className="bg-muted"
                />
              </div>
              <div>
                <Label htmlFor="totalCredits">Total Credits</Label>
                <Input
                  id="totalCredits"
                  name="totalCredits"
                  type="number"
                  placeholder="128"
                  value={formData.totalCredits}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="targetStudents">Target Students</Label>
                <Input
                  id="targetStudents"
                  name="targetStudents"
                  type="number"
                  placeholder="50"
                  value={formData.targetStudents}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="icon">Program Icon</Label>
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
                <Label htmlFor="color">Program Color</Label>
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
            </div>

            <div>
              <Label htmlFor="eligibility">Eligibility Criteria</Label>
              <Input
                id="eligibility"
                name="eligibility"
                placeholder="e.g., Minimum C+ in +2 or equivalent"
                value={formData.eligibility}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="description">Program Description *</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Brief description of the program, its objectives, and focus areas..."
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Specializations */}
        <Card>
          <CardHeader>
            <CardTitle>Specializations</CardTitle>
            <p className="text-sm text-muted-foreground">
              Add different specialization tracks available in this program
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter specialization name"
                value={newSpecialization}
                onChange={(e) => setNewSpecialization(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecialization())}
              />
              <Button type="button" onClick={addSpecialization}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {specializations.length > 0 && (
              <div>
                <Label className="text-base font-medium">Added Specializations ({specializations.length})</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {specializations.map((spec, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {spec}
                      <button
                        type="button"
                        onClick={() => removeSpecialization(spec)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Career Paths */}
        <Card>
          <CardHeader>
            <CardTitle>Career Paths</CardTitle>
            <p className="text-sm text-muted-foreground">
              Add potential career opportunities for graduates
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter career path"
                value={newCareerPath}
                onChange={(e) => setNewCareerPath(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCareerPath())}
              />
              <Button type="button" onClick={addCareerPath}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {careerPaths.length > 0 && (
              <div>
                <Label className="text-base font-medium">Added Career Paths ({careerPaths.length})</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {careerPaths.map((career, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1">
                      {career}
                      <button
                        type="button"
                        onClick={() => removeCareerPath(career)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Core Subjects */}
        <Card>
          <CardHeader>
            <CardTitle>Core Subjects</CardTitle>
            <p className="text-sm text-muted-foreground">
              Add core subjects that are mandatory for this program
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter core subject"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSubject())}
              />
              <Button type="button" onClick={addSubject}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {coreSubjects.length > 0 && (
              <div>
                <Label className="text-base font-medium">Added Core Subjects ({coreSubjects.length})</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {coreSubjects.map((subject, index) => (
                    <Badge key={index} variant="default" className="flex items-center gap-1">
                      {subject}
                      <button
                        type="button"
                        onClick={() => removeSubject(subject)}
                        className="ml-1 hover:text-red-200"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Program Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className={`p-3 ${formData.color} rounded-lg`}>
                <SelectedIconComponent className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{formData.shortName || "Program Code"}</h3>
                <p className="text-sm text-muted-foreground">{formData.nepaliName || "नेपाली नाम"}</p>
                <p className="text-sm mt-1">{formData.name || "Full program name will appear here..."}</p>
                <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                  <span>Duration: {formData.duration} years</span>
                  <span>Semesters: {formData.semesters}</span>
                  <span>Credits: {formData.totalCredits}</span>
                  <span>Target: {formData.targetStudents || "0"} students</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Link href="/admin/courses/bachelor">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Create Program
          </Button>
        </div>
      </form>
    </div>
  );
}
