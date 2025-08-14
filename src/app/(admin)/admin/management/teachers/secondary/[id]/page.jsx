
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  BookOpen,
  Edit,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Users,
  Star,
  Download,
  Clock,
  Target
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function SecondaryTeacherDetailPage() {
  const params = useParams();
  const teacherId = params.id;

  // Mock data - in real app, fetch based on teacherId
  const teacher = {
    id: "st_001",
    teacherId: "ST001",
    name: "Krishna Bahadur Thapa",
    nepaliName: "कृष्ण बहादुर थापा",
    email: "krishna.thapa@college.edu",
    phone: "+977-9841234567",
    position: "Senior Teacher",
    faculty: "Science Faculty",
    level: "Higher Secondary",
    qualification: "M.Sc. Physics",
    experience: "12 years",
    specialization: ["Physics", "Mathematics", "Research Methods"],
    subjects: ["Physics", "Applied Mathematics", "Research Project"],
    joiningDate: "2018-05-20",
    status: "Active",
    avatar: "/api/placeholder/150/150",
    address: "Kathmandu-16, Nayabazar, Nepal",
    salary: "NPR 55,000",
    workload: "24 hrs/week",
    rating: 4.6,
    studentsHandled: 180,
    classesAssigned: 6,
    biography: "Krishna Bahadur Thapa is an experienced secondary level teacher with strong background in Science subjects. He has been instrumental in improving student performance in board examinations.",
    education: [
      {
        degree: "M.Sc. Physics",
        institution: "Tribhuvan University, Nepal",
        year: "2010"
      },
      {
        degree: "B.Sc. Physics",
        institution: "Tribhuvan University, Nepal", 
        year: "2008"
      },
      {
        degree: "Higher Secondary (+2)",
        institution: "National College, Kathmandu",
        year: "2005"
      }
    ],
    achievements: [
      "Best Teacher Award 2022",
      "Excellence in Science Teaching 2021",
      "Student's Choice Award 2020",
      "Perfect Attendance Award 2019"
    ],
    currentClasses: [
      {
        grade: "Grade 12",
        faculty: "Science",
        subject: "Physics",
        students: 45,
        schedule: "Mon, Wed, Fri - 8:00 AM"
      },
      {
        grade: "Grade 11",
        faculty: "Science", 
        subject: "Physics",
        students: 42,
        schedule: "Tue, Thu - 9:00 AM"
      },
      {
        grade: "Grade 12",
        faculty: "Science",
        subject: "Applied Mathematics",
        students: 45,
        schedule: "Mon, Wed - 10:00 AM"
      }
    ],
    studentResults: {
      passRate: "95%",
      averageGrade: "B+",
      topScorers: 12,
      improvement: "+8% from last year"
    },
    studentFeedback: [
      {
        student: "Anita Sharma",
        feedback: "Makes complex physics concepts very easy to understand",
        rating: 5,
        subject: "Physics"
      },
      {
        student: "Rajesh Poudel", 
        feedback: "Excellent teaching methods and very supportive",
        rating: 5,
        subject: "Applied Mathematics"
      },
      {
        student: "Sushma Thapa",
        feedback: "Great mentor for science projects",
        rating: 4,
        subject: "Physics"
      }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/management/teachers/secondary">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Teachers
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-blue-600" />
              Teacher Profile
            </h1>
            <p className="text-muted-foreground">
              Detailed information about the secondary teacher
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Profile
          </Button>
          <Link href={`/admin/management/teachers/secondary/${teacher.id}/edit`}>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </Link>
          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile & Contact */}
        <div className="space-y-6">
          {/* Profile Card */}
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="w-32 h-32 mx-auto rounded-lg bg-blue-100 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-blue-600" />
                </div>
                
                <div>
                  <h2 className="text-xl font-bold">{teacher.name}</h2>
                  <p className="text-muted-foreground font-medium">{teacher.nepaliName}</p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <Badge variant={teacher.status === "Active" ? "default" : "secondary"}>
                      {teacher.status}
                    </Badge>
                    <Badge variant="outline">{teacher.teacherId}</Badge>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Award className="w-4 h-4" />
                    <span>{teacher.position}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <BookOpen className="w-4 h-4" />
                    <span>{teacher.faculty}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Target className="w-4 h-4" />
                    <span>{teacher.level}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-1 pt-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{teacher.rating}</span>
                  <span className="text-muted-foreground text-sm">/5.0</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{teacher.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{teacher.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">{teacher.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Joined</p>
                  <p className="font-medium">{new Date(teacher.joiningDate).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Performance Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{teacher.studentsHandled}</p>
                  <p className="text-sm text-muted-foreground">Students</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{teacher.classesAssigned}</p>
                  <p className="text-sm text-muted-foreground">Classes</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{teacher.experience}</p>
                  <p className="text-sm text-muted-foreground">Experience</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">{teacher.workload}</p>
                  <p className="text-sm text-muted-foreground">Workload</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Detailed Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Academic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Academic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Qualification</h4>
                  <p className="text-muted-foreground">{teacher.qualification}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Experience</h4>
                  <p className="text-muted-foreground">{teacher.experience}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Specializations</h4>
                <div className="flex flex-wrap gap-2">
                  {teacher.specialization.map((spec, index) => (
                    <Badge key={index} variant="secondary">{spec}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Teaching Subjects</h4>
                <div className="flex flex-wrap gap-2">
                  {teacher.subjects.map((subject, index) => (
                    <Badge key={index} variant="outline">{subject}</Badge>
                  ))}
                </div>
              </div>

              {teacher.biography && (
                <div>
                  <h4 className="font-medium mb-2">Biography</h4>
                  <p className="text-muted-foreground leading-relaxed">{teacher.biography}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Current Classes */}
          <Card>
            <CardHeader>
              <CardTitle>Current Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teacher.currentClasses.map((classItem, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{classItem.grade} - {classItem.subject}</h4>
                      <p className="text-muted-foreground">{classItem.faculty}</p>
                      <p className="text-sm text-muted-foreground">{classItem.schedule}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{classItem.students} Students</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Student Results */}
          <Card>
            <CardHeader>
              <CardTitle>Student Results Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{teacher.studentResults.passRate}</p>
                  <p className="text-sm text-muted-foreground">Pass Rate</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{teacher.studentResults.averageGrade}</p>
                  <p className="text-sm text-muted-foreground">Avg Grade</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">{teacher.studentResults.topScorers}</p>
                  <p className="text-sm text-muted-foreground">Top Scorers</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">{teacher.studentResults.improvement}</p>
                  <p className="text-sm text-muted-foreground">Improvement</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Education Background */}
          <Card>
            <CardHeader>
              <CardTitle>Education Background</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teacher.education.map((edu, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                    <BookOpen className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-medium">{edu.degree}</h4>
                      <p className="text-muted-foreground">{edu.institution}</p>
                      <p className="text-sm text-muted-foreground">{edu.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Achievements & Awards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {teacher.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-yellow-600" />
                    <span>{achievement}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Student Feedback */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Student Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teacher.studentFeedback.map((feedback, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{feedback.student}</h4>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < feedback.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-1">{feedback.feedback}</p>
                    <p className="text-sm text-muted-foreground">Subject: {feedback.subject}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
