"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge, BookOpen, Edit, Plus, Target, Trash2, User, Users, X } from "lucide-react";

export default function TeacherTab({ classData }) {
    const [teacherAssignments, setTeacherAssignments] = useState({});
    const [availableTeachers, setAvailableTeachers] = useState([]);
    const [showAssignDialog, setShowAssignDialog] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState("");
    const [availableSubjects, setAvailableSubjects] = useState([]);
    const [filteredSubjects, setFilteredSubjects] = useState([])
    const [filteredTeachers, setFilteredTeachers] = useState([])



    // Initialize teacher assignments
    useEffect(() => {
        getAvailableSubjects();
        getAvailableTeachers()
        const initialAssignments = {};
        classData.subjects.forEach((subject) => {
            initialAssignments[subject.name] = {
                teacherId: subject.teacherId || Math.floor(Math.random() * 1000),
                teacherName: subject.teacherName,
                qualification: subject.qualification,
                experience: subject.experience
            };
        });
        setTeacherAssignments(initialAssignments);
    }, [classData]);

    const getAvailableSubjects = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/admin/courses/subjects/primary`
            );
            const data = await res.json();
            setAvailableSubjects([...data.data]);
            setFilteredSubjects([...data.data])
        } catch (error) {
            console.error("Error fetching subjects:", error);
        }
    };

    const getAvailableTeachers = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/admin/management/teachers/primary`
            );
            const data = await res.json();
            setAvailableTeachers([...data.data]);
            setFilteredTeachers([...data.data])
        } catch (error) {
            console.error("Error fetching teachers:", error);
        }
    };
    const params = useParams()
    const assignTeacher = async (subject, teacher) => {
        console.log(teacher);

        // Update availableSubjects, ensuring only one object per class in assignedClasses
        setAvailableSubjects(prev =>
            prev.map(sub =>
                sub.code === subject.code
                    ? {
                        ...sub,
                        assignedClasses: [
                            // Keep only entries for different classes, remove any for the same class
                            ...(sub.assignedClasses?.filter(a => a.class !== classData.grade) || []),
                            { teacher: teacher.name, teacherId: teacher._id, class: classData.grade }
                        ]
                    }
                    : sub
            )
        );

        console.log(availableSubjects);

        // Update teacherAssignments, guarding against non-array prev
        setTeacherAssignments(prev => [
            ...(Array.isArray(prev) ? prev : []),
            teacher
        ]);

        const updatingData = {
            teacher: teacher.name,
            teacherId: teacher._id,
            class: classData.grade,
            subjectId: subject._id
        };

        console.log(params);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/courses/primary/add/${params.id}/assigned-classes`, {
                method: "POST",
                body: JSON.stringify(updatingData)
            });
            const data = await res.json();
            console.log(data);
            toast.success(`${teacher.name} assigned to ${subject.name}`);
        } catch (error) {
            console.error(error);
        }
    };


    const removeTeacher = async (subject, teacher) => {
        console.log(subject);
        console.log(teacher);
        const assignedClassId = subject.assignedClasses.find(ac => ac.teacherId === teacher._id && ac.class === classData.grade);
        console.log(assignedClassId);
        const updatedSubjects = availableSubjects.map(sub =>
            sub.code === subject.code
                ? {
                    ...sub,
                    assignedClasses: sub.assignedClasses.filter(
                        ac => {
                            return console.log(ac.teacherId !== teacher._id || ac.class !== classData.grade)
                        }
                    )
                }
                : sub
        );
        setAvailableSubjects(updatedSubjects); 
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/courses/primary/add/${params.id}/assigned-classes/${teacher._id}`, {
                method: "DELETE",
                body: JSON.stringify({
                    teacher: teacher.name,
                    teacherId: teacher._id,
                    class: classData.grade,
                    subjectId: subject._id,
                    assignedClassId: assignedClassId
                })
            });
            const data = await res.json();
            console.log(data); 
        } catch (error) {
            console.error(error);
        }

        toast.success(`Teacher removed from ${subject.name}`);
    };
    const removeSubject = (subject) => { }
    const getTeacherWorkload = (teacherId) => {
        return Object.values(teacherAssignments).filter(
            assignment => assignment.teacherId === teacherId
        ).length;
    };

    const filterTeacher = (subject) => {
        // Get IDs of teachers already assigned to this subject
        const assignedTeacherIds = [...new Set(subject.assignedClasses?.filter(sub => sub.class === classData.grade).map(sub => sub.teacherId) || [])];

        // Filter teachers who can teach the subject, are NOT assigned and their class matches
        const filteredTeachers = availableTeachers.filter(teacher =>
            teacher.subjects.map(s => s.name).includes(subject.name) &&
            !assignedTeacherIds.includes(teacher._id)
        );

        console.log('Unassigned Teachers:', filteredTeachers);
        setFilteredTeachers(filteredTeachers);
    }
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold">Teacher Management</h3>
                    <p className="text-sm text-muted-foreground">
                        Assign teachers to subjects for {classData.grade} ({classData.nepaliName})
                    </p>
                </div>
                <Button onClick={() => setShowAssignDialog(true)} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Assign Teacher
                </Button>
            </div>

            {/* Teacher Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-4 text-center">
                        <User className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                        <p className="text-2xl font-bold">{Object.keys(teacherAssignments).length}</p>
                        <p className="text-sm text-muted-foreground">Assigned Subjects</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 text-center">
                        <Users className="w-6 h-6 mx-auto mb-2 text-green-600" />
                        <p className="text-2xl font-bold">{new Set(Object.values(teacherAssignments).map(a => a.teacherId)).size}</p>
                        <p className="text-sm text-muted-foreground">Active Teachers</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 text-center">
                        <BookOpen className="w-6 h-6 mx-auto mb-2 text-orange-600" />
                        <p className="text-2xl font-bold">{availableSubjects.length - Object.keys(teacherAssignments).length}</p>
                        <p className="text-sm text-muted-foreground">Unassigned Subjects</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 text-center">
                        <Target className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                        <p className="text-2xl font-bold">{Math.round((Object.keys(teacherAssignments).length / availableSubjects.length) * 100)}%</p>
                        <p className="text-sm text-muted-foreground">Coverage</p>
                    </CardContent>
                </Card>
            </div>

            {/* Subject-Teacher Assignment Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Subject Assignments</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="border p-3 bg-muted font-medium text-left">Subject</th>
                                    <th className="border p-3 bg-muted font-medium text-left">Subject Code</th>
                                    <th className="border p-3 bg-muted font-medium text-left">Teacher</th>
                                    {/* <th className="border p-3 bg-muted font-medium text-left">Experience</th> */}
                                    <th className="border p-3 bg-muted font-medium text-center">Status</th>
                                    <th className="border p-3 bg-muted font-medium text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {availableSubjects.map((subject) => {
                                    return (
                                        <tr key={subject._id}>
                                            <td className="border p-3 font-medium">{subject.name}</td>
                                            <td className="border p-3">
                                                {subject ? subject.code : "-"}
                                            </td>
                                            <td className="border p-3">
                                                {/* { */}
                                                <div className="flex items-center gap-2">

                                                    <div>
                                                        {
                                                            subject.assignedClasses?.map((sub) => {
                                                                if (sub.class == classData.grade) {

                                                                    return <div className="flex items-center gap-2">
                                                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                                            <User className="w-4 h-4 text-blue-600" />
                                                                        </div>
                                                                        <div className="flex items-center gap-2">
                                                                            <p className="font-medium">{sub.teacher} </p>
                                                                            <button onClick={() => removeTeacher(subject, sub)} className="text-red-600 hover:text-red-700 cursor-pointer" title="Remove Teacher">
                                                                                <X className="w-4 h-4" />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                }
                                                            })
                                                        }
                                                        <span key={subject._id}
                                                            className={`text-muted-foreground ${subject.assignedClasses.filter(sub => sub.class == classData.grade).length > 0 ? 'hidden' : ''}`}>Not assigned</span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* <td className="border p-3">
                                                {assignment ? assignment.experience : "-"}
                                            </td> */}
                                            <td className="border p-3 text-center">
                                                {subject.status == "active" ? (
                                                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                                        Active
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                                                        Inactive
                                                    </Badge>
                                                )}
                                            </td>
                                            <td className="border p-3 text-center">
                                                <div className="flex gap-1 justify-center">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => {
                                                            setSelectedSubject(subject);
                                                            filterTeacher(subject);
                                                            setShowAssignDialog(true);
                                                        }}
                                                        className="h-8 px-2"
                                                    >
                                                        {subject.assignedClasses?.map(item => item.class == classData.grade).length ? <Edit className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                                                    </Button>
                                                    {subject.assignedClasses?.map(item => item.class == classData.grade).length && (
                                                        <Button
                                                            size="sm"
                                                            variant="outline"

                                                            title="Remove Subject"
                                                            onClick={() => removeSubject(subject, subject.assignedClasses?.map(item => item.teacherId == classData.grade))}
                                                            className="h-8 px-2 text-red-600 hover:text-red-700 cursor-pointer"
                                                        >
                                                            <Trash2 className="w-3 h-3" />
                                                        </Button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Available Teachers */}
            <Card>
                <CardHeader>
                    <CardTitle>Available Teachers</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                        {availableTeachers.map((teacher) => {
                            const workload = getTeacherWorkload(teacher.id);
                            console.log(workload)
                            return (
                                <Card key={teacher.id} className="border-2 hover:border-blue-200 transition-colors">
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                <User className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-medium">{teacher.name}</h4>
                                                <p className="text-sm text-muted-foreground">{teacher.qualification}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Experience:</span>
                                                <span>{teacher.experience}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Workload:</span>
                                                <Badge variant={workload > 3 ? "destructive" : workload > 1 ? "secondary" : "outline"}>
                                                    {workload} subjects
                                                </Badge>
                                            </div>
                                        </div>

                                        {/* <div className="mt-3">
                                            <p className="text-xs text-muted-foreground mb-1">Specializations:</p>
                                            <div className="flex flex-wrap gap-1">
                                                {teacher.specializations.map((spec) => (
                                                    <Badge key={spec} variant="outline" className="text-xs">
                                                        {spec}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div> */}

                                        <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                                            <p>📧 {teacher.email}</p>
                                            <p>📞 {teacher.phone}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Assignment Dialog */}
            {showAssignDialog && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <Card className="w-full max-w-md mx-4">
                        <CardHeader>
                            <CardTitle>
                                {
                                    selectedSubject ? `Assign Teacher to ${typeof selectedSubject === "string" ? selectedSubject : selectedSubject.name
                                        }` : "Assign Teacher"}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {!selectedSubject && (
                                <div>
                                    <label className="text-sm font-medium">Select Subject</label>
                                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choose a subject" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {filteredSubjects.map((subject) => (
                                                <SelectItem key={subject.name} value={subject.name}>
                                                    {subject.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            <div>
                                <label className="text-sm font-medium">Available Teachers</label>
                                {filteredTeachers.length > 0 ? (
                                    <div className="mt-2 space-y-2 max-h-60 overflow-y-auto">
                                        {filteredTeachers
                                            .map((teacher) => (

                                                <div
                                                    key={teacher.id}
                                                    className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                                                    onClick={() => {
                                                        if (selectedSubject) {
                                                            assignTeacher(selectedSubject, teacher);
                                                            setShowAssignDialog(false);
                                                            setSelectedSubject("");
                                                        }
                                                    }}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                            <User className="w-4 h-4 text-blue-600" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="font-medium">{teacher.name}</p>
                                                            <p className="text-sm text-muted-foreground">{teacher.qualification}</p>
                                                            {/* <div className="flex gap-1 mt-1">
                                                            {teacher.specializations.map((spec) => (
                                                                <Badge key={spec} variant="outline" className="text-xs">
                                                                    {spec}
                                                                </Badge>
                                                            ))}
                                                        </div> */}
                                                        </div>
                                                        {selectedSubject && (
                                                            <Badge className="bg-green-100 text-green-800">
                                                                Qualified
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground">No available teachers</p>
                                )}
                            </div>

                            <div className="flex gap-2 pt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setShowAssignDialog(false);
                                        setSelectedSubject("");
                                    }}
                                    className="flex-1"
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
