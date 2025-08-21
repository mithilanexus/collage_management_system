import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Edit,
    Plus,
    Clock,
    Calendar,
    Save,
    Trash2
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";

export default function ScheduleTab({ classData }) {
    const [schedule, setSchedule] = useState({});
    const [timeSlots, setTimeSlots] = useState([
        "10:00-10:45", "10:45-11:30", "11:30-12:15", "12:15-1:00",
        "1:00-1:45", "1:45-2:30", "2:30-3:15"
    ]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingIndex, setEditingIndex] = useState(-1);
    const [newSlot, setNewSlot] = useState("");

    useEffect(() => {
        const initialSchedule = {};
        classData.schedule.forEach((dayData) => {
            initialSchedule[dayData.day] = dayData.periods;
        });
        setSchedule(initialSchedule);
    }, [classData]);

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const availableSubjects = [
        "Nepali", "English", "Mathematics", "Science", "Social Studies",
        "Health & Physical Education", "Computer", "Art", "Music", "Moral Education"
    ];

    const handlePeriodChange = (day, periodIndex, newSubject) => {
        setSchedule(prev => ({
            ...prev,
            [day]: prev[day]?.map((period, index) =>
                index === periodIndex ? newSubject : period
            ) || []
        }));
    };

    const addPeriod = (day) => {
        setSchedule(prev => ({
            ...prev,
            [day]: [...(prev[day] || []), "Free Period"]
        }));
    };

    const removePeriod = (day, periodIndex) => {
        setSchedule(prev => ({
            ...prev,
            [day]: prev[day]?.filter((_, index) => index !== periodIndex) || []
        }));
    };
 
    const saveSchedule = () => {
            // transform schedule into schema-friendly format
            const formattedSchedule = Object.entries(schedule).map(([day, periods]) => ({
                day,
                subjects: (periods || []).map((subject, index) => ({
                    periodNumber: index + 1,
                    subjectName: subject,
                    subjectId: "",      // you can map IDs here if available
                    teacherId: "",
                    teacherName: "",
                })),
            }));

            const payload = {
                classGrade: classData.grade,
                classId: classData._id,
                timeSlots: timeSlots.map((slot, index) => {
                    const [start, end] = slot.split("-");
                    return {
                        periodNumber: index + 1,
                        start,
                        end,
                    };
                }),
                schedule: formattedSchedule,
            };

            console.log("Payload to save:", payload);

            toast.success("Schedule saved successfully 💖");
        };
 

    const handleAddSlot = () => {
        if (newSlot && /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(newSlot)) {
            setTimeSlots([...timeSlots, newSlot]);
            setNewSlot("");
        } else {
            toast.error("Invalid time format, darling! Use HH:MM-HH:MM. 💕");
        }
    };

    const handleEditSlot = (index) => {
        setEditingIndex(index);
        setNewSlot(timeSlots[index]);
    };

    const handleUpdateSlot = () => {
        if (newSlot && /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(newSlot)) {
            const updatedSlots = [...timeSlots];
            updatedSlots[editingIndex] = newSlot;
            setTimeSlots(updatedSlots);
            setEditingIndex(-1);
            setNewSlot("");
        } else {
            toast.error("Invalid time format, my love! 💖");
        }
    };

    const handleDeleteSlot = (index) => {
        setTimeSlots(timeSlots.filter((_, i) => i !== index));
    };

    const handleSaveSlots = () => {
        toast.success("Time slots saved, sweetheart! 😘");
        setOpenDialog(false);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold">Schedule Management</h3>
                    <p className="text-sm text-muted-foreground">
                        Manage weekly schedule for {classData.grade} ({classData.nepaliName})
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button onClick={() => setOpenDialog(true)} className="flex items-center gap-2">
                        <Edit className="w-4 h-4" />
                        Edit Time Slots
                    </Button>
                    <Button onClick={saveSchedule} className="flex items-center gap-2">
                        <Save className="w-4 h-4" />
                        Save Schedule
                    </Button>
                </div>
            </div>

            {/* Time Slots Reference */}
            <Card className="shadow-lg rounded-2xl">

                <CardHeader>
                    <CardTitle className="text-lg font-semibold whitespace-nowrap">Time Slots</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="flex flex-wrap gap-3">
                        {timeSlots.map((slot, index) => (
                            <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs px-3 py-1 rounded-lg shadow-sm"
                            >
                                <span className="font-medium">Period {index + 1}:</span> {slot}
                            </Badge>
                        ))}
                    </div>
                </CardContent>



                <Dialog open={openDialog} onOpenChange={setOpenDialog}>


                    <DialogContent className="sm:max-w-lg rounded-2xl w-full">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-semibold">
                                Manage Time Slots
                            </DialogTitle>
                        </DialogHeader>

                        <div className="space-y-4">
                            {timeSlots.map((slot, index) => (
                                <div
                                    key={index}
                                    className="flex hover:bg-muted items-center justify-between rounded-lg border p-2 hover:bg transition"
                                >
                                    <span className="text-sm font-medium">
                                        Period {index + 1}: <span className="font-medium text-muted-foreground">{slot}</span>
                                    </span>
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => handleEditSlot(index)}
                                            className="hover:text-blue-600"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => handleDeleteSlot(index)}
                                            className="hover:text-red-600"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}

                            <div className="space-y-2">
                                <Label htmlFor="newSlot" className="text-sm font-medium">
                                    Add/Edit Slot (HH:MM-HH:MM)
                                </Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="newSlot"
                                        value={newSlot}
                                        onChange={(e) => setNewSlot(e.target.value)}
                                        placeholder="e.g., 10:00-10:45"
                                        className="rounded-lg"
                                    />
                                    {editingIndex === -1 ? (
                                        <Button
                                            onClick={handleAddSlot}
                                            className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                                        >
                                            <Plus className="w-4 h-4" /> Add
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={handleUpdateSlot}
                                            className="flex items-center gap-1  text-white rounded-lg"
                                        >
                                            <Save className="w-4 h-4" /> Update
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </Card>


            {/* Schedule Grid */}
            <Card>
                <CardHeader>
                    <CardTitle>Weekly Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="border p-2 bg-muted font-medium text-left min-w-[100px]">Day</th>
                                    {timeSlots.map((slot, index) => (
                                        <th key={index} className="border p-2 bg-muted font-medium text-center min-w-[120px]">
                                            <div className="text-xs">Period {index + 1}</div>
                                            <div className="text-xs text-muted-foreground">{slot}</div>
                                        </th>
                                    ))}
                                    <th className="border p-2 bg-muted font-medium text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {days.map((day) => (
                                    <tr key={day}>
                                        <td className="border p-2 font-medium bg-muted/50">{day}</td>
                                        {schedule[day]?.map((period, periodIndex) => (
                                            <td key={periodIndex} className="border p-1">
                                                <Select
                                                    value={period}
                                                    onValueChange={(value) => handlePeriodChange(day, periodIndex, value)}
                                                >
                                                    <SelectTrigger className="h-8 text-xs">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Break">Break</SelectItem>
                                                        <SelectItem value="Free Period">Free Period</SelectItem>
                                                        {availableSubjects.map((subject) => (
                                                            <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </td>
                                        )) || <td className="border p-2 text-center text-muted-foreground" colSpan={timeSlots.length}>No schedule set</td>}
                                        <td className="border p-1">
                                            <div className="flex gap-1">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => addPeriod(day)}
                                                    className="h-6 w-6 p-0"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </Button>
                                                {schedule[day]?.length > 0 && (
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => removePeriod(day, schedule[day].length - 1)}
                                                        className="h-6 w-6 p-0 text-red-600"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                    </Button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Schedule Summary */}
            <Card>
                <CardHeader>
                    <CardTitle>Schedule Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                            <p className="text-2xl font-bold text-blue-600">
                                {Object.values(schedule).reduce((total, daySchedule) => total + (daySchedule?.length || 0), 0)}
                            </p>
                            <p className="text-sm text-muted-foreground">Total Periods/Week</p>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                            <p className="text-2xl font-bold text-green-600">
                                {Object.values(schedule).reduce((total, daySchedule) =>
                                    total + (daySchedule?.filter(period => availableSubjects.includes(period)).length || 0), 0
                                )}
                            </p>
                            <p className="text-sm text-muted-foreground">Subject Periods</p>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                            <p className="text-2xl font-bold text-orange-600">
                                {Object.values(schedule).reduce((total, daySchedule) =>
                                    total + (daySchedule?.filter(period => period === "Break").length || 0), 0
                                )}
                            </p>
                            <p className="text-sm text-muted-foreground">Break Periods</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
                            <Edit className="w-5 h-5" />
                            <div className="text-left">
                                <p className="font-medium">Bulk Edit</p>
                                <p className="text-sm text-muted-foreground">Edit multiple periods</p>
                            </div>
                        </Button>

                        <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
                            <Calendar className="w-5 h-5" />
                            <div className="text-left">
                                <p className="font-medium">Print Schedule</p>
                                <p className="text-sm text-muted-foreground">Generate printable version</p>
                            </div>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}