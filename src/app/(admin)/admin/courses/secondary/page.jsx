"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  Search,
  Plus,
  Edit,
  Trash2,
  BookOpen,
  Users,
  Clock,
  Building,
  FlaskConical,
  Calculator,
  Globe,
  Scale,
  Briefcase
} from "lucide-react";
import Link from "next/link";

export default function SecondaryLevel() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const secondaryStructure = [
    {
      level: "Lower Secondary",
      grades: ["Grade 6", "Grade 7", "Grade 8"],
      description: "Foundation level with basic subjects",
      students: 180,
      hasFaculties: false
    },
    {
      level: "Secondary", 
      grades: ["Grade 9", "Grade 10"],
      description: "SEE preparation level",
      students: 120,
      hasFaculties: false
    },
    {
      level: "Higher Secondary",
      grades: ["Grade 11", "Grade 12"],
      description: "Faculty-based specialized education",
      students: 380,
      hasFaculties: true
    }
  ];

  const faculties = [
    {
      id: "science",
      name: "Science Faculty",
      nepaliName: "विज्ञान संकाय",
      icon: FlaskConical,
      color: "bg-blue-500",
      students: 150,
      subjects: ["Physics", "Chemistry", "Biology", "Mathematics", "English", "Nepali"],
      compulsorySubjects: ["Physics", "Chemistry", "Mathematics", "English", "Nepali"],
      optionalSubjects: ["Biology", "Computer Science"],
      description: "For students interested in medical, engineering, and scientific fields"
    },
    {
      id: "management",
      name: "Management Faculty", 
      nepaliName: "व्यवस्थापन संकाय",
      icon: Briefcase,
      color: "bg-green-500",
      students: 120,
      subjects: ["Accountancy", "Economics", "Business Studies", "Mathematics", "English", "Nepali"],
      compulsorySubjects: ["Accountancy", "Economics", "English", "Nepali"],
      optionalSubjects: ["Business Studies", "Mathematics", "Computer Science"],
      description: "For students interested in business, commerce, and management"
    },
    {
      id: "humanities",
      name: "Humanities Faculty",
      nepaliName: "मानविकी संकाय", 
      icon: Globe,
      color: "bg-purple-500",
      students: 80,
      subjects: ["Sociology", "Psychology", "History", "Geography", "English", "Nepali"],
      compulsorySubjects: ["English", "Nepali"],
      optionalSubjects: ["Sociology", "Psychology", "History", "Geography", "Political Science"],
      description: "For students interested in social sciences and liberal arts"
    },
    {
      id: "education",
      name: "Education Faculty",
      nepaliName: "शिक्षा संकाय",
      icon: BookOpen,
      color: "bg-orange-500", 
      students: 30,
      subjects: ["Education", "Psychology", "Sociology", "English", "Nepali"],
      compulsorySubjects: ["Education", "English", "Nepali"],
      optionalSubjects: ["Psychology", "Sociology", "Philosophy"],
      description: "For students interested in teaching and educational careers"
    }
  ];

  const basicSubjects = [
    { name: "Nepali", code: "NEP", mandatory: true, allLevels: true },
    { name: "English", code: "ENG", mandatory: true, allLevels: true },
    { name: "Mathematics", code: "MATH", mandatory: true, allLevels: true },
    { name: "Science", code: "SCI", mandatory: true, levels: ["6-8", "9-10"] },
    { name: "Social Studies", code: "SS", mandatory: true, levels: ["6-8", "9-10"] },
    { name: "Health & Physical Education", code: "HPE", mandatory: true, allLevels: true },
    { name: "Computer Science", code: "COMP", mandatory: false, allLevels: true }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
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
              Secondary Level Management
            </h1>
            <p className="text-muted-foreground">
              Manage classes, faculties, and subjects for Grades 6-12
            </p>
          </div>
        </div>
        <Link href="/admin/courses/secondary/add-faculty">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add New Faculty
          </Button>
        </Link>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">7</p>
                <p className="text-sm text-muted-foreground">Total Grades</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Building className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">4</p>
                <p className="text-sm text-muted-foreground">Faculties</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">680</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
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
                <p className="text-2xl font-bold">35</p>
                <p className="text-sm text-muted-foreground">Avg Weekly Hours</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="faculties">Faculties</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Secondary Structure */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {secondaryStructure.map((structure, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">{structure.level}</CardTitle>
                  <p className="text-sm text-muted-foreground">{structure.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Grades:</p>
                    <div className="flex flex-wrap gap-2">
                      {structure.grades.map((grade, idx) => (
                        <Badge key={idx} variant="secondary">{grade}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-foreground">{structure.students}</p>
                    <p className="text-xs text-muted-foreground">Students</p>
                  </div>

                  {structure.hasFaculties && (
                    <Badge className="w-full justify-center">Faculty-Based System</Badge>
                  )}

                  <Link href={
                    structure.level === "Lower Secondary" ? "/admin/courses/secondary/lower" :
                    structure.level === "Secondary" ? "/admin/courses/secondary/middle" :
                    "/admin/courses/secondary/higher"
                  }>
                    <Button className="w-full" variant="outline">
                      Manage {structure.level}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="faculties" className="space-y-6">
          {/* Search */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search faculties..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Link href="/admin/courses/secondary/add-faculty">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Faculty
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Faculties Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {faculties.map((faculty) => {
              const IconComponent = faculty.icon;
              return (
                <Card key={faculty.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 ${faculty.color} rounded-lg`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{faculty.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{faculty.nepaliName}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{faculty.description}</p>
                    
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-foreground">{faculty.students}</p>
                      <p className="text-xs text-muted-foreground">Students Enrolled</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Compulsory Subjects:</p>
                      <div className="flex flex-wrap gap-1">
                        {faculty.compulsorySubjects.map((subject, idx) => (
                          <Badge key={idx} variant="default" className="text-xs">{subject}</Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Optional Subjects:</p>
                      <div className="flex flex-wrap gap-1">
                        {faculty.optionalSubjects.map((subject, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">{subject}</Badge>
                        ))}
                      </div>
                    </div>

                    <Link href={`/admin/courses/secondary/faculty/${faculty.id}`}>
                      <Button className="w-full">
                        Manage {faculty.name}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Subjects (Grades 6-10)</CardTitle>
              <p className="text-sm text-muted-foreground">
                Core subjects for lower and secondary levels
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {basicSubjects.map((subject, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{subject.name}</h4>
                      {subject.mandatory && (
                        <Badge variant="default" className="text-xs">Required</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">Code: {subject.code}</p>
                    <p className="text-sm text-muted-foreground">
                      Levels: {subject.allLevels ? "All Grades" : subject.levels?.join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
