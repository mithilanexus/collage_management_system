"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Plus,
    CalendarDays,
    ListTodo,
    CheckCircle,
    Clock,
    ChevronRight,
    School,
    BookOpen,
    GraduationCap
} from "lucide-react";
import Link from "next/link";

export default function ExamManagement() {
    const educationLevels = [
        {
            id: "primary",
            title: "Primary Level Exams",
            subtitle: "Grades 1-5",
            description: "Manage exam schedules and results for basic education.",
            icon: School,
            color: "bg-green-500",
            stats: {
                upcoming: 3,
                scheduled: 5,
                completed: 12
            },
            route: "/admin/exams/primary"
        },
        {
            id: "secondary",
            title: "Secondary Level Exams",
            subtitle: "Grades 6-12",
            description: "Handle faculty-based exam schedules and subject-specific tests.",
            icon: BookOpen,
            color: "bg-blue-500",
            stats: {
                upcoming: 7,
                scheduled: 10,
                completed: 25
            },
            route: "/admin/exams/secondary"
        },
        {
            id: "bachelor",
            title: "Bachelor Level Exams",
            subtitle: "Undergraduate Programs",
            description: "Manage professional degree exam schedules and semester exams.",
            icon: GraduationCap,
            color: "bg-purple-500",
            stats: {
                upcoming: 5,
                scheduled: 8,
                completed: 15
            },
            route: "/admin/exams/bachelor"
        }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                        Exam Management
                    </h1>
                    <p className="text-muted-foreground">
                        Manage upcoming exams, schedules, and results across all education levels
                    </p>
                </div>
                <Link href="/admin/exams/add-schedule">
                    <Button className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Create Schedule
                    </Button>
                </Link>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <CalendarDays className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">15</p>
                                <p className="text-sm text-muted-foreground">Total Upcoming Exams</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-orange-100 rounded-lg">
                                <ListTodo className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">23</p>
                                <p className="text-sm text-muted-foreground">Total Scheduled</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">52</p>
                                <p className="text-sm text-muted-foreground">Exams Completed</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Education Levels Exam Management */}
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
                                <div className="grid grid-cols-3 gap-4">
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
                        <Link href="/admin/exams/all-schedules">
                            <Button variant="outline" className="flex items-center gap-2 h-auto p-4 w-full">
                                <CalendarDays className="w-5 h-5" />
                                <div className="text-left">
                                    <p className="font-medium">View All Schedules</p>
                                    <p className="text-sm text-muted-foreground">Browse all upcoming and past exam schedules</p>
                                </div>
                            </Button>
                        </Link>

                        <Link href="/admin/exams/create-template">
                            <Button variant="outline" className="flex items-center gap-2 h-auto p-4 w-full">
                                <ListTodo className="w-5 h-5" />
                                <div className="text-left">
                                    <p className="font-medium">Create Exam Template</p>
                                    <p className="text-sm text-muted-foreground">Design a template for new exam papers</p>
                                </div>
                            </Button>
                        </Link>

                        <Link href="/admin/exams/results">
                            <Button variant="outline" className="flex items-center gap-2 h-auto p-4 w-full">
                                <CheckCircle className="w-5 h-5" />
                                <div className="text-left">
                                    <p className="font-medium">Manage Exam Results</p>
                                    <p className="text-sm text-muted-foreground">Upload and manage results for students</p>
                                </div>
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}