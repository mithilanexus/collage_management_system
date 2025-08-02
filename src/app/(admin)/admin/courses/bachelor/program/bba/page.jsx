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
  Briefcase,
  TrendingUp
} from "lucide-react";
import Link from "next/link";

export default function BBADetails() {
  const [activeTab, setActiveTab] = useState("overview");

  const programData = {
    name: "Bachelor of Business Administration",
    shortName: "BBA",
    nepaliName: "व्यापार प्रशासनमा स्नातक",
    faculty: "Management",
    duration: "4 Years (8 Semesters)",
    totalCredits: 126,
    students: 180,
    batches: 4,
    intake: 60,
    description: "Comprehensive business administration program preparing students for leadership roles in various industries.",
    objectives: [
      "Develop comprehensive understanding of business principles",
      "Build leadership and management skills",
      "Foster entrepreneurial thinking and innovation",
      "Prepare for global business environment"
    ],
    careerPaths: [
      "Business Manager", "Marketing Executive", "Financial Analyst", 
      "Human Resource Manager", "Entrepreneur", "Consultant", "Project Manager", "Operations Manager"
    ],
    specializations: [
      { name: "Marketing", students: 45, description: "Focus on market research, advertising, and brand management" },
      { name: "Finance", students: 52, description: "Emphasis on financial analysis, investment, and banking" },
      { name: "Human Resources", students: 38, description: "Specialization in talent management and organizational behavior" },
      { name: "General Management", students: 45, description: "Broad-based management skills across all business functions" }
    ],
    semesters: [
      {
        semester: 1,
        subjects: [
          { name: "Principles of Management", credits: 3, type: "Core", teacher: "Dr. Rajesh Sharma" },
          { name: "Business English", credits: 3, type: "Core", teacher: "Prof. Sarah Johnson" },
          { name: "Business Mathematics", credits: 3, type: "Core", teacher: "Mr. Prakash Thapa" },
          { name: "Microeconomics", credits: 3, type: "Core", teacher: "Dr. Kamala Devi" },
          { name: "Computer Applications", credits: 3, type: "Core", teacher: "Mr. Suresh Rai" }
        ]
      },
      {
        semester: 2,
        subjects: [
          { name: "Organizational Behavior", credits: 3, type: "Core", teacher: "Dr. Sita Poudel" },
          { name: "Business Communication", credits: 3, type: "Core", teacher: "Mrs. Lisa Brown" },
          { name: "Statistics for Business", credits: 3, type: "Core", teacher: "Mr. Ram Bahadur" },
          { name: "Macroeconomics", credits: 3, type: "Core", teacher: "Dr. Kamala Devi" },
          { name: "Financial Accounting", credits: 3, type: "Core", teacher: "Mrs. Mina Sharma" }
        ]
      },
      {
        semester: 3,
        subjects: [
          { name: "Marketing Management", credits: 3, type: "Core", teacher: "Dr. Gopal Thapa" },
          { name: "Human Resource Management", credits: 3, type: "Core", teacher: "Mrs. Anita Rai" },
          { name: "Financial Management", credits: 3, type: "Core", teacher: "Mr. Hari Sharma" },
          { name: "Operations Management", credits: 3, type: "Core", teacher: "Dr. Krishna Bahadur" },
          { name: "Business Law", credits: 3, type: "Core", teacher: "Adv. Tek Bahadur" }
        ]
      },
      {
        semester: 4,
        subjects: [
          { name: "Strategic Management", credits: 3, type: "Core", teacher: "Dr. Rajesh Sharma" },
          { name: "International Business", credits: 3, type: "Core", teacher: "Prof. Michael Wilson" },
          { name: "Entrepreneurship", credits: 3, type: "Core", teacher: "Mr. Bikash Thapa" },
          { name: "Research Methodology", credits: 3, type: "Core", teacher: "Dr. Radha Devi" },
          { name: "Specialization Subject I", credits: 3, type: "Specialization", teacher: "Various" }
        ]
      }
    ],
    faculty_members: [
      { name: "Dr. Rajesh Sharma", position: "Program Coordinator", qualification: "PhD in Management", experience: "15 years" },
      { name: "Prof. Sita Devi", position: "Senior Faculty", qualification: "MBA, PhD", experience: "12 years" },
      { name: "Mr. Prakash Thapa", position: "Assistant Professor", qualification: "MBA Finance", experience: "8 years" },
      { name: "Mrs. Kamala Poudel", position: "Lecturer", qualification: "MBA Marketing", experience: "6 years" }
    ],
    admission: {
      eligibility: "10+2 or equivalent with minimum 45% marks",
      intake: 60,
      duration: "4 Years (8 Semesters)",
      fees: "NPR 2,50,000 per year",
      scholarships: "Merit-based scholarships available"
    },
    facilities: [
      "Modern Computer Lab", "Business Simulation Software", "Library with Business Resources",
      "Seminar Halls", "Case Study Rooms", "Industry Interaction Programs"
    ],
    placements: {
      averagePackage: "NPR 6,00,000",
      highestPackage: "NPR 12,00,000",
      placementRate: "85%",
      topRecruiters: ["Himalayan Bank", "NIC Asia Bank", "Chaudhary Group", "IMS Group", "Golchha Organization"]
    }
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
              <Briefcase className="w-8 h-8 text-blue-600" />
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
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
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
              <div className="p-3 bg-purple-100 rounded-lg">
                <Award className="w-6 h-6 text-purple-600" />
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
                <TrendingUp className="w-6 h-6 text-orange-600" />
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
          <TabsTrigger value="faculty">Faculty</TabsTrigger>
          <TabsTrigger value="admission">Admission</TabsTrigger>
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
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
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
                    <Building className="w-4 h-4 text-blue-600" />
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
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(spec.students / programData.students) * 100}%` }}
                      ></div>
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
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-600" />
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

        <TabsContent value="admission" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Admission Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Eligibility Criteria</h4>
                    <p className="text-sm text-muted-foreground">{programData.admission.eligibility}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Annual Intake</h4>
                    <p className="text-2xl font-bold text-blue-600">{programData.admission.intake} students</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Scholarships</h4>
                    <p className="text-sm text-muted-foreground">{programData.admission.scholarships}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Program Duration</h4>
                    <p className="text-sm text-muted-foreground">{programData.admission.duration}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Annual Fees</h4>
                    <p className="text-2xl font-bold text-green-600">{programData.admission.fees}</p>
                  </div>
                </div>
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
                <CardTitle>Top Recruiters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {programData.placements.topRecruiters.map((recruiter, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 border rounded">
                      <Building className="w-4 h-4 text-blue-600" />
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
