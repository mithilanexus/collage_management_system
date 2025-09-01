"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Edit,
  UserPlus,
  Users,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileText,
  Eye,
  Trash2,
  Search,
  GraduationCap,
  BookOpen,
  Award,
  Save,
  Settings,
} from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function ParentDetail() {
  const params = useParams();
  const [parent, setParent] = useState({});
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const parentId = params.id;

  useEffect(() => {
    // Simulate API call
    fetchParentData();
  }, [parentId]);
  const fetchParentData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/management/parent/${parentId}`
      );
      const data = await res.json();
      setParent({ ...data.data });
      setFilteredStudents(data.data.students);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching parents data:", error);
    }
  };
  // Filter students based on search term
  useEffect(() => {
    if (!parent.students) return;
    console.log(parent.students);
    const filtered = parent.students?.filter(
      (student) =>
        student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.class?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.section?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNumber?.includes(searchTerm) ||
        student.phone?.includes(searchTerm) ||
        student.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchTerm, parent.students]);

  const router = useRouter();
  const handleEdit = () => {
    // window.location.href = `/admin/management/parents/${params.id}/edit`;
    router.push(`/admin/management/parents/${params.id}/edit`);
  };


  const handleRemoveStudent = async (studentId) => {
    try {
      setParent({
        ...parent,
        students: parent.students.filter((s) => s._id !== studentId),
        studentsCount: parent.students.length - 1,
      });
      setFilteredStudents(parent.students.filter((s) => s._id !== studentId));
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/management/parent/${parentId}/add-student/${studentId}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success("Student removed successfully!");
      } else {
        toast.error("Failed to remove student");
      }
    } catch (error) {
      toast.error("Failed to remove student");
    }
  };


  const handleViewStudent = (student) => {
    setSelectedStudent(student);
  };

  const handleEditStudent = (student) => {
    router.push(`/admin/management/parents/${params.id}/edit-student/${student._id}`);
  };



  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!parent) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Parent Not Found
        </h2>
        <p className="text-muted-foreground mb-4">
          This parent record does not exist.
        </p>
        <Button onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Parent Management
            </h1>
            <p className="text-muted-foreground">
              {parent.fatherName} - Student Management
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleEdit}>
            <Edit className="w-4 h-4 mr-2" />
            Edit Parent
          </Button>
          <Button onClick={() => router.push(`/admin/management/parents/${params.id}/add-student`)}>
            <UserPlus className="w-4 h-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Parent Information */}
        <div className="lg:col-span-1 space-y-6">
          {/* Parent Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Parent Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Father's Name
                </label>
                <p className="font-medium">{parent.fatherName}</p>
                <p className="text-sm text-muted-foreground">
                  {parent.fatherOccupation}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Mother's Name
                </label>
                <p className="font-medium">{parent.motherName}</p>
                <p className="text-sm text-muted-foreground">
                  {parent.motherOccupation}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary" />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Primary Phone
                  </label>
                  <p className="font-medium">{parent.fatherPhone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Email
                  </label>
                  <p className="font-medium">{parent.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary" />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Address
                  </label>
                  <p className="font-medium">{parent.permanentAddress}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold text-primary">
                {parent.students?.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Students
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Students Management */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search and Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Students Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search students by name, ID or class..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button
                  onClick={() => router.push(`/admin/management/parents/${params.id}/add-student`)}
                  className="flex items-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  Add Student
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Students List */}
          <Card>
            <CardHeader>
              <CardTitle>Students ({filteredStudents?.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredStudents?.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No students found</p>
                  <Button size="sm" className="mt-2" onClick={() => router.push(`/admin/management/parents/${params.id}/add-student`)}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add First Student
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredStudents?.map((student, index) => (
                    <div
                      key={index}
                      className="p-4 border border-border rounded-lg hover:bg-muted/50"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <GraduationCap className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-lg">
                              {student.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {student.email}
                            </p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-sm font-mono bg-muted px-2 py-1 rounded">
                                {student.studentId}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {student.class} - Section {student.section}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                Roll: {student.rollNumber}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() =>
                              router.push(
                                `/admin/management/parents/${parent._id}/student/${student._id}`
                              )
                            }
                            className="flex items-center gap-1"
                          >
                            <Settings className="w-3 h-3" />
                            Manage
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewStudent(student)}
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditStudent(student)}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete your account and remove
                                  your data from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    handleRemoveStudent(student._id)
                                  }
                                >
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Status:</span>
                          <span
                            className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${student.status === "Active"
                              ? "bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300"
                              : "bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-300"
                              }`}
                          >
                            {student.status}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Phone:</span>
                          <p className="font-medium">{student.phone}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Blood Group:
                          </span>
                          <p className="font-medium">{student.bloodGroup}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            SLC GPA:
                          </span>
                          <p className="font-medium">{student.slcGpa ? student.slcGpa : "UnKnown"}</p>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-border">
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            <span className="text-muted-foreground">
                              Admission: {student.admissionDate}
                            </span>
                          </div>
                          {student.scholarshipHolder && (
                            <div className="flex items-center gap-2">
                              <Award className="w-3 h-3 text-yellow-600" />
                              <span className="text-yellow-600">
                                Scholarship
                              </span>
                            </div>
                          )}
                          {student.hostelResident && (
                            <div className="flex items-center gap-2">
                              <BookOpen className="w-3 h-3 text-blue-600" />
                              <span className="text-blue-600">Hostel</span>
                            </div>
                          )}
                          {student.transportUser && (
                            <div className="flex items-center gap-2">
                              <FileText className="w-3 h-3 text-green-600" />
                              <span className="text-green-600">Transport</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Student Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <label className="text-sm font-medium">Class</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedStudent.class} - Section {selectedStudent.section}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Roll Number</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedStudent.rollNumber}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Date of Birth</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedStudent.dateOfBirth}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Blood Group</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedStudent.bloodGroup}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedStudent.phone}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedStudent.email}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium">Address</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedStudent.address}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Previous School</label>
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
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setSelectedStudent(null)}
                >
                  Close
                </Button>
                <Button onClick={() => handleEditStudent(selectedStudent.id)}>
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
