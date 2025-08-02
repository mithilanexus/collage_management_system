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
  BookOpen,
  Clock,
  Building,
  Eye,
  GraduationCap,
  Award,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import Link from "next/link";

export default function BachelorFacultyManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterPosition, setFilterPosition] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const facultyMembers = [
    {
      id: "dr-rajesh-sharma",
      name: "Dr. Rajesh Sharma",
      position: "Professor & Program Coordinator",
      department: "Management",
      qualification: "PhD in Management",
      experience: "15 years",
      specialization: "Strategic Management, Leadership",
      programs: ["BBA", "BBS"],
      subjects: ["Strategic Management", "Organizational Behavior", "Business Ethics"],
      email: "rajesh.sharma@college.edu.np",
      phone: "+977-1-4567890",
      status: "Active",
      joiningDate: "2010-08-15",
      publications: 25,
      rating: 4.8,
      image: "/faculty/dr-rajesh.jpg"
    },
    {
      id: "dr-prakash-sharma",
      name: "Dr. Prakash Sharma",
      position: "Associate Professor & Program Coordinator",
      department: "Computer Science",
      qualification: "PhD in Computer Science",
      experience: "12 years",
      specialization: "Software Engineering, Database Systems",
      programs: ["BCA", "BSc CS"],
      subjects: ["Programming in C", "Data Structures", "Software Engineering"],
      email: "prakash.sharma@college.edu.np",
      phone: "+977-1-4567891",
      status: "Active",
      joiningDate: "2012-08-15",
      publications: 18,
      rating: 4.7,
      image: "/faculty/dr-prakash.jpg"
    },
    {
      id: "prof-sita-devi",
      name: "Prof. Sita Devi",
      position: "Senior Faculty",
      department: "Management",
      qualification: "MBA, PhD",
      experience: "10 years",
      specialization: "Marketing, Consumer Behavior",
      programs: ["BBA", "BBS"],
      subjects: ["Marketing Management", "Consumer Behavior", "Digital Marketing"],
      email: "sita.devi@college.edu.np",
      phone: "+977-1-4567892",
      status: "Active",
      joiningDate: "2014-08-15",
      publications: 12,
      rating: 4.6,
      image: "/faculty/prof-sita.jpg"
    },
    {
      id: "mr-suresh-rai",
      name: "Mr. Suresh Rai",
      position: "Assistant Professor",
      department: "Computer Science",
      qualification: "M.Tech IT",
      experience: "8 years",
      specialization: "Web Development, Mobile Apps",
      programs: ["BCA"],
      subjects: ["Web Technology", "Mobile Application Development", "Computer Graphics"],
      email: "suresh.rai@college.edu.np",
      phone: "+977-1-4567893",
      status: "Active",
      joiningDate: "2016-08-15",
      publications: 8,
      rating: 4.5,
      image: "/faculty/mr-suresh.jpg"
    },
    {
      id: "prof-maya-gurung",
      name: "Prof. Maya Gurung",
      position: "Professor",
      department: "Humanities",
      qualification: "PhD in English Literature",
      experience: "18 years",
      specialization: "English Literature, Creative Writing",
      programs: ["BA"],
      subjects: ["English Literature", "Creative Writing", "Communication Skills"],
      email: "maya.gurung@college.edu.np",
      phone: "+977-1-4567894",
      status: "Active",
      joiningDate: "2006-08-15",
      publications: 30,
      rating: 4.9,
      image: "/faculty/prof-maya.jpg"
    },
    {
      id: "dr-kamala-devi",
      name: "Dr. Kamala Devi",
      position: "Associate Professor",
      department: "Management",
      qualification: "PhD in Economics",
      experience: "11 years",
      specialization: "Economics, Financial Analysis",
      programs: ["BBA", "BBS"],
      subjects: ["Microeconomics", "Macroeconomics", "Financial Management"],
      email: "kamala.devi@college.edu.np",
      phone: "+977-1-4567895",
      status: "On Leave",
      joiningDate: "2013-08-15",
      publications: 15,
      rating: 4.4,
      image: "/faculty/dr-kamala.jpg"
    }
  ];

  const departments = ["all", "Management", "Computer Science", "Humanities", "Science", "Education"];
  const positions = ["all", "Professor", "Associate Professor", "Assistant Professor", "Lecturer"];
  const statuses = ["all", "Active", "On Leave", "Inactive"];

  const filteredFaculty = facultyMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === "all" || member.department === filterDepartment;
    const matchesPosition = filterPosition === "all" || member.position.includes(filterPosition);
    const matchesStatus = filterStatus === "all" || member.status === filterStatus;
    
    return matchesSearch && matchesDepartment && matchesPosition && matchesStatus;
  });

  const totalStats = {
    faculty: facultyMembers.length,
    active: facultyMembers.filter(f => f.status === "Active").length,
    departments: [...new Set(facultyMembers.map(f => f.department))].length,
    avgRating: (facultyMembers.reduce((sum, f) => sum + f.rating, 0) / facultyMembers.length).toFixed(1)
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "On Leave": return "bg-yellow-100 text-yellow-800";
      case "Inactive": return "bg-red-100 text-red-800";
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
              <Users className="w-8 h-8 text-green-600" />
              Bachelor Faculty Management
            </h1>
            <p className="text-muted-foreground">
              Manage faculty members across all bachelor programs
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Award className="w-4 h-4 mr-2" />
            Performance
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Faculty
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalStats.faculty}</p>
                <p className="text-sm text-muted-foreground">Total Faculty</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalStats.active}</p>
                <p className="text-sm text-muted-foreground">Active Faculty</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Building className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalStats.departments}</p>
                <p className="text-sm text-muted-foreground">Departments</p>
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
                <p className="text-2xl font-bold">{totalStats.avgRating}</p>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
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
                placeholder="Search faculty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept === "all" ? "All Departments" : dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={filterPosition} onValueChange={setFilterPosition}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Position" />
                </SelectTrigger>
                <SelectContent>
                  {positions.map((position) => (
                    <SelectItem key={position} value={position}>
                      {position === "all" ? "All Positions" : position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[120px]">
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

      {/* Faculty Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredFaculty.map((member) => (
          <Card key={member.id} className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{member.position}</p>
                    <Badge className={getStatusColor(member.status)} variant="secondary">
                      {member.status}
                    </Badge>
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
                <Badge variant="outline">{member.department}</Badge>
                <Badge variant="secondary">{member.experience}</Badge>
                <div className="flex items-center gap-1">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium">{member.rating}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Qualification:</span>
                  <span>{member.qualification}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Specialization:</span>
                  <span className="text-right">{member.specialization}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Publications:</span>
                  <span>{member.publications}</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Programs:</p>
                <div className="flex flex-wrap gap-1">
                  {member.programs.map((program, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">{program}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Key Subjects:</p>
                <div className="flex flex-wrap gap-1">
                  {member.subjects.slice(0, 2).map((subject, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">{subject}</Badge>
                  ))}
                  {member.subjects.length > 2 && (
                    <Badge variant="outline" className="text-xs">+{member.subjects.length - 2} more</Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{member.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  <span>{member.phone}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" size="sm">
                  <BookOpen className="w-4 h-4 mr-2" />
                  View Profile
                </Button>
                <Button variant="outline" size="sm">
                  <Clock className="w-4 h-4 mr-2" />
                  Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFaculty.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No Faculty Found</h3>
            <p className="text-muted-foreground mb-4">
              No faculty members match your current search and filter criteria.
            </p>
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setFilterDepartment("all");
              setFilterPosition("all");
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
                <p className="font-medium">Add Faculty</p>
                <p className="text-sm text-muted-foreground">Recruit new faculty member</p>
              </div>
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
              <BookOpen className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">Assign Subjects</p>
                <p className="text-sm text-muted-foreground">Manage subject assignments</p>
              </div>
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
              <Clock className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">Schedule Management</p>
                <p className="text-sm text-muted-foreground">Manage faculty schedules</p>
              </div>
            </Button>

            <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
              <Award className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">Performance Review</p>
                <p className="text-sm text-muted-foreground">Faculty evaluation reports</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
