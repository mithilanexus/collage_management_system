"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  Edit,
  Trash2,
  BookOpen,
  Users,
  Clock,
  School,
  User,
  Loader2,
  Calendar,
  Award
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function SubjectDetails() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [subjectData, setSubjectData] = useState(null);

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
      ],
      classes: [
        { grade: "Grade 1", students: 45, teacher: "Mrs. Sita Sharma" },
        { grade: "Grade 2", students: 48, teacher: "Mrs. Sita Sharma" },
        { grade: "Grade 3", students: 52, teacher: "Mr. Ram Bahadur" },
        { grade: "Grade 4", students: 49, teacher: "Mr. Ram Bahadur" },
        { grade: "Grade 5", students: 46, teacher: "Mrs. Kamala Devi" }
      ],
      teachers: [
        { name: "Mrs. Sita Sharma", qualification: "M.A. Nepali", experience: "8 years", classes: ["Grade 1", "Grade 2"] },
        { name: "Mr. Ram Bahadur", qualification: "M.A. Nepali", experience: "12 years", classes: ["Grade 3", "Grade 4"] },
        { name: "Mrs. Kamala Devi", qualification: "M.A. Nepali", experience: "6 years", classes: ["Grade 5"] }
      ],
      curriculum: [
        { topic: "Devanagari Script", weeks: 4, grade: "All" },
        { topic: "Basic Vocabulary", weeks: 6, grade: "All" },
        { topic: "Simple Sentences", weeks: 4, grade: "All" },
        { topic: "Story Reading", weeks: 6, grade: "All" },
        { topic: "Poetry Recitation", weeks: 4, grade: "All" },
        { topic: "Letter Writing", weeks: 3, grade: "Grade 4-5" }
      ],
      assessment: {
        continuous: 40,
        midterm: 25,
        final: 35,
        passMarks: 40
      },
      resources: [
        "Nepali Textbook Grade 1-5",
        "Devanagari Writing Practice Books",
        "Nepali Story Books",
        "Audio-Visual Materials",
        "Cultural Activity Materials"
      ]
    }
  };

  useEffect(() => {
    setTimeout(() => {
      const data = mockSubjectData[params.id];
      if (data) {
        setSubjectData(data);
      }
      setLoading(false);
    }, 1000);
  }, [params.id]);

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this subject? This action cannot be undone.")) {
      console.log("Deleting subject:", params.id);
      toast.success("Subject deleted successfully!");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading subject details...</p>
        </div>
      </div>
    );
  }

  if (!subjectData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Subject Not Found</h2>
          <p className="text-muted-foreground mb-4">The requested subject could not be found.</p>
          <Link href="/admin/courses/subjects">
            <Button>Back to Subjects</Button>
          </Link>
        </div>
      </div>
    );
  }

  const totalStudents = subjectData.classes.reduce((total, cls) => total + cls.students, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/courses/subjects">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Subjects
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-blue-600" />
              {subjectData.name}
            </h1>
            <p className="text-muted-foreground">
              {subjectData.code} • {subjectData.level} Level • {subjectData.type}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/admin/courses/subjects/${params.id}/edit`}>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit Subject
            </Button>
          </Link>
          <Button variant="outline" size="sm" onClick={handleDelete} className="text-red-600 hover:text-red-700">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalStudents}</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <School className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{subjectData.classes.length}</p>
                <p className="text-sm text-muted-foreground">Classes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <User className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{subjectData.teachers.length}</p>
                <p className="text-sm text-muted-foreground">Teachers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{subjectData.hours}</p>
                <p className="text-sm text-muted-foreground">Hours/Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="assessment">Assessment</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Subject Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant={subjectData.mandatory ? "default" : "secondary"}>
                    {subjectData.mandatory ? "Mandatory" : "Optional"}
                  </Badge>
                  <Badge variant="outline">{subjectData.level} Level</Badge>
                  <Badge variant="outline">{subjectData.type}</Badge>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{subjectData.description}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Learning Objectives</h4>
                  <ul className="space-y-1">
                    {subjectData.objectives.map((objective, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resources & Materials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {subjectData.resources.map((resource, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 border rounded">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">{resource}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="classes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Classes Teaching This Subject</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjectData.classes.map((cls, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <School className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{cls.grade}</h4>
                        <p className="text-sm text-muted-foreground">Teacher: {cls.teacher}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{cls.students} students</p>
                      <p className="text-sm text-muted-foreground">{subjectData.hours}h/week</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teachers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Teaching Staff</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subjectData.teachers.map((teacher, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{teacher.name}</h4>
                        <p className="text-sm text-muted-foreground">{teacher.qualification}</p>
                      </div>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>Experience: {teacher.experience}</p>
                      <p>Classes: {teacher.classes.join(", ")}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="curriculum" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Curriculum Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {subjectData.curriculum.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{topic.topic}</h4>
                      <p className="text-sm text-muted-foreground">Grade: {topic.grade}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">{topic.weeks} weeks</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assessment" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Assessment Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Continuous Assessment</span>
                    <Badge variant="secondary">{subjectData.assessment.continuous}%</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Mid-term Examination</span>
                    <Badge variant="secondary">{subjectData.assessment.midterm}%</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Final Examination</span>
                    <Badge variant="secondary">{subjectData.assessment.final}%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Grading Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{subjectData.assessment.passMarks}%</p>
                    <p className="text-sm text-muted-foreground">Minimum Pass Marks</p>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>A+ (90-100%)</span>
                      <span className="text-green-600">Excellent</span>
                    </div>
                    <div className="flex justify-between">
                      <span>A (80-89%)</span>
                      <span className="text-blue-600">Very Good</span>
                    </div>
                    <div className="flex justify-between">
                      <span>B+ (70-79%)</span>
                      <span className="text-purple-600">Good</span>
                    </div>
                    <div className="flex justify-between">
                      <span>B (60-69%)</span>
                      <span className="text-orange-600">Satisfactory</span>
                    </div>
                    <div className="flex justify-between">
                      <span>C+ (50-59%)</span>
                      <span className="text-yellow-600">Acceptable</span>
                    </div>
                    <div className="flex justify-between">
                      <span>C (40-49%)</span>
                      <span className="text-gray-600">Pass</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
