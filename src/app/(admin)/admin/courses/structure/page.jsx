"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  School,
  BookOpen,
  GraduationCap,
  Building,
  Users,
  Clock,
  Award,
  TreePine,
  Network
} from "lucide-react";
import Link from "next/link";

export default function CourseStructureOverview() {
  const [selectedLevel, setSelectedLevel] = useState("primary");

  const educationStructure = {
    primary: {
      title: "Primary Education",
      subtitle: "Foundation Level (Ages 5-10)",
      grades: [
        { grade: "Grade 1", nepali: "कक्षा १", age: "5-6", subjects: 6, students: 45 },
        { grade: "Grade 2", nepali: "कक्षा २", age: "6-7", subjects: 6, students: 48 },
        { grade: "Grade 3", nepali: "कक्षा ३", age: "7-8", subjects: 7, students: 52 },
        { grade: "Grade 4", nepali: "कक्षा ४", age: "8-9", subjects: 7, students: 49 },
        { grade: "Grade 5", nepali: "कक्षा ५", age: "9-10", subjects: 8, students: 46 }
      ],
      coreSubjects: ["Nepali", "English", "Mathematics", "Science", "Social Studies", "Health & Physical Education"],
      optionalSubjects: ["Computer", "Moral Education", "Art & Craft"],
      totalStudents: 240,
      totalTeachers: 19
    },
    secondary: {
      title: "Secondary Education",
      subtitle: "Specialized Learning (Ages 11-18)",
      levels: [
        {
          name: "Lower Secondary",
          grades: ["Grade 6", "Grade 7", "Grade 8"],
          age: "11-14",
          students: 180,
          subjects: 8,
          description: "Foundation subjects with introduction to specialized areas"
        },
        {
          name: "Secondary",
          grades: ["Grade 9", "Grade 10"],
          age: "14-16",
          students: 120,
          subjects: 8,
          description: "SEE preparation with comprehensive curriculum"
        },
        {
          name: "Higher Secondary",
          grades: ["Grade 11", "Grade 12"],
          age: "16-18",
          students: 380,
          faculties: 4,
          description: "Faculty-based specialized education"
        }
      ],
      faculties: [
        { name: "Science Faculty", nepali: "विज्ञान संकाय", students: 150, subjects: ["Physics", "Chemistry", "Biology", "Mathematics"] },
        { name: "Management Faculty", nepali: "व्यवस्थापन संकाय", students: 120, subjects: ["Accountancy", "Economics", "Business Studies"] },
        { name: "Humanities Faculty", nepali: "मानविकी संकाय", students: 80, subjects: ["Sociology", "Psychology", "History", "Geography"] },
        { name: "Education Faculty", nepali: "शिक्षा संकाय", students: 30, subjects: ["Education", "Psychology", "Teaching Methods"] }
      ],
      totalStudents: 680,
      totalTeachers: 45
    },
    bachelor: {
      title: "Bachelor Education",
      subtitle: "Professional Degree Programs (Ages 18+)",
      programs: [
        { name: "BIT", full: "Bachelor of Information Technology", nepali: "सूचना प्रविधि स्नातक", duration: "4 Years", students: 45, semesters: 8 },
        { name: "BBS", full: "Bachelor of Business Studies", nepali: "व्यापार अध्ययन स्नातक", duration: "4 Years", students: 65, semesters: 8 },
        { name: "BBA", full: "Bachelor of Business Administration", nepali: "व्यापार प्रशासन स्नातक", duration: "4 Years", students: 55, semesters: 8 },
        { name: "BA", full: "Bachelor of Arts", nepali: "कला स्नातक", duration: "3 Years", students: 40, semesters: 6 },
        { name: "BSc", full: "Bachelor of Science", nepali: "विज्ञान स्नातक", duration: "3 Years", students: 35, semesters: 6 },
        { name: "LLB", full: "Bachelor of Laws", nepali: "कानून स्नातक", duration: "3 Years", students: 25, semesters: 6 }
      ],
      totalStudents: 265,
      totalTeachers: 32
    }
  };

  const getOverallStats = () => {
    return {
      totalStudents: educationStructure.primary.totalStudents + educationStructure.secondary.totalStudents + educationStructure.bachelor.totalStudents,
      totalTeachers: educationStructure.primary.totalTeachers + educationStructure.secondary.totalTeachers + educationStructure.bachelor.totalTeachers,
      totalLevels: 3,
      totalPrograms: educationStructure.primary.grades.length + educationStructure.secondary.levels.length + educationStructure.bachelor.programs.length
    };
  };

  const overallStats = getOverallStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/courses">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
            <Network className="w-8 h-8 text-purple-600" />
            Course Structure Overview
          </h1>
          <p className="text-muted-foreground">
            Complete academic structure and hierarchy visualization
          </p>
        </div>
      </div>

      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{overallStats.totalStudents}</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
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
                <p className="text-2xl font-bold">{overallStats.totalTeachers}</p>
                <p className="text-sm text-muted-foreground">Total Teachers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <School className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{overallStats.totalLevels}</p>
                <p className="text-sm text-muted-foreground">Education Levels</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{overallStats.totalPrograms}</p>
                <p className="text-sm text-muted-foreground">Programs/Classes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Education Structure Visualization */}
      <Tabs value={selectedLevel} onValueChange={setSelectedLevel} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="primary">Primary Level</TabsTrigger>
          <TabsTrigger value="secondary">Secondary Level</TabsTrigger>
          <TabsTrigger value="bachelor">Bachelor Level</TabsTrigger>
        </TabsList>

        <TabsContent value="primary" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <School className="w-6 h-6 text-green-600" />
                {educationStructure.primary.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{educationStructure.primary.subtitle}</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Grade Structure */}
                <div>
                  <h3 className="font-semibold mb-4">Grade Structure</h3>
                  <div className="space-y-3">
                    {educationStructure.primary.grades.map((grade, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{grade.grade}</h4>
                          <p className="text-sm text-muted-foreground">{grade.nepali} • Age: {grade.age}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{grade.students} students</p>
                          <p className="text-sm text-muted-foreground">{grade.subjects} subjects</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subject Categories */}
                <div>
                  <h3 className="font-semibold mb-4">Subject Categories</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Core Subjects</h4>
                      <div className="flex flex-wrap gap-2">
                        {educationStructure.primary.coreSubjects.map((subject, index) => (
                          <Badge key={index} variant="default" className="text-xs">{subject}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Optional Subjects</h4>
                      <div className="flex flex-wrap gap-2">
                        {educationStructure.primary.optionalSubjects.map((subject, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">{subject}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="secondary" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-blue-600" />
                {educationStructure.secondary.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{educationStructure.secondary.subtitle}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Secondary Levels */}
                <div>
                  <h3 className="font-semibold mb-4">Secondary Structure</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {educationStructure.secondary.levels.map((level, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">{level.name}</h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <p>Grades: {level.grades.join(", ")}</p>
                          <p>Age: {level.age}</p>
                          <p>Students: {level.students}</p>
                          {level.subjects && <p>Subjects: {level.subjects}</p>}
                          {level.faculties && <p>Faculties: {level.faculties}</p>}
                        </div>
                        <p className="text-sm mt-2">{level.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Faculty Structure */}
                <div>
                  <h3 className="font-semibold mb-4">Higher Secondary Faculties</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {educationStructure.secondary.faculties.map((faculty, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{faculty.name}</h4>
                          <Badge variant="outline">{faculty.students} students</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{faculty.nepali}</p>
                        <div className="flex flex-wrap gap-1">
                          {faculty.subjects.map((subject, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">{subject}</Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bachelor" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-purple-600" />
                {educationStructure.bachelor.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{educationStructure.bachelor.subtitle}</p>
            </CardHeader>
            <CardContent>
              <div>
                <h3 className="font-semibold mb-4">Available Programs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {educationStructure.bachelor.programs.map((program, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-lg">{program.name}</h4>
                        <Badge variant="outline">{program.duration}</Badge>
                      </div>
                      <h5 className="font-medium text-sm mb-1">{program.full}</h5>
                      <p className="text-sm text-muted-foreground mb-3">{program.nepali}</p>
                      <div className="flex justify-between text-sm">
                        <span>Students: {program.students}</span>
                        <span>Semesters: {program.semesters}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Academic Flow Diagram */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Progression Flow</CardTitle>
          <p className="text-sm text-muted-foreground">
            Student progression pathway through the education system
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 p-6">
            {/* Primary */}
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <School className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="font-semibold">Primary</h3>
              <p className="text-sm text-muted-foreground">Grades 1-5</p>
              <p className="text-sm text-muted-foreground">Ages 5-10</p>
            </div>

            <div className="hidden md:block">
              <div className="w-8 h-0.5 bg-muted"></div>
            </div>

            {/* Secondary */}
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <BookOpen className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="font-semibold">Secondary</h3>
              <p className="text-sm text-muted-foreground">Grades 6-12</p>
              <p className="text-sm text-muted-foreground">Ages 11-18</p>
            </div>

            <div className="hidden md:block">
              <div className="w-8 h-0.5 bg-muted"></div>
            </div>

            {/* Bachelor */}
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                <GraduationCap className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="font-semibold">Bachelor</h3>
              <p className="text-sm text-muted-foreground">3-4 Years</p>
              <p className="text-sm text-muted-foreground">Ages 18+</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
