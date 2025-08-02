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
  School
} from "lucide-react";
import Link from "next/link";

export default function SubjectManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");
  const [filterType, setFilterType] = useState("all");

  const subjects = [
    // Primary Level Subjects
    { id: 1, name: "Nepali", code: "NEP", level: "Primary", type: "Language", mandatory: true, hours: 6, classes: ["1", "2", "3", "4", "5"], teachers: 3 },
    { id: 2, name: "English", code: "ENG", level: "Primary", type: "Language", mandatory: true, hours: 5, classes: ["1", "2", "3", "4", "5"], teachers: 3 },
    { id: 3, name: "Mathematics", code: "MATH", level: "Primary", type: "Science", mandatory: true, hours: 6, classes: ["1", "2", "3", "4", "5"], teachers: 4 },
    { id: 4, name: "Science", code: "SCI", level: "Primary", type: "Science", mandatory: true, hours: 4, classes: ["1", "2", "3", "4", "5"], teachers: 2 },
    { id: 5, name: "Social Studies", code: "SS", level: "Primary", type: "Social", mandatory: true, hours: 4, classes: ["1", "2", "3", "4", "5"], teachers: 2 },
    
    // Secondary Level Subjects
    { id: 6, name: "Physics", code: "PHY", level: "Secondary", type: "Science", mandatory: true, hours: 6, classes: ["11", "12"], teachers: 2, faculty: "Science" },
    { id: 7, name: "Chemistry", code: "CHEM", level: "Secondary", type: "Science", mandatory: true, hours: 6, classes: ["11", "12"], teachers: 2, faculty: "Science" },
    { id: 8, name: "Biology", code: "BIO", level: "Secondary", type: "Science", mandatory: false, hours: 6, classes: ["11", "12"], teachers: 1, faculty: "Science" },
    { id: 9, name: "Accountancy", code: "ACC", level: "Secondary", type: "Management", mandatory: true, hours: 6, classes: ["11", "12"], teachers: 2, faculty: "Management" },
    { id: 10, name: "Economics", code: "ECO", level: "Secondary", type: "Management", mandatory: true, hours: 5, classes: ["11", "12"], teachers: 2, faculty: "Management" },
    
    // Bachelor Level Subjects
    { id: 11, name: "Programming Fundamentals", code: "PF", level: "Bachelor", type: "Technology", mandatory: true, hours: 4, programs: ["BIT"], teachers: 3 },
    { id: 12, name: "Data Structures", code: "DS", level: "Bachelor", type: "Technology", mandatory: true, hours: 4, programs: ["BIT"], teachers: 2 },
    { id: 13, name: "Business Studies", code: "BS", level: "Bachelor", type: "Management", mandatory: true, hours: 3, programs: ["BBS", "BBA"], teachers: 4 },
    { id: 14, name: "Financial Accounting", code: "FA", level: "Bachelor", type: "Management", mandatory: true, hours: 4, programs: ["BBS", "BBA"], teachers: 3 },
    { id: 15, name: "Constitutional Law", code: "CL", level: "Bachelor", type: "Law", mandatory: true, hours: 4, programs: ["LLB"], teachers: 2 }
  ];

  const filteredSubjects = subjects.filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subject.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === "all" || subject.level === filterLevel;
    const matchesType = filterType === "all" || subject.type === filterType;
    
    return matchesSearch && matchesLevel && matchesType;
  });

  const subjectTypes = [...new Set(subjects.map(s => s.type))];
  const levels = [...new Set(subjects.map(s => s.level))];

  const getSubjectStats = () => {
    return {
      total: subjects.length,
      primary: subjects.filter(s => s.level === "Primary").length,
      secondary: subjects.filter(s => s.level === "Secondary").length,
      bachelor: subjects.filter(s => s.level === "Bachelor").length,
      mandatory: subjects.filter(s => s.mandatory).length
    };
  };

  const stats = getSubjectStats();

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
              Subject Management
            </h1>
            <p className="text-muted-foreground">
              Manage subjects across all education levels
            </p>
          </div>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New Subject
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
                <School className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.primary}</p>
                <p className="text-sm text-muted-foreground">Primary</p>
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
                <p className="text-2xl font-bold">{stats.secondary}</p>
                <p className="text-sm text-muted-foreground">Secondary</p>
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
                <p className="text-2xl font-bold">{stats.bachelor}</p>
                <p className="text-sm text-muted-foreground">Bachelor</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.mandatory}</p>
                <p className="text-sm text-muted-foreground">Mandatory</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search subjects by name or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterLevel} onValueChange={setFilterLevel}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {levels.map(level => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {subjectTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Subjects List */}
      <Card>
        <CardHeader>
          <CardTitle>All Subjects ({filteredSubjects.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredSubjects.map((subject) => (
              <div key={subject.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{subject.name}</h3>
                      <Badge variant="outline" className="text-xs">{subject.code}</Badge>
                      <Badge variant={subject.mandatory ? "default" : "secondary"} className="text-xs">
                        {subject.mandatory ? "Required" : "Optional"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Level: {subject.level}</span>
                      <span>Type: {subject.type}</span>
                      <span>Hours: {subject.hours}/week</span>
                      <span>Teachers: {subject.teachers}</span>
                      {subject.faculty && <span>Faculty: {subject.faculty}</span>}
                      {subject.classes && <span>Classes: {subject.classes.join(", ")}</span>}
                      {subject.programs && <span>Programs: {subject.programs.join(", ")}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/admin/courses/subjects/${subject.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href={`/admin/courses/subjects/${subject.id}/edit`}>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredSubjects.length === 0 && (
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No subjects found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
              <Plus className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">Add Subject</p>
                <p className="text-sm text-muted-foreground">Create a new subject</p>
              </div>
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
              <Users className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">Assign Teachers</p>
                <p className="text-sm text-muted-foreground">Manage teacher assignments</p>
              </div>
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
              <Clock className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">Schedule Classes</p>
                <p className="text-sm text-muted-foreground">Create class timetables</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
