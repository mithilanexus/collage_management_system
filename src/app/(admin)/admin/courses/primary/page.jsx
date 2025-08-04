"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Search,
  Plus,
  Edit,
  Trash2,
  BookOpen,
  Users,
  Clock,
  School,
  Calendar,
  Eye,
  Filter,
  SortAsc,
  Grid3X3,
  List,
  Building,
  GraduationCap,
  Baby,
  Heart,
  Star
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

export default function PrimaryLevel() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("grade");
  const [filterBy, setFilterBy] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  const primaryClasses = [
    {
      id: "pg",
      grade: "PG",
      nepaliName: "पी.जी",
      fullName: "Pre-Grade",
      ageGroup: "3-4 years",
      students: 60,
      sections: 2,
      subjects: ["English", "Nepali", "Mathematics", "Drawing & Craft", "Play Time", "Story Time"],
      weeklyHours: 20,
      classTeacher: "Ms. Sarah Johnson",
      description: "Foundation learning with play-based activities",
      color: "bg-pink-100",
      textColor: "text-pink-800",
      icon: Baby
    },
    {
      id: "nursery",
      grade: "Nursery",
      nepaliName: "नर्सरी",
      fullName: "Nursery",
      ageGroup: "4-5 years",
      students: 70,
      sections: 2,
      subjects: ["English", "Nepali", "Mathematics", "Drawing & Craft", "General Knowledge"],
      weeklyHours: 22,
      classTeacher: "Ms. Emily Davis",
      description: "Early childhood development and basic skills",
      color: "bg-pink-100",
      textColor: "text-pink-800",
      icon: Heart
    },
    {
      id: "lkg",
      grade: "LKG",
      nepaliName: "एल.के.जी",
      fullName: "Lower Kindergarten",
      ageGroup: "5-6 years",
      students: 80,
      sections: 2,
      subjects: ["English", "Nepali", "Mathematics", "Drawing & Craft", "General Knowledge"],
      weeklyHours: 24,
      classTeacher: "Ms. Lisa Wilson",
      description: "Structured learning with creative activities",
      color: "bg-yellow-100",
      textColor: "text-yellow-800",
      icon: Star
    },
    {
      id: "ukg",
      grade: "UKG",
      nepaliName: "यू.के.जी",
      fullName: "Upper Kindergarten",
      ageGroup: "6-7 years",
      students: 85,
      sections: 2,
      subjects: ["English", "Nepali", "Mathematics", "Drawing & Craft", "General Knowledge"],
      weeklyHours: 26,
      classTeacher: "Ms. Maria Garcia",
      description: "Pre-primary preparation for formal education",
      color: "bg-yellow-100",
      textColor: "text-yellow-800",
      icon: Star
    },
    {
      id: "class1",
      grade: "Class 1",
      nepaliName: "कक्षा १",
      fullName: "Class One",
      ageGroup: "7-8 years",
      students: 90,
      sections: 3,
      subjects: ["English", "Nepali", "Mathematics", "Science", "Social Studies", "Health & PE"],
      weeklyHours: 30,
      classTeacher: "Mr. David Brown",
      description: "Beginning formal education with structured learning",
      color: "bg-blue-100",
      textColor: "text-blue-800",
      icon: BookOpen
    },
    {
      id: "class2",
      grade: "Class 2",
      nepaliName: "कक्षा २",
      fullName: "Class Two",
      ageGroup: "8-9 years",
      students: 95,
      sections: 3,
      subjects: ["English", "Nepali", "Mathematics", "Science", "Social Studies", "Health & PE"],
      weeklyHours: 30,
      classTeacher: "Ms. Jennifer Lee",
      description: "Building on foundational skills with expanded curriculum",
      color: "bg-blue-100",
      textColor: "text-blue-800",
      icon: BookOpen
    },
    {
      id: "class3",
      grade: "Class 3",
      nepaliName: "कक्षा ३",
      fullName: "Class Three",
      ageGroup: "9-10 years",
      students: 88,
      sections: 3,
      subjects: ["English", "Nepali", "Mathematics", "Science", "Social Studies", "Health & PE", "Computer"],
      weeklyHours: 32,
      classTeacher: "Mr. Robert Wilson",
      description: "Intermediate primary education with technology introduction",
      color: "bg-green-100",
      textColor: "text-green-800",
      icon: BookOpen
    },
    {
      id: "class4",
      grade: "Class 4",
      nepaliName: "कक्षा ४",
      fullName: "Class Four",
      ageGroup: "10-11 years",
      students: 92,
      sections: 3,
      subjects: ["English", "Nepali", "Mathematics", "Science", "Social Studies", "Health & PE", "Computer"],
      weeklyHours: 32,
      classTeacher: "Ms. Amanda Clark",
      description: "Advanced primary skills with critical thinking development",
      color: "bg-green-100",
      textColor: "text-green-800",
      icon: BookOpen
    },
    {
      id: "class5",
      grade: "Class 5",
      nepaliName: "कक्षा ५",
      fullName: "Class Five",
      ageGroup: "11-12 years",
      students: 85,
      sections: 3,
      subjects: ["English", "Nepali", "Mathematics", "Science", "Social Studies", "Health & PE", "Computer", "Moral Education"],
      weeklyHours: 35,
      classTeacher: "Mr. Michael Davis",
      description: "Upper primary education preparing for secondary level",
      color: "bg-purple-100",
      textColor: "text-purple-800",
      icon: GraduationCap
    },
    {
      id: "class6",
      grade: "Class 6",
      nepaliName: "कक्षा ६",
      fullName: "Class Six",
      ageGroup: "12-13 years",
      students: 78,
      sections: 2,
      subjects: ["English", "Nepali", "Mathematics", "Science", "Social Studies", "Health & PE", "Computer", "Moral Education", "Optional Math"],
      weeklyHours: 36,
      classTeacher: "Ms. Rachel Thompson",
      description: "Transition to advanced concepts and analytical thinking",
      color: "bg-indigo-100",
      textColor: "text-indigo-800",
      icon: GraduationCap
    },
    {
      id: "class7",
      grade: "Class 7",
      nepaliName: "कक्षा ७",
      fullName: "Class Seven",
      ageGroup: "13-14 years",
      students: 82,
      sections: 2,
      subjects: ["English", "Nepali", "Mathematics", "Science", "Social Studies", "Health & PE", "Computer", "Moral Education", "Optional Math"],
      weeklyHours: 36,
      classTeacher: "Mr. James Anderson",
      description: "Pre-secondary preparation with specialized subjects",
      color: "bg-indigo-100",
      textColor: "text-indigo-800",
      icon: GraduationCap
    },
    {
      id: "class8",
      grade: "Class 8",
      nepaliName: "कक्षा ८",
      fullName: "Class Eight",
      ageGroup: "14-15 years",
      students: 75,
      sections: 2,
      subjects: ["English", "Nepali", "Mathematics", "Science", "Social Studies", "Health & PE", "Computer", "Moral Education", "Optional Math", "Accounts"],
      weeklyHours: 38,
      classTeacher: "Ms. Patricia Martinez",
      description: "Final primary year preparing for secondary education",
      color: "bg-red-100",
      textColor: "text-red-800",
      icon: GraduationCap
    }
  ];

  const coreSubjects = [
    { name: "Nepali", code: "NEP", type: "Language", mandatory: true },
    { name: "English", code: "ENG", type: "Language", mandatory: true },
    { name: "Mathematics", code: "MATH", type: "Science", mandatory: true },
    { name: "Science", code: "SCI", type: "Science", mandatory: true },
    { name: "Social Studies", code: "SS", type: "Social", mandatory: true },
    { name: "Health & Physical Education", code: "HPE", type: "Physical", mandatory: true },
    { name: "Computer", code: "COMP", type: "Technology", mandatory: false },
    { name: "Moral Education", code: "ME", type: "Ethics", mandatory: false }
  ];

  const filteredAndSortedClasses = primaryClasses
    .filter(cls => {
      const matchesSearch = cls.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           cls.nepaliName.includes(searchTerm) ||
                           cls.fullName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter = filterBy === "all" ||
                           (filterBy === "kindergarten" && ["PG", "Nursery", "LKG", "UKG"].includes(cls.grade)) ||
                           (filterBy === "primary" && cls.grade.startsWith("Class"));

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "grade":
          return a.grade.localeCompare(b.grade);
        case "students":
          return b.students - a.students;
        case "sections":
          return b.sections - a.sections;
        default:
          return 0;
      }
    });

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
              <School className="w-8 h-8 text-green-600" />
              Primary Level Management
            </h1>
            <p className="text-muted-foreground">
              प्राथमिक तह (PG - Class 8) • Foundation education with core skills development
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/courses/primary/add">
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Class
            </Button>
          </Link>
          <Link href="/admin/courses/primary/routine">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              View Routines
            </Button>
          </Link>
          <Link href="/admin/courses/primary/schedule">
            <Button variant="outline" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Schedule Overview
            </Button>
          </Link>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <School className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{primaryClasses.length}</p>
                <p className="text-sm text-muted-foreground">Total Classes</p>
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
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">Core Subjects</p>
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
                <p className="text-2xl font-bold">{primaryClasses.reduce((total, cls) => total + cls.students, 0)}</p>
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
                <p className="text-2xl font-bold">{Math.round(primaryClasses.reduce((total, cls) => total + cls.weeklyHours, 0) / primaryClasses.length)}</p>
                <p className="text-sm text-muted-foreground">Avg Weekly Hours</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by grade, name, or full name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="kindergarten">Kindergarten</SelectItem>
                  <SelectItem value="primary">Primary Classes</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grade">Grade</SelectItem>
                  <SelectItem value="students">Students</SelectItem>
                  <SelectItem value="sections">Sections</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {(searchTerm || filterBy !== "all") && (
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <span>Showing {filteredAndSortedClasses.length} of {primaryClasses.length} classes</span>
              {searchTerm && (
                <Badge variant="secondary" className="text-xs">
                  Search: "{searchTerm}"
                </Badge>
              )}
              {filterBy !== "all" && (
                <Badge variant="secondary" className="text-xs">
                  Filter: {filterBy}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Classes Display */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAndSortedClasses.map((cls) => {
            const IconComponent = cls.icon;
            return (
              <Card key={cls.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 ${cls.color} rounded-lg`}>
                        <IconComponent className={`w-6 h-6 ${cls.textColor}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{cls.grade}</CardTitle>
                        <p className="text-sm text-muted-foreground">{cls.nepaliName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/courses/primary/${cls.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-lg font-bold text-foreground">{cls.students}</p>
                      <p className="text-xs text-muted-foreground">Students</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-lg font-bold text-foreground">{cls.sections}</p>
                      <p className="text-xs text-muted-foreground">Sections</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-lg font-bold text-foreground">{cls.weeklyHours}</p>
                      <p className="text-xs text-muted-foreground">Hours/Week</p>
                    </div>
                  </div>

                  {/* Subjects */}
                  <div>
                    <p className="text-sm font-medium mb-2">Subjects ({cls.subjects.length})</p>
                    <div className="flex flex-wrap gap-1">
                      {cls.subjects.slice(0, 4).map((subject, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                      {cls.subjects.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{cls.subjects.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/admin/courses/primary/${cls.id}`} className="flex-1">
                      <Button className="w-full">
                        <Eye className="w-4 h-4 mr-2" />
                        Manage Class
                      </Button>
                    </Link>
                    <Link href={`/admin/courses/primary/${cls.id}/routine`}>
                      <Button variant="outline" size="sm">
                        <Calendar className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        // List View
        <Card>
          <CardHeader>
            <CardTitle>Classes List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredAndSortedClasses.map((cls) => {
                const IconComponent = cls.icon;
                return (
                  <div key={cls.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 ${cls.color} rounded-lg`}>
                        <IconComponent className={`w-6 h-6 ${cls.textColor}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold">{cls.grade}</h3>
                        <p className="text-sm text-muted-foreground">{cls.nepaliName} • {cls.fullName}</p>
                        <p className="text-xs text-muted-foreground">{cls.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-lg font-bold">{cls.students}</p>
                        <p className="text-xs text-muted-foreground">Students</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold">{cls.sections}</p>
                        <p className="text-xs text-muted-foreground">Sections</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold">{cls.weeklyHours}</p>
                        <p className="text-xs text-muted-foreground">Hours/Week</p>
                      </div>

                      <div className="flex gap-2">
                        <Link href={`/admin/courses/primary/${cls.id}`}>
                          <Button size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Manage
                          </Button>
                        </Link>
                        <Link href={`/admin/courses/primary/${cls.id}/routine`}>
                          <Button variant="outline" size="sm">
                            <Calendar className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {filteredAndSortedClasses.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <School className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No classes found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterBy !== "all"
                ? "Try adjusting your search or filter criteria"
                : "No classes have been added yet"}
            </p>
            {!searchTerm && filterBy === "all" && (
              <Link href="/admin/courses/primary/add">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Class
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      )}

      {/* Core Subjects Section */}
      <Card>
        <CardHeader>
          <CardTitle>Core Subjects for Primary Level</CardTitle>
          <p className="text-sm text-muted-foreground">
            Standard subjects across all primary grades
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {coreSubjects.map((subject, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{subject.name}</h4>
                  {subject.mandatory && (
                    <Badge variant="default" className="text-xs">Required</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-1">Code: {subject.code}</p>
                <p className="text-sm text-muted-foreground">Type: {subject.type}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <p className="text-sm text-muted-foreground">
            Common administrative tasks for primary level management
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/admin/courses/primary/add">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 w-full">
                <Plus className="w-8 h-8 text-blue-600" />
                <div className="text-center">
                  <p className="font-medium">Add New Class</p>
                  <p className="text-xs text-muted-foreground">Create a new grade level</p>
                </div>
              </Button>
            </Link>

            <Link href="/admin/courses/primary/schedule">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 w-full">
                <Calendar className="w-8 h-8 text-purple-600" />
                <div className="text-center">
                  <p className="font-medium">Schedule Overview</p>
                  <p className="text-xs text-muted-foreground">Complete schedule view</p>
                </div>
              </Button>
            </Link>

            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 w-full">
              <Users className="w-8 h-8 text-orange-600" />
              <div className="text-center">
                <p className="font-medium">Student Reports</p>
                <p className="text-xs text-muted-foreground">Generate reports</p>
              </div>
            </Button>

            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 w-full">
              <BookOpen className="w-8 h-8 text-green-600" />
              <div className="text-center">
                <p className="font-medium">Subject Management</p>
                <p className="text-xs text-muted-foreground">Manage curriculum</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
