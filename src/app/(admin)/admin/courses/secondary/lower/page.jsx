"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Eye
} from "lucide-react";
import Link from "next/link";

export default function LowerSecondaryManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  const lowerSecondaryClasses = [
    {
      id: "grade6",
      grade: "Grade 6",
      nepaliName: "कक्षा ६",
      students: 65,
      sections: 3,
      subjects: [
        "Nepali", "English", "Mathematics", "Science", "Social Studies", 
        "Health & Physical Education", "Computer", "Moral Education"
      ],
      weeklyHours: 35,
      ageGroup: "11-12 years",
      classTeacher: "Mrs. Sunita Sharma",
      description: "Foundation level for secondary education"
    },
    {
      id: "grade7",
      grade: "Grade 7", 
      nepaliName: "कक्षा ७",
      students: 62,
      sections: 3,
      subjects: [
        "Nepali", "English", "Mathematics", "Science", "Social Studies",
        "Health & Physical Education", "Computer", "Moral Education", "Optional Mathematics"
      ],
      weeklyHours: 36,
      ageGroup: "12-13 years",
      classTeacher: "Mr. Rajesh Thapa",
      description: "Intermediate foundation with optional subjects"
    },
    {
      id: "grade8",
      grade: "Grade 8",
      nepaliName: "कक्षा ८", 
      students: 58,
      sections: 3,
      subjects: [
        "Nepali", "English", "Mathematics", "Science", "Social Studies",
        "Health & Physical Education", "Computer", "Moral Education", "Optional Mathematics", "Occupation"
      ],
      weeklyHours: 38,
      ageGroup: "13-14 years",
      classTeacher: "Mrs. Kamala Devi",
      description: "Pre-secondary preparation with career orientation"
    }
  ];

  const filteredClasses = lowerSecondaryClasses.filter(cls =>
    cls.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.nepaliName.includes(searchTerm)
  );

  const totalStats = {
    students: lowerSecondaryClasses.reduce((sum, cls) => sum + cls.students, 0),
    sections: lowerSecondaryClasses.reduce((sum, cls) => sum + cls.sections, 0),
    subjects: [...new Set(lowerSecondaryClasses.flatMap(cls => cls.subjects))].length,
    avgHours: Math.round(lowerSecondaryClasses.reduce((sum, cls) => sum + cls.weeklyHours, 0) / lowerSecondaryClasses.length)
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
              <School className="w-8 h-8 text-blue-600" />
              Lower Secondary Management
            </h1>
            <p className="text-muted-foreground">
              Manage Grades 6-8 (Ages 11-14) - Foundation Secondary Education
            </p>
          </div>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New Grade
        </Button>
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
                <p className="text-sm text-muted-foreground">Unique Subjects</p>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredClasses.map((cls) => (
          <Card key={cls.id} className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-500 rounded-lg">
                    <School className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{cls.grade}</CardTitle>
                    <p className="text-sm text-muted-foreground">{cls.nepaliName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/admin/courses/secondary/lower/${cls.id}`}>
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
              <p className="text-sm text-muted-foreground">{cls.description}</p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-lg font-bold text-foreground">{cls.students}</p>
                  <p className="text-xs text-muted-foreground">Students</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-lg font-bold text-foreground">{cls.sections}</p>
                  <p className="text-xs text-muted-foreground">Sections</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-lg font-bold text-foreground">{cls.subjects.length}</p>
                  <p className="text-xs text-muted-foreground">Subjects</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Age Group:</span>
                  <span>{cls.ageGroup}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Weekly Hours:</span>
                  <span>{cls.weeklyHours}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Class Teacher:</span>
                  <span>{cls.classTeacher}</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Core Subjects:</p>
                <div className="flex flex-wrap gap-1">
                  {cls.subjects.slice(0, 4).map((subject, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">{subject}</Badge>
                  ))}
                  {cls.subjects.length > 4 && (
                    <Badge variant="outline" className="text-xs">+{cls.subjects.length - 4} more</Badge>
                  )}
                </div>
              </div>

              <Link href={`/admin/courses/secondary/lower/${cls.id}`}>
                <Button className="w-full">
                  Manage {cls.grade}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
              <Plus className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">Add Subject</p>
                <p className="text-sm text-muted-foreground">Add new subject to grades</p>
              </div>
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
              <Users className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">Assign Teachers</p>
                <p className="text-sm text-muted-foreground">Manage teacher assignments</p>
              </div>
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
              <Clock className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">Create Schedule</p>
                <p className="text-sm text-muted-foreground">Generate class timetables</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
