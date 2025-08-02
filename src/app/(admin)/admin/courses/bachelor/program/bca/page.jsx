"use client";

import { useState } from "react";
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
  GraduationCap,
  Building,
  Award,
  Calendar,
  Monitor,
  Code,
  Database
} from "lucide-react";
import Link from "next/link";

export default function BCADetails() {
  const [activeTab, setActiveTab] = useState("overview");

  const programData = {
    name: "Bachelor of Computer Application",
    shortName: "BCA",
    nepaliName: "कम्प्युटर अनुप्रयोगमा स्नातक",
    faculty: "Science & Technology",
    duration: "4 Years (8 Semesters)",
    totalCredits: 120,
    students: 150,
    batches: 4,
    intake: 50,
    description: "Comprehensive computer application program focusing on software development, programming, and IT solutions.",
    objectives: [
      "Develop strong programming and software development skills",
      "Master database management and system analysis",
      "Build expertise in web and mobile application development",
      "Prepare for IT industry and software engineering careers"
    ],
    careerPaths: [
      "Software Developer", "Web Developer", "Database Administrator", 
      "System Analyst", "IT Consultant", "Mobile App Developer", "Software Engineer", "Project Manager"
    ],
    specializations: [
      { name: "Software Development", students: 45, description: "Focus on application development and programming" },
      { name: "Web Technologies", students: 40, description: "Specialization in web development and design" },
      { name: "Database Management", students: 35, description: "Emphasis on database design and administration" },
      { name: "Network & Security", students: 30, description: "Focus on network administration and cybersecurity" }
    ],
    semesters: [
      {
        semester: 1,
        subjects: [
          { name: "Computer Fundamentals", credits: 3, type: "Core", teacher: "Mr. Suresh Rai" },
          { name: "Programming in C", credits: 4, type: "Core", teacher: "Dr. Prakash Sharma" },
          { name: "Mathematics I", credits: 3, type: "Core", teacher: "Mrs. Sita Devi" },
          { name: "English", credits: 3, type: "Core", teacher: "Prof. Sarah Johnson" },
          { name: "Digital Logic", credits: 3, type: "Core", teacher: "Mr. Ram Bahadur" }
        ]
      },
      {
        semester: 2,
        subjects: [
          { name: "Data Structures", credits: 4, type: "Core", teacher: "Dr. Prakash Sharma" },
          { name: "Programming in C++", credits: 4, type: "Core", teacher: "Mr. Gopal Thapa" },
          { name: "Mathematics II", credits: 3, type: "Core", teacher: "Mrs. Sita Devi" },
          { name: "Computer Graphics", credits: 3, type: "Core", teacher: "Mr. Krishna Bahadur" },
          { name: "Statistics", credits: 3, type: "Core", teacher: "Mrs. Kamala Poudel" }
        ]
      },
      {
        semester: 3,
        subjects: [
          { name: "Database Management System", credits: 4, type: "Core", teacher: "Dr. Rajesh Thapa" },
          { name: "Object Oriented Programming", credits: 4, type: "Core", teacher: "Mr. Hari Sharma" },
          { name: "Web Technology", credits: 3, type: "Core", teacher: "Mrs. Anita Rai" },
          { name: "Computer Networks", credits: 3, type: "Core", teacher: "Mr. Bikash Thapa" },
          { name: "Numerical Methods", credits: 3, type: "Core", teacher: "Dr. Radha Devi" }
        ]
      },
      {
        semester: 4,
        subjects: [
          { name: "Software Engineering", credits: 3, type: "Core", teacher: "Dr. Prakash Sharma" },
          { name: "Java Programming", credits: 4, type: "Core", teacher: "Mr. Suresh Rai" },
          { name: "Operating Systems", credits: 3, type: "Core", teacher: "Mr. Ram Bahadur" },
          { name: "System Analysis & Design", credits: 3, type: "Core", teacher: "Mrs. Mina Sharma" },
          { name: "Specialization Subject I", credits: 3, type: "Specialization", teacher: "Various" }
        ]
      }
    ],
    faculty_members: [
      { name: "Dr. Prakash Sharma", position: "Program Coordinator", qualification: "PhD in Computer Science", experience: "12 years" },
      { name: "Mr. Suresh Rai", position: "Senior Faculty", qualification: "M.Tech IT", experience: "10 years" },
      { name: "Dr. Rajesh Thapa", position: "Assistant Professor", qualification: "PhD in Information Systems", experience: "8 years" },
      { name: "Mrs. Anita Rai", position: "Lecturer", qualification: "MCA", experience: "6 years" }
    ],
    admission: {
      eligibility: "10+2 (Science/Management) with minimum 45% marks",
      intake: 50,
      duration: "4 Years (8 Semesters)",
      fees: "NPR 3,00,000 per year",
      scholarships: "Merit and need-based scholarships available"
    },
    facilities: [
      "Advanced Computer Labs", "Software Development Tools", "High-Speed Internet",
      "Project Development Lab", "Database Servers", "Mobile App Development Lab"
    ],
    placements: {
      averagePackage: "NPR 8,00,000",
      highestPackage: "NPR 15,00,000",
      placementRate: "90%",
      topRecruiters: ["F1Soft", "Leapfrog Technology", "Verisk Nepal", "Deerwalk", "CloudFactory"]
    },
    labs: [
      { name: "Programming Lab", capacity: 40, software: "Visual Studio, Eclipse, NetBeans" },
      { name: "Database Lab", capacity: 30, software: "Oracle, MySQL, MongoDB" },
      { name: "Web Development Lab", capacity: 35, software: "VS Code, XAMPP, Node.js" },
      { name: "Mobile Development Lab", capacity: 25, software: "Android Studio, Flutter, React Native" }
    ]
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
              <Monitor className="w-8 h-8 text-purple-600" />
              {programData.name}
            </h1>
            <p className="text-muted-foreground">
              {programData.shortName} • {programData.faculty} Faculty • {programData.duration}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit Program
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Batch
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{programData.students}</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Building className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{programData.batches}</p>
                <p className="text-sm text-muted-foreground">Active Batches</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{programData.totalCredits}</p>
                <p className="text-sm text-muted-foreground">Total Credits</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Code className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{programData.placements.placementRate}</p>
                <p className="text-sm text-muted-foreground">Placement Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="specializations">Specializations</TabsTrigger>
          <TabsTrigger value="labs">Labs</TabsTrigger>
          <TabsTrigger value="faculty">Faculty</TabsTrigger>
          <TabsTrigger value="placements">Placements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Program Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Program Name:</span>
                    <span className="font-medium">{programData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Short Name:</span>
                    <span className="font-medium">{programData.shortName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nepali Name:</span>
                    <span className="font-medium">{programData.nepaliName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Faculty:</span>
                    <span className="font-medium">{programData.faculty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">{programData.duration}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Description:</p>
                  <p className="text-sm text-muted-foreground">{programData.description}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Learning Objectives</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {programData.objectives.map((objective, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      {objective}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Career Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {programData.careerPaths.map((career, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">{career}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Program Facilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {programData.facilities.map((facility, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 border rounded">
                    <Monitor className="w-4 h-4 text-purple-600" />
                    <span className="text-sm">{facility}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="curriculum" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Semester-wise Curriculum</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {programData.semesters.map((semester, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Semester {semester.semester}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {semester.subjects.map((subject, subIndex) => (
                        <div key={subIndex} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div>
                            <p className="font-medium text-sm">{subject.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {subject.type} • {subject.teacher}
                            </p>
                          </div>
                          <Badge variant="outline">{subject.credits} Credits</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="specializations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Specializations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {programData.specializations.map((spec, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{spec.name}</h4>
                      <Badge variant="secondary">{spec.students} students</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{spec.description}</p>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: `${(spec.students / programData.students) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="labs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Computer Labs & Facilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {programData.labs.map((lab, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Database className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{lab.name}</h4>
                        <p className="text-sm text-muted-foreground">Capacity: {lab.capacity} students</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Available Software:</p>
                      <p className="text-sm text-muted-foreground">{lab.software}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faculty" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Faculty Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {programData.faculty_members.map((member, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">{member.position}</p>
                      </div>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>Qualification: {member.qualification}</p>
                      <p>Experience: {member.experience}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="placements" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Placement Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{programData.placements.placementRate}</p>
                    <p className="text-sm text-muted-foreground">Placement Rate</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-lg font-bold text-blue-600">{programData.placements.averagePackage}</p>
                      <p className="text-xs text-muted-foreground">Average Package</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <p className="text-lg font-bold text-purple-600">{programData.placements.highestPackage}</p>
                      <p className="text-xs text-muted-foreground">Highest Package</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top IT Recruiters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {programData.placements.topRecruiters.map((recruiter, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 border rounded">
                      <Code className="w-4 h-4 text-purple-600" />
                      <span className="text-sm">{recruiter}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
