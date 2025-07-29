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
  Download,
  FileText,
  GraduationCap,
  Award,
  Calendar,
  User,
  CheckCircle
} from "lucide-react";

// Mock data for transcripts (Nepali college system)
const mockTranscripts = [
  {
    id: 1,
    studentId: "STU2024001",
    studentName: "Anil Shrestha",
    program: "Bachelor of Arts (BA)",
    batch: "2021-2024",
    completedSemesters: 6,
    totalCredits: 120,
    earnedCredits: 118,
    cgpa: 3.72,
    grade: "A",
    status: "Completed",
    issueDate: "2024-06-15",
    transcriptNumber: "TRN2024001",
    semesters: [
      { semester: 1, credits: 20, gpa: 3.8, grade: "A" },
      { semester: 2, credits: 20, gpa: 3.6, grade: "A-" },
      { semester: 3, credits: 20, gpa: 3.9, grade: "A" },
      { semester: 4, credits: 19, gpa: 3.7, grade: "A-" },
      { semester: 5, credits: 20, gpa: 3.5, grade: "B+" },
      { semester: 6, credits: 19, gpa: 3.8, grade: "A" }
    ]
  },
  {
    id: 2,
    studentId: "STU2024002",
    studentName: "Priya Poudel",
    program: "Bachelor of Science (BSc)",
    batch: "2022-2025",
    completedSemesters: 4,
    totalCredits: 135,
    earnedCredits: 90,
    cgpa: 3.92,
    grade: "A+",
    status: "In Progress",
    issueDate: null,
    transcriptNumber: null,
    semesters: [
      { semester: 1, credits: 23, gpa: 4.0, grade: "A+" },
      { semester: 2, credits: 22, gpa: 3.9, grade: "A" },
      { semester: 3, credits: 23, gpa: 3.8, grade: "A" },
      { semester: 4, credits: 22, gpa: 4.0, grade: "A+" }
    ]
  }
];

export default function TranscriptsManagement() {
  const [transcripts, setTranscripts] = useState(mockTranscripts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTranscript, setSelectedTranscript] = useState(null);

  const filteredTranscripts = transcripts.filter(transcript =>
    transcript.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transcript.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transcript.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transcript.batch.includes(searchTerm)
  );

  const handleView = (transcript) => {
    setSelectedTranscript(transcript);
  };

  const handleDownload = (transcriptId) => {
    alert(`Downloading transcript for ID: ${transcriptId}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300";
      case "In Progress": return "bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-300";
      case "Pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-950/30 dark:text-gray-300";
    }
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case "A+": return "bg-green-100 text-green-800";
      case "A": return "bg-blue-100 text-blue-800";
      case "A-": return "bg-cyan-100 text-cyan-800";
      case "B+": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Academic Transcripts</h1>
          <p className="text-muted-foreground">Manage student academic transcripts and records</p>
        </div>
        <Button onClick={() => window.location.href = '/admin/academic/transcripts/generate'} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Generate Transcript
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Transcripts</p>
                <p className="text-2xl font-bold text-primary">{transcripts.length}</p>
              </div>
              <FileText className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {transcripts.filter(t => t.status === "Completed").length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">
                  {transcripts.filter(t => t.status === "In Progress").length}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average CGPA</p>
                <p className="text-2xl font-bold text-orange-600">
                  {(transcripts.reduce((sum, t) => sum + t.cgpa, 0) / transcripts.length).toFixed(2)}
                </p>
              </div>
              <Award className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search by student name, ID, program or batch..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Transcripts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Transcripts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Student</th>
                  <th className="text-left p-4">Program</th>
                  <th className="text-left p-4">Progress</th>
                  <th className="text-left p-4">Academic Performance</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTranscripts.map((transcript) => (
                  <tr key={transcript.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{transcript.studentName}</div>
                        <div className="text-sm text-muted-foreground">{transcript.studentId}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{transcript.program}</div>
                        <div className="text-sm text-muted-foreground">Batch: {transcript.batch}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{transcript.completedSemesters} Semesters</div>
                        <div className="text-sm text-muted-foreground">
                          {transcript.earnedCredits}/{transcript.totalCredits} Credits
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 mt-1">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${(transcript.earnedCredits / transcript.totalCredits) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">CGPA: {transcript.cgpa}</div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(transcript.grade)}`}>
                          Grade: {transcript.grade}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transcript.status)}`}>
                        {transcript.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleView(transcript)}
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        {transcript.status === "Completed" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDownload(transcript.id)}
                          >
                            <Download className="w-3 h-3" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.location.href = `/admin/academic/transcripts/${transcript.id}/edit`}
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

      {/* Transcript Details Modal */}
      {selectedTranscript && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Academic Transcript - {selectedTranscript.studentName}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Student Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Student Name</label>
                  <p className="text-sm text-muted-foreground">{selectedTranscript.studentName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Student ID</label>
                  <p className="text-sm text-muted-foreground font-mono">{selectedTranscript.studentId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Program</label>
                  <p className="text-sm text-muted-foreground">{selectedTranscript.program}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Batch</label>
                  <p className="text-sm text-muted-foreground">{selectedTranscript.batch}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTranscript.status)}`}>
                    {selectedTranscript.status}
                  </span>
                </div>
                {selectedTranscript.transcriptNumber && (
                  <div>
                    <label className="text-sm font-medium">Transcript Number</label>
                    <p className="text-sm text-muted-foreground font-mono">{selectedTranscript.transcriptNumber}</p>
                  </div>
                )}
              </div>

              {/* Academic Summary */}
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Academic Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary">{selectedTranscript.completedSemesters}</div>
                      <div className="text-sm text-muted-foreground">Completed Semesters</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">{selectedTranscript.earnedCredits}</div>
                      <div className="text-sm text-muted-foreground">Earned Credits</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">{selectedTranscript.cgpa}</div>
                      <div className="text-sm text-muted-foreground">CGPA</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">{selectedTranscript.grade}</div>
                      <div className="text-sm text-muted-foreground">Overall Grade</div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Semester-wise Performance */}
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Semester-wise Performance</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Semester</th>
                        <th className="text-left p-3">Credits</th>
                        <th className="text-left p-3">GPA</th>
                        <th className="text-left p-3">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedTranscript.semesters.map((sem, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-3 font-medium">Semester {sem.semester}</td>
                          <td className="p-3">{sem.credits}</td>
                          <td className="p-3 font-medium">{sem.gpa}</td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(sem.grade)}`}>
                              {sem.grade}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedTranscript(null)}>
                  Close
                </Button>
                {selectedTranscript.status === "Completed" && (
                  <Button variant="outline" onClick={() => handleDownload(selectedTranscript.id)} className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </Button>
                )}
                <Button onClick={() => window.location.href = `/admin/academic/transcripts/${selectedTranscript.id}/edit`}>
                  Edit Transcript
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
