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
  Building,
  Users,
  BookOpen,
  Calendar,
  User,
  Loader2,
  Plus,
  FlaskConical,
  Briefcase,
  Globe
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function FacultyDetails() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [facultyData, setFacultyData] = useState(null);

  // Mock data - in real app this would come from API
  const mockFacultyData = {
    science: {
      id: "science",
      name: "Science Faculty",
      nepaliName: "विज्ञान संकाय",
      icon: FlaskConical,
      color: "bg-blue-500",
      students: 150,
      description: "For students interested in medical, engineering, and scientific fields",
      eligibility: "Minimum C+ in SEE with Science and Mathematics",
      duration: "2 Years (Grades 11-12)",
      compulsorySubjects: [
        { name: "Physics", code: "PHY", teacher: "Dr. Ram Sharma", hours: 6 },
        { name: "Chemistry", code: "CHEM", teacher: "Mrs. Sita Devi", hours: 6 },
        { name: "Mathematics", code: "MATH", teacher: "Mr. Hari Prasad", hours: 6 },
        { name: "English", code: "ENG", teacher: "Ms. Sarah Johnson", hours: 4 },
        { name: "Nepali", code: "NEP", teacher: "Mrs. Kamala Sharma", hours: 4 }
      ],
      optionalSubjects: [
        { name: "Biology", code: "BIO", teacher: "Dr. Krishna Bahadur", hours: 6 },
        { name: "Computer Science", code: "COMP", teacher: "Mr. Rajesh Thapa", hours: 4 }
      ],
      teachers: [
        { name: "Dr. Ram Sharma", subject: "Physics", qualification: "Ph.D. Physics", experience: "15 years" },
        { name: "Mrs. Sita Devi", subject: "Chemistry", qualification: "M.Sc. Chemistry", experience: "12 years" },
        { name: "Mr. Hari Prasad", subject: "Mathematics", qualification: "M.Sc. Mathematics", experience: "10 years" },
        { name: "Ms. Sarah Johnson", subject: "English", qualification: "M.A. English", experience: "8 years" },
        { name: "Mrs. Kamala Sharma", subject: "Nepali", qualification: "M.A. Nepali", experience: "14 years" },
        { name: "Dr. Krishna Bahadur", subject: "Biology", qualification: "Ph.D. Biology", experience: "18 years" },
        { name: "Mr. Rajesh Thapa", subject: "Computer Science", qualification: "M.Sc. IT", experience: "6 years" }
      ],
      statistics: {
        totalStudents: 150,
        grade11Students: 78,
        grade12Students: 72,
        maleStudents: 85,
        femaleStudents: 65,
        averageGrade: "B+",
        passRate: 96.5
      },
      careerPaths: [
        "Medical Doctor", "Engineer", "Research Scientist", "Pharmacist", 
        "Biotechnologist", "Environmental Scientist", "Data Scientist"
      ],
      admissionRequirements: [
        "Minimum C+ grade in SEE",
        "Must have studied Science and Mathematics in Grade 10",
        "Pass entrance examination",
        "Medical certificate"
      ]
    }
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const data = mockFacultyData[params.id];
      if (data) {
        setFacultyData(data);
      }
      setLoading(false);
    }, 1000);
  }, [params.id]);

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this faculty? This action cannot be undone.")) {
      console.log("Deleting faculty:", params.id);
      toast.success("Faculty deleted successfully!");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading faculty details...</p>
        </div>
      </div>
    );
  }

  if (!facultyData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Building className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Faculty Not Found</h2>
          <p className="text-muted-foreground mb-4">The requested faculty could not be found.</p>
          <Link href="/admin/courses/secondary">
            <Button>Back to Secondary Level</Button>
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = facultyData.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/courses/secondary">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Secondary Level
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
              <div className={`p-2 ${facultyData.color} rounded-lg`}>
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              {facultyData.name}
            </h1>
            <p className="text-muted-foreground">
              {facultyData.nepaliName} • Higher Secondary Level
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit Faculty
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
                <p className="text-2xl font-bold">{facultyData.students}</p>
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
                <p className="text-2xl font-bold">{facultyData.compulsorySubjects.length + facultyData.optionalSubjects.length}</p>
                <p className="text-sm text-muted-foreground">Total Subjects</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <User className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{facultyData.teachers.length}</p>
                <p className="text-sm text-muted-foreground">Teachers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">Years Duration</p>
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
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="careers">Careers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Faculty Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                  <p className="mt-1">{facultyData.description}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Duration</Label>
                  <p className="font-medium">{facultyData.duration}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Eligibility</Label>
                  <p className="font-medium">{facultyData.eligibility}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Admission Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {facultyData.admissionRequirements.map((requirement, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-sm">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Compulsory Subjects */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Compulsory Subjects ({facultyData.compulsorySubjects.length})</CardTitle>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Subject
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {facultyData.compulsorySubjects.map((subject, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{subject.name}</h4>
                        <Badge variant="default" className="text-xs">Required</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>Code: {subject.code}</p>
                        <p>Weekly Hours: {subject.hours}</p>
                        <p>Teacher: {subject.teacher}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Optional Subjects */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Optional Subjects ({facultyData.optionalSubjects.length})</CardTitle>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Subject
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {facultyData.optionalSubjects.map((subject, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{subject.name}</h4>
                        <Badge variant="secondary" className="text-xs">Optional</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>Code: {subject.code}</p>
                        <p>Weekly Hours: {subject.hours}</p>
                        <p>Teacher: {subject.teacher}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {facultyData.teachers.map((teacher, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{teacher.name}</h4>
                      <p className="text-sm text-muted-foreground">{teacher.subject}</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Qualification: {teacher.qualification}</p>
                    <p>Experience: {teacher.experience}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{facultyData.statistics.totalStudents}</p>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{facultyData.statistics.grade11Students}</p>
                  <p className="text-sm text-muted-foreground">Grade 11</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">{facultyData.statistics.grade12Students}</p>
                  <p className="text-sm text-muted-foreground">Grade 12</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">{facultyData.statistics.passRate}%</p>
                  <p className="text-sm text-muted-foreground">Pass Rate</p>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium">Gender Distribution</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Male Students</span>
                      <span className="font-medium">{facultyData.statistics.maleStudents}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Female Students</span>
                      <span className="font-medium">{facultyData.statistics.femaleStudents}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Academic Performance</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Average Grade</span>
                      <Badge variant="secondary">{facultyData.statistics.averageGrade}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Pass Rate</span>
                      <Badge variant="default">{facultyData.statistics.passRate}%</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="careers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Career Opportunities</CardTitle>
              <p className="text-sm text-muted-foreground">
                Potential career paths for graduates of this faculty
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {facultyData.careerPaths.map((career, index) => (
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
