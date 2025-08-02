"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  Eye,
  FlaskConical,
  Briefcase,
  Globe,
  GraduationCap
} from "lucide-react";
import Link from "next/link";

export default function HigherSecondaryManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  const higherSecondaryFaculties = [
    {
      id: "science",
      name: "Science Faculty",
      nepaliName: "विज्ञान संकाय",
      icon: FlaskConical,
      color: "bg-blue-500",
      students: 150,
      grades: ["Grade 11", "Grade 12"],
      compulsorySubjects: ["Physics", "Chemistry", "Mathematics", "English", "Nepali"],
      optionalSubjects: ["Biology", "Computer Science", "Statistics"],
      description: "For students interested in medical, engineering, and scientific fields",
      careerPaths: ["Doctor", "Engineer", "Scientist", "Researcher"],
      weeklyHours: 45
    },
    {
      id: "management",
      name: "Management Faculty", 
      nepaliName: "व्यवस्थापन संकाय",
      icon: Briefcase,
      color: "bg-green-500",
      students: 120,
      grades: ["Grade 11", "Grade 12"],
      compulsorySubjects: ["Accountancy", "Economics", "Business Studies", "English", "Nepali"],
      optionalSubjects: ["Business Mathematics", "Computer Science", "Hotel Management"],
      description: "For students interested in business, commerce, and management",
      careerPaths: ["Business Manager", "Accountant", "Entrepreneur", "Banker"],
      weeklyHours: 42
    },
    {
      id: "humanities",
      name: "Humanities Faculty",
      nepaliName: "मानविकी संकाय", 
      icon: Globe,
      color: "bg-purple-500",
      students: 80,
      grades: ["Grade 11", "Grade 12"],
      compulsorySubjects: ["Sociology", "Psychology", "History", "English", "Nepali"],
      optionalSubjects: ["Geography", "Political Science", "Philosophy", "Anthropology"],
      description: "For students interested in social sciences and liberal arts",
      careerPaths: ["Social Worker", "Journalist", "Teacher", "Civil Servant"],
      weeklyHours: 40
    },
    {
      id: "education",
      name: "Education Faculty",
      nepaliName: "शिक्षा संकाय",
      icon: GraduationCap,
      color: "bg-orange-500", 
      students: 30,
      grades: ["Grade 11", "Grade 12"],
      compulsorySubjects: ["Education", "Psychology", "Teaching Methods", "English", "Nepali"],
      optionalSubjects: ["Child Development", "Educational Technology", "Guidance & Counseling"],
      description: "For students interested in teaching and educational careers",
      careerPaths: ["Teacher", "Principal", "Educational Consultant", "Trainer"],
      weeklyHours: 38
    }
  ];

  const filteredFaculties = higherSecondaryFaculties.filter(faculty =>
    faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faculty.nepaliName.includes(searchTerm)
  );

  const totalStats = {
    students: higherSecondaryFaculties.reduce((sum, faculty) => sum + faculty.students, 0),
    faculties: higherSecondaryFaculties.length,
    subjects: [...new Set(higherSecondaryFaculties.flatMap(f => [...f.compulsorySubjects, ...f.optionalSubjects]))].length,
    avgHours: Math.round(higherSecondaryFaculties.reduce((sum, f) => sum + f.weeklyHours, 0) / higherSecondaryFaculties.length)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/courses/secondary">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Secondary Level
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
              <Building className="w-8 h-8 text-purple-600" />
              Higher Secondary Management
            </h1>
            <p className="text-muted-foreground">
              Manage Grades 11-12 (Ages 16-18) - Faculty-Based Specialization
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

      {/* Faculty System Alert */}
      <Card className="border-purple-200 bg-purple-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Building className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-purple-800">Faculty-Based Education System</h3>
              <p className="text-sm text-purple-700">
                Higher Secondary education is organized into specialized faculties to prepare students for specific career paths and higher education.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalStats.students}</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
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
                <p className="text-2xl font-bold">{totalStats.faculties}</p>
                <p className="text-sm text-muted-foreground">Active Faculties</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalStats.subjects}</p>
                <p className="text-sm text-muted-foreground">Total Subjects</p>
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
                <p className="text-2xl font-bold">{totalStats.avgHours}</p>
                <p className="text-sm text-muted-foreground">Avg Hours/Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
        {filteredFaculties.map((faculty) => {
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
                    <Link href={`/admin/courses/secondary/faculty/${faculty.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
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
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className="text-lg font-bold text-foreground">{faculty.students}</p>
                    <p className="text-xs text-muted-foreground">Students</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className="text-lg font-bold text-foreground">{faculty.compulsorySubjects.length}</p>
                    <p className="text-xs text-muted-foreground">Core</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className="text-lg font-bold text-foreground">{faculty.optionalSubjects.length}</p>
                    <p className="text-xs text-muted-foreground">Optional</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Grades:</span>
                    <span>{faculty.grades.join(", ")}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Weekly Hours:</span>
                    <span>{faculty.weeklyHours}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Core Subjects:</p>
                  <div className="flex flex-wrap gap-1">
                    {faculty.compulsorySubjects.slice(0, 3).map((subject, idx) => (
                      <Badge key={idx} variant="default" className="text-xs">{subject}</Badge>
                    ))}
                    {faculty.compulsorySubjects.length > 3 && (
                      <Badge variant="outline" className="text-xs">+{faculty.compulsorySubjects.length - 3} more</Badge>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Career Paths:</p>
                  <div className="flex flex-wrap gap-1">
                    {faculty.careerPaths.slice(0, 2).map((career, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">{career}</Badge>
                    ))}
                    {faculty.careerPaths.length > 2 && (
                      <Badge variant="outline" className="text-xs">+{faculty.careerPaths.length - 2} more</Badge>
                    )}
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

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Faculty Management Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
              <Plus className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">Add Subject</p>
                <p className="text-sm text-muted-foreground">Add subjects to faculties</p>
              </div>
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
              <Users className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">Assign Teachers</p>
                <p className="text-sm text-muted-foreground">Faculty teacher management</p>
              </div>
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
              <BookOpen className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">Curriculum</p>
                <p className="text-sm text-muted-foreground">Manage faculty curriculum</p>
              </div>
            </Button>

            <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
              <Clock className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">Schedules</p>
                <p className="text-sm text-muted-foreground">Create faculty timetables</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
