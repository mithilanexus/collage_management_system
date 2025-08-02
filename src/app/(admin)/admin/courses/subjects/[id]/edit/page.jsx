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
  BookOpen,
  Plus,
  X,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function EditSubject() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    level: "",
    type: "",
    mandatory: false,
    hours: "",
    description: "",
    objectives: []
  });

  const [newObjective, setNewObjective] = useState("");

  // Mock data
  const mockSubjectData = {
    1: {
      id: 1,
      name: "Nepali",
      code: "NEP",
      level: "Primary",
      type: "Language",
      mandatory: true,
      hours: 6,
      description: "Mother tongue language development focusing on reading, writing, speaking, and listening skills.",
      objectives: [
        "Develop basic reading and writing skills in Nepali",
        "Improve vocabulary and grammar understanding",
        "Enhance communication skills in mother tongue",
        "Appreciate Nepali literature and culture"
      ]
    }
  };

  const subjectLevels = ["Primary", "Secondary", "Bachelor"];
  const subjectTypes = ["Language", "Science", "Mathematics", "Social", "Physical", "Arts", "Technology", "Ethics"];

  useEffect(() => {
    setTimeout(() => {
      const data = mockSubjectData[params.id];
      if (data) {
        setFormData({
          name: data.name,
          code: data.code,
          level: data.level,
          type: data.type,
          mandatory: data.mandatory,
          hours: data.hours.toString(),
          description: data.description,
          objectives: [...data.objectives]
        });
      }
      setLoading(false);
    }, 1000);
  }, [params.id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.code || !formData.level || !formData.type) {
      toast.error("Please fill in all required fields");
      return;
    }

    const updatedSubjectData = {
      ...formData,
      id: params.id,
      updatedAt: new Date().toISOString()
    };

    console.log("Updated Subject:", updatedSubjectData);
    toast.success("Subject updated successfully!");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading subject data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href={`/admin/courses/subjects/${params.id}`}>
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Subject Details
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-blue-600" />
            Edit Subject
          </h1>
          <p className="text-muted-foreground">
            Update subject information and settings
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
                <Label htmlFor="name">Subject Name *</Label>
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
                <Label htmlFor="code">Subject Code *</Label>
                <Input
                  id="code"
                  name="code"
                  placeholder="e.g., MATH"
                  value={formData.code}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="level">Education Level *</Label>
                <Select value={formData.level} onValueChange={(value) => setFormData(prev => ({...prev, level: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjectLevels.map((level) => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
                <Label htmlFor="hours">Weekly Hours</Label>
                <Input
                  id="hours"
                  name="hours"
                  type="number"
                  min="1"
                  max="20"
                  value={formData.hours}
                  onChange={handleInputChange}
                />
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
              <Label htmlFor="description">Subject Description *</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Detailed description of the subject..."
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Learning Objectives */}
        <Card>
          <CardHeader>
            <CardTitle>Learning Objectives</CardTitle>
            <p className="text-sm text-muted-foreground">
              Define what students will learn from this subject
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
              <div>
                <Label className="text-base font-medium">Current Objectives ({formData.objectives.length})</Label>
                <div className="space-y-2 mt-2">
                  {formData.objectives.map((objective, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm flex-1">{objective}</span>
                      <button
                        type="button"
                        onClick={() => removeObjective(objective)}
                        className="ml-2 text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
                <p className="text-sm text-muted-foreground mb-2">
                  {formData.description || "Subject description will appear here..."}
                </p>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>Level: {formData.level || "Not selected"}</span>
                  <span>Type: {formData.type || "Not selected"}</span>
                  <span>Hours: {formData.hours || "0"}/week</span>
                  <span>Objectives: {formData.objectives.length}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Link href={`/admin/courses/subjects/${params.id}`}>
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
