"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  ChevronRight, 
  GraduationCap, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Eye, 
  Trophy, 
  TrendingUp, 
  Users, 
  BookOpen,
  Download,
  Upload,
  Megaphone
} from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useExamSchedules, useExamResults, useSaveExamResult } from "@/hooks/admin/exams";
import { useStudents } from "@/hooks/admin/management/useStudentQueries";
import { useAnnouncements } from "@/hooks/admin/communications/announcements";

export default function ExamResults() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [students, setStudents] = useState([]);
  const [exams, setExams] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExam, setSelectedExam] = useState("all");
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingResult, setEditingResult] = useState(null);

  // Dummy data for UI development
  const buildDummyData = () => {
    const dummyExams = [
      { _id: "exam-1", examName: "Virginia Henderson", examLevel: "primary", startDate: "2025-09-02", endDate: "2025-09-09" },
      { _id: "exam-2", examName: "Florence Nightingale", examLevel: "primary", startDate: "2025-10-01", endDate: "2025-10-08" }
    ];

    const dummyStudents = [
      { _id: "std-1", name: "Aarav Sharma", rollNumber: "2025001", class: "Grade 1", section: "A" },
      { _id: "std-2", name: "Priya Patel", rollNumber: "2025002", class: "Grade 1", section: "A" },
      { _id: "std-3", name: "Rohan Gupta", rollNumber: "2025003", class: "Grade 2", section: "B" },
      { _id: "std-4", name: "Anita Singh", rollNumber: "2025004", class: "Grade 2", section: "B" },
      { _id: "std-5", name: "Vikram Kumar", rollNumber: "2025005", class: "Grade 3", section: "A" },
      { _id: "std-6", name: "Sneha Rai", rollNumber: "2025006", class: "Grade 3", section: "A" }
    ];

    const dummyResults = [
      {
        _id: "result-1",
        studentId: "std-1",
        examId: "exam-1",
        subjects: [
          { name: "English", marksObtained: 85, totalMarks: 100, grade: "A" },
          { name: "Mathematics", marksObtained: 92, totalMarks: 100, grade: "A+" },
          { name: "Science", marksObtained: 78, totalMarks: 100, grade: "B+" },
          { name: "Nepali", marksObtained: 88, totalMarks: 100, grade: "A" }
        ],
        totalMarks: 343,
        obtainedMarks: 400,
        percentage: 85.75,
        grade: "A",
        status: "published",
        remarks: "Excellent performance",
        createdAt: "2025-09-15"
      },
      {
        _id: "result-2",
        studentId: "std-2",
        examId: "exam-1",
        subjects: [
          { name: "English", marksObtained: 76, totalMarks: 100, grade: "B+" },
          { name: "Mathematics", marksObtained: 82, totalMarks: 100, grade: "A" },
          { name: "Science", marksObtained: 74, totalMarks: 100, grade: "B" },
          { name: "Nepali", marksObtained: 79, totalMarks: 100, grade: "B+" }
        ],
        totalMarks: 311,
        obtainedMarks: 400,
        percentage: 77.75,
        grade: "B+",
        status: "draft",
        remarks: "Good progress",
        createdAt: "2025-09-15"
      },
      {
        _id: "result-3",
        studentId: "std-3",
        examId: "exam-2",
        subjects: [
          { name: "English", marksObtained: 90, totalMarks: 100, grade: "A+" },
          { name: "Mathematics", marksObtained: 88, totalMarks: 100, grade: "A" },
          { name: "Science", marksObtained: 85, totalMarks: 100, grade: "A" },
          { name: "Nepali", marksObtained: 87, totalMarks: 100, grade: "A" }
        ],
        totalMarks: 350,
        obtainedMarks: 400,
        percentage: 87.5,
        grade: "A",
        status: "published",
        remarks: "Outstanding work",
        createdAt: "2025-10-10"
      }
    ];

    return { exams: dummyExams, students: dummyStudents, results: dummyResults };
  };


  const qc = useQueryClient();

  // Exams list via schedules
  const { data: examsDataResp, isLoading: loadingExams } = useExamSchedules();
  const examsData = Array.isArray(examsDataResp) ? examsDataResp : (examsDataResp?.data ?? []);

  // Students list
  const { data: studentsDataResp, isLoading: loadingStudents } = useStudents({ page: 1, pageSize: 1000, search: "" });
  const studentsData = Array.isArray(studentsDataResp) ? studentsDataResp : (studentsDataResp?.data ?? []);

  // Results list
  const { data: resultsDataResp, isLoading: loadingResults } = useExamResults({}, {});
  const resultsData = resultsDataResp?.items ?? resultsDataResp?.data?.items ?? (Array.isArray(resultsDataResp) ? resultsDataResp : []);

  // Exam Result Notices list (filter on client by category)
  const { data: allAnnouncementsResp } = useAnnouncements({ page: 1, pageSize: 100, search: "" }, { staleTime: 60_000 });
  const allAnnouncements = allAnnouncementsResp?.items ?? allAnnouncementsResp?.data ?? allAnnouncementsResp ?? [];
  const examNotices = Array.isArray(allAnnouncements)
    ? allAnnouncements.filter(a => (a.category || "").toLowerCase().includes("exam"))
    : [];

  // Sync loading flag
  useEffect(() => {
    setLoading(!!(loadingExams || loadingStudents || loadingResults));
  }, [loadingExams, loadingStudents, loadingResults]);

  // Sync data with fallback to dummy for UI
  useEffect(() => {
    if (!loading) {
      const ex = examsData || [];
      const st = studentsData || [];
      const rs = resultsData || [];

      if (ex.length === 0 || st.length === 0) {
        const dummy = buildDummyData();
        setExams(ex.length > 0 ? ex : dummy.exams);
        setStudents(st.length > 0 ? st : dummy.students);
        setResults(rs.length > 0 ? rs : dummy.results);
      } else {
        setExams(ex);
        setStudents(st);
        setResults(rs);
      }
    }
  }, [loading, examsData, studentsData, resultsData]);

  // Filter and search results
  const filteredResults = useMemo(() => {
    let filtered = results;

    // Filter by exam
    if (selectedExam !== "all") {
      filtered = filtered.filter(result => result.examId === selectedExam);
    }

    // Filter by class
    if (selectedClass !== "all") {
      filtered = filtered.filter(result => {
        const student = students.find(s => s._id === result.studentId);
        return student?.class === selectedClass;
      });
    }

    // Filter by status
    if (selectedStatus !== "all") {
      filtered = filtered.filter(result => result.status === selectedStatus);
    }

    // Search by student name or roll number
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(result => {
        const student = students.find(s => s._id === result.studentId);
        return student?.name.toLowerCase().includes(query) || 
               student?.rollNumber.toLowerCase().includes(query);
      });
    }

    return filtered;
  }, [results, students, selectedExam, selectedClass, selectedStatus, searchQuery]);

  // Get unique classes from students
  const availableClasses = useMemo(() => {
    const classes = [...new Set(students.map(s => s.class))];
    return classes.sort();
  }, [students]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = filteredResults.length;
    const published = filteredResults.filter(r => r.status === "published").length;
    const draft = filteredResults.filter(r => r.status === "draft").length;
    const avgPercentage = total > 0 
      ? filteredResults.reduce((sum, r) => sum + r.percentage, 0) / total 
      : 0;

    return { total, published, draft, avgPercentage };
  }, [filteredResults]);

  const getStudentInfo = (studentId) => {
    return students.find(s => s._id === studentId) || {};
  };

  const getExamInfo = (examId) => {
    return exams.find(e => e._id === examId) || {};
  };

  // no-op

  const getGradeColor = (grade) => {
    const colors = {
      "A+": "bg-green-100 text-green-800",
      "A": "bg-blue-100 text-blue-800",
      "B+": "bg-yellow-100 text-yellow-800",
      "B": "bg-orange-100 text-orange-800",
      "C": "bg-red-100 text-red-800",
      "F": "bg-gray-100 text-gray-800"
    };
    return colors[grade] || "bg-gray-100 text-gray-800";
  };

  const handleAddResult = () => {
    setEditingResult(null);
    setIsAddDialogOpen(true);
  };

  const handleEditResult = (result) => {
    setEditingResult(result);
    setIsAddDialogOpen(true);
  };

  const { mutate: saveResultMutate } = useSaveExamResult({
    onSuccess: () => {
      toast.success(editingResult ? "Result updated successfully" : "Result added successfully");
      setIsAddDialogOpen(false);
      setEditingResult(null);
      qc.invalidateQueries({ queryKey: ["admin", "examResults", {}] });
    },
    onError: (e) => toast.error(e.message || "Failed to save result"),
  });

  const handleSaveResult = async (resultData) => {
    const method = editingResult ? "PUT" : "POST";
    const payload = editingResult ? { ...resultData, id: editingResult._id } : resultData;
    saveResultMutate({ payload, method });
  };

  // Create publish notice (announcement) CTA
  const handleCreatePublishNotice = () => {
    const examId = selectedExam !== "all" ? selectedExam : (exams[0]?._id || "");
    const exam = getExamInfo(examId);
    const examName = exam?.examName || "the recent exam";
    const params = new URLSearchParams({
      title: `Exam Results Published - ${examName}`,
      content: `The exam results for ${examName} have been published. Please log in to the student portal to view detailed results.`,
      category: "Academic",
      priority: "High",
      status: "Published",
      targetAudience: "All Students",
      isPinned: "true",
    });
    router.push(`/admin/communications/announcements/add?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground">
        <Link href="/admin/exams" className="hover:underline hover:text-primary transition-colors">
          Exams
        </Link>
        <ChevronRight className="w-4 h-4 mx-1" />
        <span className="text-foreground">Exam Results</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="w-6 h-6 text-primary" />
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Exam Results</h1>
          </div>
          <p className="text-muted-foreground">Manage and track student exam results. Publish notices when results are released.</p>
        </div>
        <div></div>
      </div>

      

      {/* Exam Result Notices */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Exam Result Notices</h2>
        <Button onClick={() => router.push("/admin/exams/results/notices/add")} className="flex items-center gap-2">
          <Megaphone className="w-4 h-4" />
          Add Notice
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {examNotices.length === 0 ? (
          <div className="col-span-full text-muted-foreground">No exam result notices yet.</div>
        ) : (
          examNotices.map((n) => (
            <Card key={n._id} className="hover:shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">{n.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">{n.content}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{n.status}</span>
                  <Button size="sm" variant="outline" onClick={() => router.push(`/admin/exams/results/notices/${n._id}/edit`)}>Edit</Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Results</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Trophy className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Published</p>
                <p className="text-2xl font-bold text-green-600">{stats.published}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Edit className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Draft</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.draft}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Percentage</p>
                <p className="text-2xl font-bold text-purple-600">{stats.avgPercentage.toFixed(1)}%</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Search Student</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Name or roll number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Exam</Label>
              <Select value={selectedExam} onValueChange={setSelectedExam}>
                <SelectTrigger>
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
              <Label>Class</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
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
              <Label>Status</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Exam Results ({filteredResults.length})</CardTitle>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Results Found</h3>
              <p className="text-muted-foreground mb-4">No exam results match your current filters.</p>
              <Button onClick={handleAddResult}>
                <Plus className="w-4 h-4 mr-2" />
                Add First Result
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Roll No.</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Exam</TableHead>
                    <TableHead>Marks</TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResults.map((result) => {
                    const student = getStudentInfo(result.studentId);
                    const exam = getExamInfo(result.examId);
                    return (
                      <TableRow key={result._id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.rollNumber}</TableCell>
                        <TableCell>{student.class}</TableCell>
                        <TableCell>{exam.examName}</TableCell>
                        <TableCell>{result.totalMarks}/{result.obtainedMarks}</TableCell>
                        <TableCell>{result.percentage}%</TableCell>
                        <TableCell>
                          <Badge className={getGradeColor(result.grade)}>
                            {result.grade}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={result.status === "published" ? "default" : "secondary"}>
                            {result.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditResult(result)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
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

      {/* Add/Edit Result Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingResult ? "Edit Result" : "Add New Result"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Student</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map(student => (
                      <SelectItem key={student._id} value={student._id}>
                        {student.name} ({student.rollNumber})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Exam</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select exam" />
                  </SelectTrigger>
                  <SelectContent>
                    {exams.map(exam => (
                      <SelectItem key={exam._id} value={exam._id}>
                        {exam.examName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Remarks</Label>
              <Textarea placeholder="Enter remarks..." />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleSaveResult({})}>
                {editingResult ? "Update" : "Add"} Result
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}