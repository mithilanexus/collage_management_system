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
  GraduationCap,
  Users,
  Clock,
  Building,
  Computer,
  Briefcase,
  BookOpen,
  Scale,
  FlaskConical,
  Globe
} from "lucide-react";
import Link from "next/link";
import { Calendar } from "@/components/ui/calendar";
export default function BachelorLevel() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("programs");

  const bachelorPrograms = [
    {
      id: "bit",
      name: "Bachelor of Information Technology",
      shortName: "BIT",
      nepaliName: "सूचना प्रविधि स्नातक",
      icon: Computer,
      color: "bg-blue-500",
      duration: "4 Years",
      semesters: 8,
      students: 45,
      subjects: 32,
      description: "Comprehensive IT program covering software development, networking, and system administration",
      specializations: ["Software Engineering", "Network Administration", "Web Development", "Database Management"],
      careerPaths: ["Software Developer", "System Administrator", "IT Consultant", "Project Manager"]
    },
    {
      id: "bbs",
      name: "Bachelor of Business Studies", 
      shortName: "BBS",
      nepaliName: "व्यापार अध्ययन स्नातक",
      icon: Briefcase,
      color: "bg-green-500",
      duration: "4 Years",
      semesters: 8,
      students: 65,
      subjects: 28,
      description: "Business administration program focusing on management, finance, and entrepreneurship",
      specializations: ["Finance", "Marketing", "Human Resources", "Operations Management"],
      careerPaths: ["Business Manager", "Financial Analyst", "Marketing Executive", "Entrepreneur"]
    },
    {
      id: "bba",
      name: "Bachelor of Business Administration",
      shortName: "BBA", 
      nepaliName: "व्यापार प्रशासन स्नातक",
      icon: Building,
      color: "bg-purple-500",
      duration: "4 Years",
      semesters: 8,
      students: 55,
      subjects: 30,
      description: "Advanced business program with focus on leadership and strategic management",
      specializations: ["Strategic Management", "International Business", "Digital Marketing", "Supply Chain"],
      careerPaths: ["Business Executive", "Operations Manager", "Strategy Consultant", "Business Analyst"]
    },
    {
      id: "ba",
      name: "Bachelor of Arts",
      shortName: "BA",
      nepaliName: "कला स्नातक", 
      icon: BookOpen,
      color: "bg-orange-500",
      duration: "3 Years",
      semesters: 6,
      students: 40,
      subjects: 24,
      description: "Liberal arts program covering humanities, social sciences, and languages",
      specializations: ["English Literature", "Sociology", "Psychology", "Political Science"],
      careerPaths: ["Teacher", "Writer", "Social Worker", "Civil Servant"]
    },
    {
      id: "bsc",
      name: "Bachelor of Science",
      shortName: "BSc",
      nepaliName: "विज्ञान स्नातक",
      icon: FlaskConical,
      color: "bg-red-500", 
      duration: "3 Years",
      semesters: 6,
      students: 35,
      subjects: 26,
      description: "Science program covering physics, chemistry, mathematics, and biology",
      specializations: ["Physics", "Chemistry", "Mathematics", "Biology"],
      careerPaths: ["Research Scientist", "Lab Technician", "Science Teacher", "Quality Analyst"]
    },
    {
      id: "llb",
      name: "Bachelor of Laws",
      shortName: "LLB",
      nepaliName: "कानून स्नातक",
      icon: Scale,
      color: "bg-indigo-500",
      duration: "3 Years", 
      semesters: 6,
      students: 25,
      subjects: 22,
      description: "Law program covering constitutional, criminal, civil, and commercial law",
      specializations: ["Constitutional Law", "Criminal Law", "Corporate Law", "Human Rights"],
      careerPaths: ["Lawyer", "Legal Advisor", "Judge", "Legal Consultant"]
    }
  ];

  const semesterStructure = [
    { semester: 1, subjects: 4, credits: 16, duration: "6 months" },
    { semester: 2, subjects: 4, credits: 16, duration: "6 months" },
    { semester: 3, subjects: 4, credits: 16, duration: "6 months" },
    { semester: 4, subjects: 4, credits: 16, duration: "6 months" },
    { semester: 5, subjects: 4, credits: 16, duration: "6 months" },
    { semester: 6, subjects: 4, credits: 16, duration: "6 months" },
    { semester: 7, subjects: 4, credits: 16, duration: "6 months" },
    { semester: 8, subjects: 4, credits: 16, duration: "6 months" }
  ];

  const filteredPrograms = bachelorPrograms.filter(program =>
    program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.nepaliName.includes(searchTerm)
  );

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
              <GraduationCap className="w-8 h-8 text-purple-600" />
              Bachelor Level Management
            </h1>
            <p className="text-muted-foreground">
              Manage undergraduate programs, semesters, and specialized courses
            </p>
          </div>
        </div>
        <Link href="/admin/courses/bachelor/add-program">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add New Program
          </Button>
        </Link>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <GraduationCap className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">6</p>
                <p className="text-sm text-muted-foreground">Programs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">162</p>
                <p className="text-sm text-muted-foreground">Total Subjects</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">265</p>
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
                <p className="text-2xl font-bold">3.5</p>
                <p className="text-sm text-muted-foreground">Avg Duration (Years)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="programs">Programs</TabsTrigger>
          <TabsTrigger value="structure">Semester Structure</TabsTrigger>
          <TabsTrigger value="specializations">Specializations</TabsTrigger>
        </TabsList>

        <TabsContent value="programs" className="space-y-6">
          {/* Search */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search programs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Link href="/admin/courses/bachelor/add-program">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Program
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPrograms.map((program) => {
              const IconComponent = program.icon;
              return (
                <Card key={program.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 ${program.color} rounded-lg`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{program.shortName}</CardTitle>
                          <p className="text-sm text-muted-foreground">{program.nepaliName}</p>
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
                    <h3 className="font-medium text-sm">{program.name}</h3>
                    <p className="text-sm text-muted-foreground">{program.description}</p>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-lg font-bold text-foreground">{program.students}</p>
                        <p className="text-xs text-muted-foreground">Students</p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-lg font-bold text-foreground">{program.semesters}</p>
                        <p className="text-xs text-muted-foreground">Semesters</p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-lg font-bold text-foreground">{program.subjects}</p>
                        <p className="text-xs text-muted-foreground">Subjects</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Duration: {program.duration}</p>
                      <Badge variant="outline">{program.duration}</Badge>
                    </div>

                    <Link href={`/admin/courses/bachelor/program/${program.id}`}>
                      <Button className="w-full">
                        Manage {program.shortName}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="structure" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Standard Semester Structure</CardTitle>
              <p className="text-sm text-muted-foreground">
                Common semester structure for 4-year bachelor programs
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {semesterStructure.map((sem, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h4 className="font-medium mb-2">Semester {sem.semester}</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>Subjects: {sem.subjects}</p>
                      <p>Credits: {sem.credits}</p>
                      <p>Duration: {sem.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="specializations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {bachelorPrograms.map((program) => (
              <Card key={program.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <program.icon className="w-5 h-5" />
                    {program.shortName} Specializations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Available Specializations:</p>
                    <div className="flex flex-wrap gap-2">
                      {program.specializations.map((spec, idx) => (
                        <Badge key={idx} variant="secondary">{spec}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">Career Paths:</p>
                    <div className="flex flex-wrap gap-2">
                      {program.careerPaths.map((career, idx) => (
                        <Badge key={idx} variant="outline">{career}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/admin/courses/bachelor/add-program">
              <Button variant="outline" className="flex items-center gap-2 h-auto p-4 w-full">
                <Plus className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-medium">Add Program</p>
                  <p className="text-sm text-muted-foreground">Create new bachelor program</p>
                </div>
              </Button>
            </Link>

            <Link href="/admin/courses/bachelor/programs">
              <Button variant="outline" className="flex items-center gap-2 h-auto p-4 w-full">
                <GraduationCap className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-medium">All Programs</p>
                  <p className="text-sm text-muted-foreground">Manage all bachelor programs</p>
                </div>
              </Button>
            </Link>

            <Link href="/admin/courses/bachelor/batches">
              <Button variant="outline" className="flex items-center gap-2 h-auto p-4 w-full">
                <Users className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-medium">Manage Batches</p>
                  <p className="text-sm text-muted-foreground">Student batches & enrollment</p>
                </div>
              </Button>
            </Link>

            <Link href="/admin/courses/bachelor/faculty">
              <Button variant="outline" className="flex items-center gap-2 h-auto p-4 w-full">
                <Building className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-medium">Faculty Management</p>
                  <p className="text-sm text-muted-foreground">Manage faculty members</p>
                </div>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
