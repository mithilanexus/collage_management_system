"use client";

import { useParams, useRouter } from "next/navigation";
import { usePrimaryClass, useDeleteClass } from "@/hooks/admin/courses";
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
import TeacherTab from "./TeacherTab";
import ScheduleTab from "./ScheduleTab";
import SubjectsTab from "./SubjectsTab";

export default function PrimaryClassDetails() {
  const params = useParams();
  const router = useRouter();
  const { data: classData, isLoading: loading } = usePrimaryClass({ id: params.id });

  const { mutateAsync: deleteClass } = useDeleteClass();

  const handleDelete = async () => {
    if (
      confirm(
        "Are you sure you want to delete this class? This action cannot be undone."
      )
    ) {
      try {
        await deleteClass(params.id);
        toast.success("Class deleted successfully!");
        router.push("/admin/courses/primary");
      } catch (error) {
        toast.error(error?.message || "Failed to delete class");
      }
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
              {classData.fullName} • {classData.ageGroup}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {classData.description.slice(0, 70)}...
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
                <p className="text-2xl font-bold text-blue-600">{classData.students.length}</p>
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
                    <Label className="text-sm font-medium text-muted-foreground">Age Group</Label>
                    <p className="font-medium">{classData.ageGroup}</p>
                  </div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <Label className="text-sm font-medium text-white">Description</Label>
                  <p className="mt-1 text-muted-foreground">{classData.description.slice(0, 100) + '...'} </p>
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
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-3xl font-bold text-green-600">{classData.students.length}</p>
                    <p className="text-sm text-green-700">Total Enrolled</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-xl font-bold text-blue-600">{classData.students.filter(student => student.gender === 'male').length}</p>
                      <p className="text-xs text-blue-700">Male</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-xl font-bold text-pink-600">{classData.students.filter(student => student.gender === 'female').length}</p>
                      <p className="text-xs text-pink-700">Female</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                      <span className="text-sm text-muted-foreground">Average Age</span>
                      <Badge variant="outline">{(classData.students.reduce((total, student) => total + student.age, 0) / classData.students.length) || 0} years</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                      <span className="text-sm text-muted-foreground">Attendance Rate</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {((classData.students.reduce((total, student) => total + student.attendance, 0) / classData.students.length) || 0) * 100}%
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                      <span className="text-sm text-muted-foreground">Pass Rate</span>
                      <Badge variant="default" className="bg-blue-600">
                        {((classData.students.reduce((total, student) => total + student.grade, 0) / classData.students.length) || 0) * 100}%
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
                  <div className="p-4 bg-muted/50 rounded-lg  shadow">
                    <div className="flex items-center justify-between mb-2 ">
                      <span className="text-sm font-medium">Overall Performance</span>
                      <Badge variant="default" className="bg-purple-600">Excellent</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">92% class average</p>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg  shadow">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium">Active Students</span>
                      </div>
                      <span className="font-bold text-green-600">{classData?.students?.length}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg  shadow">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-orange-600" />
                        <span className="text-sm font-medium">Needs Attention</span>
                      </div>
                      <span className="font-bold text-orange-600">2</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg  shadow">
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
          <SubjectsTab classData={classData} />
        </TabsContent>

        <TabsContent value="teachers" className="space-y-6">
          <TeacherTab classData={classData} />
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <ScheduleTab classData={classData} />
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
                    <p className="text-2xl font-bold text-green-600">{0}%</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${0}%` }}
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
                    <p className="text-2xl font-bold text-blue-600">{0}%</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Award className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${25}%` }}
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