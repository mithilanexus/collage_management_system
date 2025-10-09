"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  Save,
  BookOpen,
  School,
  GraduationCap,
  Building,
  Plus,
  X
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useCreateCoursePrimary } from "@/hooks/admin/courses";

export default function AddNewCourse() {
  const { mutateAsync: createCourse, isPending } = useCreateCoursePrimary();
  const [selectedLevel, setSelectedLevel] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    level: "",
    duration: "",
    credits: "",
    prerequisites: [],
    objectives: [],
    outcomes: []
  });

  const [newPrerequisite, setNewPrerequisite] = useState("");
  const [newObjective, setNewObjective] = useState("");
  const [newOutcome, setNewOutcome] = useState("");

  const courseLevels = [
    { value: "primary", label: "Primary Level", icon: School, description: "Grades 1-5" },
    { value: "secondary", label: "Secondary Level", icon: BookOpen, description: "Grades 6-12" },
    { value: "bachelor", label: "Bachelor Level", icon: GraduationCap, description: "Undergraduate" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addPrerequisite = () => {
    if (newPrerequisite.trim() && !formData.prerequisites.includes(newPrerequisite.trim())) {
      setFormData(prev => ({
        ...prev,
        prerequisites: [...prev.prerequisites, newPrerequisite.trim()]
      }));
      setNewPrerequisite("");
    }
  };

  const removePrerequisite = (prerequisite) => {
    setFormData(prev => ({
      ...prev,
      prerequisites: prev.prerequisites.filter(p => p !== prerequisite)
    }));
  };

  const addObjective = () => {
    if (newObjective.trim() && !formData.objectives.includes(newObjective.trim())) {
      setFormData(prev => ({
        ...prev,
        objectives: [...prev.objectives, newObjective.trim()]
      }));
      setNewObjective("");
    }
  };

  const removeObjective = (objective) => {
    setFormData(prev => ({
      ...prev,
      objectives: prev.objectives.filter(o => o !== objective)
    }));
  };

  const addOutcome = () => {
    if (newOutcome.trim() && !formData.outcomes.includes(newOutcome.trim())) {
      setFormData(prev => ({
        ...prev,
        outcomes: [...prev.outcomes, newOutcome.trim()]
      }));
      setNewOutcome("");
    }
  };

  const removeOutcome = (outcome) => {
    setFormData(prev => ({
      ...prev,
      outcomes: prev.outcomes.filter(o => o !== outcome)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.code || !selectedLevel) {
      toast.error("Please fill in all required fields");
      return;
    }

    const payload = {
      ...formData,
      level: selectedLevel,
    };

    try {
      await createCourse(payload);
      toast.success("Course created successfully!");
      // reset form
      setFormData({
        name: "",
        code: "",
        description: "",
        level: "",
        duration: "",
        credits: "",
        prerequisites: [],
        objectives: [],
        outcomes: [],
      });
      setSelectedLevel("");
    } catch (err) {
      toast.error(err?.message || "Failed to create course");
    }
  };

  const selectedLevelData = courseLevels.find(level => level.value === selectedLevel);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/courses">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-blue-600" />
            Add New Course
          </h1>
          <p className="text-muted-foreground">
            Create a new course for any education level
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Level Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Education Level</CardTitle>
            <p className="text-sm text-muted-foreground">
              Choose the education level for this course
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {courseLevels.map((level) => {
                const IconComponent = level.icon;
                return (
                  <div
                    key={level.value}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedLevel === level.value 
                        ? 'border-primary bg-primary/5' 
                        : 'border-muted hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedLevel(level.value)}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <IconComponent className="w-6 h-6 text-primary" />
                      <h3 className="font-semibold">{level.label}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{level.description}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {selectedLevel && (
          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Information</TabsTrigger>
              <TabsTrigger value="academic">Academic Details</TabsTrigger>
              <TabsTrigger value="objectives">Objectives & Outcomes</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Course Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Course Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="e.g., Advanced Mathematics"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="code">Course Code *</Label>
                      <Input
                        id="code"
                        name="code"
                        placeholder="e.g., MATH301"
                        value={formData.code}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="duration">Duration</Label>
                      <Input
                        id="duration"
                        name="duration"
                        placeholder="e.g., 1 Semester, 1 Year"
                        value={formData.duration}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="credits">Credits</Label>
                      <Input
                        id="credits"
                        name="credits"
                        type="number"
                        placeholder="e.g., 3"
                        value={formData.credits}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Course Description *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Detailed description of the course content and scope..."
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      required
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="academic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Prerequisites</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Add courses or requirements needed before taking this course
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter prerequisite course or requirement"
                      value={newPrerequisite}
                      onChange={(e) => setNewPrerequisite(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPrerequisite())}
                    />
                    <Button type="button" onClick={addPrerequisite}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  {formData.prerequisites.length > 0 && (
                    <div>
                      <Label className="text-base font-medium">Prerequisites ({formData.prerequisites.length})</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.prerequisites.map((prerequisite, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1">
                            {prerequisite}
                            <button
                              type="button"
                              onClick={() => removePrerequisite(prerequisite)}
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
            </TabsContent>

            <TabsContent value="objectives" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Learning Objectives */}
                <Card>
                  <CardHeader>
                    <CardTitle>Learning Objectives</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      What students will learn in this course
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter learning objective"
                        value={newObjective}
                        onChange={(e) => setNewObjective(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addObjective())}
                      />
                      <Button type="button" onClick={addObjective}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    {formData.objectives.length > 0 && (
                      <div className="space-y-2">
                        {formData.objectives.map((objective, index) => (
                          <div key={index} className="flex items-center justify-between p-2 border rounded">
                            <span className="text-sm">{objective}</span>
                            <button
                              type="button"
                              onClick={() => removeObjective(objective)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Learning Outcomes */}
                <Card>
                  <CardHeader>
                    <CardTitle>Learning Outcomes</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      What students will be able to do after completing this course
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter learning outcome"
                        value={newOutcome}
                        onChange={(e) => setNewOutcome(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addOutcome())}
                      />
                      <Button type="button" onClick={addOutcome}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    {formData.outcomes.length > 0 && (
                      <div className="space-y-2">
                        {formData.outcomes.map((outcome, index) => (
                          <div key={index} className="flex items-center justify-between p-2 border rounded">
                            <span className="text-sm">{outcome}</span>
                            <button
                              type="button"
                              onClick={() => removeOutcome(outcome)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        )}

        {/* Preview */}
        {selectedLevel && (
          <Card>
            <CardHeader>
              <CardTitle>Course Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                {selectedLevelData && (
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <selectedLevelData.icon className="w-6 h-6 text-blue-600" />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{formData.name || "Course Name"}</h3>
                    <Badge variant="outline" className="text-xs">{formData.code || "CODE"}</Badge>
                    <Badge variant="secondary" className="text-xs">{selectedLevelData?.label}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {formData.description || "Course description will appear here..."}
                  </p>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>Duration: {formData.duration || "Not specified"}</span>
                    <span>Credits: {formData.credits || "Not specified"}</span>
                    <span>Prerequisites: {formData.prerequisites.length}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Link href="/admin/courses">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" className="flex items-center gap-2" disabled={!selectedLevel || isPending}>
            <Save className="w-4 h-4" />
            {isPending ? "Creating…" : "Create Course"}
          </Button>
        </div>
      </form>
    </div>
  );
}
