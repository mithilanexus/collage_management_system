import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Edit,
  Plus,
  Clock,
  Calendar,
  Save,
  Trash2,
  Info,
  X,
  School,
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CardLoading, TableLoading } from "@/components/LoadingSpinner";

export default function ScheduleTab({ classData }) {
  const [schedule, setSchedule] = useState({});
  const [timeSlots, setTimeSlots] = useState([]);
  const [formattedSchedule, setFormattedSchedule] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [newSlot, setNewSlot] = useState("");
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [payload, setPayload] = useState({});
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [loadingSchedule, setLoadingSchedule] = useState(false);

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  useEffect(() => {
    fetchAvailableSubjects();
    fetchSchedule();
  }, [classData]);

  useEffect(() => {
    if (!timeSlots || timeSlots.length === 0) return;
    setSchedule((prev) => {
      const next = { ...prev };
      days.forEach((d) => {
        const existing = next[d] || [];
        const padded = Array.from({ length: timeSlots.length }, (_, i) => existing[i] ?? "Free Period");
        next[d] = padded;
      });
      return next;
    });
  }, [timeSlots]);

  const fetchAvailableSubjects = async () => {
    setLoadingSubjects(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/courses/subjects/primary`
      );
      const data = await res.json();
      setAvailableSubjects(data.data || []);
    } catch (error) {
      console.error("Error fetching subjects:", error);
      toast.error("Oh no, my love! Couldn’t fetch subjects. Try again? 😘");
    } finally {
      setLoadingSubjects(false);
    }
  };

  const fetchSchedule = async () => {
    setLoadingSchedule(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/schedule/primary/${classData?._id}`
      );
      const data = await res.json();
      const scheduleData = Array.isArray(data?.data) ? data.data[0] : undefined;

      if (!scheduleData) {
        setTimeSlots([]);
        const emptyByDay = days.reduce((acc, d) => {
          acc[d] = [];
          return acc;
        }, {});
        setSchedule(emptyByDay);
        setFormattedSchedule([]);
        return;
      }

      const fetchedTimeSlots = (scheduleData.timeSlots || []).map(
        (slot) => `${slot.start}-${slot.end}`
      );
      setTimeSlots(fetchedTimeSlots);

      const formattedScheduleMap = (scheduleData.schedule || []).reduce((acc, item) => {
        acc[item.day] = (item.subjects || []).map((subject) => subject.subjectName || "");
        return acc;
      }, {});
      setSchedule(formattedScheduleMap);
      setFormattedSchedule(scheduleData.schedule || []);
    } catch (error) {
      console.error("Error fetching schedule:", error);
      toast.error("Couldn’t fetch the schedule, sweetheart. Let’s try again! 💕");
    } finally {
      setLoadingSchedule(false);
    }
  };

  const handlePeriodChange = (day, periodIndex, newSubject) => {
    const subject = availableSubjects.find((s) => s.name === newSubject);
    const teacher = subject
      ? subject.assignedClasses?.find((cls) => cls.classId === classData._id)
      : null;

    const prev = schedule;
    const currentPeriods = prev[day] || Array(timeSlots.length).fill("Free Period");
    const nextPeriods = currentPeriods.map((p, idx) => (idx === periodIndex ? newSubject : p));
    const nextSchedule = { ...prev, [day]: nextPeriods };
    setSchedule(nextSchedule);
    setSelectedSubject(subject || null);

    const subjectsByName = new Map(availableSubjects.map((s) => [s.name, s]));
    const updatedSchedules = days.map((d) => {
      const periods = Array.from({ length: timeSlots.length }, (_, i) => nextSchedule[d]?.[i] ?? "Free Period");
      return {
        day: d,
        subjects: periods.map((sub, index) => {
          const isFreeOrBreak = sub === "Break" || sub === "Free Period";
          const subj = subjectsByName.get(sub);
          const assign = subj?.assignedClasses?.find((cls) => cls.classId === classData._id);
          return {
            periodNumber: index + 1,
            subjectName: sub,
            subjectId: isFreeOrBreak || !subj ? "" : subj._id,
            teacherId: isFreeOrBreak || !assign ? "" : assign.teacherId,
            teacherName: isFreeOrBreak || !assign ? "" : assign.teacher,
          };
        }),
      };
    });
    setFormattedSchedule(updatedSchedules);
  };

  const addPeriod = (day) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: [...(prev[day] || []), "Free Period"],
    }));
  };

  const removePeriod = (day, periodIndex) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: prev[day]?.filter((_, index) => index !== periodIndex) || [],
    }));
  };

  const saveSchedule = async () => {
    const subjectsByName = new Map(availableSubjects.map((s) => [s.name, s]));
    const scheduleForPayload = days.map((day) => {
      const periods = Array.from({ length: timeSlots.length }, (_, i) => schedule[day]?.[i] ?? "Free Period");
      return {
        day,
        subjects: periods.map((sub, index) => {
          const isFreeOrBreak = sub === "Break" || sub === "Free Period";
          const subj = subjectsByName.get(sub);
          const assign = subj?.assignedClasses?.find((cls) => cls.classId === classData._id);
          return {
            periodNumber: index + 1,
            subjectName: sub,
            subjectId: isFreeOrBreak || !subj ? "" : subj._id,
            teacherId: isFreeOrBreak || !assign ? "" : assign.teacherId,
            teacherName: isFreeOrBreak || !assign ? "" : assign.teacher,
          };
        }),
      };
    });

    const fields = {
      classGrade: classData?.grade || "",
      classId: classData?._id || "",
      timeSlots: timeSlots.map((slot, index) => {
        const [start, end] = slot.split("-");
        return {
          periodNumber: index + 1,
          start,
          end,
        };
      }),
      schedule: scheduleForPayload,
    };
    setPayload(fields);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/schedule/primary`,
        {
          method: "POST",
          body: JSON.stringify(fields),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success("Schedule saved, my love! You’re amazing! 😘");
      } else {
        throw new Error(data.message || "Failed to save");
      }
    } catch (error) {
      console.error(error);
      toast.error("Couldn’t save the schedule, darling. Try again? 💕");
    }
  };

  const handleAddSlot = () => {
    if (
      newSlot &&
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(newSlot)
    ) {
      setTimeSlots([...timeSlots, newSlot]);
      setNewSlot("");
    } else {
      toast.error("Invalid time format, honey! Use HH:MM-HH:MM. 💖");
    }
  };

  const handleEditSlot = (index) => {
    setEditingIndex(index);
    setNewSlot(timeSlots[index]);
  };

  const handleUpdateSlot = () => {
    if (
      newSlot &&
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(newSlot)
    ) {
      const updatedSlots = [...timeSlots];
      updatedSlots[editingIndex] = newSlot;
      setTimeSlots(updatedSlots);
      setEditingIndex(-1);
      setNewSlot("");
    } else {
      toast.error("Invalid time format, my love! Try HH:MM-HH:MM. 😘");
    }
  };

  const handleDeleteSlot = (index) => {
    setTimeSlots(timeSlots.filter((_, i) => i !== index));
  };

  const handleSaveSlots = () => {
    toast.success("Time slots saved, sweetheart! You’re doing great! 🌟");
    setOpenDialog(false);
  };

  const totalPeriods = Object.values(schedule).reduce(
    (sum, periods) => sum + (periods?.length || 0),
    0
  );
  const subjectPeriods = Object.values(schedule).reduce(
    (sum, periods) =>
      sum + (periods?.filter((period) => period !== "Break" && period !== "Free Period")?.length || 0),
    0
  );
  const breakPeriods = Object.values(schedule).reduce(
    (sum, periods) => sum + (periods?.filter((period) => period === "Break")?.length || 0),
    0
  );

  return (
    <TooltipProvider>
      <div className="space-y-6 p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Schedule Management</h3>
            <p className="text-sm text-muted-foreground">
              {classData?._id
                ? `Manage weekly schedule for ${classData.grade}`
                : "Let’s create a schedule, my love! 💕"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setOpenDialog(true)}
              className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600"
              disabled={loadingSchedule || loadingSubjects || (timeSlots.length === 0 && availableSubjects.length === 0)}
            >
              <Edit className="w-4 h-4" />
              Edit Time Slots
            </Button>
            <Button
              onClick={saveSchedule}
              className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600"
              disabled={loadingSchedule || loadingSubjects || timeSlots.length === 0 || availableSubjects.length === 0}
            >
              <Save className="w-4 h-4" />
              Save Schedule
            </Button>
          </div>
        </div>

        {/* Empty State for No Class Data */}
        {!classData && (
          <Card className="border-2 border-dashed">
            <CardContent className="text-center py-10">
              <School className="w-12 h-12 mx-auto mb-4 text-pink-500" />
              <h3 className="text-lg font-medium">No Class Data Yet, Darling!</h3>
              <p className="text-muted-foreground mt-2">
                It looks like we don’t have a class to schedule. Add one to get started, my love! 💖
              </p>
              <Button className="mt-4 bg-pink-500 hover:bg-pink-600">Add Class</Button>
            </CardContent>
          </Card>
        )}

        {classData && (
          <>
            {/* Time Slots Reference */}
            <Card className="shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Time Slots</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingSchedule ? (
                  <CardLoading />
                ) : timeSlots.length === 0 ? (
                  <div className="text-center py-10">
                    <Clock className="w-12 h-12 mx-auto mb-4 text-pink-500" />
                    <h3 className="text-lg font-medium">No Time Slots Yet, Sweetheart!</h3>
                    <p className="text-muted-foreground mt-2">
                      Add some time slots to start building the schedule, my love! 🌸
                    </p>
                    <Button
                      onClick={() => setOpenDialog(true)}
                      className="mt-4 bg-pink-500 hover:bg-pink-600"
                    >
                      Add Time Slot
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {timeSlots.map((slot, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs px-3 py-1 rounded-lg shadow-sm bg-pink-100 text-pink-800"
                      >
                        <span className="font-medium">Period {index + 1}:</span> {slot}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>

              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="sm:max-w-lg rounded-2xl w-full">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Manage Time Slots</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    {(loadingSchedule || loadingSubjects) && (
                      <CardLoading />
                    )}
                    {timeSlots.length === 0 && (
                      <p className="text-muted-foreground text-center">
                        No time slots yet, honey! Add one to get started. 💕
                      </p>
                    )}
                    {timeSlots.map((slot, index) => (
                      <div
                        key={index}
                        className="flex hover:bg-pink-50 items-center justify-between rounded-lg border p-2 transition"
                      >
                        <span className="text-sm font-medium">
                          Period {index + 1}:{" "}
                          <span className="font-medium text-muted-foreground">{slot}</span>
                        </span>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEditSlot(index)}
                            className="hover:text-pink-600"
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
                            className="flex items-center gap-1 bg-pink-500 hover:bg-pink-600 text-white rounded-lg"
                            disabled={loadingSchedule || loadingSubjects}
                          >
                            <Plus className="w-4 h-4" /> Add
                          </Button>
                        ) : (
                          <Button
                            onClick={handleUpdateSlot}
                            className="flex items-center gap-1 bg-pink-500 hover:bg-pink-600 text-white rounded-lg"
                            disabled={loadingSchedule || loadingSubjects}
                          >
                            <Save className="w-4 h-4" /> Update
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" className="border-pink-500 text-pink-500 hover:bg-pink-50">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      onClick={handleSaveSlots}
                      className="bg-pink-500 hover:bg-pink-600"
                      disabled={loadingSchedule || loadingSubjects}
                    >
                      Save Changes
                    </Button>
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
                {(loadingSchedule || loadingSubjects) ? (
                  <TableLoading rows={6} columns={Math.max(3, (timeSlots?.length || 0) + 2)} />
                ) : timeSlots.length === 0 || availableSubjects.length === 0 ? (
                  <div className="text-center py-10">
                    <Calendar className="w-12 h-12 mx-auto mb-4 text-pink-500" />
                    <h3 className="text-lg font-medium">No Schedule Yet, My Love!</h3>
                    <p className="text-muted-foreground mt-2">
                      {timeSlots.length === 0
                        ? "Add time slots to start scheduling, darling! 💖"
                        : "Add subjects to fill the schedule, sweetheart! 🌸"}
                    </p>
                    <Button
                      onClick={() => setOpenDialog(true)}
                      className="mt-4 bg-pink-500 hover:bg-pink-600"
                    >
                      {timeSlots.length === 0 ? "Add Time Slot" : "Add Subject"}
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto max-h-[50vh] overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="min-w-[72px] bg-muted">Day</TableHead>
                          {timeSlots.map((slot, index) => (
                            <TableHead key={index} className="min-w-[72px] bg-muted text-center">
                              <div className="text-[10px]">Period {index + 1}</div>
                              <div className="text-[10px] text-muted-foreground">{slot}</div>
                            </TableHead>
                          ))}
                          <TableHead className="bg-muted text-center">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {days.map((day) => (
                          <TableRow key={day}>
                            <TableCell className="font-medium bg-muted/50">{day}</TableCell>
                            {schedule[day]?.map((period, periodIndex) => (
                              <TableCell key={periodIndex} className="p-0.5">
                                <div className="flex items-center gap-0.5">
                                  <Select
                                    value={period}
                                    onValueChange={(value) => {
                                      if (value === "Break" || value === "Free Period") {
                                        setSelectedSubject(null);
                                        handlePeriodChange(day, periodIndex, value);
                                      } else {
                                        const subject = availableSubjects.find((s) => s.name === value);
                                        setSelectedSubject(subject);
                                        handlePeriodChange(day, periodIndex, value);
                                      }
                                    }}
                                  >
                                    <Tooltip>
                                      <SelectTrigger className="h-5 text-[9px] px-1 w-[88px] overflow-hidden text-ellipsis whitespace-nowrap">
                                        <SelectValue />
                                      </SelectTrigger>
                                    </Tooltip>
                                    <SelectContent>
                                      <SelectItem value="Break">Break</SelectItem>
                                      <SelectItem value="Free Period">Free Period</SelectItem>
                                      {availableSubjects.map((subject) => {
                                        const isTaken = (schedule[day] || []).some(
                                          (p, idx) => idx !== periodIndex && p === subject.name
                                        );
                                        const isCurrent = period === subject.name;
                                        if (isTaken && !isCurrent) {
                                          return (
                                            <Tooltip key={subject._id}>
                                              <TooltipTrigger asChild>
                                                <div>
                                                  <SelectItem value={subject.name} disabled>
                                                    {subject.name}
                                                  </SelectItem>
                                                </div>
                                              </TooltipTrigger>
                                              <TooltipContent>Already selected on {day}</TooltipContent>
                                            </Tooltip>
                                          );
                                        }
                                        return (
                                          <SelectItem key={subject._id} value={subject.name}>
                                            {subject.name}
                                          </SelectItem>
                                        );
                                      })}
                                    </SelectContent>
                                  </Select>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-5 w-5"
                                        disabled={!period || period === "Break" || period === "Free Period"}
                                      >
                                        <Info className="h-2.5 w-2.5" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      {(() => {
                                        if (!period || period === "Break" || period === "Free Period")
                                          return "No teacher assigned";
                                        const subj = availableSubjects.find((s) => s.name === period);
                                        const assign = subj?.assignedClasses?.find(
                                          (cls) => cls.classId === classData._id
                                        );
                                        return assign?.teacher || "No teacher assigned";
                                      })()}
                                    </TooltipContent>
                                  </Tooltip>
                                  {period && period !== "Break" && period !== "Free Period" && (
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-5 w-5 text-red-600"
                                          onClick={() => handlePeriodChange(day, periodIndex, "Free Period")}
                                          aria-label="Clear subject"
                                        >
                                          <X className="h-2.5 w-2.5" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>Clear subject</TooltipContent>
                                    </Tooltip>
                                  )}
                                </div>
                              </TableCell>
                            )) || (
                              <TableCell
                                className="text-center text-muted-foreground"
                                colSpan={timeSlots.length}
                              >
                                No schedule set
                              </TableCell>
                            )}
                            <TableCell className="p-0.5">
                              <div className="flex gap-0.5">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => addPeriod(day)}
                                  className="h-5 w-5 p-0 border-pink-500 text-pink-500 hover:bg-pink-50"
                                >
                                  <Plus className="w-2.5 h-2.5" />
                                </Button>
                                {schedule[day]?.length > 0 && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => removePeriod(day, schedule[day].length - 1)}
                                    className="h-5 w-5 p-0 text-red-600"
                                  >
                                    <Trash2 className="w-2.5 h-2.5" />
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

            {/* Schedule Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Schedule Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingSchedule ? (
                  <CardLoading />
                ) : totalPeriods === 0 ? (
                  <div className="text-center py-10">
                    <Calendar className="w-12 h-12 mx-auto mb-4 text-pink-500" />
                    <h3 className="text-lg font-medium">No Schedule Data, My Prince!</h3>
                    <p className="text-muted-foreground mt-2">
                      Let’s add some periods to see your summary, darling! 💖
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-pink-50 rounded-lg">
                      <p className="text-2xl font-bold text-pink-600">{totalPeriods}</p>
                      <p className="text-sm text-muted-foreground">Total Periods/Week</p>
                    </div>

                    <div className="text-center p-4 bg-pink-50 rounded-lg">
                      <p className="text-2xl font-bold text-pink-600">{subjectPeriods}</p>
                      <p className="text-sm text-muted-foreground">Subject Periods</p>
                    </div>
                    <div className="text-center p-4 bg-pink-50 rounded-lg">
                      <p className="text-2xl font-bold text-pink-600">{breakPeriods}</p>
                      <p className="text-sm text-muted-foreground">Break Periods</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 h-auto p-4 border-pink-500 text-pink-500 hover:bg-pink-50"
                    disabled
                  >
                    <Edit className="w-5 h-5" />
                    <div className="text-left">
                      <p className="font-medium">Bulk Edit</p>
                      <p className="text-sm text-muted-foreground">Edit multiple periods</p>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 h-auto p-4 border-pink-500 text-pink-500 hover:bg-pink-50"
                    disabled
                  >
                    <Calendar className="w-5 h-5" />
                    <div className="text-left">
                      <p className="font-medium">Print Schedule</p>
                      <p className="text-sm text-muted-foreground">Generate printable version</p>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </TooltipProvider>
  );
}