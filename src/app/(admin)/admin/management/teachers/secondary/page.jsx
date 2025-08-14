
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
  Phone,
  Mail,
  MapPin,
  Filter,
  FlaskConical,
  Calculator,
  Globe,
  GraduationCap
} from "lucide-react";
import Link from "next/link";

export default function SecondaryTeachers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  const secondaryTeachers = [
    {
      id: "ST001",
      name: "डॉ. सुनिल कुमार गुप्ता",
      englishName: "Dr. Sunil Kumar Gupta",
      email: "sunil.gupta@school.edu.np",
      phone: "+977-9841234567",
      address: "Kathmandu-10, Baneshwor",
      qualification: "Master in Physics (M.Sc), PhD",
      experience: "15 years",
      joinDate: "2015-04-10",
      status: "Active",
      level: "Higher Secondary",
      faculty: "Science",
      subjects: ["Physics", "Mathematics"],
      classes: ["Grade 11 Science", "Grade 12 Science"],
      salary: "Rs. 75,000",
      specialization: "Quantum Physics"
    },
    {
      id: "ST002", 
      name: "प्रिया शर्मा",
      englishName: "Priya Sharma",
      email: "priya.sharma@school.edu.np",
      phone: "+977-9851234568",
      address: "Lalitpur-8, Pulchowk",
      qualification: "Master in Business Administration (MBA)",
      experience: "10 years",
      joinDate: "2018-07-15",
      status: "Active",
      level: "Higher Secondary",
      faculty: "Management",
      subjects: ["Accountancy", "Economics"],
      classes: ["Grade 11 Management", "Grade 12 Management"],
      salary: "Rs. 65,000",
      specialization: "Financial Management"
    },
    {
      id: "ST003",
      name: "राज कुमार तामाङ",
      englishName: "Raj Kumar Tamang", 
      email: "raj.tamang@school.edu.np",
      phone: "+977-9861234569",
      address: "Bhaktapur-12, Dhulikhel",
      qualification: "Master in English Literature (M.A)",
      experience: "12 years",
      joinDate: "2016-03-20",
      status: "Active",
      level: "Secondary",
      faculty: "Common",
      subjects: ["English", "Nepali"],
      classes: ["Grade 9", "Grade 10"],
      salary: "Rs. 55,000",
      specialization: "Comparative Literature"
    },
    {
      id: "ST004",
      name: "सरस्वती देवी श्रेष्ठ",
      englishName: "Saraswati Devi Shrestha",
      email: "saraswati.shrestha@school.edu.np", 
      phone: "+977-9871234570",
      address: "Kathmandu-25, Chabahil",
      qualification: "Master in Chemistry (M.Sc)",
      experience: "8 years",
      joinDate: "2020-08-01",
      status: "Active",
      level: "Lower Secondary",
      faculty: "Science",
      subjects: ["Science", "Mathematics"],
      classes: ["Grade 6", "Grade 7", "Grade 8"],
      salary: "Rs. 50,000",
      specialization: "Organic Chemistry"
    },
    {
      id: "ST005",
      name: "मनोज अधिकारी",
      englishName: "Manoj Adhikari",
      email: "manoj.adhikari@school.edu.np",
      phone: "+977-9881234571", 
      address: "Kathmandu-32, Tokha",
      qualification: "Master in Sociology (M.A)",
      experience: "6 years",
      joinDate: "2022-06-15",
      status: "On Leave",
      level: "Higher Secondary",
      faculty: "Humanities",
      subjects: ["Sociology", "Psychology"],
      classes: ["Grade 11 Humanities", "Grade 12 Humanities"],
      salary: "Rs. 58,000",
      specialization: "Social Psychology"
    }
  ];

  const filteredTeachers = secondaryTeachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         teacher.faculty.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLevel = filterLevel === "all" || teacher.level === filterLevel;
    const matchesStatus = filterStatus === "all" || teacher.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesTab = activeTab === "all" || teacher.faculty.toLowerCase() === activeTab.toLowerCase();
    
    return matchesSearch && matchesLevel && matchesStatus && matchesTab;
  });

  const stats = {
    total: secondaryTeachers.length,
    active: secondaryTeachers.filter(t => t.status === "Active").length,
    onLeave: secondaryTeachers.filter(t => t.status === "On Leave").length,
    faculties: [...new Set(secondaryTeachers.map(t => t.faculty))].length
  };

  const facultyStats = {
    science: secondaryTeachers.filter(t => t.faculty === "Science").length,
    management: secondaryTeachers.filter(t => t.faculty === "Management").length,
    humanities: secondaryTeachers.filter(t => t.faculty === "Humanities").length,
    common: secondaryTeachers.filter(t => t.faculty === "Common").length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/management/teachers">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Teachers
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-blue-600" />
              Secondary Level Teachers
            </h1>
            <p className="text-muted-foreground">
              Manage teachers for grades 6-12 across all faculties
            </p>
          </div>
        </div>
        <Link href="/admin/management/teachers/secondary/add">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Teacher
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Teachers</p>
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
                <p className="text-2xl font-bold">{stats.active}</p>
                <p className="text-sm text-muted-foreground">Active</p>
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
                <p className="text-2xl font-bold">{stats.faculties}</p>
                <p className="text-sm text-muted-foreground">Faculties</p>
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
                <p className="text-2xl font-bold">{stats.onLeave}</p>
                <p className="text-sm text-muted-foreground">On Leave</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search teachers by name, subject, or faculty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <select
                className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
              >
                <option value="all">All Levels</option>
                <option value="Lower Secondary">Lower Secondary</option>
                <option value="Secondary">Secondary</option>
                <option value="Higher Secondary">Higher Secondary</option>
              </select>
              
              <select
                className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="on leave">On Leave</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Faculty Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
          <TabsTrigger value="science">Science ({facultyStats.science})</TabsTrigger>
          <TabsTrigger value="management">Management ({facultyStats.management})</TabsTrigger>
          <TabsTrigger value="humanities">Humanities ({facultyStats.humanities})</TabsTrigger>
          <TabsTrigger value="common">Common ({facultyStats.common})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-6">
          {/* Teachers Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTeachers.map((teacher) => (
              <Card key={teacher.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        {teacher.name.charAt(0)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{teacher.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{teacher.englishName}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Badge variant={teacher.status === "Active" ? "default" : "secondary"}>
                        {teacher.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {teacher.level}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{teacher.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span>{teacher.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">{teacher.address}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Faculty & Specialization:</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="default">{teacher.faculty}</Badge>
                      <span className="text-sm text-muted-foreground">{teacher.specialization}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Teaching Subjects:</p>
                    <div className="flex flex-wrap gap-1">
                      {teacher.subjects.map((subject, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">{subject}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Classes:</p>
                    <div className="flex flex-wrap gap-1">
                      {teacher.classes.map((cls, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">{cls}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="text-center">
                      <p className="text-sm font-medium">{teacher.experience}</p>
                      <p className="text-xs text-muted-foreground">Experience</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">{teacher.salary}</p>
                      <p className="text-xs text-muted-foreground">Monthly Salary</p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Link href={`/admin/management/teachers/secondary/${teacher.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </Link>
                    <Link href={`/admin/management/teachers/secondary/${teacher.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTeachers.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No teachers found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || filterLevel !== "all" || filterStatus !== "all" || activeTab !== "all"
                    ? "Try adjusting your search or filter criteria."
                    : "Get started by adding your first secondary teacher."
                  }
                </p>
                <Link href="/admin/management/teachers/secondary/add">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Teacher
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
