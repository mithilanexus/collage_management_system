"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Plus,
  ChevronRight,
  School,
  Building,
  Award
} from "lucide-react";
import Link from "next/link";

export default function CoursesManagement() {
  const [selectedLevel, setSelectedLevel] = useState(null);

  const educationLevels = [
    {
      id: "primary",
      title: "Primary Level",
      subtitle: "Grades 1-5",
      description: "Basic education foundation with core subjects",
      icon: School,
      color: "bg-green-500",
      stats: {
        classes: 5,
        subjects: 6,
        students: 450
      },
      route: "/admin/courses/primary"
    },
    {
      id: "secondary", 
      title: "Secondary Level",
      subtitle: "Grades 6-12",
      description: "Faculty-based education system with specialized subjects",
      icon: BookOpen,
      color: "bg-blue-500",
      stats: {
        faculties: 5,
        classes: 7,
        subjects: 25,
        students: 680
      },
      route: "/admin/courses/secondary"
    },
    {
      id: "bachelor",
      title: "Bachelor Level", 
      subtitle: "Undergraduate Programs",
      description: "Professional degree programs and specialized courses",
      icon: GraduationCap,
      color: "bg-purple-500",
      stats: {
        programs: 8,
        semesters: 8,
        subjects: 45,
        students: 320
      },
      route: "/admin/courses/bachelor"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Course Management
          </h1>
          <p className="text-muted-foreground">
            Manage academic structure, faculties, and subjects across all education levels
          </p>
        </div>
        <Link href="/admin/courses/add-course">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add New Course
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
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Total Classes</p>
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
                <p className="text-2xl font-bold">76</p>
                <p className="text-sm text-muted-foreground">Total Subjects</p>
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
                <p className="text-2xl font-bold">13</p>
                <p className="text-sm text-muted-foreground">Faculties</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">1,450</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Education Levels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {educationLevels.map((level) => {
          const IconComponent = level.icon;
          return (
            <Card key={level.id} className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 ${level.color} rounded-lg`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
                <CardTitle className="text-xl">{level.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{level.subtitle}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {level.description}
                </p>
                
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(level.stats).map(([key, value]) => (
                    <div key={key} className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-lg font-bold text-foreground">{value}</p>
                      <p className="text-xs text-muted-foreground capitalize">{key}</p>
                    </div>
                  ))}
                </div>

                <Link href={level.route}>
                  <Button className="w-full mt-4 group-hover:bg-primary/90">
                    Manage {level.title}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/admin/courses/subjects">
              <Button variant="outline" className="flex items-center gap-2 h-auto p-4 w-full">
                <Plus className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-medium">Manage Subjects</p>
                  <p className="text-sm text-muted-foreground">View and manage all subjects</p>
                </div>
              </Button>
            </Link>

            <Link href="/admin/courses/secondary/add-faculty">
              <Button variant="outline" className="flex items-center gap-2 h-auto p-4 w-full">
                <Building className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-medium">Add Faculty</p>
                  <p className="text-sm text-muted-foreground">Create new faculty division</p>
                </div>
              </Button>
            </Link>

            <Link href="/admin/courses/structure">
              <Button variant="outline" className="flex items-center gap-2 h-auto p-4 w-full">
                <Award className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-medium">Course Structure</p>
                  <p className="text-sm text-muted-foreground">View complete academic structure</p>
                </div>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
