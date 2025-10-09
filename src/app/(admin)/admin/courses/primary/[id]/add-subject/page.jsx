"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
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
  Save,
  School,
  BookOpen,
  Clock,
  User,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { usePrimaryClass, useCreateSubject } from "@/hooks/admin/courses";

export default function AddSubjectToClass() {
  const params = useParams();
  const { data: classData, isLoading: loading } = usePrimaryClass({ id: params.id });
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    type: "",
    weeklyHours: "2",
    mandatory: false,
    teacher: "",
    description: "",
    textbook: "",
    objectives: ""
  });

  const subjectTypes = [
    "Language", "Science", "Mathematics", "Social", "Physical", "Arts", "Technology", "Ethics"
  ];

  const availableTeachers = [
    "Mrs. Sita Sharma", "Mr. John Smith", "Mrs. Kamala Devi", 
    "Mr. Ram Prasad", "Mrs. Gita Poudel", "Mr. Bikash Thapa"
  ];

  const { mutateAsync: createSubject } = useCreateSubject();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.code || !formData.type) {
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      const payload = {
        ...formData,
        classId: params.id,
      };
      await createSubject(payload);
      toast.success("Subject added successfully!");
    } catch (err) {
      toast.error(err?.message || "Failed to add subject");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading class data...</p>
        </div>
      </div>
    );
  }

  if (!classData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <School className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Class Not Found</h2>
          <p className="text-muted-foreground mb-4">The requested class could not be found.</p>
          <Link href="/admin/courses/primary">
            <Button>Back to Primary Level</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href={`/admin/courses/primary/${params.id}`}>
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {classData.grade}
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-green-600" />
            Add Subject to {classData.grade}
          </h1>
          <p className="text-muted-foreground">
            Add a new subject to {classData.nepaliName}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Subject Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Subject Name *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g., Art & Craft"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="code">Subject Code *</Label>
                <Input
                  id="code"
                  name="code"
                  placeholder="e.g., ART"
                  value={formData.code}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="type">Subject Type *</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({...prev, type: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjectTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="weeklyHours">Weekly Hours</Label>
                <Input
                  id="weeklyHours"
                  name="weeklyHours"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.weeklyHours}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="teacher">Assigned Teacher</Label>
                <Select value={formData.teacher} onValueChange={(value) => setFormData(prev => ({...prev, teacher: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTeachers.map((teacher) => (
                      <SelectItem key={teacher} value={teacher}>{teacher}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="mandatory"
                name="mandatory"
                checked={formData.mandatory}
                onCheckedChange={(checked) => setFormData(prev => ({...prev, mandatory: checked}))}
              />
              <Label htmlFor="mandatory">This is a mandatory subject</Label>
            </div>

            <div>
              <Label htmlFor="description">Subject Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Brief description of the subject..."
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="textbook">Textbook/Materials</Label>
                <Input
                  id="textbook"
                  name="textbook"
                  placeholder="e.g., Art & Craft Grade 1"
                  value={formData.textbook}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="objectives">Learning Objectives</Label>
                <Input
                  id="objectives"
                  name="objectives"
                  placeholder="e.g., Develop creativity and motor skills"
                  value={formData.objectives}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Subject Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{formData.name || "Subject Name"}</h3>
                  <Badge variant="outline" className="text-xs">{formData.code || "CODE"}</Badge>
                  <Badge variant={formData.mandatory ? "default" : "secondary"} className="text-xs">
                    {formData.mandatory ? "Required" : "Optional"}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Type: {formData.type || "Not selected"}</span>
                  <span>Hours: {formData.weeklyHours}/week</span>
                  <span>Teacher: {formData.teacher || "Not assigned"}</span>
                  <span>Class: {classData.grade}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Link href={`/admin/courses/primary/${params.id}`}>
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
