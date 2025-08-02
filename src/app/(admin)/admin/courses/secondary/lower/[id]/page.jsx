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
  School,
  User,
  Calendar,
  Loader2
} from "lucide-react";
import Link from "next/link";

export default function LowerSecondaryGradeDetails() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [gradeData, setGradeData] = useState(null);

  // Mock data
  const mockGradeData = {
    grade6: {
      grade: "Grade 6",
      nepaliName: "कक्षा ६",
      level: "Lower Secondary",
      students: 65,
      sections: 3,
      ageGroup: "11-12 years",
      classTeacher: "Mrs. Sunita Sharma",
      description: "Foundation level for secondary education",
      weeklyHours: 35,
      subjects: [
        { name: "Nepali", code: "NEP", hours: 6, teacher: "Mrs. Sunita Sharma", mandatory: true },
        { name: "English", code: "ENG", hours: 5, teacher: "Mr. John Smith", mandatory: true },
        { name: "Mathematics", code: "MATH", hours: 6, teacher: "Mrs. Kamala Devi", mandatory: true },
        { name: "Science", code: "SCI", hours: 4, teacher: "Mr. Ram Prasad", mandatory: true },
        { name: "Social Studies", code: "SS", hours: 4, teacher: "Mrs. Gita Poudel", mandatory: true },
        { name: "Health & Physical Education", code: "HPE", hours: 3, teacher: "Mr. Bikash Thapa", mandatory: true },
        { name: "Computer", code: "COMP", hours: 2, teacher: "Mr. Suresh Rai", mandatory: false },
        { name: "Moral Education", code: "ME", hours: 2, teacher: "Mrs. Sunita Sharma", mandatory: true }
      ],
      sections: [
        { name: "Section A", students: 22, classTeacher: "Mrs. Sunita Sharma" },
        { name: "Section B", students: 21, classTeacher: "Mr. Dipak Thapa" },
        { name: "Section C", students: 22, classTeacher: "Mrs. Maya Gurung" }
      ],
      schedule: [
        { day: "Sunday", periods: ["Nepali", "English", "Math", "Science", "Break", "Social Studies", "HPE"] },
        { day: "Monday", periods: ["Math", "Nepali", "English", "Science", "Break", "Computer", "Moral Education"] },
        { day: "Tuesday", periods: ["English", "Math", "Nepali", "Social Studies", "Break", "Science", "HPE"] },
        { day: "Wednesday", periods: ["Science", "Math", "English", "Nepali", "Break", "Social Studies", "Computer"] },
        { day: "Thursday", periods: ["Nepali", "English", "Math", "Science", "Break", "HPE", "Moral Education"] },
        { day: "Friday", periods: ["Math", "Nepali", "English", "Social Studies", "Break", "Science", "Computer"] }
      ],
      performance: {
        averageGrade: "B+",
        passRate: 92,
        attendanceRate: 88
      }
    },
    grade7: {
      grade: "Grade 7",
      nepaliName: "कक्षा ७",
      level: "Lower Secondary",
      students: 62,
      sections: 3,
      ageGroup: "12-13 years",
      classTeacher: "Mr. Rajesh Thapa",
      description: "Intermediate foundation with optional subjects",
      weeklyHours: 36,
      subjects: [
        { name: "Nepali", code: "NEP", hours: 6, teacher: "Mr. Rajesh Thapa", mandatory: true },
        { name: "English", code: "ENG", hours: 5, teacher: "Mrs. Lisa Johnson", mandatory: true },
        { name: "Mathematics", code: "MATH", hours: 6, teacher: "Mr. Prakash Sharma", mandatory: true },
        { name: "Science", code: "SCI", hours: 4, teacher: "Mrs. Radha Devi", mandatory: true },
        { name: "Social Studies", code: "SS", hours: 4, teacher: "Mr. Gopal Thapa", mandatory: true },
        { name: "Health & Physical Education", code: "HPE", hours: 3, teacher: "Mr. Bikash Thapa", mandatory: true },
        { name: "Computer", code: "COMP", hours: 2, teacher: "Mr. Suresh Rai", mandatory: false },
        { name: "Moral Education", code: "ME", hours: 2, teacher: "Mr. Rajesh Thapa", mandatory: true },
        { name: "Optional Mathematics", code: "OPT_MATH", hours: 4, teacher: "Mrs. Sita Poudel", mandatory: false }
      ],
      sections: [
        { name: "Section A", students: 21, classTeacher: "Mr. Rajesh Thapa" },
        { name: "Section B", students: 20, classTeacher: "Mrs. Anita Sharma" },
        { name: "Section C", students: 21, classTeacher: "Mr. Krishna Bahadur" }
      ],
      schedule: [
        { day: "Sunday", periods: ["Nepali", "English", "Math", "Science", "Break", "Social Studies", "HPE"] },
        { day: "Monday", periods: ["Math", "Nepali", "English", "Science", "Break", "Computer", "Opt Math"] },
        { day: "Tuesday", periods: ["English", "Math", "Nepali", "Social Studies", "Break", "Science", "HPE"] },
        { day: "Wednesday", periods: ["Science", "Math", "English", "Nepali", "Break", "Social Studies", "Computer"] },
        { day: "Thursday", periods: ["Nepali", "English", "Math", "Science", "Break", "HPE", "Moral Education"] },
        { day: "Friday", periods: ["Math", "Nepali", "English", "Social Studies", "Break", "Science", "Opt Math"] }
      ],
      performance: {
        averageGrade: "B",
        passRate: 89,
        attendanceRate: 85
      }
    },
    grade8: {
      grade: "Grade 8",
      nepaliName: "कक्षा ८",
      level: "Lower Secondary",
      students: 58,
      sections: 3,
      ageGroup: "13-14 years",
      classTeacher: "Mrs. Kamala Devi",
      description: "Pre-secondary preparation with career orientation",
      weeklyHours: 38,
      subjects: [
        { name: "Nepali", code: "NEP", hours: 6, teacher: "Mrs. Kamala Devi", mandatory: true },
        { name: "English", code: "ENG", hours: 5, teacher: "Mr. David Wilson", mandatory: true },
        { name: "Mathematics", code: "MATH", hours: 6, teacher: "Mr. Hari Sharma", mandatory: true },
        { name: "Science", code: "SCI", hours: 4, teacher: "Mrs. Parvati Thapa", mandatory: true },
        { name: "Social Studies", code: "SS", hours: 4, teacher: "Mr. Bishnu Gurung", mandatory: true },
        { name: "Health & Physical Education", code: "HPE", hours: 3, teacher: "Mr. Bikash Thapa", mandatory: true },
        { name: "Computer", code: "COMP", hours: 2, teacher: "Mr. Suresh Rai", mandatory: false },
        { name: "Moral Education", code: "ME", hours: 2, teacher: "Mrs. Kamala Devi", mandatory: true },
        { name: "Optional Mathematics", code: "OPT_MATH", hours: 4, teacher: "Mrs. Mina Poudel", mandatory: false },
        { name: "Occupation", code: "OCC", hours: 2, teacher: "Mr. Tek Bahadur", mandatory: true }
      ],
      sections: [
        { name: "Section A", students: 19, classTeacher: "Mrs. Kamala Devi" },
        { name: "Section B", students: 20, classTeacher: "Mr. Ramesh Khadka" },
        { name: "Section C", students: 19, classTeacher: "Mrs. Sarita Rai" }
      ],
      schedule: [
        { day: "Sunday", periods: ["Nepali", "English", "Math", "Science", "Break", "Social Studies", "HPE"] },
        { day: "Monday", periods: ["Math", "Nepali", "English", "Science", "Break", "Computer", "Occupation"] },
        { day: "Tuesday", periods: ["English", "Math", "Nepali", "Social Studies", "Break", "Science", "HPE"] },
        { day: "Wednesday", periods: ["Science", "Math", "English", "Nepali", "Break", "Social Studies", "Opt Math"] },
        { day: "Thursday", periods: ["Nepali", "English", "Math", "Science", "Break", "HPE", "Moral Education"] },
        { day: "Friday", periods: ["Math", "Nepali", "English", "Social Studies", "Break", "Science", "Occupation"] }
      ],
      performance: {
        averageGrade: "B+",
        passRate: 91,
        attendanceRate: 87
      }
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
          <School className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Grade Not Found</h2>
          <p className="text-muted-foreground mb-4">The requested grade could not be found.</p>
          <Link href="/admin/courses/secondary/lower">
            <Button>Back to Lower Secondary</Button>
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
          <Link href="/admin/courses/secondary/lower">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Lower Secondary
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
              <School className="w-8 h-8 text-blue-600" />
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
                <School className="w-6 h-6 text-green-600" />
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
                <p className="text-2xl font-bold">{gradeData.subjects.length}</p>
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
                <p className="text-2xl font-bold">{gradeData.weeklyHours}</p>
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
          <TabsTrigger value="sections">Sections</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
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
            <h3 className="text-lg font-semibold">Subject List</h3>
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
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{subject.name}</h4>
                        <p className="text-sm text-muted-foreground">{subject.code}</p>
                      </div>
                    </div>
                    <Badge variant={subject.mandatory ? "default" : "secondary"}>
                      {subject.mandatory ? "Required" : "Optional"}
                    </Badge>
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {gradeData.sections.map((section, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                    <h4 className="font-semibold mb-1">{section.name}</h4>
                    <p className="text-2xl font-bold text-green-600 mb-1">{section.students}</p>
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
      </Tabs>
    </div>
  );
}
