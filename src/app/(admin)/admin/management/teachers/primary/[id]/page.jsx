
"use client";

import { useState } from "react";
import { useTeachers } from "@/hooks/admin/management";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  Edit,
  Trash2,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  DollarSign,
  Award,
  Clock,
  Users,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

export default function PrimaryTeacherDetails({ params }) {
  const [activeTab, setActiveTab] = useState("overview");

  const { data: teacherData, isLoading } = useTeachers({
    id: params.id,
    level: "primary",
  });

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/management/teachers/primary">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Teachers
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Teacher Profile
            </h1>
            <p className="text-muted-foreground">
              Detailed information about {teacherData.englishName}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/admin/management/teachers/primary/${teacherData.id}/edit`}>
            <Button variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </Link>
          <Button variant="outline" className="text-red-600">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Teacher Overview Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center text-white text-4xl font-bold">
              {teacherData.name.charAt(0)}
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold">{teacherData.name}</h2>
                <p className="text-lg text-muted-foreground">{teacherData.englishName}</p>
                <div className="flex items-center gap-4 mt-2">
                  <Badge variant={teacherData.status === "Active" ? "default" : "secondary"}>
                    {teacherData.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground">ID: {teacherData.employeeId}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{teacherData.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{teacherData.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{teacherData.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Joined: {new Date(teacherData.joinDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-1 gap-4 min-w-[200px]">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-foreground">{teacherData.experience}</p>
                <p className="text-xs text-muted-foreground">Experience</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-foreground">{teacherData.subjects.length}</p>
                <p className="text-xs text-muted-foreground">Subjects</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-foreground">{teacherData.classes.length}</p>
                <p className="text-xs text-muted-foreground">Classes</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-foreground">Rs. {parseInt(teacherData.totalSalary).toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Monthly Salary</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Information Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="professional">Professional</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Teaching Assignment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Teaching Assignment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Subjects:</h4>
                  <div className="flex flex-wrap gap-2">
                    {teacherData.subjects.map((subject, idx) => (
                      <Badge key={idx} variant="secondary">{subject}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Classes:</h4>
                  <div className="flex flex-wrap gap-2">
                    {teacherData.classes.map((cls, idx) => (
                      <Badge key={idx} variant="outline">{cls}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Attendance Rate:</span>
                    <span className="font-medium">{teacherData.performance.attendanceRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Student Satisfaction:</span>
                    <span className="font-medium">{teacherData.performance.studentSatisfaction}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Completed Trainings:</span>
                    <span className="font-medium">{teacherData.performance.completedTrainings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Upcoming Trainings:</span>
                    <span className="font-medium">{teacherData.performance.upcomingTrainings}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {teacherData.recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.activity}</p>
                      <p className="text-sm text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Full Name (Nepali)</Label>
                    <p className="text-sm mt-1">{teacherData.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Full Name (English)</Label>
                    <p className="text-sm mt-1">{teacherData.englishName}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Date of Birth</Label>
                    <p className="text-sm mt-1">{new Date(teacherData.dateOfBirth).toLocaleDateString()} ({calculateAge(teacherData.dateOfBirth)} years old)</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Gender</Label>
                    <p className="text-sm mt-1">{teacherData.gender}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Phone Number</Label>
                    <p className="text-sm mt-1">{teacherData.phone}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Alternate Phone</Label>
                    <p className="text-sm mt-1">{teacherData.alternatePhone || "Not provided"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Email Address</Label>
                    <p className="text-sm mt-1">{teacherData.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Citizenship Number</Label>
                    <p className="text-sm mt-1">{teacherData.citizenshipNumber || "Not provided"}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Label className="text-sm font-medium text-muted-foreground">Address</Label>
                <p className="text-sm mt-1">{teacherData.address}</p>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Emergency Contact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Contact Person</Label>
                  <p className="text-sm mt-1">{teacherData.emergencyContact || "Not provided"}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Phone Number</Label>
                  <p className="text-sm mt-1">{teacherData.emergencyPhone || "Not provided"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="professional" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Education & Experience */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Education & Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Highest Qualification</Label>
                  <p className="text-sm mt-1">{teacherData.qualification}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Specialization</Label>
                  <p className="text-sm mt-1">{teacherData.specialization || "Not specified"}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Teaching Experience</Label>
                  <p className="text-sm mt-1">{teacherData.experience}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Previous School</Label>
                  <p className="text-sm mt-1">{teacherData.previousSchool || "Not provided"}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Joining Date</Label>
                  <p className="text-sm mt-1">{new Date(teacherData.joinDate).toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>

            {/* Salary Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Salary Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Basic Salary</Label>
                  <p className="text-sm mt-1">Rs. {parseInt(teacherData.basicSalary).toLocaleString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Allowances</Label>
                  <p className="text-sm mt-1">Rs. {parseInt(teacherData.allowances).toLocaleString()}</p>
                </div>
                <div className="pt-2 border-t">
                  <Label className="text-sm font-medium text-muted-foreground">Total Monthly Salary</Label>
                  <p className="text-lg font-bold mt-1">Rs. {parseInt(teacherData.totalSalary).toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Notes */}
          {teacherData.notes && (
            <Card>
              <CardHeader>
                <CardTitle>Additional Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{teacherData.notes}</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Weekly Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border p-3 bg-muted font-medium text-left">Day</th>
                      <th className="border p-3 bg-muted font-medium text-center">Period 1</th>
                      <th className="border p-3 bg-muted font-medium text-center">Period 2</th>
                      <th className="border p-3 bg-muted font-medium text-center">Period 3</th>
                      <th className="border p-3 bg-muted font-medium text-center">Period 4</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teacherData.schedule.map((day, index) => (
                      <tr key={index}>
                        <td className="border p-3 font-medium">{day.day}</td>
                        {day.periods.map((period, periodIndex) => (
                          <td key={periodIndex} className="border p-3 text-center text-sm">
                            {period === "Free Period" ? (
                              <Badge variant="outline">Free Period</Badge>
                            ) : (
                              <span>{period}</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Performance Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{teacherData.performance.attendanceRate}</p>
                    <p className="text-xs text-muted-foreground">Attendance Rate</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{teacherData.performance.studentSatisfaction}</p>
                    <p className="text-xs text-muted-foreground">Student Rating</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">{teacherData.performance.completedTrainings}</p>
                    <p className="text-xs text-muted-foreground">Trainings Completed</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-orange-600">{teacherData.performance.upcomingTrainings}</p>
                    <p className="text-xs text-muted-foreground">Upcoming Trainings</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Training History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Recent Training History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <p className="font-medium text-sm">Child Psychology Training</p>
                    <p className="text-xs text-muted-foreground">Completed: Jan 15, 2024</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="font-medium text-sm">Digital Teaching Methods</p>
                    <p className="text-xs text-muted-foreground">Completed: Dec 20, 2023</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="font-medium text-sm">Classroom Management</p>
                    <p className="text-xs text-muted-foreground">Completed: Nov 10, 2023</p>
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

function Label({ children, className, ...props }) {
  return (
    <label className={`text-sm font-medium ${className || ''}`} {...props}>
      {children}
    </label>
  );
}
