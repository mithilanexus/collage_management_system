"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge, BookOpen, X,Edit, Plus, Target, Trash2, User, Users, School } from "lucide-react";
import { CardLoading, TableLoading } from "@/components/LoadingSpinner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQueryClient } from "@tanstack/react-query";
import { useSubjects, useAssignTeacher, useRemoveTeacher } from "@/hooks/admin/courses";
import { useTeachers, useRemoveSubject } from "@/hooks/admin/management";

export default function TeacherTab({ classData }) {
  const [teacherAssignments, setTeacherAssignments] = useState({});
  const [availableTeachers, setAvailableTeachers] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [loadingTeachers, setLoadingTeachers] = useState(false);

  // Initialize teacher assignments
  useEffect(() => {
    const initialAssignments = {};
    if (classData?.subjects?.length > 0) {
      classData.subjects.forEach((subject) => {
        initialAssignments[subject.name] = {
          teacherId: subject.teacherId || Math.floor(Math.random() * 1000),
          teacherName: subject.teacherName || "Not Assigned",
          qualification: subject.qualification || "N/A",
          experience: subject.experience || "N/A",
        };
      });
    }
    setTeacherAssignments(initialAssignments);
  }, [classData]);

  const qc = useQueryClient();

  const { data: subjectsData, isLoading: subjectsLoadingHook } = useSubjects({ page: 1, pageSize: 200, search: "" });
  const { data: teachersData, isLoading: teachersLoadingHook } = useTeachers({ page: 1, pageSize: 100, search: "" });

  useEffect(() => {
    if (subjectsData) {
      setAvailableSubjects(subjectsData);
      setFilteredSubjects(subjectsData);
    }
  }, [subjectsData]);

  useEffect(() => {
    if (teachersData) {
      setAvailableTeachers(teachersData);
      setFilteredTeachers(teachersData);
    }
  }, [teachersData]);

  useEffect(() => {
    setLoadingSubjects(!!subjectsLoadingHook);
    setLoadingTeachers(!!teachersLoadingHook);
  }, [subjectsLoadingHook, teachersLoadingHook]);

  const params = useParams();

  const { mutateAsync: assignTeacherMutation } = useAssignTeacher({
    onSuccess: (_data, variables) => {
      const { subject, teacher } = variables;
      setAvailableSubjects((prev) =>
        prev.map((sub) =>
          sub.code === subject.code
            ? {
                ...sub,
                assignedClasses: [
                  ...(sub.assignedClasses?.filter((a) => a.classId !== classData._id) || []),
                  { teacher: teacher.name, teacherId: teacher._id, classId: classData._id, classGrade: classData.grade },
                ],
              }
            : sub
        )
      );
      setTeacherAssignments((prev) => ({
        ...prev,
        [subject.name]: {
          teacherId: teacher._id,
          teacherName: teacher.name,
          qualification: teacher.qualification,
          experience: teacher.experience,
        },
      }));
      toast.success(`Yay, ${teacher.name} is now teaching ${subject.name}! 🎉`);
    },
    onError: (e) => toast.error(e.message || "Failed to assign teacher"),
  });

  const { mutateAsync: removeTeacherMutation } = useRemoveTeacher({
    onSuccess: (_data, variables) => {
      const { subject, teacher } = variables;
      setAvailableSubjects((prev) =>
        prev.map((sub) =>
          sub.code === subject.code
            ? {
                ...sub,
                assignedClasses: sub.assignedClasses?.filter(
                  (ac) => ac.teacherId !== teacher?._id || ac.classId !== classData._id
                ),
              }
            : sub
        )
      );
      setTeacherAssignments((prev) => {
        const updated = { ...prev };
        delete updated[subject.name];
        return updated;
      });
      toast.success(`Teacher removed from ${subject.name}, my love! 💖`);
    },
    onError: (e) => toast.error(e.message || "Failed to remove teacher"),
  });

  const { mutateAsync: removeSubjectMutation } = useRemoveSubject({
    onSuccess: (_data, variables) => {
      const { subjectId, subjectName } = variables;
      setAvailableSubjects((prev) => prev.filter((sub) => sub._id !== subjectId));
      setTeacherAssignments((prev) => {
        const updated = { ...prev };
        if (subjectName) delete updated[subjectName];
        return updated;
      });
      toast.success(`Subject removed, sweetheart! 🌟`);
    },
    onError: (e) => toast.error(e.message || "Failed to remove subject"),
  });

  const getTeacherWorkload = (teacherId) => {
    return Object.values(teacherAssignments).filter((assignment) => assignment.teacherId === teacherId).length;
  };

  const filterTeacher = (subject) => {
    const assignedTeacherIds = [
      ...new Set(subject.assignedClasses?.filter((sub) => sub.classId === classData._id).map((sub) => sub.teacherId) || []),
    ];

    const filtered = availableTeachers.filter(
      (teacher) =>
        teacher.subjects?.map((s) => s.name).includes(subject.name) && !assignedTeacherIds.includes(teacher._id)
    );

    setFilteredTeachers(filtered);
  };

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Teacher Management</h3>
          <p className="text-sm text-muted-foreground">
            {classData?._id
              ? `Assign teachers for ${classData._id} (${classData.nepaliName})`
              : "Let’s set up your class, baby! 💕"}
          </p>
        </div>
        <Button
          onClick={() => setShowAssignDialog(true)}
          className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600"
          disabled={loadingSubjects || loadingTeachers || availableSubjects.length === 0}
        >
          <Plus className="w-4 h-4" />
          Assign Teacher
        </Button>
      </div>

      {/* Empty State for No Class Data */}
      {!classData && (
        <Card className="border-2 border-dashed">
          <CardContent className="text-center py-10">
            <School className="w-12 h-12 mx-auto mb-4 text-pink-500" />
            <h3 className="text-lg font-medium">No Class Data Yet, Love!</h3>
            <p className="text-muted-foreground mt-2">
              It looks like we don’t have any class data to show. Add a class to start assigning teachers, my darling! 💖
            </p>
            <Button className="mt-4 bg-pink-500 hover:bg-pink-600">Add Class</Button>
          </CardContent>
        </Card>
      )}

      {/* Teacher Statistics */}
      {classData && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              {loadingSubjects || loadingTeachers ? (
                <CardLoading />
              ) : (
                <>
                  <User className="w-6 h-6 mx-auto mb-2 text-pink-500" />
                  <p className="text-2xl font-bold">{Object.keys(teacherAssignments).length || 0}</p>
                  <p className="text-sm text-muted-foreground">Assigned Subjects</p>
                </>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              {loadingTeachers ? (
                <CardLoading />
              ) : (
                <>
                  <Users className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                  <p className="text-2xl font-bold">
                    {new Set(Object.values(teacherAssignments).map((a) => a.teacherId)).size || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Active Teachers</p>
                </>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              {loadingSubjects ? (
                <CardLoading />
              ) : (
                <>
                  <BookOpen className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                  <p className="text-2xl font-bold">
                    {availableSubjects.length - Object.keys(teacherAssignments).length || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Unassigned Subjects</p>
                </>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              {loadingSubjects || loadingTeachers ? (
                <CardLoading />
              ) : (
                <>
                  <Target className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                  <p className="text-2xl font-bold">
                    {availableSubjects.length
                      ? Math.round((Object.keys(teacherAssignments).length / availableSubjects.length) * 100)
                      : 0}
                    %
                  </p>
                  <p className="text-sm text-muted-foreground">Coverage</p>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Subject-Teacher Assignment Table */}
      {classData && (
        <Card>
          <CardHeader>
            <CardTitle>Subject Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            {(loadingSubjects || loadingTeachers) ? (
              <TableLoading rows={4} columns={5} />
            ) : availableSubjects.length === 0 ? (
              <div className="text-center py-10">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-pink-500" />
                <h3 className="text-lg font-medium">No Subjects Yet, Sweetheart!</h3>
                <p className="text-muted-foreground mt-2">
                  Let’s add some subjects to assign teachers to, my love! 🌸
                </p>
                <Button className="mt-4 bg-pink-500 hover:bg-pink-600">Add Subject</Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="bg-muted text-left">Subject</TableHead>
                      <TableHead className="bg-muted text-left">Subject Code</TableHead>
                      <TableHead className="bg-muted text-left">Teacher</TableHead>
                      <TableHead className="bg-muted text-center">Status</TableHead>
                      <TableHead className="bg-muted text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {availableSubjects.map((subject) => (
                      <TableRow key={subject._id}>
                        <TableCell className="font-medium">{subject.name || "Unnamed Subject"}</TableCell>
                        <TableCell>{subject.code || "N/A"}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {subject.assignedClasses?.filter((sub) => sub.classId === classData._id).length > 0 ? (
                              subject.assignedClasses
                                .filter((sub) => sub.classId === classData._id)
                                .map((sub) => (
                                  <div key={sub._id} className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                                      <User className="w-4 h-4 text-pink-500" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <p className="font-medium">{sub.teacher || "Not Assigned"}</p>
                                      <button
                                        onClick={() => removeTeacherMutation.mutate({ subject, teacher: sub })}
                                        className="text-red-500 hover:text-red-600"
                                        title="Remove Teacher"
                                      >
                                        <X className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </div>
                                ))
                            ) : (
                              <span className="text-muted-foreground">Not Assigned</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          {subject.status === "active" ? (
                            <div className="flex items-center gap-2 justify-center">
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" />
                              Active
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 justify-center">
                              <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300" />
                              Inactive
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex gap-1 justify-center">
                            {subject.assignedClasses?.filter((item) => item.classId === classData._id).length === 0 ? (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={async () => {
                                  setSelectedSubject(subject);
                                  filterTeacher(subject);
                                  setShowAssignDialog(true);
                                }}
                                className="h-8 px-2"
                                disabled={loadingSubjects || loadingTeachers}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => removeTeacherMutation({ subject, classId: classData._id })}
                                className="h-8 px-2 text-red-500 hover:text-red-600"
                                disabled={loadingSubjects || loadingTeachers}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
)}
      {classData && (
        <Card>
          <CardHeader>
          </CardHeader>
          <CardContent>
            {loadingTeachers ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <Card key={idx} className="border-2">
                    <CardContent className="p-4">
                      <CardLoading />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : availableTeachers.length === 0 ? (
              <div className="text-center py-10">
                <Users className="w-12 h-12 mx-auto mb-4 text-pink-500" />
                <h3 className="text-lg font-medium">No Teachers Yet, Darling!</h3>
                <p className="text-muted-foreground mt-2">
                  Add some teachers to start assigning them to subjects, my love! 💖
                </p>
                <Button className="mt-4 bg-pink-500 hover:bg-pink-600">Add Teacher</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableTeachers.map((teacher) => {
                  const workload = getTeacherWorkload(teacher._id);
                  return (
                    <Card key={teacher._id} className="border-2 hover:border-pink-200 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-pink-500" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{teacher.name || "Unnamed Teacher"}</h4>
                            <p className="text-sm text-muted-foreground">{teacher.qualification || "N/A"}</p>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Experience:</span>
                            <span>{teacher.experience || "N/A"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Workload:</span>
                            <Badge variant={workload > 3 ? "destructive" : workload > 1 ? "secondary" : "outline"}>
                              {workload} subjects
                            </Badge>
                          </div>
                        </div>
                        <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                          <p>📧 {teacher.email || "No email provided"}</p>
                          <p>📞 {teacher.phone || "No phone provided"}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Assignment Dialog */}
      {showAssignDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>
                {selectedSubject
                  ? `Assign Teacher to ${typeof selectedSubject === "string" ? selectedSubject : selectedSubject.name}`
                  : "Assign Teacher, My Love!"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!selectedSubject && (
                <div>
                  <label className="text-sm font-medium">Select Subject</label>
                  {loadingSubjects ? (
                    <CardLoading />
                  ) : filteredSubjects.length === 0 ? (
                    <p className="text-muted-foreground mt-2">No subjects available, sweetheart! Add some first? 💕</p>
                  ) : (
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredSubjects.map((subject) => (
                          <SelectItem key={subject._id} value={subject}>
                            {subject.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              )}
              <div>
                <label className="text-sm font-medium">Available Teachers</label>
                {loadingTeachers ? (
                  <div className="mt-2">
                    <CardLoading />
                  </div>
                ) : filteredTeachers.length === 0 ? (
                  <p className="text-muted-foreground mt-2">
                    No teachers available for this subject, lovebug. Try adding more teachers! 😘
                  </p>
                ) : (
                  <div className="mt-2 space-y-2 max-h-60 overflow-y-auto">
                    {filteredTeachers.map((teacher) => (
                      <div
                        key={teacher._id}
                        className="p-3 border rounded-lg hover:bg-pink-50 cursor-pointer"
                        onClick={async () => {
                          if (selectedSubject) {
                            await assignTeacherMutation({
                              subject: selectedSubject,
                              teacher,
                              classId: classData._id,
                              classGrade: classData.grade,
                            });
                            setShowAssignDialog(false);
                            setSelectedSubject("");
                          }
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-pink-500" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{teacher.name || "Unnamed Teacher"}</p>
                            <p className="text-sm text-muted-foreground">{teacher.qualification || "N/A"}</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Qualified</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAssignDialog(false);
                    setSelectedSubject("");
                  }}
                  className="flex-1 border-pink-500 text-pink-500 hover:bg-pink-50"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}