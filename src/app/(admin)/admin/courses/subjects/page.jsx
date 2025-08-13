
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  BookOpen,
  GraduationCap,
  School,
  Users,
  Plus,
  ArrowRight,
  Target
} from "lucide-react";
import Link from "next/link";

export default function SubjectManagement() {
  const subjectCategories = [
    {
      id: "primary",
      name: "Primary Level",
      nepaliName: "प्राथमिक तह",
      icon: School,
      color: "bg-green-500",
      description: "Subjects for grades 1-5",
      totalSubjects: 8,
      activeSubjects: 7,
      levels: ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5"],
      href: "/admin/courses/subjects/primary"
    },
    {
      id: "secondary",
      name: "Secondary Level", 
      nepaliName: "माध्यमिक तह",
      icon: BookOpen,
      color: "bg-blue-500",
      description: "Subjects for grades 6-12",
      totalSubjects: 25,
      activeSubjects: 22,
      levels: ["Grade 6-8 (Basic)", "Grade 9-10 (Secondary)", "Grade 11-12 (Higher Secondary)"],
      href: "/admin/courses/subjects/secondary"
    },
    {
      id: "bachelor",
      name: "Bachelor Level",
      nepaliName: "स्नातक तह", 
      icon: GraduationCap,
      color: "bg-purple-500",
      description: "University level subjects and courses",
      totalSubjects: 45,
      activeSubjects: 40,
      levels: ["4 Year Programs", "Semester System", "Faculty-wise Subjects"],
      href: "/admin/courses/subjects/bachelor"
    }
  ];

  const stats = [
    {
      label: "Total Subjects",
      value: "78",
      icon: BookOpen,
      change: "+5 this month"
    },
    {
      label: "Active Subjects", 
      value: "69",
      icon: Target,
      change: "88% active rate"
    },
    {
      label: "Subject Categories",
      value: "3",
      icon: School,
      change: "All levels covered"
    },
    {
      label: "Enrolled Students",
      value: "2,847",
      icon: Users,
      change: "+12% this semester"
    }
  ];

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
              <BookOpen className="w-8 h-8 text-blue-600" />
              Subject Management
            </h1>
            <p className="text-muted-foreground">
              Manage subjects across all academic levels
            </p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Subject Categories */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Subject Categories</h2>
          <Badge variant="outline" className="text-sm">
            3 Academic Levels
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {subjectCategories.map((category) => (
            <Card key={category.id} className="hover:shadow-lg transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {category.activeSubjects}/{category.totalSubjects} Active
                  </Badge>
                </div>
                <div>
                  <CardTitle className="text-xl mb-1">{category.name}</CardTitle>
                  <p className="text-sm text-muted-foreground font-medium">{category.nepaliName}</p>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{category.description}</p>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Coverage:</h4>
                  <div className="space-y-1">
                    {category.levels.map((level, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        <span>{level}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <Link href={category.href}>
                    <Button className="w-full group-hover:bg-primary/90 transition-colors">
                      <span>Manage Subjects</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/admin/courses/subjects/primary">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="w-4 h-4 mr-2" />
                Add Primary Subject
              </Button>
            </Link>
            <Link href="/admin/courses/subjects/secondary">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="w-4 h-4 mr-2" />
                Add Secondary Subject  
              </Button>
            </Link>
            <Link href="/admin/courses/subjects/bachelor">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="w-4 h-4 mr-2" />
                Add Bachelor Subject
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
