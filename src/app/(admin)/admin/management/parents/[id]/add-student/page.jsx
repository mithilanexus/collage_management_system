"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useStudents, useAddStudentToParent, useAddStudents } from "@/hooks/admin/management";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Save,
  Search,
  UserPlus,
  Users,
  Plus,
  GraduationCap
} from "lucide-react";
import { toast } from "sonner";

export default function AddStudentToParent() {
  const params = useParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const parentId = params.id;

  const { data: studentsData, isLoading: loading } = useAddStudents({ parentId })
  const availableStudents = studentsData?.filter(student => !student.parentId) || [];

  const { mutateAsync: addStudentToParent } = useAddStudentToParent(
    {studentsData,parentId}
  );

  const handleStudentSelect = (student) => {
    if (selectedStudents.find(s => s._id === student._id)) {
      setSelectedStudents(selectedStudents.filter(s => s._id !== student._id));
    } else {
      setSelectedStudents([...selectedStudents, student]);
    }
  };

  const handleSubmit = async () => {
    const studentIds = selectedStudents.map(student => student._id);
    try {
      await addStudentToParent({ parentId, studentIds });
      toast.success("Students added successfully!");
      router.push(`/admin/management/parents/${parentId}`);
    } catch (error) {
      toast.error(error?.message || "Failed to add students!");
    }
  };

  const filteredStudents = availableStudents.filter(student => {
    return student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.includes(searchTerm);
  });

  return loading ? (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  ) : (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Add Students to Parent</h1>
          <p className="text-muted-foreground">Select existing students or create new ones</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Available Students */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search */}
          <Card>
            <CardHeader>
              <CardTitle>Available Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search by student name, ID or class..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    {availableStudents.length} students found
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/admin/management/students/add?parent_id=${params.id}`)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Student
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Students List */}
          <Card>
            <CardContent className="p-0">
              <div className="space-y-2 p-4">
                {filteredStudents.map((student) => (
                  <div
                    key={student._id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedStudents.find(s => s._id === student._id)
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted/50"
                      }`}
                    onClick={() => handleStudentSelect(student)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <GraduationCap className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-mono">{student.studentId}</p>
                        <p className="text-sm text-muted-foreground">{student.class} - {student.section}</p>
                      </div>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                      <p>Roll: {student.rollNumber}</p>
                      <p>Phone: {student.phone}</p>
                      <p>Blood Group: {student.bloodGroup}</p>
                      <p>DOB: {student.dateOfBirth}</p>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      <p>Address: {student.permanentAddress}</p>
                    </div>
                  </div>
                ))}

                {filteredStudents.length === 0 && (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No students found</p>
                    <Button
                      size="sm"
                      className="mt-2"
                      onClick={() => setShowNewStudentForm(true)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create New Student
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Selected Students */}
        <div className="sticky top-0 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Selected Students ({selectedStudents.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedStudents.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No students selected</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedStudents.map((student) => (
                    <div key={student._id} className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-sm">{student.name}</h5>
                          <p className="text-xs text-muted-foreground">{student.email}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleStudentSelect(student)}
                          className="text-destructive hover:text-destructive"
                        >
                          ×
                        </Button>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        <p>{student.studentId} | {student.class}</p>
                        {student.isNew && (
                          <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs mt-1">
                            New Student
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="sticky bottom-0 space-y-3">
            <Button
              onClick={handleSubmit}
              className="w-full"
              disabled={selectedStudents.length === 0}
            >
              <Save className="w-4 h-4 mr-2" />
              Add Students ({selectedStudents.length})
            </Button>
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
