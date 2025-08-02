"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  Search,
  Plus,
  Edit,
  Trash2,
  BookOpen,
  Users,
  Clock,
  School,
  Eye,
  Award
} from "lucide-react";
import Link from "next/link";

export default function MiddleSecondaryManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  const middleSecondaryClasses = [
    {
      id: "grade9",
      grade: "Grade 9",
      nepaliName: "कक्षा ९",
      students: 55,
      sections: 2,
      subjects: [
        "Nepali", "English", "Mathematics", "Science", "Social Studies",
        "Health & Physical Education", "Computer", "Optional Mathematics", "Occupation"
      ],
      weeklyHours: 40,
      ageGroup: "14-15 years",
      classTeacher: "Mr. Dipak Sharma",
      description: "SEE preparation foundation year",
      examPrep: "SEE Foundation",
      specialFocus: "Basic concept building for SEE"
    },
    {
      id: "grade10",
      grade: "Grade 10", 
      nepaliName: "कक्षा १०",
      students: 52,
      sections: 2,
      subjects: [
        "Nepali", "English", "Mathematics", "Science", "Social Studies",
        "Health & Physical Education", "Computer", "Optional Mathematics", "Occupation"
      ],
      weeklyHours: 42,
      ageGroup: "15-16 years",
      classTeacher: "Mrs. Sita Poudel",
      description: "SEE examination preparation year",
      examPrep: "SEE Final",
      specialFocus: "Intensive SEE preparation and practice"
    }
  ];

  const filteredClasses = middleSecondaryClasses.filter(cls =>
    cls.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.nepaliName.includes(searchTerm)
  );

  const totalStats = {
    students: middleSecondaryClasses.reduce((sum, cls) => sum + cls.students, 0),
    sections: middleSecondaryClasses.reduce((sum, cls) => sum + cls.sections, 0),
    subjects: [...new Set(middleSecondaryClasses.flatMap(cls => cls.subjects))].length,
    avgHours: Math.round(middleSecondaryClasses.reduce((sum, cls) => sum + cls.weeklyHours, 0) / middleSecondaryClasses.length)
  };

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
              <Award className="w-8 h-8 text-orange-600" />
              Secondary Level Management
            </h1>
            <p className="text-muted-foreground">
              Manage Grades 9-10 (Ages 14-16) - SEE Preparation
            </p>
          </div>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New Grade
        </Button>
      </div>

      {/* SEE Preparation Alert */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Award className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-orange-800">SEE Preparation Focus</h3>
              <p className="text-sm text-orange-700">
                These grades are focused on Secondary Education Examination (SEE) preparation with intensive study programs.
              </p>
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
                <p className="text-2xl font-bold">{totalStats.students}</p>
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
                <p className="text-2xl font-bold">{totalStats.sections}</p>
                <p className="text-sm text-muted-foreground">Total Sections</p>
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
                <p className="text-2xl font-bold">{totalStats.subjects}</p>
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
                <p className="text-2xl font-bold">{totalStats.avgHours}</p>
                <p className="text-sm text-muted-foreground">Avg Hours/Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search grades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Grade
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredClasses.map((cls) => (
          <Card key={cls.id} className="hover:shadow-lg transition-all duration-300 border-orange-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-orange-500 rounded-lg">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{cls.grade}</CardTitle>
                    <p className="text-sm text-muted-foreground">{cls.nepaliName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/admin/courses/secondary/middle/${cls.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="default" className="bg-orange-500">{cls.examPrep}</Badge>
                <Badge variant="outline">{cls.ageGroup}</Badge>
              </div>
              
              <p className="text-sm text-muted-foreground">{cls.description}</p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <p className="text-lg font-bold text-foreground">{cls.students}</p>
                  <p className="text-xs text-muted-foreground">Students</p>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <p className="text-lg font-bold text-foreground">{cls.sections}</p>
                  <p className="text-xs text-muted-foreground">Sections</p>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <p className="text-lg font-bold text-foreground">{cls.subjects.length}</p>
                  <p className="text-xs text-muted-foreground">Subjects</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Weekly Hours:</span>
                  <span>{cls.weeklyHours}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Class Teacher:</span>
                  <span>{cls.classTeacher}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Special Focus:</span>
                  <span className="text-xs">{cls.specialFocus}</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">SEE Subjects:</p>
                <div className="flex flex-wrap gap-1">
                  {cls.subjects.slice(0, 4).map((subject, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">{subject}</Badge>
                  ))}
                  {cls.subjects.length > 4 && (
                    <Badge variant="outline" className="text-xs">+{cls.subjects.length - 4} more</Badge>
                  )}
                </div>
              </div>

              <Link href={`/admin/courses/secondary/middle/${cls.id}`}>
                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                  Manage {cls.grade}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* SEE Preparation Tools */}
      <Card>
        <CardHeader>
          <CardTitle>SEE Preparation Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
              <BookOpen className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">Mock Tests</p>
                <p className="text-sm text-muted-foreground">Create SEE practice tests</p>
              </div>
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
              <Award className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">Exam Schedule</p>
                <p className="text-sm text-muted-foreground">Manage exam timetable</p>
              </div>
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
              <Users className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">Study Groups</p>
                <p className="text-sm text-muted-foreground">Organize study sessions</p>
              </div>
            </Button>

            <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
              <Clock className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">Extra Classes</p>
                <p className="text-sm text-muted-foreground">Schedule additional support</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
