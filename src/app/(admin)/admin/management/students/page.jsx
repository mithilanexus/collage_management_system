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
  Trash2,
  GraduationCap,
  Phone,
  Mail,
  Calendar,
  BookOpen,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import DeleteDialog from "@/components/shared/DeleteDialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQueryClient } from "@tanstack/react-query";
import { useStudents, useDeleteStudent } from "@/hooks/admin/management";

export default function StudentsManagement() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const router = useRouter();
  const qc = useQueryClient();

  const { data, isLoading, isError, error, isFetching } = useStudents(
    { page, pageSize, search: searchTerm },
    { keepPreviousData: true, staleTime: 60_000 }
  );

  const { mutateAsync: deleteStudent } = useDeleteStudent();

  const items = data?.items ?? data?.data ?? data ?? [];
  const total = data?.total ?? items?.length ?? 0;

  const filteredStudents = items;

  const handleView = (student) => {
    setSelectedStudent(student);
  };

  const handleEdit = (studentId) => {
    router.push(`/admin/management/students/${studentId}/edit`);
  };

  const handleDelete = async (studentId) => {
    try {
      await deleteStudent(studentId);
      toast.success("Student deleted successfully");
    } catch (error) {
      toast.error(error?.message || "Failed to delete student");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Students Management
          </h1>
          <p className="text-muted-foreground">
            Manage student records and information
          </p>
        </div>
        <Button
          onClick={() =>
            (router.push("/admin/management/students/add"))
          }
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New Student
        </Button>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by name, student ID, class, phone or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {items.length}
            </div>
            <div className="text-sm text-muted-foreground">Total Students</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {items.filter((s) => s.status === "Active").length}
            </div>
            <div className="text-sm text-muted-foreground">Active Students</div>
          </CardContent>
        </Card>
      </div>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>Students List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Guardian</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7}>Loading…</TableCell>
                  </TableRow>
                ) : isError ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-destructive">{String(error?.message || "Failed to load")}</TableCell>
                  </TableRow>
                ) : filteredStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-muted-foreground">No students found.</TableCell>
                  </TableRow>
                ) : (
                  filteredStudents.map((student) => (
                    <TableRow
                      key={student._id}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      {/* Student Info */}
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {student.name || [student.firstName, student.lastName].filter(Boolean).join(" ") || "Unnamed"}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {student.email || ""}
                          </div>
                        </div>
                      </TableCell>

                      {/* Student ID */}
                      <TableCell>
                        <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                          {student.studentId || student.rollNumber || "-"}
                        </span>
                      </TableCell>

                      {/* Class */}
                      <TableCell>
                        <div>
                          <div className="font-medium">{student.class || student.className || student.classGrade || "-"}</div>
                          <div className="text-sm text-muted-foreground">
                            Section {student.section || "-"} – Roll {student.rollNumber || "-"}
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-1 mb-1">
                          <Phone className="w-3 h-3" />
                          <span className="text-sm">{student.phone || "-"}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {student.district || "-"}
                        </div>
                      </TableCell>

                      {/* Guardian */}
                      <TableCell>
                        <div>
                          <div className="font-medium text-sm">{student.guardianName || student.fatherName || student.motherName || "-"}</div>
                          <div className="text-sm text-muted-foreground">
                            {student.guardianRelation || ""}
                          </div>
                        </div>
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${student.status === "Active"
                            ? "bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300"
                            : "bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-300"
                            }`}
                        >
                          {student.status}
                        </span>
                      </TableCell>

                      {/* Actions */}
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleView(student)}
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(student._id)}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <DeleteDialog handleDelete={() => handleDelete(student._id)} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex gap-2 items-center justify-end">
        <Button size="sm" variant="outline" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</Button>
        <span className="text-sm">Page {page}</span>
        <Button size="sm" variant="outline" disabled={items.length < pageSize || page * pageSize >= total} onClick={() => setPage((p) => p + 1)}>Next</Button>
        {isFetching && <span className="text-xs text-muted-foreground ml-2">Updating…</span>}
      </div>

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Student Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedStudent.name}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Student ID</label>
                  <p className="text-sm text-muted-foreground font-mono">
                    {selectedStudent.studentId}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Date of Birth</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedStudent.dateOfBirth}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Gender</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedStudent.gender}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Caste</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedStudent.caste}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Religion</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedStudent.religion}
                  </p>
                </div>
              </div>

              {/* Academic Information */}
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Academic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Class</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedStudent.class}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Section</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedStudent.section}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Roll Number</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedStudent.rollNumber}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Admission Date
                    </label>
                    <p className="text-sm text-muted-foreground">
                      {selectedStudent.admissionDate}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Previous School
                    </label>
                    <p className="text-sm text-muted-foreground">
                      {selectedStudent.previousSchool}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">SLC GPA</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedStudent.slcGpa}
                    </p>
                  </div>
                </div>
              </div>

              {/* Guardian Information */}
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Guardian Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Father's Name</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedStudent.fatherName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Mother's Name</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedStudent.motherName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Guardian Name</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedStudent.guardianName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Guardian Number
                    </label>
                    <p className="text-sm text-muted-foreground">
                      {selectedStudent.guardianPhone}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setSelectedStudent(null)}
                >
                  Close
                </Button>
                <Button onClick={() => handleEdit(selectedStudent._id)}>
                  Edit Student
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
