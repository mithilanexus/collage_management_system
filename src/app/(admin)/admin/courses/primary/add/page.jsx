"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  Plus,
  X,
  School,
  Save,
  Users,
  Clock,
  BookOpen,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AddPrimaryClass() {
  const [formData, setFormData] = useState({
    grade: "",
    nepaliName: "",
    fullName: "",
    ageGroup: "",
    students: "",
    sections: "1",
    weeklyHours: "30",
    curriculum: "",
    description: "",
    subjects: [],
  });
  const router = useRouter()
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [customSubject, setCustomSubject] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const availableSubjects = [
    { name: "Nepali", code: "NEP", mandatory: true, hours: 6 },
    { name: "English", code: "ENG", mandatory: true, hours: 5 },
    { name: "Mathematics", code: "MATH", mandatory: true, hours: 6 },
    { name: "Science", code: "SCI", mandatory: true, hours: 4 },
    { name: "Social Studies", code: "SS", mandatory: true, hours: 4 },
    {
      name: "Health & Physical Education",
      code: "HPE",
      mandatory: true,
      hours: 3,
    },
    { name: "Computer", code: "COMP", mandatory: false, hours: 2 },
    { name: "Moral Education", code: "ME", mandatory: false, hours: 2 },
    { name: "Art & Craft", code: "ART", mandatory: false, hours: 2 },
    { name: "Music", code: "MUS", mandatory: false, hours: 1 },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubjectToggle = (subject) => {
    setSelectedSubjects((prev) => {
      const exists = prev.find((s) => s.code === subject.code);
      if (exists) {
        return prev.filter((s) => s.code !== subject.code);
      } else {
        return [...prev, subject];
      }
    });
  };

  const addCustomSubject = () => {
    if (customSubject.trim()) {
      const newSubject = {
        name: customSubject,
        code: customSubject.toUpperCase().replace(/\s+/g, ""),
        mandatory: false,
        hours: 2,
      };
      setSelectedSubjects((prev) => [...prev, newSubject]);
      setCustomSubject("");
    }
  };

  const removeSubject = (subjectCode) => {
    setSelectedSubjects((prev) => prev.filter((s) => s.code !== subjectCode));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.grade.trim()) {
      newErrors.grade = "Grade is required";
    }

    if (!formData.nepaliName.trim()) {
      newErrors.nepaliName = "Nepali name is required";
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.ageGroup.trim()) {
      newErrors.ageGroup = "Age group is required";
    }

    if (
      formData.students &&
      (isNaN(formData.students) || parseInt(formData.students) < 1)
    ) {
      newErrors.students = "Please enter a valid number of students";
    }

    if (
      formData.sections &&
      (isNaN(formData.sections) || parseInt(formData.sections) < 1)
    ) {
      newErrors.sections = "Please enter a valid number of sections";
    }

    if (selectedSubjects.length === 0) {
      newErrors.subjects = "Please select at least one subject";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!validateForm()) {
        toast.error("Please fill in all required fields");
        return;
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/courses/primary/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      setIsSubmitting(true);
      const data = await res.json();
      if (data.success) {
        toast.success("Primary class added successfully");
        router.push("/admin/courses/primary");
      }

      const classData = {
        ...formData,
        subjects: selectedSubjects,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };
    } catch (error) {
      toast.error("Failed to add class. Please try again.");
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalWeeklyHours = selectedSubjects.reduce(
    (total, subject) => total + subject.hours,
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/courses/primary">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Primary Level
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
            <School className="w-8 h-8 text-green-600" />
            Add New Primary Class
          </h1>
          <p className="text-muted-foreground">
            Create a new class for primary level education
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
                <Label htmlFor="grade">Grade *</Label>
                <Input
                  id="grade"
                  name="grade"
                  placeholder="e.g., Grade 1"
                  value={formData.grade}
                  onChange={handleInputChange}
                  required
                  className={errors.grade ? "border-red-500" : ""}
                />
                {errors.grade && (
                  <p className="text-sm text-red-600 mt-1">{errors.grade}</p>
                )}
              </div>
              <div>
                <Label htmlFor="nepaliName">Nepali Name *</Label>
                <Input
                  id="nepaliName"
                  name="nepaliName"
                  placeholder="e.g., कक्षा १"
                  value={formData.nepaliName}
                  onChange={handleInputChange}
                  required
                  className={errors.nepaliName ? "border-red-500" : ""}
                />
                {errors.nepaliName && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.nepaliName}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="e.g., Class One"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className={errors.fullName ? "border-red-500" : ""}
                />
                {errors.fullName && (
                  <p className="text-sm text-red-600 mt-1">{errors.fullName}</p>
                )}
              </div>
              <div>
                <Label htmlFor="ageGroup">Age Group *</Label>
                <Input
                  id="ageGroup"
                  name="ageGroup"
                  placeholder="e.g., 5-6 years"
                  value={formData.ageGroup}
                  onChange={handleInputChange}
                  className={errors.ageGroup ? "border-red-500" : ""}
                />
                {errors.ageGroup && (
                  <p className="text-sm text-red-600 mt-1">{errors.ageGroup}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="students">Number of Students</Label>
                <Input
                  id="students"
                  name="students"
                  type="number"
                  placeholder="45"
                  value={formData.students}
                  onChange={handleInputChange}
                  className={errors.students ? "border-red-500" : ""}
                />
                {errors.students && (
                  <p className="text-sm text-red-600 mt-1">{errors.students}</p>
                )}
              </div>
              <div>
                <Label htmlFor="sections">Number of Sections</Label>
                <Input
                  id="sections"
                  name="sections"
                  type="number"
                  placeholder="1"
                  value={formData.sections}
                  onChange={handleInputChange}
                  className={errors.sections ? "border-red-500" : ""}
                />
                {errors.sections && (
                  <p className="text-sm text-red-600 mt-1">{errors.sections}</p>
                )}
              </div>
              <div>
                <Label htmlFor="weeklyHours">Weekly Hours</Label>
                <Input
                  id="weeklyHours"
                  name="weeklyHours"
                  type="number"
                  placeholder="30"
                  value={formData.weeklyHours}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Brief description of the class..."
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Subject Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Subject Selection</CardTitle>
            <p className="text-sm text-muted-foreground">
              Select subjects for this class. Mandatory subjects are
              pre-selected.
            </p>
            {errors.subjects && (
              <p className="text-sm text-red-600">{errors.subjects}</p>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Available Subjects */}
            <div>
              <Label className="text-base font-medium">
                Available Subjects
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                {availableSubjects.map((subject) => {
                  const isSelected = selectedSubjects.find(
                    (s) => s.code === subject.code
                  );
                  return (
                    <div
                      key={subject.code}
                      className="flex items-center space-x-2 p-3 border rounded-lg"
                    >
                      <Checkbox
                        id={subject.code}
                        checked={isSelected}
                        onCheckedChange={() => handleSubjectToggle(subject)}
                        disabled={subject.mandatory}
                      />
                      <div className="flex-1">
                        <Label htmlFor={subject.code} className="font-medium">
                          {subject.name}
                        </Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant={
                              subject.mandatory ? "default" : "secondary"
                            }
                            className="text-xs"
                          >
                            {subject.mandatory ? "Required" : "Optional"}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {subject.hours}h/week
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Add Custom Subject */}
            <div>
              <Label className="text-base font-medium">
                Add Custom Subject
              </Label>
              <div className="flex gap-2 mt-2">
                <Input
                  placeholder="Enter subject name"
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                />
                <Button type="button" onClick={addCustomSubject}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Selected Subjects */}
            {selectedSubjects.length > 0 && (
              <div>
                <Label className="text-base font-medium">
                  Selected Subjects ({selectedSubjects.length})
                </Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedSubjects.map((subject) => (
                    <Badge
                      key={subject.code}
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      {subject.name}
                      <span className="text-xs">({subject.hours}h)</span>
                      {!subject.mandatory && (
                        <button
                          type="button"
                          onClick={() => removeSubject(subject.code)}
                          className="ml-1 hover:text-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Total Weekly Hours: {totalWeeklyHours} hours
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Class Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Users className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <p className="text-2xl font-bold">{formData.students || "0"}</p>
                <p className="text-sm text-muted-foreground">Students</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <School className="w-6 h-6 mx-auto mb-2 text-green-600" />
                <p className="text-2xl font-bold">{formData.sections || "1"}</p>
                <p className="text-sm text-muted-foreground">Sections</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <BookOpen className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                <p className="text-2xl font-bold">{selectedSubjects.length}</p>
                <p className="text-sm text-muted-foreground">Subjects</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Clock className="w-6 h-6 mx-auto mb-2 text-orange-600" />
                <p className="text-2xl font-bold">{totalWeeklyHours}</p>
                <p className="text-sm text-muted-foreground">Hours/Week</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Link href="/admin/courses/primary">
            <Button variant="outline" disabled={isSubmitting}>
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            className="flex items-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating Class...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Class
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
