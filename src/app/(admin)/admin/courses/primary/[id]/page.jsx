"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import {
  ArrowLeft,
  Edit,
  Trash2,
  School,
  Users,
  Clock,
  BookOpen,
  Calendar,
  User,
  Loader2,
  Plus,
  Eye,
  Settings,
  Download,
  Printer,
  ChevronRight,
  Home,
  BarChart3,
  UserPlus,
  FileText,
  Award,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Target,
  Save
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import da from "zod/v4/locales/da.cjs";

export default function PrimaryClassDetails() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [classData, setClassData] = useState(null);

  // Mock data - in real app this would come from API
  const mockClassData = {
    1: {
      id: 1,
      grade: "Grade 1",
      nepaliName: "कक्षा १",
      students: 45,
      sections: 2,
      weeklyHours: 30,
      ageGroup: "5-6 years",
      curriculum: "Basic Foundation",
      description:
        "Foundation level education for young learners focusing on basic literacy and numeracy skills.",
      subjects: [
        {
          name: "Nepali",
          code: "NEP",
          mandatory: true,
          hours: 6,
          teacher: "Mrs. Sita Sharma",
        },
        {
          name: "English",
          code: "ENG",
          mandatory: true,
          hours: 5,
          teacher: "Mr. John Smith",
        },
        {
          name: "Mathematics",
          code: "MATH",
          mandatory: true,
          hours: 6,
          teacher: "Mrs. Kamala Devi",
        },
        {
          name: "Science",
          code: "SCI",
          mandatory: true,
          hours: 4,
          teacher: "Mr. Ram Prasad",
        },
        {
          name: "Social Studies",
          code: "SS",
          mandatory: true,
          hours: 4,
          teacher: "Mrs. Gita Poudel",
        },
        {
          name: "Health & Physical Education",
          code: "HPE",
          mandatory: true,
          hours: 3,
          teacher: "Mr. Bikash Thapa",
        },
      ],
      schedule: [
        {
          day: "Sunday",
          periods: [
            "Nepali",
            "English",
            "Math",
            "Science",
            "Break",
            "Social Studies",
            "HPE",
          ],
        },
        {
          day: "Monday",
          periods: [
            "Math",
            "Nepali",
            "English",
            "Science",
            "Break",
            "Social Studies",
            "HPE",
          ],
        },
        {
          day: "Tuesday",
          periods: [
            "English",
            "Math",
            "Nepali",
            "Science",
            "Break",
            "Social Studies",
            "Art",
          ],
        },
        {
          day: "Wednesday",
          periods: [
            "Science",
            "Math",
            "English",
            "Nepali",
            "Break",
            "Social Studies",
            "HPE",
          ],
        },
        {
          day: "Thursday",
          periods: [
            "Nepali",
            "English",
            "Math",
            "Science",
            "Break",
            "Social Studies",
            "Music",
          ],
        },
        {
          day: "Friday",
          periods: [
            "Math",
            "Nepali",
            "English",
            "Science",
            "Break",
            "Social Studies",
            "HPE",
          ],
        },
      ],
      teachers: [
        {
          name: "Mrs. Sita Sharma",
          subject: "Nepali",
          experience: "8 years",
          qualification: "M.A. Nepali",
        },
        {
          name: "Mr. John Smith",
          subject: "English",
          experience: "5 years",
          qualification: "B.Ed. English",
        },
        {
          name: "Mrs. Kamala Devi",
          subject: "Mathematics",
          experience: "12 years",
          qualification: "M.Sc. Mathematics",
        },
        {
          name: "Mr. Ram Prasad",
          subject: "Science",
          experience: "6 years",
          qualification: "B.Sc. Physics",
        },
        {
          name: "Mrs. Gita Poudel",
          subject: "Social Studies",
          experience: "10 years",
          qualification: "M.A. History",
        },
        {
          name: "Mr. Bikash Thapa",
          subject: "Physical Education",
          experience: "4 years",
          qualification: "B.P.Ed",
        },
      ],
      statistics: {
        totalStudents: 45,
        maleStudents: 23,
        femaleStudents: 22,
        averageAge: 5.5,
        attendanceRate: 94.5,
        passRate: 98.2,
      },
    },
  };



  useEffect(() => {
    getClassData()
  }, [params.id]);

  const getClassData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/courses/primary/classes/${params.id}`)
    const data = await res.json()
    data.data.subjects = [
      {
        name: "Nepali",
        code: "NEP",
        mandatory: true,
        hours: 6,
        teacher: "Mrs. Sita Sharma",
      },
      {
        name: "English",
        code: "ENG",
        mandatory: true,
        hours: 5,
        teacher: "Mr. John Smith",
      },
      {
        name: "Mathematics",
        code: "MATH",
        mandatory: true,
        hours: 6,
        teacher: "Mrs. Kamala Devi",
      },
      {
        name: "Science",
        code: "SCI",
        mandatory: true,
        hours: 4,
        teacher: "Mr. Ram Prasad",
      },
      {
        name: "Social Studies",
        code: "SS",
        mandatory: true,
        hours: 4,
        teacher: "Mrs. Gita Poudel",
      },
      {
        name: "Health & Physical Education",
        code: "HPE",
        mandatory: true,
        hours: 3,
        teacher: "Mr. Bikash Thapa",
      },
    ],
    data.data.statistics = {
      totalStudents: 45,
      maleStudents: 23,
      femaleStudents: 22,
      averageAge: 5.5,
      attendanceRate: 94.5,
      passRate: 98.2,
    }
    data.data.teachers = [
      {
        name: "Mrs. Sita Sharma",
        subject: "Nepali",
        experience: "8 years",
        qualification: "M.A. Nepali",
      },
      {
        name: "Mr. John Smith",
        subject: "English",
        experience: "5 years",
        qualification: "B.Ed. English",
      },
    ],
      data.data.schedule = [
        {
          day: "Sunday",
          periods: [
            "Nepali",
            "English",
            "Math",
            "Science",
            "Break",
            "Social Studies",
            "HPE",
          ],
        },
        {
          day: "Monday",
          periods: [
            "Math",
            "Nepali",
            "English",
            "Science",
            "Break",
            "Social Studies",
            "HPE",
          ],
        },
        {
          day: "Tuesday",
          periods: [
            "English",
            "Math",
            "Nepali",
            "Science",
            "Break",
            "Social Studies",
            "Art",
          ],
        },
        {
          day: "Wednesday",
          periods: [
            "Science",
            "Math",
            "English",
            "Nepali",
            "Break",
            "Social Studies",
            "HPE",
          ],
        },
        {
          day: "Thursday",
          periods: [
            "Nepali",
            "English",
            "Math",
            "Science",
            "Break",
            "Social Studies",
            "Music",
          ],
        },
        {
          day: "Friday",
          periods: [
            "Math",
            "Nepali",
            "English",
            "Science",
            "Break",
            "Social Studies",
            "HPE",
          ],
        },
      ]


    setClassData(data.data)
    setLoading(false)
  }

  const handleDelete = () => {
    if (
      confirm(
        "Are you sure you want to delete this class? This action cannot be undone."
      )
    ) {
      console.log("Deleting class:", params.id);
      toast.success("Class deleted successfully!");
      // In real app, redirect after deletion
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading class details...</p>
        </div>
      </div>
    );
  }

  if (!classData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <School className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Class Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The requested class could not be found.
          </p>
          <Link href="/admin/courses/primary">
            <Button>Back to Primary Level</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Link href="/admin" className="hover:text-foreground flex items-center gap-1">
          <Home className="w-4 h-4" />
          Dashboard
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/admin/courses" className="hover:text-foreground">
          Courses
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/admin/courses/primary" className="hover:text-foreground">
          Primary Level
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground font-medium">{classData.grade}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/courses/primary">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Primary Level
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
              <School className="w-8 h-8 text-green-600" />
              {classData.grade} Management
            </h1>
            <p className="text-muted-foreground">
              {classData.nepaliName} • {classData.curriculum} • {classData.ageGroup}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {classData.description}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
          <Link href={`/admin/courses/primary/${params.id}/edit`}>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit Class
            </Button>
          </Link>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-600">{classData.students}</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">+5% from last term</span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">{classData.sections}</p>
                <p className="text-sm text-muted-foreground">Active Sections</p>
                <div className="flex items-center gap-1 mt-1">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">All sections active</span>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <School className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-purple-600">{classData.subjects.length}</p>
                <p className="text-sm text-muted-foreground">Subjects</p>
                <div className="flex items-center gap-1 mt-1">
                  <Target className="w-3 h-3 text-purple-600" />
                  <span className="text-xs text-purple-600">{classData.subjects.filter(s => s.mandatory).length} mandatory</span>
                </div>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-orange-600">{classData.weeklyHours}</p>
                <p className="text-sm text-muted-foreground">Hours/Week</p>
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3 text-orange-600" />
                  <span className="text-xs text-orange-600">{Math.round(classData.weeklyHours / 5)} hrs/day avg</span>
                </div>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            <Link href={`/admin/courses/primary/${params.id}/students`}>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 w-full">
                <UserPlus className="w-5 h-5 text-blue-600" />
                <span className="text-xs">Add Student</span>
              </Button>
            </Link>
            <Link href={`/admin/courses/primary/${params.id}/schedule`}>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 w-full">
                <Calendar className="w-5 h-5 text-green-600" />
                <span className="text-xs">View Schedule</span>
              </Button>
            </Link>
            <Link href={`/admin/courses/primary/${params.id}/reports`}>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 w-full">
                <FileText className="w-5 h-5 text-purple-600" />
                <span className="text-xs">Reports</span>
              </Button>
            </Link>
            <Link href={`/admin/courses/primary/${params.id}/attendance`}>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 w-full">
                <CheckCircle className="w-5 h-5 text-orange-600" />
                <span className="text-xs">Attendance</span>
              </Button>
            </Link>
            <Link href={`/admin/courses/primary/${params.id}/grades`}>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 w-full">
                <Award className="w-5 h-5 text-red-600" />
                <span className="text-xs">Grades</span>
              </Button>
            </Link>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 w-full">
              <Settings className="w-5 h-5 text-gray-600" />
              <span className="text-xs">Settings</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Information */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-fit lg:grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="subjects" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Subjects</span>
          </TabsTrigger>
          <TabsTrigger value="teachers" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Teachers</span>
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">Schedule</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">Analytics</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <School className="w-5 h-5 text-blue-600" />
                  Class Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <Label className="text-sm font-medium text-muted-foreground">Grade</Label>
                    <p className="font-semibold text-lg">{classData.grade}</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <Label className="text-sm font-medium text-muted-foreground">Nepali Name</Label>
                    <p className="font-semibold text-lg">{classData.nepaliName}</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <Label className="text-sm font-medium text-muted-foreground">Age Group</Label>
                    <p className="font-medium">{classData.ageGroup}</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <Label className="text-sm font-medium text-muted-foreground">Curriculum</Label>
                    <p className="font-medium">{classData.curriculum}</p>
                  </div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <Label className="text-sm font-medium text-blue-800">Description</Label>
                  <p className="mt-1 text-blue-700">{classData.description}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-600" />
                  Student Demographics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-3xl font-bold text-green-600">{classData.statistics.totalStudents}</p>
                    <p className="text-sm text-green-700">Total Enrolled</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-xl font-bold text-blue-600">{classData.statistics.maleStudents}</p>
                      <p className="text-xs text-blue-700">Male</p>
                    </div>
                    <div className="text-center p-3 bg-pink-50 rounded-lg">
                      <p className="text-xl font-bold text-pink-600">{classData.statistics.femaleStudents}</p>
                      <p className="text-xs text-pink-700">Female</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                      <span className="text-sm text-muted-foreground">Average Age</span>
                      <Badge variant="outline">{classData.statistics.averageAge} years</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                      <span className="text-sm text-muted-foreground">Attendance Rate</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {classData.statistics.attendanceRate}%
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                      <span className="text-sm text-muted-foreground">Pass Rate</span>
                      <Badge variant="default" className="bg-blue-600">
                        {classData.statistics.passRate}%
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Overall Performance</span>
                      <Badge variant="default" className="bg-purple-600">Excellent</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">92% class average</p>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium">Active Students</span>
                      </div>
                      <span className="font-bold text-green-600">{classData.statistics.totalStudents}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-orange-600" />
                        <span className="text-sm font-medium">Needs Attention</span>
                      </div>
                      <span className="font-bold text-orange-600">2</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium">Top Performers</span>
                      </div>
                      <span className="font-bold text-blue-600">8</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">Subject Management</h3>
              <p className="text-sm text-muted-foreground">
                Manage curriculum subjects and their weekly allocations
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export List
              </Button>
              <Link href={`/admin/courses/primary/${params.id}/add-subject`}>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Subject
                </Button>
              </Link>
            </div>
          </div>

          {/* Subject Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <BookOpen className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <p className="text-2xl font-bold">{classData.subjects.length}</p>
                <p className="text-sm text-muted-foreground">Total Subjects</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Target className="w-6 h-6 mx-auto mb-2 text-green-600" />
                <p className="text-2xl font-bold">{classData.subjects.filter(s => s.mandatory).length}</p>
                <p className="text-sm text-muted-foreground">Mandatory</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                <p className="text-2xl font-bold">{classData.subjects.reduce((total, s) => total + s.hours, 0)}</p>
                <p className="text-sm text-muted-foreground">Total Hours</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <User className="w-6 h-6 mx-auto mb-2 text-orange-600" />
                <p className="text-2xl font-bold">{new Set(classData.subjects.map(s => s.teacher)).size}</p>
                <p className="text-sm text-muted-foreground">Teachers</p>
              </CardContent>
            </Card>
          </div>

          {/* Subject Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classData.subjects.map((subject, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">{subject.name}</h4>
                      <p className="text-sm text-muted-foreground">Code: {subject.code}</p>
                    </div>
                    <Badge
                      variant={subject.mandatory ? "default" : "secondary"}
                      className={`text-xs ${subject.mandatory ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                    >
                      {subject.mandatory ? "Required" : "Optional"}
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <span className="text-sm text-muted-foreground">Weekly Hours</span>
                      <Badge variant="outline">{subject.hours}h</Badge>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                      <User className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">{subject.teacher}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-3 h-3 mr-1" />
                      Details
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="px-2">
                      <Calendar className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="teachers" className="space-y-6">
          <TeacherManager classData={classData} />
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <ScheduleManager classData={classData} />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Class Analytics</h3>
              <p className="text-sm text-muted-foreground">
                Performance insights and trends for {classData.grade}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Attendance</p>
                    <p className="text-2xl font-bold text-green-600">{classData.statistics.attendanceRate}%</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${classData.statistics.attendanceRate}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pass Rate</p>
                    <p className="text-2xl font-bold text-blue-600">{classData.statistics.passRate}%</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Award className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${classData.statistics.passRate}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Engagement</p>
                    <p className="text-2xl font-bold text-purple-600">87%</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Satisfaction</p>
                    <p className="text-2xl font-bold text-orange-600">91%</p>
                  </div>
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Target className="w-5 h-5 text-orange-600" />
                  </div>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: '91%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {classData.subjects.slice(0, 5).map((subject, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{subject.name}</p>
                          <p className="text-sm text-muted-foreground">{subject.hours}h/week</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">{85 + index * 2}%</p>
                        <p className="text-xs text-muted-foreground">Average</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">Attendance Updated</p>
                      <p className="text-sm text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Assignment Submitted</p>
                      <p className="text-sm text-muted-foreground">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <Award className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Test Results Published</p>
                      <p className="text-sm text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="font-medium">Parent Meeting Scheduled</p>
                      <p className="text-sm text-muted-foreground">2 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Schedule Manager Component
function ScheduleManager({ classData }) {
  const [schedule, setSchedule] = useState({});

  // Initialize schedule from classData
  useEffect(() => {
    const initialSchedule = {};
    classData.schedule.forEach((dayData) => {
      initialSchedule[dayData.day] = dayData.periods;
    });
    setSchedule(initialSchedule);
  }, [classData]);

  const timeSlots = [
    "10:00-10:45", "10:45-11:30", "11:30-12:15", "12:15-1:00",
    "1:00-1:45", "1:45-2:30", "2:30-3:15"
  ];

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const availableSubjects = [
    "Nepali", "English", "Mathematics", "Science", "Social Studies",
    "Health & Physical Education", "Computer", "Art", "Music", "Moral Education"
  ];

  const handlePeriodChange = (day, periodIndex, newSubject) => {
    setSchedule(prev => ({
      ...prev,
      [day]: prev[day]?.map((period, index) =>
        index === periodIndex ? newSubject : period
      ) || []
    }));
  };

  const addPeriod = (day) => {
    setSchedule(prev => ({
      ...prev,
      [day]: [...(prev[day] || []), "Free Period"]
    }));
  };

  const removePeriod = (day, periodIndex) => {
    setSchedule(prev => ({
      ...prev,
      [day]: prev[day]?.filter((_, index) => index !== periodIndex) || []
    }));
  };

  const saveSchedule = () => {
    console.log("Saving schedule:", schedule);
    toast.success("Schedule saved successfully!");
  };




  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Schedule Management</h3>
          <p className="text-sm text-muted-foreground">
            Manage weekly schedule for {classData.grade} ({classData.nepaliName})
          </p>
        </div>
        <Button onClick={saveSchedule} className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Schedule
        </Button>
      </div>

      {/* Time Slots Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Time Slots</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {timeSlots.map((slot, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                Period {index + 1}: {slot}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Schedule Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 bg-muted font-medium text-left min-w-[100px]">Day</th>
                  {timeSlots.map((slot, index) => (
                    <th key={index} className="border p-2 bg-muted font-medium text-center min-w-[120px]">
                      <div className="text-xs">Period {index + 1}</div>
                      <div className="text-xs text-muted-foreground">{slot}</div>
                    </th>
                  ))}
                  <th className="border p-2 bg-muted font-medium text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {days.map((day) => (
                  <tr key={day}>
                    <td className="border p-2 font-medium bg-muted/50">{day}</td>
                    {schedule[day]?.map((period, periodIndex) => (
                      <td key={periodIndex} className="border p-1">
                        <Select
                          value={period}
                          onValueChange={(value) => handlePeriodChange(day, periodIndex, value)}
                        >
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Break">Break</SelectItem>
                            <SelectItem value="Free Period">Free Period</SelectItem>
                            {availableSubjects.map((subject) => (
                              <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                    )) || <td className="border p-2 text-center text-muted-foreground" colSpan={timeSlots.length}>No schedule set</td>}
                    <td className="border p-1">
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addPeriod(day)}
                          className="h-6 w-6 p-0"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        {schedule[day]?.length > 0 && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removePeriod(day, schedule[day].length - 1)}
                            className="h-6 w-6 p-0 text-red-600"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Schedule Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">
                {Object.values(schedule).reduce((total, daySchedule) => total + (daySchedule?.length || 0), 0)}
              </p>
              <p className="text-sm text-muted-foreground">Total Periods/Week</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {Object.values(schedule).reduce((total, daySchedule) =>
                  total + (daySchedule?.filter(period => availableSubjects.includes(period)).length || 0), 0
                )}
              </p>
              <p className="text-sm text-muted-foreground">Subject Periods</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">
                {Object.values(schedule).reduce((total, daySchedule) =>
                  total + (daySchedule?.filter(period => period === "Break").length || 0), 0
                )}
              </p>
              <p className="text-sm text-muted-foreground">Break Periods</p>
            </div>
          </div>
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
              <Clock className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">Copy Schedule</p>
                <p className="text-sm text-muted-foreground">Copy from another class</p>
              </div>
            </Button>

            <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
              <Edit className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">Bulk Edit</p>
                <p className="text-sm text-muted-foreground">Edit multiple periods</p>
              </div>
            </Button>

            <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
              <Calendar className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">Print Schedule</p>
                <p className="text-sm text-muted-foreground">Generate printable version</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}

// Teacher Manager Component
function TeacherManager({ classData }) {
  const [teacherAssignments, setTeacherAssignments] = useState({});
  const [availableTeachers, setAvailableTeachers] = useState([]);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");

  // Mock available teachers data
  const mockTeachers = [
    {
      id: 1,
      name: "Mrs. Sita Sharma",
      qualification: "M.A. Nepali",
      experience: "8 years",
      specializations: ["Nepali", "Literature"],
      email: "sita.sharma@school.edu",
      phone: "+977-9841234567"
    },
    {
      id: 2,
      name: "Mr. John Smith",
      qualification: "M.A. English",
      experience: "6 years",
      specializations: ["English", "Communication"],
      email: "john.smith@school.edu",
      phone: "+977-9841234568"
    },
    {
      id: 3,
      name: "Dr. Ram Prasad",
      qualification: "M.Sc. Mathematics",
      experience: "12 years",
      specializations: ["Mathematics", "Physics"],
      email: "ram.prasad@school.edu",
      phone: "+977-9841234569"
    },
    {
      id: 4,
      name: "Ms. Lisa Johnson",
      qualification: "M.Sc. Science",
      experience: "5 years",
      specializations: ["Science", "Biology", "Chemistry"],
      email: "lisa.johnson@school.edu",
      phone: "+977-9841234570"
    },
    {
      id: 5,
      name: "Mr. Hari Bahadur",
      qualification: "M.A. Social Studies",
      experience: "10 years",
      specializations: ["Social Studies", "History", "Geography"],
      email: "hari.bahadur@school.edu",
      phone: "+977-9841234571"
    }
  ];

  // Available subjects for this class
  const availableSubjects = [
    "Nepali", "English", "Mathematics", "Science", "Social Studies",
    "Health & Physical Education", "Computer", "Art", "Music", "Moral Education"
  ];

  // Initialize teacher assignments
  useEffect(() => {
    const initialAssignments = {};
    classData.teachers.forEach((teacher) => {
      initialAssignments[teacher.subject] = {
        teacherId: teacher.id || Math.floor(Math.random() * 1000),
        teacherName: teacher.name,
        qualification: teacher.qualification,
        experience: teacher.experience
      };
    });
    setTeacherAssignments(initialAssignments);
    setAvailableTeachers(mockTeachers);
  }, [classData]);

  const assignTeacher = (subject, teacher) => {
    setTeacherAssignments(prev => ({
      ...prev,
      [subject]: {
        teacherId: teacher.id,
        teacherName: teacher.name,
        qualification: teacher.qualification,
        experience: teacher.experience,
        email: teacher.email,
        phone: teacher.phone,
        specializations: teacher.specializations
      }
    }));
    toast.success(`${teacher.name} assigned to ${subject}`);
  };

  const removeTeacher = (subject) => {
    setTeacherAssignments(prev => {
      const updated = { ...prev };
      delete updated[subject];
      return updated;
    });
    toast.success(`Teacher removed from ${subject}`);
  };

  const getTeacherWorkload = (teacherId) => {
    return Object.values(teacherAssignments).filter(
      assignment => assignment.teacherId === teacherId
    ).length;
  };

  const isTeacherQualified = (teacher, subject) => {
    return teacher.specializations.some(spec =>
      spec.toLowerCase().includes(subject.toLowerCase()) ||
      subject.toLowerCase().includes(spec.toLowerCase())
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Teacher Management</h3>
          <p className="text-sm text-muted-foreground">
            Assign teachers to subjects for {classData.grade} ({classData.nepaliName})
          </p>
        </div>
        <Button onClick={() => setShowAssignDialog(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Assign Teacher
        </Button>
      </div>

      {/* Teacher Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <User className="w-6 h-6 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold">{Object.keys(teacherAssignments).length}</p>
            <p className="text-sm text-muted-foreground">Assigned Subjects</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-6 h-6 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold">{new Set(Object.values(teacherAssignments).map(a => a.teacherId)).size}</p>
            <p className="text-sm text-muted-foreground">Active Teachers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <BookOpen className="w-6 h-6 mx-auto mb-2 text-orange-600" />
            <p className="text-2xl font-bold">{availableSubjects.length - Object.keys(teacherAssignments).length}</p>
            <p className="text-sm text-muted-foreground">Unassigned Subjects</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="w-6 h-6 mx-auto mb-2 text-purple-600" />
            <p className="text-2xl font-bold">{Math.round((Object.keys(teacherAssignments).length / availableSubjects.length) * 100)}%</p>
            <p className="text-sm text-muted-foreground">Coverage</p>
          </CardContent>
        </Card>
      </div>

      {/* Subject-Teacher Assignment Table */}
      <Card>
        <CardHeader>
          <CardTitle>Subject Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-3 bg-muted font-medium text-left">Subject</th>
                  <th className="border p-3 bg-muted font-medium text-left">Assigned Teacher</th>
                  <th className="border p-3 bg-muted font-medium text-left">Qualification</th>
                  <th className="border p-3 bg-muted font-medium text-left">Experience</th>
                  <th className="border p-3 bg-muted font-medium text-center">Status</th>
                  <th className="border p-3 bg-muted font-medium text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {availableSubjects.map((subject) => {
                  const assignment = teacherAssignments[subject];
                  return (
                    <tr key={subject}>
                      <td className="border p-3 font-medium">{subject}</td>
                      <td className="border p-3">
                        {assignment ? (
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium">{assignment.teacherName}</p>
                              {assignment.email && (
                                <p className="text-xs text-muted-foreground">{assignment.email}</p>
                              )}
                            </div>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">Not assigned</span>
                        )}
                      </td>
                      <td className="border p-3">
                        {assignment ? assignment.qualification : "-"}
                      </td>
                      <td className="border p-3">
                        {assignment ? assignment.experience : "-"}
                      </td>
                      <td className="border p-3 text-center">
                        {assignment ? (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                            Assigned
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                            Vacant
                          </Badge>
                        )}
                      </td>
                      <td className="border p-3 text-center">
                        <div className="flex gap-1 justify-center">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedSubject(subject);
                              setShowAssignDialog(true);
                            }}
                            className="h-8 px-2"
                          >
                            {assignment ? <Edit className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                          </Button>
                          {assignment && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeTeacher(subject)}
                              className="h-8 px-2 text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Available Teachers */}
      <Card>
        <CardHeader>
          <CardTitle>Available Teachers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableTeachers.map((teacher) => {
              const workload = getTeacherWorkload(teacher.id);
              return (
                <Card key={teacher.id} className="border-2 hover:border-blue-200 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{teacher.name}</h4>
                        <p className="text-sm text-muted-foreground">{teacher.qualification}</p>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Experience:</span>
                        <span>{teacher.experience}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Workload:</span>
                        <Badge variant={workload > 3 ? "destructive" : workload > 1 ? "secondary" : "outline"}>
                          {workload} subjects
                        </Badge>
                      </div>
                    </div>

                    <div className="mt-3">
                      <p className="text-xs text-muted-foreground mb-1">Specializations:</p>
                      <div className="flex flex-wrap gap-1">
                        {teacher.specializations.map((spec) => (
                          <Badge key={spec} variant="outline" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                      <p>📧 {teacher.email}</p>
                      <p>📞 {teacher.phone}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Assignment Dialog */}
      {showAssignDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>
                {selectedSubject ? `Assign Teacher to ${selectedSubject}` : "Assign Teacher"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!selectedSubject && (
                <div>
                  <label className="text-sm font-medium">Select Subject</label>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSubjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <label className="text-sm font-medium">Available Teachers</label>
                <div className="mt-2 space-y-2 max-h-60 overflow-y-auto">
                  {availableTeachers
                    .filter(teacher => selectedSubject ? isTeacherQualified(teacher, selectedSubject) : true)
                    .map((teacher) => (
                      <div
                        key={teacher.id}
                        className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                        onClick={() => {
                          if (selectedSubject) {
                            assignTeacher(selectedSubject, teacher);
                            setShowAssignDialog(false);
                            setSelectedSubject("");
                          }
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{teacher.name}</p>
                            <p className="text-sm text-muted-foreground">{teacher.qualification}</p>
                            <div className="flex gap-1 mt-1">
                              {teacher.specializations.map((spec) => (
                                <Badge key={spec} variant="outline" className="text-xs">
                                  {spec}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          {selectedSubject && isTeacherQualified(teacher, selectedSubject) && (
                            <Badge className="bg-green-100 text-green-800">
                              Qualified
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAssignDialog(false);
                    setSelectedSubject("");
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
