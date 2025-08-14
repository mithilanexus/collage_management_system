
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  GraduationCap,
  Edit,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  Users,
  Star,
  Download,
  MessageSquare,
  Clock,
  TrendingUp
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function BachelorTeacherDetailPage() {
  const params = useParams();
  const teacherId = params.id;

  // Mock data - in real app, fetch based on teacherId
  const teacher = {
    id: "bt_001",
    teacherId: "BT001",
    name: "Dr. Rajesh Kumar Sharma",
    nepaliName: "डा. राजेश कुमार शर्मा",
    email: "rajesh.sharma@college.edu",
    phone: "+977-9841234567",
    position: "Professor",
    department: "Computer Science",
    program: "BIT",
    qualification: "Ph.D. Computer Science, MIT, USA",
    experience: "15 years",
    specialization: ["Software Engineering", "Database Systems", "Artificial Intelligence", "Machine Learning"],
    subjects: ["Database Management", "Software Engineering", "Research Methodology", "Advanced Programming"],
    joiningDate: "2020-03-15",
    status: "Active",
    avatar: "/api/placeholder/150/150",
    address: "Kathmandu-32, Baneshwor, Nepal",
    salary: "NPR 80,000",
    workload: "18 hrs/week",
    rating: 4.8,
    publications: 25,
    projects: 8,
    biography: "Dr. Rajesh Kumar Sharma is a renowned professor in Computer Science with extensive experience in software engineering and database systems. He has published numerous research papers in international journals and has been instrumental in curriculum development for undergraduate programs.",
    education: [
      {
        degree: "Ph.D. Computer Science",
        institution: "Massachusetts Institute of Technology (MIT), USA",
        year: "2008"
      },
      {
        degree: "M.S. Computer Science",
        institution: "Stanford University, USA", 
        year: "2004"
      },
      {
        degree: "B.E. Computer Engineering",
        institution: "Tribhuvan University, Nepal",
        year: "2002"
      }
    ],
    achievements: [
      "Best Teacher Award 2023",
      "Research Excellence Award 2022",
      "Outstanding Faculty Recognition 2021",
      "Innovation in Teaching Award 2020"
    ],
    recentPublications: [
      {
        title: "Advanced Database Optimization Techniques",
        journal: "IEEE Transactions on Knowledge and Data Engineering",
        year: "2023"
      },
      {
        title: "Machine Learning Applications in Software Engineering",
        journal: "ACM Computing Surveys",
        year: "2023"
      },
      {
        title: "Scalable Database Architecture for Cloud Computing",
        journal: "Journal of Systems and Software",
        year: "2022"
      }
    ],
    currentProjects: [
      {
        title: "AI-Powered Code Review System",
        status: "In Progress",
        completion: "75%"
      },
      {
        title: "Database Performance Optimization Framework",
        status: "Planning",
        completion: "20%"
      }
    ],
    studentFeedback: [
      {
        student: "Ram Prasad Sharma",
        feedback: "Excellent teaching methodology and very supportive",
        rating: 5,
        subject: "Database Management"
      },
      {
        student: "Sita Kumari Poudel", 
        feedback: "Complex topics explained in simple way",
        rating: 5,
        subject: "Software Engineering"
      },
      {
        student: "Krishna Bahadur Thapa",
        feedback: "Great mentor for research projects",
        rating: 4,
        subject: "Research Methodology"
      }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/management/teachers/bachelor">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Teachers
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
              <GraduationCap className="w-8 h-8 text-purple-600" />
              Teacher Profile
            </h1>
            <p className="text-muted-foreground">
              Detailed information about the teacher
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export CV
          </Button>
          <Link href={`/admin/management/teachers/bachelor/${teacher.id}/edit`}>
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
                <div className="w-32 h-32 mx-auto rounded-lg bg-purple-100 flex items-center justify-center">
                  <GraduationCap className="w-16 h-16 text-purple-600" />
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
                    <span>{teacher.department}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <GraduationCap className="w-4 h-4" />
                    <span>{teacher.program}</span>
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

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{teacher.publications}</p>
                  <p className="text-sm text-muted-foreground">Publications</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{teacher.projects}</p>
                  <p className="text-sm text-muted-foreground">Projects</p>
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

          {/* Education Background */}
          <Card>
            <CardHeader>
              <CardTitle>Education Background</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teacher.education.map((edu, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                    <GraduationCap className="w-5 h-5 text-purple-600 mt-1" />
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

          {/* Recent Publications */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Publications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teacher.recentPublications.map((pub, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h4 className="font-medium">{pub.title}</h4>
                    <p className="text-muted-foreground">{pub.journal}</p>
                    <p className="text-sm text-muted-foreground">{pub.year}</p>
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
