"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  ChevronRight, 
  UserCheck, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Eye, 
  Users, 
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Upload,
  BarChart3,
  TrendingUp,
  UserX,
  CalendarCheck
} from "lucide-react";
import { toast } from "sonner";

export default function ExamAttendance() {
  const [loading, setLoading] = useState(true);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [students, setStudents] = useState([]);
  const [exams, setExams] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExam, setSelectedExam] = useState("all");
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedDate, setSelectedDate] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isMarkAttendanceOpen, setIsMarkAttendanceOpen] = useState(false);

  // Dummy data for UI development
  const buildDummyData = () => {
    const dummyExams = [
      { 
        _id: "exam-1", 
        examName: "Virginia Henderson", 
        examLevel: "primary", 
        startDate: "2025-09-02", 
        endDate: "2025-09-09"
      },
      { 
        _id: "exam-2", 
        examName: "Florence Nightingale", 
        examLevel: "primary", 
        startDate: "2025-10-01", 
        endDate: "2025-10-08"
      }
    ];

    const dummyStudents = [
      { _id: "std-1", name: "Aarav Sharma", rollNumber: "2025001", class: "Grade 1", section: "A" },
      { _id: "std-2", name: "Priya Patel", rollNumber: "2025002", class: "Grade 1", section: "A" },
      { _id: "std-3", name: "Rohan Gupta", rollNumber: "2025003", class: "Grade 2", section: "B" },
      { _id: "std-4", name: "Anita Singh", rollNumber: "2025004", class: "Grade 2", section: "B" },
      { _id: "std-5", name: "Vikram Kumar", rollNumber: "2025005", class: "Grade 3", section: "A" },
      { _id: "std-6", name: "Sneha Rai", rollNumber: "2025006", class: "Grade 3", section: "A" }
    ];

    const dummyAttendance = [
      {
        _id: "att-1",
        studentId: "std-1",
        examId: "exam-1",
        examDate: "2025-09-02",
        subject: "English",
        status: "present",
        timeIn: "09:00",
        timeOut: "11:00",
        remarks: "On time",
        markedAt: "2025-09-02T09:05:00Z"
      },
      {
        _id: "att-2",
        studentId: "std-1",
        examId: "exam-1",
        examDate: "2025-09-03",
        subject: "Mathematics",
        status: "present",
        timeIn: "09:15",
        timeOut: "11:00",
        remarks: "Slightly late",
        markedAt: "2025-09-03T09:20:00Z"
      },
      {
        _id: "att-3",
        studentId: "std-2",
        examId: "exam-1",
        examDate: "2025-09-02",
        subject: "English",
        status: "absent",
        timeIn: null,
        timeOut: null,
        remarks: "Sick leave",
        markedAt: "2025-09-02T09:05:00Z"
      },
      {
        _id: "att-4",
        studentId: "std-3",
        examId: "exam-1",
        examDate: "2025-09-02",
        subject: "English",
        status: "present",
        timeIn: "09:00",
        timeOut: "11:00",
        remarks: "On time",
        markedAt: "2025-09-02T09:05:00Z"
      },
      {
        _id: "att-5",
        studentId: "std-4",
        examId: "exam-2",
        examDate: "2025-10-01",
        subject: "Science",
        status: "present",
        timeIn: "09:00",
        timeOut: "11:00",
        remarks: "Perfect attendance",
        markedAt: "2025-10-01T09:05:00Z"
      }
    ];

    return { exams: dummyExams, students: dummyStudents, attendance: dummyAttendance };
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate API calls - replace with actual endpoints
        await new Promise(resolve => setTimeout(resolve, 800));

        if (isMounted) {
          const dummyData = buildDummyData();
          setExams(dummyData.exams);
          setStudents(dummyData.students);
          setAttendanceRecords(dummyData.attendance);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          const dummyData = buildDummyData();
          setExams(dummyData.exams);
          setStudents(dummyData.students);
          setAttendanceRecords(dummyData.attendance);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, []);

  // Filter and search attendance records
  const filteredAttendance = useMemo(() => {
    let filtered = attendanceRecords;

    if (selectedExam !== "all") {
      filtered = filtered.filter(record => record.examId === selectedExam);
    }

    if (selectedClass !== "all") {
      filtered = filtered.filter(record => {
        const student = students.find(s => s._id === record.studentId);
        return student?.class === selectedClass;
      });
    }

    if (selectedDate !== "all") {
      filtered = filtered.filter(record => record.examDate === selectedDate);
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter(record => record.status === selectedStatus);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(record => {
        const student = students.find(s => s._id === record.studentId);
        return student?.name.toLowerCase().includes(query) || 
               student?.rollNumber.toLowerCase().includes(query);
      });
    }

    return filtered;
  }, [attendanceRecords, students, selectedExam, selectedClass, selectedDate, selectedStatus, searchQuery]);

  // Get unique classes and dates
  const availableClasses = useMemo(() => {
    const classes = [...new Set(students.map(s => s.class))];
    return classes.sort();
  }, [students]);

  const availableDates = useMemo(() => {
    const dates = [...new Set(attendanceRecords.map(r => r.examDate))];
    return dates.sort();
  }, [attendanceRecords]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = filteredAttendance.length;
    const present = filteredAttendance.filter(r => r.status === "present").length;
    const absent = filteredAttendance.filter(r => r.status === "absent").length;
    const attendanceRate = total > 0 ? (present / total * 100) : 0;

    return { total, present, absent, attendanceRate };
  }, [filteredAttendance]);

  const getStudentInfo = (studentId) => {
    return students.find(s => s._id === studentId) || {};
  };

  const getExamInfo = (examId) => {
    return exams.find(e => e._id === examId) || {};
  };

  const getStatusColor = (status) => {
    const colors = {
      "present": "bg-green-100 text-green-800 border-green-200",
      "absent": "bg-red-100 text-red-800 border-red-200"
    };
    return colors[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getStatusIcon = (status) => {
    const icons = {
      "present": <CheckCircle className="w-4 h-4" />,
      "absent": <XCircle className="w-4 h-4" />
    };
    return icons[status] || <CheckCircle className="w-4 h-4" />;
  };

  const handleMarkAttendance = () => {
    setIsMarkAttendanceOpen(true);
  };

  const handleSaveAttendance = async () => {
    try {
      toast.success("Attendance marked successfully");
      setIsMarkAttendanceOpen(false);
    } catch (err) {
      toast.error("Failed to save attendance");
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground">
        <Link href="/admin/exams" className="hover:underline hover:text-primary transition-colors">
          Exams
        </Link>
        <ChevronRight className="w-4 h-4 mx-1" />
        <span className="text-foreground">Attendance</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <UserCheck className="w-6 h-6 text-primary" />
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Exam Attendance</h1>
          </div>
          <p className="text-muted-foreground">Track and manage student attendance for primary level exams.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2 hover:bg-muted/50 transition-colors">
            <Upload className="w-4 h-4" />
            Import Attendance
          </Button>
          <Button 
            onClick={handleMarkAttendance} 
            className="flex items-center gap-2 hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Mark Attendance
          </Button>
        </div>
      </div>

      {/* Enhanced Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Records</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-xl">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Present</p>
                <p className="text-2xl font-bold text-green-600">{stats.present}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-100 rounded-xl">
                <UserX className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Absent</p>
                <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
              </div>
            </div>
          </CardContent>
        </Card>



        <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-xl">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Attendance Rate</p>
                <p className="text-2xl font-bold text-purple-600">{stats.attendanceRate.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Filters */}
      <Card className="border-2 border-dashed border-muted hover:border-primary/50 transition-colors">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            Advanced Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Search Student</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Name or roll number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-2 focus:border-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Exam</Label>
              <Select value={selectedExam} onValueChange={setSelectedExam}>
                <SelectTrigger className="border-2 focus:border-primary">
                  <SelectValue placeholder="Select exam" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Exams</SelectItem>
                  {exams.map(exam => (
                    <SelectItem key={exam._id} value={exam._id}>
                      {exam.examName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Class</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="border-2 focus:border-primary">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {availableClasses.map(cls => (
                    <SelectItem key={cls} value={cls}>
                      {cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Date</Label>
              <Select value={selectedDate} onValueChange={setSelectedDate}>
                <SelectTrigger className="border-2 focus:border-primary">
                  <SelectValue placeholder="Select date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  {availableDates.map(date => (
                    <SelectItem key={date} value={date}>
                      {new Date(date).toLocaleDateString()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Status</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="border-2 focus:border-primary">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Table */}
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-primary/5 to-primary/10">
          <CardTitle className="flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-primary" />
            Attendance Records ({filteredAttendance.length})
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredAttendance.length === 0 ? (
            <div className="text-center py-12">
              <UserCheck className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Attendance Records Found</h3>
              <p className="text-muted-foreground mb-6">No attendance records match your current filters.</p>
              <Button onClick={handleMarkAttendance}>
                <Plus className="w-4 h-4 mr-2" />
                Mark First Attendance
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Student</TableHead>
                    <TableHead className="font-semibold">Roll No.</TableHead>
                    <TableHead className="font-semibold">Class</TableHead>
                    <TableHead className="font-semibold">Exam</TableHead>
                    <TableHead className="font-semibold">Date</TableHead>
                    <TableHead className="font-semibold">Subject</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Time</TableHead>
                    <TableHead className="font-semibold">Remarks</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAttendance.map((record) => {
                    const student = getStudentInfo(record.studentId);
                    const exam = getExamInfo(record.examId);
                    return (
                      <TableRow key={record._id} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium text-primary">
                                {student.name?.charAt(0)}
                              </span>
                            </div>
                            {student.name}
                          </div>
                        </TableCell>
                        <TableCell className="font-mono">{student.rollNumber}</TableCell>
                        <TableCell>{student.class}</TableCell>
                        <TableCell className="max-w-[150px] truncate">{exam.examName}</TableCell>
                        <TableCell>{new Date(record.examDate).toLocaleDateString()}</TableCell>
                        <TableCell>{record.subject}</TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(record.status)} flex items-center gap-1 w-fit`}>
                            {getStatusIcon(record.status)}
                            {record.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {record.timeIn && record.timeOut ? (
                            <div className="text-xs">
                              <div>In: {record.timeIn}</div>
                              <div>Out: {record.timeOut}</div>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell className="max-w-[120px] truncate" title={record.remarks}>
                          {record.remarks || "-"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Mark Attendance Dialog */}
      <Dialog open={isMarkAttendanceOpen} onOpenChange={setIsMarkAttendanceOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-primary" />
              Mark Attendance
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="text-center py-8">
              <UserCheck className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Attendance Marking Interface</h3>
              <p className="text-muted-foreground mb-4">Select exam and date to mark student attendance.</p>
              <Button onClick={handleSaveAttendance}>
                Save Attendance
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
