"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ArrowLeft,
  Search,
  Plus,
  Edit,
  Trash2,
  BookOpen,
  Filter,
  Eye,
  Users,
  Clock,
  School,
  Target,
  GraduationCap,
  Building
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function BachelorSubjects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterFaculty, setFilterFaculty] = useState("all");
  const [filterSemester, setFilterSemester] = useState("all");
  const [filterType, setFilterType] = useState("all");

  // Mock data for bachelor subjects
  const bachelorSubjects = [
    // Computer Science Faculty
    {
      id: "bach_001",
      name: "Programming Fundamentals",
      nepaliName: "प्रोग्रामिङ आधारभूत",
      code: "CSC-101",
      faculty: "Computer Science",
      program: "BSc Computer Science",
      semester: "1st",
      year: "1st",
      type: "Core",
      mandatory: true,
      credits: 4,
      teachers: 3,
      students: 45,
      description: "Introduction to programming concepts",
      status: "Active"
    },
    {
      id: "bach_002",
      name: "Data Structures",
      nepaliName: "डाटा संरचना",
      code: "CSC-201",
      faculty: "Computer Science",
      program: "BSc Computer Science",
      semester: "3rd",
      year: "2nd",
      type: "Core",
      mandatory: true,
      credits: 4,
      teachers: 2,
      students: 38,
      description: "Linear and non-linear data structures",
      status: "Active"
    },
    {
      id: "bach_003",
      name: "Database Management",
      nepaliName: "डाटाबेस व्यवस्थापन",
      code: "CSC-301",
      faculty: "Computer Science",
      program: "BSc Computer Science",
      semester: "5th",
      year: "3rd",
      type: "Core",
      mandatory: true,
      credits: 4,
      teachers: 2,
      students: 32,
      description: "Database design and implementation",
      status: "Active"
    },
    // Management Faculty
    {
      id: "bach_004",
      name: "Principles of Management",
      nepaliName: "व्यवस्थापनका सिद्धान्तहरू",
      code: "MGT-101",
      faculty: "Management",
      program: "BBA",
      semester: "1st",
      year: "1st",
      type: "Core",
      mandatory: true,
      credits: 3,
      teachers: 4,
      students: 65,
      description: "Basic management concepts",
      status: "Active"
    },
    {
      id: "bach_005",
      name: "Financial Accounting",
      nepaliName: "वित्तीय लेखांकन",
      code: "ACC-101",
      faculty: "Management",
      program: "BBA",
      semester: "1st",
      year: "1st",
      type: "Core",
      mandatory: true,
      credits: 4,
      teachers: 3,
      students: 65,
      description: "Fundamentals of accounting",
      status: "Active"
    },
    {
      id: "bach_006",
      name: "Marketing Management",
      nepaliName: "बजार व्यवस्थापन",
      code: "MKT-201",
      faculty: "Management",
      program: "BBA",
      semester: "3rd",
      year: "2nd",
      type: "Major",
      mandatory: false,
      credits: 3,
      teachers: 2,
      students: 28,
      description: "Marketing strategies and concepts",
      status: "Active"
    },
    // Humanities Faculty
    {
      id: "bach_007",
      name: "English Literature",
      nepaliName: "अंग्रेजी साहित्य",
      code: "ENG-101",
      faculty: "Humanities",
      program: "BA English",
      semester: "1st",
      year: "1st",
      type: "Core",
      mandatory: true,
      credits: 4,
      teachers: 3,
      students: 35,
      description: "Introduction to English literature",
      status: "Active"
    },
    {
      id: "bach_008",
      name: "Nepali Literature",
      nepaliName: "नेपाली साहित्य",
      code: "NEP-101",
      faculty: "Humanities",
      program: "BA Nepali",
      semester: "1st",
      year: "1st",
      type: "Core",
      mandatory: true,
      credits: 4,
      teachers: 4,
      students: 28,
      description: "Classical and modern Nepali literature",
      status: "Active"
    }
  ];

  const filteredSubjects = bachelorSubjects.filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subject.nepaliName.includes(searchTerm);

    const matchesFaculty = filterFaculty === "all" || subject.faculty === filterFaculty;
    const matchesSemester = filterSemester === "all" || subject.semester === filterSemester;
    const matchesType = filterType === "all" || subject.type === filterType;

    return matchesSearch && matchesFaculty && matchesSemester && matchesType;
  });

  const handleDelete = (subjectId) => {
    if (confirm("Are you sure you want to delete this subject? This action cannot be undone.")) {
      console.log("Deleting subject:", subjectId);
      toast.success("Subject deleted successfully!");
    }
  };

  // Calculate stats
  const stats = {
    total: bachelorSubjects.length,
    active: bachelorSubjects.filter(s => s.status === "Active").length,
    teachers: bachelorSubjects.reduce((sum, s) => sum + s.teachers, 0),
    students: bachelorSubjects.reduce((sum, s) => sum + s.students, 0)
  };

  const faculties = [...new Set(bachelorSubjects.map(s => s.faculty))];

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
              <GraduationCap className="w-8 h-8 text-purple-600" />
              Bachelor Level Subjects
            </h1>
            <p className="text-muted-foreground">
              Manage university level subjects across all faculties
            </p>
          </div>
        </div>
        <Link href="/admin/courses/subjects/bachelor/add">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Subject
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Subjects</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.active}</p>
                <p className="text-sm text-muted-foreground">Active Subjects</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.teachers}</p>
                <p className="text-sm text-muted-foreground">Total Teachers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Building className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.students}</p>
                <p className="text-sm text-muted-foreground">Enrolled Students</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search subjects by name, code, or nepali name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterFaculty} onValueChange={setFilterFaculty}>
              <SelectTrigger className="w-[200px]">
                <Building className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by Faculty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Faculties</SelectItem>
                {faculties.map(faculty => (
                  <SelectItem key={faculty} value={faculty}>{faculty}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterSemester} onValueChange={setFilterSemester}>
              <SelectTrigger className="w-[150px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Semesters</SelectItem>
                <SelectItem value="1st">1st Semester</SelectItem>
                <SelectItem value="2nd">2nd Semester</SelectItem>
                <SelectItem value="3rd">3rd Semester</SelectItem>
                <SelectItem value="4th">4th Semester</SelectItem>
                <SelectItem value="5th">5th Semester</SelectItem>
                <SelectItem value="6th">6th Semester</SelectItem>
                <SelectItem value="7th">7th Semester</SelectItem>
                <SelectItem value="8th">8th Semester</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Core">Core</SelectItem>
                <SelectItem value="Major">Major</SelectItem>
                <SelectItem value="Minor">Minor</SelectItem>
                <SelectItem value="Elective">Elective</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Subjects List */}
      <div className="space-y-4">
        {filteredSubjects.map((subject) => (
          <Card key={subject.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-semibold text-lg">{subject.name}</h3>
                      <p className="text-muted-foreground text-sm">{subject.nepaliName}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={subject.status === "Active" ? "default" : "secondary"}>
                        {subject.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {subject.faculty}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {subject.type}
                      </Badge>
                      {subject.mandatory && (
                        <Badge variant="outline" className="text-xs">Required</Badge>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-7 gap-4 text-sm text-muted-foreground">
                    <span>Code: {subject.code}</span>
                    <span>Program: {subject.program}</span>
                    <span>Semester: {subject.semester}</span>
                    <span>Year: {subject.year}</span>
                    <span>Credits: {subject.credits}</span>
                    <span>Teachers: {subject.teachers}</span>
                    <span>Students: {subject.students}</span>
                  </div>

                  <p className="text-sm text-muted-foreground">{subject.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Link href={`/admin/courses/subjects/bachelor/${subject.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href={`/admin/courses/subjects/bachelor/${subject.id}/edit`}>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(subject.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSubjects.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No subjects found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
          <Link href="/admin/courses/subjects/bachelor/add">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add First Subject
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}