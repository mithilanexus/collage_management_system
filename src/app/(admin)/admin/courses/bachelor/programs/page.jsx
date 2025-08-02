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
  GraduationCap,
  Users,
  Clock,
  Building,
  Eye,
  Filter,
  Download,
  Briefcase,
  Monitor,
  FlaskConical,
  BookOpen
} from "lucide-react";
import Link from "next/link";

export default function BachelorProgramsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterFaculty, setFilterFaculty] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const programs = [
    {
      id: "bba",
      name: "Bachelor of Business Administration",
      shortName: "BBA",
      nepaliName: "व्यापार प्रशासनमा स्नातक",
      faculty: "Management",
      icon: Briefcase,
      color: "bg-blue-500",
      duration: "4 Years",
      credits: 126,
      students: 180,
      batches: 4,
      intake: 60,
      fees: "NPR 2,50,000",
      placementRate: "85%",
      status: "Active",
      description: "Comprehensive business administration program",
      specializations: ["Marketing", "Finance", "HR", "General Management"]
    },
    {
      id: "bca",
      name: "Bachelor of Computer Application",
      shortName: "BCA",
      nepaliName: "कम्प्युटर अनुप्रयोगमा स्नातक",
      faculty: "Science & Technology",
      icon: Monitor,
      color: "bg-purple-500",
      duration: "4 Years",
      credits: 120,
      students: 150,
      batches: 4,
      intake: 50,
      fees: "NPR 3,00,000",
      placementRate: "90%",
      status: "Active",
      description: "Computer application and software development program",
      specializations: ["Software Development", "Web Technologies", "Database Management", "Network & Security"]
    },
    {
      id: "bsc-cs",
      name: "Bachelor of Science in Computer Science",
      shortName: "BSc CS",
      nepaliName: "कम्प्युटर विज्ञानमा स्नातक",
      faculty: "Science & Technology",
      icon: FlaskConical,
      color: "bg-green-500",
      duration: "4 Years",
      credits: 128,
      students: 120,
      batches: 3,
      intake: 40,
      fees: "NPR 3,50,000",
      placementRate: "88%",
      status: "Active",
      description: "Theoretical and practical computer science program",
      specializations: ["Artificial Intelligence", "Data Science", "Cybersecurity", "Software Engineering"]
    },
    {
      id: "ba",
      name: "Bachelor of Arts",
      shortName: "BA",
      nepaliName: "कलामा स्नातक",
      faculty: "Humanities",
      icon: BookOpen,
      color: "bg-orange-500",
      duration: "3 Years",
      credits: 96,
      students: 200,
      batches: 5,
      intake: 80,
      fees: "NPR 1,50,000",
      placementRate: "70%",
      status: "Active",
      description: "Liberal arts and humanities program",
      specializations: ["English", "Sociology", "Psychology", "Political Science"]
    },
    {
      id: "bbs",
      name: "Bachelor of Business Studies",
      shortName: "BBS",
      nepaliName: "व्यापार अध्ययनमा स्नातक",
      faculty: "Management",
      icon: Briefcase,
      color: "bg-indigo-500",
      duration: "4 Years",
      credits: 120,
      students: 160,
      batches: 4,
      intake: 50,
      fees: "NPR 2,00,000",
      placementRate: "80%",
      status: "Active",
      description: "Business studies with practical focus",
      specializations: ["Accounting", "Banking", "Marketing", "Management"]
    },
    {
      id: "bed",
      name: "Bachelor of Education",
      shortName: "B.Ed",
      nepaliName: "शिक्षामा स्नातक",
      faculty: "Education",
      icon: GraduationCap,
      color: "bg-red-500",
      duration: "4 Years",
      credits: 120,
      students: 80,
      batches: 2,
      intake: 30,
      fees: "NPR 1,80,000",
      placementRate: "75%",
      status: "Under Review",
      description: "Teacher training and education program",
      specializations: ["Primary Education", "Secondary Education", "Special Education", "Educational Technology"]
    }
  ];

  const faculties = ["all", "Management", "Science & Technology", "Humanities", "Education"];
  const statuses = ["all", "Active", "Under Review", "Inactive"];

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.nepaliName.includes(searchTerm);
    const matchesFaculty = filterFaculty === "all" || program.faculty === filterFaculty;
    const matchesStatus = filterStatus === "all" || program.status === filterStatus;
    
    return matchesSearch && matchesFaculty && matchesStatus;
  });

  const totalStats = {
    programs: programs.length,
    students: programs.reduce((sum, program) => sum + program.students, 0),
    batches: programs.reduce((sum, program) => sum + program.batches, 0),
    avgPlacement: Math.round(programs.reduce((sum, program) => sum + parseInt(program.placementRate), 0) / programs.length)
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
              <GraduationCap className="w-8 h-8 text-purple-600" />
              Bachelor Programs Management
            </h1>
            <p className="text-muted-foreground">
              Manage all undergraduate degree programs and specializations
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Link href="/admin/courses/bachelor/add-program">
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Program
            </Button>
          </Link>
        </div>
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
                <p className="text-2xl font-bold">{totalStats.programs}</p>
                <p className="text-sm text-muted-foreground">Total Programs</p>
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
                <p className="text-2xl font-bold">{totalStats.batches}</p>
                <p className="text-sm text-muted-foreground">Active Batches</p>
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
                <p className="text-2xl font-bold">{totalStats.avgPlacement}%</p>
                <p className="text-sm text-muted-foreground">Avg Placement</p>
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
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterFaculty} onValueChange={setFilterFaculty}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Faculty" />
                </SelectTrigger>
                <SelectContent>
                  {faculties.map((faculty) => (
                    <SelectItem key={faculty} value={faculty}>
                      {faculty === "all" ? "All Faculties" : faculty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by Status" />
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

      {/* Programs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPrograms.map((program) => {
          const IconComponent = program.icon;
          return (
            <Card key={program.id} className="hover:shadow-lg transition-all duration-300 animate-fadeInScale border-border/50 hover:border-primary/20">
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
                    <Link href={`/admin/courses/bachelor/program/${program.id}`}>
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
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{program.faculty}</Badge>
                  <Badge variant={program.status === "Active" ? "default" : "secondary"}>
                    {program.status}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground">{program.description}</p>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className="text-lg font-bold text-foreground">{program.students}</p>
                    <p className="text-xs text-muted-foreground">Students</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className="text-lg font-bold text-foreground">{program.batches}</p>
                    <p className="text-xs text-muted-foreground">Batches</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className="text-lg font-bold text-foreground">{program.credits}</p>
                    <p className="text-xs text-muted-foreground">Credits</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Duration:</span>
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Annual Intake:</span>
                    <span>{program.intake} students</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Annual Fees:</span>
                    <span>{program.fees}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Placement Rate:</span>
                    <span className="font-medium text-green-600">{program.placementRate}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Specializations:</p>
                  <div className="flex flex-wrap gap-1">
                    {program.specializations.slice(0, 2).map((spec, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">{spec}</Badge>
                    ))}
                    {program.specializations.length > 2 && (
                      <Badge variant="outline" className="text-xs">+{program.specializations.length - 2} more</Badge>
                    )}
                  </div>
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

      {filteredPrograms.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <GraduationCap className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No Programs Found</h3>
            <p className="text-muted-foreground mb-4">
              No programs match your current search and filter criteria.
            </p>
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setFilterFaculty("all");
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
            <Link href="/admin/courses/bachelor/add-program">
              <Button variant="outline" className="flex items-center gap-2 h-auto p-4 w-full">
                <Plus className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-medium">Add Program</p>
                  <p className="text-sm text-muted-foreground">Create new bachelor program</p>
                </div>
              </Button>
            </Link>
            
            <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
              <Users className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">Bulk Enrollment</p>
                <p className="text-sm text-muted-foreground">Enroll students in batches</p>
              </div>
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
              <Building className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">Faculty Assignment</p>
                <p className="text-sm text-muted-foreground">Assign teachers to programs</p>
              </div>
            </Button>

            <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
              <Download className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">Generate Reports</p>
                <p className="text-sm text-muted-foreground">Program performance reports</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
