"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

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
    // Simulate API call
    setTimeout(() => {
      const data = mockClassData[params.id];
      if (data) {
        setClassData(data);
      }
      setLoading(false);
    }, 1000);
  }, [params.id]);

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
      {/* Header */}
      <div className="flex items-center justify-between">
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
              {classData.grade}
            </h1>
            <p className="text-muted-foreground">
              {classData.nepaliName} • {classData.curriculum}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/admin/courses/primary/${params.id}/edit`}>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{classData.students}</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
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
                <p className="text-2xl font-bold">{classData.sections}</p>
                <p className="text-sm text-muted-foreground">Sections</p>
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
                <p className="text-2xl font-bold">
                  {classData.subjects.length}
                </p>
                <p className="text-sm text-muted-foreground">Subjects</p>
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
                <p className="text-2xl font-bold">{classData.weeklyHours}</p>
                <p className="text-sm text-muted-foreground">Hours/Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Class Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Grade
                    </Label>
                    <p className="font-medium">{classData.grade}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Nepali Name
                    </Label>
                    <p className="font-medium">{classData.nepaliName}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Age Group
                    </Label>
                    <p className="font-medium">{classData.ageGroup}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Curriculum
                    </Label>
                    <p className="font-medium">{classData.curriculum}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Description
                  </Label>
                  <p className="mt-1">{classData.description}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Student Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Total Students
                    </span>
                    <span className="font-medium">
                      {classData.statistics.totalStudents}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Male Students
                    </span>
                    <span className="font-medium">
                      {classData.statistics.maleStudents}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Female Students
                    </span>
                    <span className="font-medium">
                      {classData.statistics.femaleStudents}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Average Age
                    </span>
                    <span className="font-medium">
                      {classData.statistics.averageAge} years
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Attendance Rate
                    </span>
                    <Badge variant="secondary">
                      {classData.statistics.attendanceRate}%
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Pass Rate
                    </span>
                    <Badge variant="default">
                      {classData.statistics.passRate}%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Subject List</h3>
            <Link href={`/admin/courses/primary/${params.id}/add-subject`}>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Subject
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classData.subjects.map((subject, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{subject.name}</h4>
                    <Badge
                      variant={subject.mandatory ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {subject.mandatory ? "Required" : "Optional"}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Code: {subject.code}</p>
                    <p>Weekly Hours: {subject.hours}</p>
                    <p>Teacher: {subject.teacher}</p>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm">
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="teachers" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Teaching Staff</h3>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Assign Teacher
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {classData.teachers.map((teacher, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{teacher.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {teacher.subject}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                    <p>Experience: {teacher.experience}</p>
                    <p>Qualification: {teacher.qualification}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Weekly Schedule</h3>
            <Link href={`/admin/courses/primary/${params.id}/schedule`}>
              <Button size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Manage Schedule
              </Button>
            </Link>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Current Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {classData.schedule.map((day, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-medium mb-3">{day.day}</h4>
                    <div className="flex flex-wrap gap-2">
                      {day.periods.map((period, periodIndex) => (
                        <Badge
                          key={periodIndex}
                          variant={period === "Break" ? "outline" : "secondary"}
                          className="text-xs"
                        >
                          {period}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
