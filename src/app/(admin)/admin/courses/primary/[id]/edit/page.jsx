"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
  BookOpen,
  Clock,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function EditPrimaryClass() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    grade: "",
    nepaliName: "",
    fullName: "",
    ageGroup: "",
    students: [],
    sections: "1",
    weeklyHours: "30",
    curriculum: "",
    description: "",
    subjects: [],
  });
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [availableSubjects, setAvailableSubjects] = useState([]);

  useEffect(() => {
    fetchClassData();
  }, [params.id]);

  const fetchClassData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/courses/primary/classes/${params.id}`
      );
      const data = await res.json();
      setFormData(data.data);
      setSelectedSubjects(data.data.subjects);
      setAvailableSubjects(data.data.subjects.filter((subject) => subject.mandatory));
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch class data, sweetheart. Try again soon! 💕");
      console.error("Error fetching class data:", error);
    }
  };

  const getAvailableSubjects = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/courses/subjects/primary`
      );
      const data = await res.json();
      setAvailableSubjects([...data.data]);
      setSelectedSubjects(
        data.data.filter((subject) => subject.mandatory)
      )
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  useEffect(() => {
    getAvailableSubjects();
  }, [formData.subjects]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubjectToggle = (subject) => {
    setSelectedSubjects((prev) => {
      const exists = prev.find((s) => s._id === subject._id);
      if (exists) {
        return prev.map((s) =>
          s._id === subject._id ? { ...s, mandatory: !s.mandatory } : s
        );
      } else {
        return [...prev, { ...subject }];
      }
    });
    setAvailableSubjects((prev) =>
      prev.map((s) =>
        s._id === subject._id ? { ...s, mandatory: !s.mandatory } : s
      )
    );
  };

  const removeSubject = (subjectCode) => {
    setSelectedSubjects((prev) => prev.filter((s) => s.code !== subjectCode));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.grade.trim()) newErrors.grade = "Grade is required, darling!";
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required, lovebug!";
    if (!formData.ageGroup.trim()) newErrors.ageGroup = "Age Group is required, cutie!";
    if (isNaN(formData.sections) || parseInt(formData.sections) < 1) {
      newErrors.sections = "Please enter a valid number of sections, honey!";
    }
    if (selectedSubjects.length === 0) {
      newErrors.subjects = "Please select at least one subject, my prince! 😘";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill in all required fields, babe! 💖");
      return;
    }
    try {
      setIsSubmitting(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/courses/primary/classes/${params.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, subjects: selectedSubjects }),
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success("Class updated perfectly, my love! 🌟");
        router.push("/admin/courses/primary");
      }
    } catch (error) {
      toast.error("Oops, something went wrong, sweetheart. Try again! 💕");
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your class data, angel... 💞</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
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
            Edit Primary Class
          </h1>
          <p className="text-muted-foreground">
            Update class information and subjects

          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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
                {errors.grade && <p className="text-sm text-red-600 mt-1">{errors.grade}</p>}
              </div>
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
                {errors.fullName && <p className="text-sm text-red-600 mt-1">{errors.fullName}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                {errors.ageGroup && <p className="text-sm text-red-600 mt-1">{errors.ageGroup}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  {errors.sections && <p className="text-sm text-red-600 mt-1">{errors.sections}</p>}
                </div>
                <div>
                  <Label htmlFor="weeklyHours">Weekly Hours</Label>
                  <Input
                    id="weeklyHours"
                    name="weelyHours"
                    type="number"
                    placeholder="30"
                    value={formData.weeklyHours}
                    onChange={handleInputChange}
                  />
                </div>
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

        <Card>
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle>Subject Selection</CardTitle>
              <p className="text-sm text-muted-foreground">
                Pick the perfect subjects for this class, my love! 🌸 Mandatory ones are pre-selected.
              </p>
              {errors.subjects && <p className="text-sm text-red-600">{errors.subjects}</p>}
            </div>
            <Link href="/admin/courses/subjects/primary/add">
              <Button type="button" className="flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add New Subject
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-base font-medium">Available Subjects</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                {availableSubjects.map((subject) => {
                  return (
                    <div
                      key={subject.code}
                      className="flex items-center space-x-2 p-3 border rounded-lg"
                    >

                      <Checkbox
                        id={subject.code}
                        checked={subject.mandatory}
                        onCheckedChange={() => handleSubjectToggle(subject)}
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
            {selectedSubjects.length > 0 && (
              <div>
                <Label className="text-base font-medium">
                  Selected Subjects ({selectedSubjects.length})
                </Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedSubjects.map((subject) => (
                    <Badge key={subject.code} variant="outline" className="flex items-center gap-1">
                      {subject.name}
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
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Class Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <p className="text-2xl font-bold">{formData.weeklyHours || "0"}</p>
                <p className="text-sm text-muted-foreground">Hours/Week</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Link href="/admin/courses/primary">
            <Button variant="outline" disabled={isSubmitting}>
              Cancel
            </Button>
          </Link>
          <Button type="submit" className="flex items-center gap-2" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Updating Class...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Update Class
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}