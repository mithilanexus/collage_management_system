
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
  School,
  Users,
  BookOpen,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Filter
} from "lucide-react";
import Link from "next/link";

export default function PrimaryTeachers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const primaryTeachers = [
    {
      id: "PT001",
      name: "राम बहादुर श्रेष्ठ",
      englishName: "Ram Bahadur Shrestha",
      email: "ram.shrestha@school.edu.np",
      phone: "+977-9841234567",
      address: "Kathmandu-15, Baneshwor",
      qualification: "Bachelor in Education (B.Ed)",
      experience: "8 years",
      joinDate: "2019-06-15",
      status: "Active",
      subjects: ["Nepali", "Social Studies"],
      classes: ["Grade 3", "Grade 4"],
      salary: "Rs. 45,000",
      profileImage: "/api/placeholder/150/150"
    },
    {
      id: "PT002", 
      name: "सीता देवी पौडेल",
      englishName: "Sita Devi Poudel",
      email: "sita.poudel@school.edu.np",
      phone: "+977-9851234568",
      address: "Lalitpur-8, Pulchowk",
      qualification: "Master in Mathematics (M.Sc)",
      experience: "12 years",
      joinDate: "2015-04-10",
      status: "Active",
      subjects: ["Mathematics", "Science"],
      classes: ["Grade 4", "Grade 5"],
      salary: "Rs. 55,000",
      profileImage: "/api/placeholder/150/150"
    },
    {
      id: "PT003",
      name: "गीता कुमारी तामाङ",
      englishName: "Gita Kumari Tamang", 
      email: "gita.tamang@school.edu.np",
      phone: "+977-9861234569",
      address: "Bhaktapur-12, Dhulikhel",
      qualification: "Bachelor in English (B.A)",
      experience: "5 years",
      joinDate: "2021-07-20",
      status: "Active",
      subjects: ["English", "Art"],
      classes: ["Grade 1", "Grade 2"],
      salary: "Rs. 40,000",
      profileImage: "/api/placeholder/150/150"
    },
    {
      id: "PT004",
      name: "हरि प्रसाद अधिकारी",
      englishName: "Hari Prasad Adhikari",
      email: "hari.adhikari@school.edu.np", 
      phone: "+977-9871234570",
      address: "Kathmandu-25, Chabahil",
      qualification: "Bachelor in Physical Education (B.P.Ed)",
      experience: "10 years",
      joinDate: "2017-03-15",
      status: "Active",
      subjects: ["Health & Physical Education", "Computer"],
      classes: ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5"],
      salary: "Rs. 48,000",
      profileImage: "/api/placeholder/150/150"
    },
    {
      id: "PT005",
      name: "मीना कुमारी खड्का",
      englishName: "Meena Kumari Khadka",
      email: "meena.khadka@school.edu.np",
      phone: "+977-9881234571", 
      address: "Kathmandu-32, Tokha",
      qualification: "Master in Nepali (M.A)",
      experience: "15 years",
      joinDate: "2012-08-01",
      status: "On Leave",
      subjects: ["Nepali", "Social Studies"],
      classes: ["Grade 4", "Grade 5"],
      salary: "Rs. 60,000",
      profileImage: "/api/placeholder/150/150"
    }
  ];

  const filteredTeachers = primaryTeachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterStatus === "all" || teacher.status.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: primaryTeachers.length,
    active: primaryTeachers.filter(t => t.status === "Active").length,
    onLeave: primaryTeachers.filter(t => t.status === "On Leave").length,
    subjects: [...new Set(primaryTeachers.flatMap(t => t.subjects))].length
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
              <School className="w-8 h-8 text-green-600" />
              Primary Level Teachers
            </h1>
            <p className="text-muted-foreground">
              Manage teachers for grades 1-5
            </p>
          </div>
        </div>
        <Link href="/admin/management/teachers/primary/add">
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
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.onLeave}</p>
                <p className="text-sm text-muted-foreground">On Leave</p>
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
                <p className="text-2xl font-bold">{stats.subjects}</p>
                <p className="text-sm text-muted-foreground">Subjects Covered</p>
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
                placeholder="Search teachers by name or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                onClick={() => setFilterStatus("all")}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                All ({stats.total})
              </Button>
              <Button
                variant={filterStatus === "active" ? "default" : "outline"}
                onClick={() => setFilterStatus("active")}
              >
                Active ({stats.active})
              </Button>
              <Button
                variant={filterStatus === "on leave" ? "default" : "outline"}
                onClick={() => setFilterStatus("on leave")}
              >
                On Leave ({stats.onLeave})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => (
          <Card key={teacher.id} className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                    {teacher.name.charAt(0)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{teacher.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{teacher.englishName}</p>
                  </div>
                </div>
                <Badge variant={teacher.status === "Active" ? "default" : "secondary"}>
                  {teacher.status}
                </Badge>
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
                <p className="text-sm font-medium mb-2">Qualification:</p>
                <p className="text-sm text-muted-foreground">{teacher.qualification}</p>
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
                <Link href={`/admin/management/teachers/primary/${teacher.id}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </Link>
                <Link href={`/admin/management/teachers/primary/${teacher.id}/edit`}>
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
              {searchTerm || filterStatus !== "all" 
                ? "Try adjusting your search or filter criteria."
                : "Get started by adding your first primary teacher."
              }
            </p>
            <Link href="/admin/management/teachers/primary/add">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Teacher
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
