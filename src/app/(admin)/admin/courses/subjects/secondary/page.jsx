"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  Target,
  School
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function SecondarySubjects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGrade, setFilterGrade] = useState("all");
  const [filterStream, setFilterStream] = useState("all");
  const [filterType, setFilterType] = useState("all");

  // Mock data for secondary subjects
  const secondarySubjects = [
    {
      id: "sec_001",
      name: "Mathematics",
      nepaliName: "गणित",
      code: "MATH-06",
      grade: "Grade 6",
      stream: "Basic",
      type: "Core",
      mandatory: true,
      credits: 4,
      teachers: 2,
      students: 35,
      description: "Basic mathematical concepts and operations",
      status: "Active"
    },
    {
      id: "sec_002",
      name: "Physics",
      nepaliName: "भौतिक विज्ञान",
      code: "PHY-11",
      grade: "Grade 11",
      stream: "Science",
      type: "Core",
      mandatory: true,
      credits: 5,
      teachers: 3,
      students: 28,
      description: "Introduction to physics concepts",
      status: "Active"
    },
    {
      id: "sec_003",
      name: "Accountancy",
      nepaliName: "लेखाशास्त्र",
      code: "ACC-11",
      grade: "Grade 11",
      stream: "Management",
      type: "Core",
      mandatory: true,
      credits: 4,
      teachers: 2,
      students: 25,
      description: "Basic accounting principles",
      status: "Active"
    },
    {
      id: "sec_004",
      name: "English",
      nepaliName: "अंग्रेजी",
      code: "ENG-10",
      grade: "Grade 10",
      stream: "All",
      type: "Core",
      mandatory: true,
      credits: 4,
      teachers: 4,
      students: 50,
      description: "English language and literature",
      status: "Active"
    }
  ];

  const filteredSubjects = secondarySubjects.filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subject.nepaliName.includes(searchTerm);

    const matchesGrade = filterGrade === "all" || subject.grade === filterGrade;
    const matchesStream = filterStream === "all" || subject.stream === filterStream;
    const matchesType = filterType === "all" || subject.type === filterType;

    return matchesSearch && matchesGrade && matchesStream && matchesType;
  });

  const handleDelete = (subjectId) => {
    if (confirm("Are you sure you want to delete this subject? This action cannot be undone.")) {
      console.log("Deleting subject:", subjectId);
      toast.success("Subject deleted successfully!");
    }
  };

  const stats = {
    total: secondarySubjects.length,
    active: secondarySubjects.filter(s => s.status === "Active").length,
    teachers: secondarySubjects.reduce((sum, s) => sum + s.teachers, 0),
    students: secondarySubjects.reduce((sum, s) => sum + s.students, 0)
  };

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
              Secondary Level Subjects
            </h1>
            <p className="text-muted-foreground">
              Manage subjects for grades 6-12 (Basic, Secondary & Higher Secondary)
            </p>
          </div>
        </div>
        <Link href="/admin/courses/subjects/secondary/add">
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
              <div className="p-3 bg-blue-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600" />
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
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
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
                <School className="w-6 h-6 text-orange-600" />
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
            <Select value={filterGrade} onValueChange={setFilterGrade}>
              <SelectTrigger className="w-[150px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                <SelectItem value="Grade 6">Grade 6</SelectItem>
                <SelectItem value="Grade 7">Grade 7</SelectItem>
                <SelectItem value="Grade 8">Grade 8</SelectItem>
                <SelectItem value="Grade 9">Grade 9</SelectItem>
                <SelectItem value="Grade 10">Grade 10</SelectItem>
                <SelectItem value="Grade 11">Grade 11</SelectItem>
                <SelectItem value="Grade 12">Grade 12</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStream} onValueChange={setFilterStream}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Stream" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Streams</SelectItem>
                <SelectItem value="Basic">Basic</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
                <SelectItem value="Management">Management</SelectItem>
                <SelectItem value="Humanities">Humanities</SelectItem>
                <SelectItem value="All">Common</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Core">Core</SelectItem>
                <SelectItem value="Elective">Elective</SelectItem>
                <SelectItem value="Optional">Optional</SelectItem>
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
                        {subject.grade}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {subject.stream}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {subject.type}
                      </Badge>
                      {subject.mandatory && (
                        <Badge variant="outline" className="text-xs">Required</Badge>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm text-muted-foreground">
                    <span>Code: {subject.code}</span>
                    <span>Grade: {subject.grade}</span>
                    <span>Stream: {subject.stream}</span>
                    <span>Credits: {subject.credits}</span>
                    <span>Teachers: {subject.teachers}</span>
                    <span>Students: {subject.students}</span>
                  </div>

                  <p className="text-sm text-muted-foreground">{subject.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Link href={`/admin/courses/subjects/secondary/${subject.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href={`/admin/courses/subjects/secondary/${subject.id}/edit`}>
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
          <Link href="/admin/courses/subjects/secondary/add">
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