
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  GraduationCap,
  Search,
  Plus,
  Edit,
  Eye,
  Trash2,
  Filter,
  Download,
  Mail,
  Phone,
  MapPin,
  Award,
  BookOpen,
  Users,
  Clock
} from "lucide-react";
import Link from "next/link";

export default function BachelorTeachersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProgram, setFilterProgram] = useState("all");

  // Mock data for bachelor level teachers
  const bachelorTeachers = [
    {
      id: "bt_001",
      teacherId: "BT001",
      name: "Dr. Rajesh Kumar Sharma",
      nepaliName: "डा. राजेश कुमार शर्मा",
      email: "rajesh.sharma@college.edu",
      phone: "+977-9841234567",
      position: "Professor",
      department: "Computer Science",
      program: "BIT",
      qualification: "Ph.D. Computer Science",
      experience: "15 years",
      specialization: ["Software Engineering", "Database Systems", "AI"],
      subjects: ["Database Management", "Software Engineering", "Research Methodology"],
      joiningDate: "2020-03-15",
      status: "Active",
      avatar: "/api/placeholder/100/100",
      address: "Kathmandu, Nepal",
      salary: "NPR 80,000",
      workload: "18 hrs/week",
      rating: 4.8,
      publications: 25,
      projects: 8
    },
    {
      id: "bt_002", 
      teacherId: "BT002",
      name: "Prof. Sita Devi Poudel",
      nepaliName: "प्रा. सीता देवी पौडेल",
      email: "sita.poudel@college.edu",
      phone: "+977-9856789012",
      position: "Associate Professor",
      department: "Management",
      program: "BBS",
      qualification: "Ph.D. Business Administration",
      experience: "12 years",
      specialization: ["Strategic Management", "Human Resources", "Organizational Behavior"],
      subjects: ["Principles of Management", "Strategic Management", "Organizational Behavior"],
      joiningDate: "2021-07-20",
      status: "Active",
      avatar: "/api/placeholder/100/100",
      address: "Lalitpur, Nepal",
      salary: "NPR 75,000",
      workload: "20 hrs/week",
      rating: 4.9,
      publications: 18,
      projects: 5
    },
    {
      id: "bt_003",
      teacherId: "BT003", 
      name: "Dr. Ramesh Bahadur Thapa",
      nepaliName: "डा. रमेश बहादुर थापा",
      email: "ramesh.thapa@college.edu",
      phone: "+977-9823456789",
      position: "Assistant Professor",
      department: "Humanities",
      program: "BA",
      qualification: "Ph.D. English Literature",
      experience: "8 years",
      specialization: ["Modern Literature", "Creative Writing", "Cultural Studies"],
      subjects: ["English Literature", "Creative Writing", "Research Methods"],
      joiningDate: "2022-01-10",
      status: "Active",
      avatar: "/api/placeholder/100/100",
      address: "Bhaktapur, Nepal",
      salary: "NPR 65,000",
      workload: "22 hrs/week",
      rating: 4.7,
      publications: 12,
      projects: 3
    },
    {
      id: "bt_004",
      teacherId: "BT004",
      name: "Dr. Krishna Maya Shrestha",
      nepaliName: "डा. कृष्णमाया श्रेष्ठ",
      email: "krishna.shrestha@college.edu", 
      phone: "+977-9867890123",
      position: "Professor",
      department: "Science",
      program: "BSc",
      qualification: "Ph.D. Physics",
      experience: "20 years",
      specialization: ["Quantum Physics", "Astrophysics", "Theoretical Physics"],
      subjects: ["Advanced Physics", "Quantum Mechanics", "Research Project"],
      joiningDate: "2019-09-01",
      status: "Active",
      avatar: "/api/placeholder/100/100",
      address: "Kathmandu, Nepal",
      salary: "NPR 85,000",
      workload: "16 hrs/week",
      rating: 4.9,
      publications: 35,
      projects: 12
    },
    {
      id: "bt_005",
      teacherId: "BT005",
      name: "Prof. Bishnu Prasad Acharya",
      nepaliName: "प्रा. बिष्णु प्रसाद आचार्य",
      email: "bishnu.acharya@college.edu",
      phone: "+977-9834567890",
      position: "Associate Professor",
      department: "Engineering",
      program: "BE",
      qualification: "Ph.D. Civil Engineering",
      experience: "14 years",
      specialization: ["Structural Engineering", "Construction Management", "Earthquake Engineering"],
      subjects: ["Structural Analysis", "Construction Technology", "Project Management"],
      joiningDate: "2020-11-05",
      status: "On Leave",
      avatar: "/api/placeholder/100/100",
      address: "Pokhara, Nepal",
      salary: "NPR 78,000",
      workload: "19 hrs/week",
      rating: 4.6,
      publications: 22,
      projects: 7
    }
  ];

  const programs = ["all", "BIT", "BBS", "BA", "BSc", "BE"];

  const filteredTeachers = bachelorTeachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.nepaliName.includes(searchTerm) ||
                         teacher.teacherId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesProgram = filterProgram === "all" || teacher.program === filterProgram;
    
    return matchesSearch && matchesProgram;
  });

  const stats = {
    total: bachelorTeachers.length,
    active: bachelorTeachers.filter(t => t.status === "Active").length,
    onLeave: bachelorTeachers.filter(t => t.status === "On Leave").length,
    avgRating: (bachelorTeachers.reduce((sum, t) => sum + t.rating, 0) / bachelorTeachers.length).toFixed(1)
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
              <GraduationCap className="w-8 h-8 text-purple-600" />
              Bachelor Level Teachers
            </h1>
            <p className="text-muted-foreground">
              Manage university level professors and lecturers
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Link href="/admin/management/teachers/bachelor/add">
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Teacher
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Teachers</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <Award className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">On Leave</p>
                <p className="text-2xl font-bold text-orange-600">{stats.onLeave}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Rating</p>
                <p className="text-2xl font-bold text-blue-600">{stats.avgRating}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search teachers by name, ID, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                value={filterProgram}
                onChange={(e) => setFilterProgram(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background"
              >
                {programs.map(program => (
                  <option key={program} value={program}>
                    {program === "all" ? "All Programs" : program}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Teachers List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTeachers.map((teacher) => (
          <Card key={teacher.id} className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-purple-100 flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{teacher.name}</h3>
                    <p className="text-sm text-muted-foreground font-medium">{teacher.nepaliName}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={teacher.status === "Active" ? "default" : "secondary"}>
                        {teacher.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {teacher.teacherId}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Link href={`/admin/management/teachers/bachelor/${teacher.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href={`/admin/management/teachers/bachelor/${teacher.id}/edit`}>
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
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Position</p>
                  <p className="font-medium">{teacher.position}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Department</p>
                  <p className="font-medium">{teacher.department}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Program</p>
                  <p className="font-medium">{teacher.program}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Experience</p>
                  <p className="font-medium">{teacher.experience}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Specializations</p>
                <div className="flex flex-wrap gap-1">
                  {teacher.specialization.slice(0, 2).map((spec, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                  {teacher.specialization.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{teacher.specialization.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    <span className="text-xs">{teacher.email.split('@')[0]}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-xs">{teacher.publications} papers</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm font-medium">{teacher.rating}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTeachers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <GraduationCap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No teachers found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or add a new teacher.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
