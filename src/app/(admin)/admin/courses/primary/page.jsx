"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft,
  Search,
  Plus,
  Edit,
  Trash2,
  BookOpen,
  Users,
  Clock,
  School
} from "lucide-react";
import Link from "next/link";

export default function PrimaryLevel() {
  const [searchTerm, setSearchTerm] = useState("");

  const primaryClasses = [
    {
      id: 1,
      grade: "Grade 1",
      nepaliName: "कक्षा १",
      students: 45,
      subjects: ["Nepali", "English", "Math", "Science", "Social Studies", "Health & Physical Education"],
      weeklyHours: 30,
      sections: 2
    },
    {
      id: 2,
      grade: "Grade 2", 
      nepaliName: "कक्षा २",
      students: 48,
      subjects: ["Nepali", "English", "Math", "Science", "Social Studies", "Health & Physical Education"],
      weeklyHours: 30,
      sections: 2
    },
    {
      id: 3,
      grade: "Grade 3",
      nepaliName: "कक्षा ३", 
      students: 52,
      subjects: ["Nepali", "English", "Math", "Science", "Social Studies", "Health & Physical Education", "Computer"],
      weeklyHours: 32,
      sections: 2
    },
    {
      id: 4,
      grade: "Grade 4",
      nepaliName: "कक्षा ४",
      students: 49,
      subjects: ["Nepali", "English", "Math", "Science", "Social Studies", "Health & Physical Education", "Computer"],
      weeklyHours: 32,
      sections: 2
    },
    {
      id: 5,
      grade: "Grade 5",
      nepaliName: "कक्षा ५",
      students: 46,
      subjects: ["Nepali", "English", "Math", "Science", "Social Studies", "Health & Physical Education", "Computer", "Moral Education"],
      weeklyHours: 35,
      sections: 2
    }
  ];

  const coreSubjects = [
    { name: "Nepali", code: "NEP", type: "Language", mandatory: true },
    { name: "English", code: "ENG", type: "Language", mandatory: true },
    { name: "Mathematics", code: "MATH", type: "Science", mandatory: true },
    { name: "Science", code: "SCI", type: "Science", mandatory: true },
    { name: "Social Studies", code: "SS", type: "Social", mandatory: true },
    { name: "Health & Physical Education", code: "HPE", type: "Physical", mandatory: true },
    { name: "Computer", code: "COMP", type: "Technology", mandatory: false },
    { name: "Moral Education", code: "ME", type: "Ethics", mandatory: false }
  ];

  const filteredClasses = primaryClasses.filter(cls =>
    cls.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.nepaliName.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/courses">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Courses
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
              <School className="w-8 h-8 text-green-600" />
              Primary Level Management
            </h1>
            <p className="text-muted-foreground">
              Manage classes, subjects, and curriculum for Grades 1-5
            </p>
          </div>
        </div>
        <Link href="/admin/courses/primary/add">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add New Class
          </Button>
        </Link>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <School className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-muted-foreground">Total Grades</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">Core Subjects</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">240</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
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
                <p className="text-2xl font-bold">32</p>
                <p className="text-sm text-muted-foreground">Avg Weekly Hours</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search classes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              Filter
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
                <div>
                  <CardTitle className="text-lg">{cls.grade}</CardTitle>
                  <p className="text-sm text-muted-foreground">{cls.nepaliName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/admin/courses/primary/${cls.id}/edit`}>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
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
                  <p className="text-lg font-bold text-foreground">{cls.weeklyHours}</p>
                  <p className="text-xs text-muted-foreground">Hours/Week</p>
                </div>
              </div>

              {/* Subjects */}
              <div>
                <p className="text-sm font-medium mb-2">Subjects ({cls.subjects.length})</p>
                <div className="flex flex-wrap gap-1">
                  {cls.subjects.slice(0, 4).map((subject, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {subject}
                    </Badge>
                  ))}
                  {cls.subjects.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{cls.subjects.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>

              <Link href={`/admin/courses/primary/${cls.id}`}>
                <Button className="w-full" variant="outline">
                  Manage {cls.grade}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Core Subjects Section */}
      <Card>
        <CardHeader>
          <CardTitle>Core Subjects for Primary Level</CardTitle>
          <p className="text-sm text-muted-foreground">
            Standard subjects across all primary grades
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {coreSubjects.map((subject, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{subject.name}</h4>
                  {subject.mandatory && (
                    <Badge variant="default" className="text-xs">Required</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-1">Code: {subject.code}</p>
                <p className="text-sm text-muted-foreground">Type: {subject.type}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
