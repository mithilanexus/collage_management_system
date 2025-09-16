"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { 
  ChevronRight, 
  BookOpen, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Eye, 
  Calendar, 
  Users, 
  Clock,
  TrendingUp,
  CalendarDays
} from "lucide-react";

export default function PrimaryExamSchedules() {
  const [loading, setLoading] = useState(true);
  const [schedules, setSchedules] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Dummy data for UI development
  const buildDummySchedules = () => {
    return [
      {
        _id: "exam-1",
        examLevel: "primary",
        examName: "Virginia Henderson",
        startDate: new Date(2024, 11, 15),
        endDate: new Date(2024, 11, 22),
        schedule: [
          { className: "Grade 1", subjects: ["English", "Mathematics", "Nepali", "Science", "Social Studies"] },
          { className: "Grade 2", subjects: ["English", "Mathematics", "Nepali", "Science", "Social Studies", "Computer"] },
          { className: "Grade 3", subjects: ["Mathematics", "English", "Nepali", "Science", "Social Studies", "Computer"] },
        ],
        status: "upcoming"
      },
      {
        _id: "exam-2",
        examLevel: "primary",
        examName: "Florence Nightingale",
        startDate: new Date(2025, 2, 10),
        endDate: new Date(2025, 2, 18),
        schedule: [
          { className: "Grade 4", subjects: ["English", "Nepali", "Mathematics", "Science", "Social Studies", "Computer"] },
          { className: "Grade 5", subjects: ["Mathematics", "Science", "English", "Nepali", "Computer", "Social Studies"] },
        ],
        status: "ongoing"
      },
      {
        _id: "exam-3",
        examLevel: "primary",
        examName: "Annual Examination",
        startDate: new Date(2025, 5, 5),
        endDate: new Date(2025, 5, 15),
        schedule: [
          { className: "Grade 1", subjects: ["English", "Mathematics", "Nepali", "Science"] },
          { className: "Grade 2", subjects: ["English", "Mathematics", "Nepali", "Science", "Computer"] },
          { className: "Grade 3", subjects: ["English", "Mathematics", "Nepali", "Science", "Computer"] },
          { className: "Grade 4", subjects: ["English", "Mathematics", "Nepali", "Science", "Computer"] },
          { className: "Grade 5", subjects: ["English", "Mathematics", "Nepali", "Science", "Computer"] },
        ],
        status: "completed"
      }
    ];
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate API call - replace with actual endpoint
        const res = await fetch("/api/admin/exam/add-schedule").catch(() => ({ ok: false }));
        
        if (isMounted) {
          // Use dummy data for UI development
          setSchedules(buildDummySchedules());
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setSchedules(buildDummySchedules());
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, []);

  // Filter and search schedules
  const filteredSchedules = useMemo(() => {
    let filtered = schedules;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(exam => 
        exam.examName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.schedule?.some(cls => cls.className.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(exam => exam.status === statusFilter);
    }

    return filtered;
  }, [schedules, searchQuery, statusFilter]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = schedules.length;
    const upcoming = schedules.filter(exam => exam.status === "upcoming").length;
    const ongoing = schedules.filter(exam => exam.status === "ongoing").length;
    const completed = schedules.filter(exam => exam.status === "completed").length;

    return { total, upcoming, ongoing, completed };
  }, [schedules]);

  // Get exam status
  const getExamStatus = (exam) => {
    const now = new Date();
    const startDate = new Date(exam.startDate);
    const endDate = new Date(exam.endDate);
    
    if (startDate > now) return { label: "Upcoming", color: "bg-blue-100 text-blue-700 border-blue-200" };
    if (startDate <= now && endDate >= now) return { label: "Ongoing", color: "bg-green-100 text-green-700 border-green-200" };
    return { label: "Completed", color: "bg-gray-100 text-gray-700 border-gray-200" };
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground">
        <Link href="/admin/exams" className="hover:underline hover:text-primary transition-colors">
          Exams
        </Link>
        <ChevronRight className="w-4 h-4 mx-1" />
        <span className="text-foreground">Primary</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-6 h-6 text-primary" />
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Primary Exam Schedules</h1>
          </div>
          <p className="text-muted-foreground">Manage and track primary level examination schedules.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/exams/add-schedule">
            <Button className="flex items-center gap-2 hover:bg-primary/90 transition-colors">
              <Plus className="w-4 h-4" />
              Add Schedule
            </Button>
          </Link>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Schedules</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Upcoming</p>
                <p className="text-2xl font-bold text-green-600">{stats.upcoming}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ongoing</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.ongoing}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-purple-600">{stats.completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Search Schedules</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search exam names or classes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schedules Grid */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Exam Schedules ({filteredSchedules.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredSchedules.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Schedules Found</h3>
              <p className="text-muted-foreground mb-4">No exam schedules match your current filters.</p>
              <Link href="/admin/exams/add-schedule">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Schedule
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSchedules.map((exam) => {
                const classesIncluded = Array.isArray(exam.schedule)
                  ? exam.schedule.map((r) => r.className)
                  : [];
                return (
                  <Card key={exam._id} className="hover:shadow-lg transition-all duration-200">
                    <CardHeader className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-1">{exam.examName}</CardTitle>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {exam.startDate ? new Date(exam.startDate).toLocaleDateString() : "TBD"}
                              {exam.startDate && exam.endDate ? " - " : ""}
                              {exam.endDate ? new Date(exam.endDate).toLocaleDateString() : ""}
                            </span>
                          </div>
                        </div>
                        <Badge className={getExamStatus(exam).color}>
                          {getExamStatus(exam).label}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <p className="text-sm font-medium">Classes ({classesIncluded.length})</p>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {classesIncluded.slice(0, 3).map((className) => (
                            <Badge key={className} variant="secondary" className="text-xs">
                              {className}
                            </Badge>
                          ))}
                          {classesIncluded.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{classesIncluded.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/admin/exams/primary/${encodeURIComponent(exam.examName)}/${encodeURIComponent(exam.schedule[0]?.className || "Grade 1")}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                        </Link>
                        <Link href={`/admin/exams/primary/${encodeURIComponent(exam.examName)}/${encodeURIComponent(exam.schedule[0]?.className || "Grade 1")}`} className="flex-1">
                          <Button size="sm" className="w-full">
                            <Edit className="w-4 h-4 mr-2" />
                            Manage
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}