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
  Plus,
  Users,
  Clock,
  BookOpen,
  Award,
  User,
  Calendar,
  Loader2,
  Target
} from "lucide-react";
import Link from "next/link";

export default function MiddleSecondaryGradeDetails() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [gradeData, setGradeData] = useState(null);

  // Mock data
  const mockGradeData = {
    grade9: {
      grade: "Grade 9",
      nepaliName: "कक्षा ९",
      level: "Secondary",
      students: 55,
      sections: 2,
      ageGroup: "14-15 years",
      classTeacher: "Mr. Dipak Sharma",
      description: "SEE preparation foundation year",
      weeklyHours: 40,
      examPrep: "SEE Foundation",
      specialFocus: "Basic concept building for SEE",
      subjects: [
        { name: "Nepali", code: "NEP", hours: 6, teacher: "Mr. Dipak Sharma", mandatory: true, seeSubject: true },
        { name: "English", code: "ENG", hours: 5, teacher: "Mrs. Sarah Johnson", mandatory: true, seeSubject: true },
        { name: "Mathematics", code: "MATH", hours: 6, teacher: "Mr. Gopal Thapa", mandatory: true, seeSubject: true },
        { name: "Science", code: "SCI", hours: 5, teacher: "Mrs. Radha Sharma", mandatory: true, seeSubject: true },
        { name: "Social Studies", code: "SS", hours: 4, teacher: "Mr. Krishna Bahadur", mandatory: true, seeSubject: true },
        { name: "Health & Physical Education", code: "HPE", hours: 3, teacher: "Mr. Bikash Thapa", mandatory: true, seeSubject: true },
        { name: "Computer", code: "COMP", hours: 2, teacher: "Mr. Suresh Rai", mandatory: false, seeSubject: false },
        { name: "Optional Mathematics", code: "OPT_MATH", hours: 4, teacher: "Mrs. Sita Poudel", mandatory: false, seeSubject: true },
        { name: "Occupation", code: "OCC", hours: 2, teacher: "Mr. Tek Bahadur", mandatory: true, seeSubject: true }
      ],
      sections: [
        { name: "Section A", students: 28, classTeacher: "Mr. Dipak Sharma" },
        { name: "Section B", students: 27, classTeacher: "Mrs. Anita Thapa" }
      ],
      schedule: [
        { day: "Sunday", periods: ["Nepali", "English", "Math", "Science", "Break", "Social Studies", "HPE"] },
        { day: "Monday", periods: ["Math", "Nepali", "English", "Science", "Break", "Computer", "Occupation"] },
        { day: "Tuesday", periods: ["English", "Math", "Nepali", "Social Studies", "Break", "Science", "HPE"] },
        { day: "Wednesday", periods: ["Science", "Math", "English", "Nepali", "Break", "Social Studies", "Opt Math"] },
        { day: "Thursday", periods: ["Nepali", "English", "Math", "Science", "Break", "HPE", "Occupation"] },
        { day: "Friday", periods: ["Math", "Nepali", "English", "Social Studies", "Break", "Science", "Opt Math"] }
      ],
      performance: {
        averageGrade: "B",
        passRate: 87,
        attendanceRate: 89,
        seePreparation: 75
      },
      examSchedule: [
        { exam: "First Terminal", date: "2024-06-15", status: "Completed" },
        { exam: "Second Terminal", date: "2024-09-20", status: "Upcoming" },
        { exam: "Pre-SEE Mock", date: "2024-12-10", status: "Scheduled" },
        { exam: "SEE Preparation", date: "2025-03-15", status: "Scheduled" }
      ]
    },
    grade10: {
      grade: "Grade 10",
      nepaliName: "कक्षा १०",
      level: "Secondary",
      students: 52,
      sections: 2,
      ageGroup: "15-16 years",
      classTeacher: "Mrs. Sita Poudel",
      description: "SEE examination preparation year",
      weeklyHours: 42,
      examPrep: "SEE Final",
      specialFocus: "Intensive SEE preparation and practice",
      subjects: [
        { name: "Nepali", code: "NEP", hours: 6, teacher: "Mrs. Sita Poudel", mandatory: true, seeSubject: true },
        { name: "English", code: "ENG", hours: 5, teacher: "Mr. Michael Brown", mandatory: true, seeSubject: true },
        { name: "Mathematics", code: "MATH", hours: 6, teacher: "Mr. Ram Prasad", mandatory: true, seeSubject: true },
        { name: "Science", code: "SCI", hours: 6, teacher: "Mrs. Kamala Devi", mandatory: true, seeSubject: true },
        { name: "Social Studies", code: "SS", hours: 5, teacher: "Mr. Hari Sharma", mandatory: true, seeSubject: true },
        { name: "Health & Physical Education", code: "HPE", hours: 3, teacher: "Mr. Bikash Thapa", mandatory: true, seeSubject: true },
        { name: "Computer", code: "COMP", hours: 2, teacher: "Mr. Suresh Rai", mandatory: false, seeSubject: false },
        { name: "Optional Mathematics", code: "OPT_MATH", hours: 4, teacher: "Mrs. Mina Sharma", mandatory: false, seeSubject: true },
        { name: "Occupation", code: "OCC", hours: 2, teacher: "Mr. Tek Bahadur", mandatory: true, seeSubject: true }
      ],
      sections: [
        { name: "Section A", students: 26, classTeacher: "Mrs. Sita Poudel" },
        { name: "Section B", students: 26, classTeacher: "Mr. Ramesh Khadka" }
      ],
      schedule: [
        { day: "Sunday", periods: ["Nepali", "English", "Math", "Science", "Break", "Social Studies", "HPE"] },
        { day: "Monday", periods: ["Math", "Science", "English", "Nepali", "Break", "Computer", "Occupation"] },
        { day: "Tuesday", periods: ["English", "Math", "Science", "Social Studies", "Break", "Nepali", "HPE"] },
        { day: "Wednesday", periods: ["Science", "Math", "English", "Nepali", "Break", "Social Studies", "Opt Math"] },
        { day: "Thursday", periods: ["Nepali", "English", "Math", "Science", "Break", "HPE", "Occupation"] },
        { day: "Friday", periods: ["Math", "Science", "English", "Social Studies", "Break", "Nepali", "Opt Math"] }
      ],
      performance: {
        averageGrade: "B+",
        passRate: 94,
        attendanceRate: 92,
        seePreparation: 88
      },
      examSchedule: [
        { exam: "First Terminal", date: "2024-06-15", status: "Completed" },
        { exam: "Second Terminal", date: "2024-09-20", status: "Completed" },
        { exam: "Pre-SEE Mock", date: "2024-12-10", status: "Upcoming" },
        { exam: "SEE Final", date: "2025-04-15", status: "Scheduled" }
      ]
    }
  };

  useEffect(() => {
    setTimeout(() => {
      const data = mockGradeData[params.id];
      if (data) {
        setGradeData(data);
      }
      setLoading(false);
    }, 1000);
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading grade details...</p>
        </div>
      </div>
    );
  }

  if (!gradeData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Award className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Grade Not Found</h2>
          <p className="text-muted-foreground mb-4">The requested grade could not be found.</p>
          <Link href="/admin/courses/secondary/middle">
            <Button>Back to Secondary Level</Button>
          </Link>
        </div>
      </div>
    );
  }

  const seeSubjects = gradeData.subjects.filter(subject => subject.seeSubject);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/courses/secondary/middle">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Secondary Level
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
              <Award className="w-8 h-8 text-orange-600" />
              {gradeData.grade} Management
            </h1>
            <p className="text-muted-foreground">
              {gradeData.nepaliName} • {gradeData.level} • {gradeData.ageGroup}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit Grade
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Subject
          </Button>
        </div>
      </div>

      {/* SEE Preparation Alert */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Target className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-orange-800">{gradeData.examPrep}</h3>
              <p className="text-sm text-orange-700">{gradeData.specialFocus}</p>
            </div>
            <div className="ml-auto">
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">{gradeData.performance.seePreparation}%</p>
                <p className="text-xs text-orange-700">SEE Ready</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{gradeData.students}</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{gradeData.sections.length}</p>
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
                <p className="text-2xl font-bold">{seeSubjects.length}</p>
                <p className="text-sm text-muted-foreground">SEE Subjects</p>
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
                <p className="text-2xl font-bold">{gradeData.weeklyHours}</p>
                <p className="text-sm text-muted-foreground">Hours/Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="sections">Sections</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="exams">Exams</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Grade Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Grade:</span>
                    <span className="font-medium">{gradeData.grade}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nepali Name:</span>
                    <span className="font-medium">{gradeData.nepaliName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Level:</span>
                    <span className="font-medium">{gradeData.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Age Group:</span>
                    <span className="font-medium">{gradeData.ageGroup}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Class Teacher:</span>
                    <span className="font-medium">{gradeData.classTeacher}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Description:</p>
                  <p className="text-sm text-muted-foreground">{gradeData.description}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{gradeData.performance.averageGrade}</p>
                    <p className="text-sm text-muted-foreground">Average Grade</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-lg font-bold text-blue-600">{gradeData.performance.passRate}%</p>
                      <p className="text-xs text-muted-foreground">Pass Rate</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <p className="text-lg font-bold text-purple-600">{gradeData.performance.attendanceRate}%</p>
                      <p className="text-xs text-muted-foreground">Attendance</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">SEE Subjects</h3>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Subject
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gradeData.subjects.map((subject, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        subject.seeSubject ? 'bg-orange-100' : 'bg-blue-100'
                      }`}>
                        <BookOpen className={`w-5 h-5 ${
                          subject.seeSubject ? 'text-orange-600' : 'text-blue-600'
                        }`} />
                      </div>
                      <div>
                        <h4 className="font-medium">{subject.name}</h4>
                        <p className="text-sm text-muted-foreground">{subject.code}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Badge variant={subject.mandatory ? "default" : "secondary"} className="text-xs">
                        {subject.mandatory ? "Required" : "Optional"}
                      </Badge>
                      {subject.seeSubject && (
                        <Badge variant="outline" className="text-xs bg-orange-50 text-orange-600">
                          SEE Subject
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Weekly Hours:</span>
                      <span>{subject.hours}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Teacher:</span>
                      <span>{subject.teacher}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sections" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Class Sections</h3>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Section
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gradeData.sections.map((section, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Users className="w-6 h-6 text-orange-600" />
                    </div>
                    <h4 className="font-semibold mb-1">{section.name}</h4>
                    <p className="text-2xl font-bold text-orange-600 mb-1">{section.students}</p>
                    <p className="text-sm text-muted-foreground mb-3">Students</p>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Class Teacher:</p>
                      <p className="text-sm text-muted-foreground">{section.classTeacher}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Weekly Schedule</h3>
            <Button size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit Schedule
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {gradeData.schedule.map((day, index) => (
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

        <TabsContent value="exams" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Examination Schedule</h3>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Exam
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gradeData.examSchedule.map((exam, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{exam.exam}</h4>
                        <p className="text-sm text-muted-foreground">{exam.date}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={
                        exam.status === "Completed" ? "default" :
                        exam.status === "Upcoming" ? "secondary" : "outline"
                      }
                      className="text-xs"
                    >
                      {exam.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
