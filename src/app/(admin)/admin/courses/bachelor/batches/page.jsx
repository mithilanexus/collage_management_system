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
  Users,
  Calendar,
  Clock,
  Building,
  Eye,
  GraduationCap,
  BookOpen,
  Award,
  TrendingUp
} from "lucide-react";
import Link from "next/link";

export default function BachelorBatchesManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProgram, setFilterProgram] = useState("all");
  const [filterYear, setFilterYear] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const batches = [
    {
      id: "bba-2021",
      batchName: "BBA Batch 2021",
      program: "BBA",
      programFull: "Bachelor of Business Administration",
      year: "2021",
      semester: 8,
      students: 45,
      capacity: 60,
      startDate: "2021-08-15",
      expectedGraduation: "2025-06-15",
      status: "Final Year",
      coordinator: "Dr. Rajesh Sharma",
      averageGPA: 3.2,
      attendance: 88,
      specializations: {
        "Marketing": 12,
        "Finance": 15,
        "HR": 8,
        "General": 10
      }
    },
    {
      id: "bba-2022",
      batchName: "BBA Batch 2022",
      program: "BBA",
      programFull: "Bachelor of Business Administration",
      year: "2022",
      semester: 6,
      students: 52,
      capacity: 60,
      startDate: "2022-08-15",
      expectedGraduation: "2026-06-15",
      status: "Third Year",
      coordinator: "Prof. Sita Devi",
      averageGPA: 3.4,
      attendance: 91,
      specializations: {
        "Marketing": 14,
        "Finance": 18,
        "HR": 10,
        "General": 10
      }
    },
    {
      id: "bca-2021",
      batchName: "BCA Batch 2021",
      program: "BCA",
      programFull: "Bachelor of Computer Application",
      year: "2021",
      semester: 8,
      students: 38,
      capacity: 50,
      startDate: "2021-08-15",
      expectedGraduation: "2025-06-15",
      status: "Final Year",
      coordinator: "Dr. Prakash Sharma",
      averageGPA: 3.5,
      attendance: 92,
      specializations: {
        "Software Development": 15,
        "Web Technologies": 12,
        "Database Management": 8,
        "Network & Security": 3
      }
    },
    {
      id: "bca-2022",
      batchName: "BCA Batch 2022",
      program: "BCA",
      programFull: "Bachelor of Computer Application",
      year: "2022",
      semester: 6,
      students: 42,
      capacity: 50,
      startDate: "2022-08-15",
      expectedGraduation: "2026-06-15",
      status: "Third Year",
      coordinator: "Mr. Suresh Rai",
      averageGPA: 3.3,
      attendance: 89,
      specializations: {
        "Software Development": 18,
        "Web Technologies": 14,
        "Database Management": 7,
        "Network & Security": 3
      }
    },
    {
      id: "bsc-cs-2023",
      batchName: "BSc CS Batch 2023",
      program: "BSc CS",
      programFull: "Bachelor of Science in Computer Science",
      year: "2023",
      semester: 4,
      students: 35,
      capacity: 40,
      startDate: "2023-08-15",
      expectedGraduation: "2027-06-15",
      status: "Second Year",
      coordinator: "Dr. Rajesh Thapa",
      averageGPA: 3.1,
      attendance: 85,
      specializations: {
        "AI": 10,
        "Data Science": 12,
        "Cybersecurity": 8,
        "Software Engineering": 5
      }
    },
    {
      id: "ba-2024",
      batchName: "BA Batch 2024",
      program: "BA",
      programFull: "Bachelor of Arts",
      year: "2024",
      semester: 2,
      students: 65,
      capacity: 80,
      startDate: "2024-08-15",
      expectedGraduation: "2027-06-15",
      status: "First Year",
      coordinator: "Prof. Maya Gurung",
      averageGPA: 2.9,
      attendance: 82,
      specializations: {
        "English": 20,
        "Sociology": 18,
        "Psychology": 15,
        "Political Science": 12
      }
    }
  ];

  const programs = ["all", "BBA", "BCA", "BSc CS", "BA", "BBS", "B.Ed"];
  const years = ["all", "2021", "2022", "2023", "2024"];
  const statuses = ["all", "First Year", "Second Year", "Third Year", "Final Year", "Graduated"];

  const filteredBatches = batches.filter(batch => {
    const matchesSearch = batch.batchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         batch.program.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProgram = filterProgram === "all" || batch.program === filterProgram;
    const matchesYear = filterYear === "all" || batch.year === filterYear;
    const matchesStatus = filterStatus === "all" || batch.status === filterStatus;
    
    return matchesSearch && matchesProgram && matchesYear && matchesStatus;
  });

  const totalStats = {
    batches: batches.length,
    students: batches.reduce((sum, batch) => sum + batch.students, 0),
    capacity: batches.reduce((sum, batch) => sum + batch.capacity, 0),
    avgGPA: (batches.reduce((sum, batch) => sum + batch.averageGPA, 0) / batches.length).toFixed(1)
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "First Year": return "bg-blue-100 text-blue-800";
      case "Second Year": return "bg-green-100 text-green-800";
      case "Third Year": return "bg-orange-100 text-orange-800";
      case "Final Year": return "bg-red-100 text-red-800";
      case "Graduated": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/courses/bachelor">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Bachelor Level
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
              <Users className="w-8 h-8 text-blue-600" />
              Bachelor Batches Management
            </h1>
            <p className="text-muted-foreground">
              Manage student batches across all bachelor programs
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <TrendingUp className="w-4 h-4 mr-2" />
            Analytics
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Batch
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Building className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalStats.batches}</p>
                <p className="text-sm text-muted-foreground">Active Batches</p>
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
                <p className="text-2xl font-bold">{totalStats.students}</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <GraduationCap className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalStats.capacity}</p>
                <p className="text-sm text-muted-foreground">Total Capacity</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalStats.avgGPA}</p>
                <p className="text-sm text-muted-foreground">Average GPA</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search batches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterProgram} onValueChange={setFilterProgram}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Program" />
                </SelectTrigger>
                <SelectContent>
                  {programs.map((program) => (
                    <SelectItem key={program} value={program}>
                      {program === "all" ? "All Programs" : program}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year === "all" ? "All Years" : year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status === "all" ? "All Status" : status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Batches Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredBatches.map((batch) => (
          <Card key={batch.id} className="hover:shadow-lg transition-all duration-300 animate-fadeInScale border-border/50 hover:border-primary/20">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-500 rounded-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{batch.batchName}</CardTitle>
                    <p className="text-sm text-muted-foreground">{batch.programFull}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
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
              <div className="flex items-center gap-2">
                <Badge variant="outline">{batch.program}</Badge>
                <Badge className={getStatusColor(batch.status)}>
                  {batch.status}
                </Badge>
                <Badge variant="secondary">Semester {batch.semester}</Badge>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-lg font-bold text-foreground">{batch.students}</p>
                  <p className="text-xs text-muted-foreground">Students</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-lg font-bold text-foreground">{batch.capacity}</p>
                  <p className="text-xs text-muted-foreground">Capacity</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-lg font-bold text-foreground">{batch.averageGPA}</p>
                  <p className="text-xs text-muted-foreground">Avg GPA</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-lg font-bold text-foreground">{batch.attendance}%</p>
                  <p className="text-xs text-muted-foreground">Attendance</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Coordinator:</span>
                  <span>{batch.coordinator}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Start Date:</span>
                  <span>{new Date(batch.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Expected Graduation:</span>
                  <span>{new Date(batch.expectedGraduation).toLocaleDateString()}</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Specialization Distribution:</p>
                <div className="space-y-1">
                  {Object.entries(batch.specializations).map(([spec, count]) => (
                    <div key={spec} className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{spec}:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(count / batch.students) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-6">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" size="sm">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Manage
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBatches.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No Batches Found</h3>
            <p className="text-muted-foreground mb-4">
              No batches match your current search and filter criteria.
            </p>
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setFilterProgram("all");
              setFilterYear("all");
              setFilterStatus("all");
            }}>
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
              <Plus className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">Create Batch</p>
                <p className="text-sm text-muted-foreground">Add new student batch</p>
              </div>
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
              <Users className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">Bulk Enrollment</p>
                <p className="text-sm text-muted-foreground">Enroll multiple students</p>
              </div>
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
              <Calendar className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">Academic Calendar</p>
                <p className="text-sm text-muted-foreground">Manage semester dates</p>
              </div>
            </Button>

            <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
              <TrendingUp className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">Performance Report</p>
                <p className="text-sm text-muted-foreground">Generate batch analytics</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
