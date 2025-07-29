"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Calendar,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Download
} from "lucide-react";

// Mock data for attendance (Nepali college system)
const mockAttendance = [
  {
    id: 1,
    date: "2024-01-15",
    class: "Grade 12",
    section: "A",
    subject: "English",
    teacher: "Dr. Ram Prasad Sharma",
    totalStudents: 45,
    presentStudents: 42,
    absentStudents: 3,
    attendanceRate: 93.3,
    period: "1st Period (9:00-10:00 AM)",
    students: [
      { id: 1, name: "Anil Shrestha", rollNumber: "15", status: "Present" },
      { id: 2, name: "Priya Poudel", rollNumber: "08", status: "Present" },
      { id: 3, name: "Rajesh Gurung", rollNumber: "12", status: "Absent" }
    ]
  },
  {
    id: 2,
    date: "2024-01-15",
    class: "Grade 11",
    section: "B",
    subject: "Mathematics",
    teacher: "Mrs. Gita Poudel",
    totalStudents: 38,
    presentStudents: 35,
    absentStudents: 3,
    attendanceRate: 92.1,
    period: "2nd Period (10:00-11:00 AM)",
    students: []
  },
  {
    id: 3,
    date: "2024-01-14",
    class: "Grade 10",
    section: "A",
    subject: "Science",
    teacher: "Dr. Sunita Rai",
    totalStudents: 40,
    presentStudents: 38,
    absentStudents: 2,
    attendanceRate: 95.0,
    period: "3rd Period (11:00-12:00 PM)",
    students: []
  }
];

export default function AttendanceManagement() {
  const [attendance, setAttendance] = useState(mockAttendance);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);

  const filteredAttendance = attendance.filter(record =>
    record.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (record) => {
    setSelectedRecord(record);
  };

  const totalStudents = attendance.reduce((sum, record) => sum + record.totalStudents, 0);
  const totalPresent = attendance.reduce((sum, record) => sum + record.presentStudents, 0);
  const averageAttendance = totalStudents > 0 ? ((totalPresent / totalStudents) * 100).toFixed(1) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Attendance Management</h1>
          <p className="text-muted-foreground">Track and manage student attendance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
          <Button onClick={() => window.location.href = '/admin/academic/attendance/add'} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Mark Attendance
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Records</p>
                <p className="text-2xl font-bold text-primary">{attendance.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Attendance</p>
                <p className="text-2xl font-bold text-green-600">{averageAttendance}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Present Today</p>
                <p className="text-2xl font-bold text-blue-600">{totalPresent}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Absent Today</p>
                <p className="text-2xl font-bold text-red-600">{totalStudents - totalPresent}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search by class, section, subject or teacher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Class</th>
                  <th className="text-left p-4">Subject</th>
                  <th className="text-left p-4">Teacher</th>
                  <th className="text-left p-4">Period</th>
                  <th className="text-left p-4">Attendance</th>
                  <th className="text-left p-4">Rate</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendance.map((record) => (
                  <tr key={record.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <div className="font-medium">{record.date}</div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{record.class}</div>
                        <div className="text-sm text-muted-foreground">Section {record.section}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium">{record.subject}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium">{record.teacher}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">{record.period}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-green-600 font-medium">{record.presentStudents}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <XCircle className="w-4 h-4 text-red-600" />
                          <span className="text-red-600 font-medium">{record.absentStudents}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${record.attendanceRate}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{record.attendanceRate}%</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleView(record)}
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.location.href = `/admin/academic/attendance/${record.id}/edit`}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Details Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Attendance Details - {selectedRecord.date}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <p className="text-sm text-muted-foreground">{selectedRecord.date}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Class</label>
                  <p className="text-sm text-muted-foreground">{selectedRecord.class} - Section {selectedRecord.section}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Subject</label>
                  <p className="text-sm text-muted-foreground">{selectedRecord.subject}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Teacher</label>
                  <p className="text-sm text-muted-foreground">{selectedRecord.teacher}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Period</label>
                  <p className="text-sm text-muted-foreground">{selectedRecord.period}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Attendance Rate</label>
                  <p className="text-sm text-muted-foreground">{selectedRecord.attendanceRate}%</p>
                </div>
              </div>

              {/* Attendance Summary */}
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Attendance Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary">{selectedRecord.totalStudents}</div>
                      <div className="text-sm text-muted-foreground">Total Students</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">{selectedRecord.presentStudents}</div>
                      <div className="text-sm text-muted-foreground">Present</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-red-600">{selectedRecord.absentStudents}</div>
                      <div className="text-sm text-muted-foreground">Absent</div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Student List */}
              {selectedRecord.students.length > 0 && (
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-3">Student Attendance</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3">Roll Number</th>
                          <th className="text-left p-3">Student Name</th>
                          <th className="text-left p-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedRecord.students.map((student) => (
                          <tr key={student.id} className="border-b">
                            <td className="p-3 font-mono">{student.rollNumber}</td>
                            <td className="p-3">{student.name}</td>
                            <td className="p-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                student.status === "Present" 
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}>
                                {student.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedRecord(null)}>
                  Close
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Report
                </Button>
                <Button onClick={() => window.location.href = `/admin/academic/attendance/${selectedRecord.id}/edit`}>
                  Edit Attendance
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
