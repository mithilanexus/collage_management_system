"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft,
  Edit,
  Trash2,
  GraduationCap,
  Users,
  BookOpen,
  Calendar,
  Clock,
  Loader2,
  Plus,
  Computer,
  Award,
  TrendingUp
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function BachelorProgramDetails() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [programData, setProgramData] = useState(null);

  // Mock data - in real app this would come from API
  const mockProgramData = {
    bit: {
      id: "bit",
      name: "Bachelor of Information Technology",
      shortName: "BIT",
      nepaliName: "सूचना प्रविधि स्नातक",
      icon: Computer,
      color: "bg-blue-500",
      duration: "4 Years",
      semesters: 8,
      students: 45,
      totalCredits: 128,
      description: "Comprehensive IT program covering software development, networking, and system administration with hands-on practical experience.",
      eligibility: "Minimum C+ in +2 Science or Management with Mathematics",
      specializations: ["Software Engineering", "Network Administration", "Web Development", "Database Management", "Cybersecurity"],
      careerPaths: ["Software Developer", "System Administrator", "IT Consultant", "Project Manager", "Database Administrator"],
      coreSubjects: [
        "Programming Fundamentals", "Data Structures", "Database Systems", "Computer Networks", 
        "Software Engineering", "Web Technologies", "Operating Systems", "System Analysis"
      ],
      semesterStructure: [
        {
          semester: 1,
          subjects: ["Programming Fundamentals", "Mathematics I", "English I", "Digital Logic"],
          credits: 16
        },
        {
          semester: 2,
          subjects: ["Object Oriented Programming", "Mathematics II", "English II", "Computer Architecture"],
          credits: 16
        },
        {
          semester: 3,
          subjects: ["Data Structures", "Statistics", "Discrete Mathematics", "Electronics"],
          credits: 16
        },
        {
          semester: 4,
          subjects: ["Database Systems", "Operating Systems", "Computer Graphics", "Numerical Methods"],
          credits: 16
        },
        {
          semester: 5,
          subjects: ["Software Engineering", "Computer Networks", "Web Technologies", "Project I"],
          credits: 16
        },
        {
          semester: 6,
          subjects: ["System Analysis", "Network Security", "Mobile Programming", "Project II"],
          credits: 16
        },
        {
          semester: 7,
          subjects: ["Advanced Database", "Cloud Computing", "AI Fundamentals", "Internship"],
          credits: 16
        },
        {
          semester: 8,
          subjects: ["Capstone Project", "Professional Ethics", "Entrepreneurship", "Electives"],
          credits: 16
        }
      ],
      faculty: [
        { name: "Dr. Rajesh Kumar", position: "Program Coordinator", qualification: "Ph.D. Computer Science" },
        { name: "Prof. Sita Sharma", position: "Senior Lecturer", qualification: "M.Tech Software Engineering" },
        { name: "Mr. Amit Thapa", position: "Lecturer", qualification: "M.Sc. IT" },
        { name: "Ms. Priya Poudel", position: "Assistant Lecturer", qualification: "M.Sc. Computer Science" }
      ],
      statistics: {
        totalStudents: 45,
        firstYear: 15,
        secondYear: 12,
        thirdYear: 10,
        fourthYear: 8,
        maleStudents: 28,
        femaleStudents: 17,
        averageGPA: 3.2,
        graduationRate: 92.5,
        employmentRate: 88.0
      },
      facilities: [
        "Computer Lab with 50 workstations",
        "Network Lab",
        "Software Development Lab",
        "Project Room",
        "Digital Library Access"
      ],
      partnerships: [
        "Microsoft Academic Alliance",
        "Oracle Academy",
        "Cisco Networking Academy",
        "Local IT Companies"
      ]
    }
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const data = mockProgramData[params.id];
      if (data) {
        setProgramData(data);
      }
      setLoading(false);
    }, 1000);
  }, [params.id]);

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this program? This action cannot be undone.")) {
      console.log("Deleting program:", params.id);
      toast.success("Program deleted successfully!");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading program details...</p>
        </div>
      </div>
    );
  }

  if (!programData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <GraduationCap className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Program Not Found</h2>
          <p className="text-muted-foreground mb-4">The requested program could not be found.</p>
          <Link href="/admin/courses/bachelor">
            <Button>Back to Bachelor Level</Button>
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = programData.icon;

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
              <div className={`p-2 ${programData.color} rounded-lg`}>
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              {programData.shortName}
            </h1>
            <p className="text-muted-foreground">
              {programData.nepaliName} • {programData.duration}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit Program
          </Button>
          <Button variant="outline" size="sm" onClick={handleDelete} className="text-red-600 hover:text-red-700">
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
                <BookOpen className="w-6 h-6 text-green-600" />
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
              <div className="p-3 bg-purple-100 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{programData.semesters}</p>
                <p className="text-sm text-muted-foreground">Semesters</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{programData.statistics.graduationRate}%</p>
                <p className="text-sm text-muted-foreground">Graduation Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="faculty">Faculty</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
          <TabsTrigger value="careers">Careers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Program Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Full Name</Label>
                  <p className="font-medium">{programData.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Duration</Label>
                  <p className="font-medium">{programData.duration}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Eligibility</Label>
                  <p className="font-medium">{programData.eligibility}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                  <p className="mt-1">{programData.description}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Specializations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {programData.specializations.map((spec, index) => (
                    <Badge key={index} variant="secondary">{spec}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="curriculum" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Core Subjects */}
            <Card>
              <CardHeader>
                <CardTitle>Core Subjects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {programData.coreSubjects.map((subject, index) => (
                    <div key={index} className="p-2 border rounded flex items-center justify-between">
                      <span className="font-medium">{subject}</span>
                      <Badge variant="outline" className="text-xs">Core</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Semester Structure */}
            <Card>
              <CardHeader>
                <CardTitle>Semester Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {programData.semesterStructure.slice(0, 4).map((sem, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Semester {sem.semester}</h4>
                        <Badge variant="outline">{sem.credits} Credits</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>{sem.subjects.slice(0, 2).join(", ")}...</p>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    View Complete Curriculum
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="faculty" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Teaching Faculty</h3>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Faculty
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {programData.faculty.map((member, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{member.name}</h4>
                      <p className="text-sm text-muted-foreground">{member.position}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Qualification: {member.qualification}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{programData.statistics.firstYear}</p>
                      <p className="text-sm text-muted-foreground">First Year</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{programData.statistics.secondYear}</p>
                      <p className="text-sm text-muted-foreground">Second Year</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">{programData.statistics.thirdYear}</p>
                      <p className="text-sm text-muted-foreground">Third Year</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-orange-600">{programData.statistics.fourthYear}</p>
                      <p className="text-sm text-muted-foreground">Fourth Year</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Academic Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Average GPA</span>
                    <Badge variant="secondary">{programData.statistics.averageGPA}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Graduation Rate</span>
                    <Badge variant="default">{programData.statistics.graduationRate}%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Employment Rate</span>
                    <Badge variant="default">{programData.statistics.employmentRate}%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Male Students</span>
                    <span className="font-medium">{programData.statistics.maleStudents}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Female Students</span>
                    <span className="font-medium">{programData.statistics.femaleStudents}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="facilities" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Facilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {programData.facilities.map((facility, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 border rounded">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-sm">{facility}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Industry Partnerships</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {programData.partnerships.map((partnership, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 border rounded">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">{partnership}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="careers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Career Opportunities</CardTitle>
              <p className="text-sm text-muted-foreground">
                Potential career paths for program graduates
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {programData.careerPaths.map((career, index) => (
                  <div key={index} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <p className="font-medium">{career}</p>
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
