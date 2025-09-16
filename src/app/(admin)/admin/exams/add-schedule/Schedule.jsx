"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, addDays, isValid } from "date-fns";

const initialSubjects = [
    ["-", "-", "-", "English", "Nepali", "Maths", "Drawing/Rhymes"],
    ["-", "-", "Nepali", "English", "Science", "Maths", "Drawing/Rhymes"],
    ["-", "Nepali", "Social", "English", "Science", "Maths", "Drawing/Rhymes"],
    ["Mero Serofero", "Mathematics", "Nepali", "L.C", "English", "Science", "Drawing/Conversation"],
    ["Mero Serofero", "Mathematics", "Nepali", "L.C", "English", "Science", "Drawing/Conversation"],
    ["Mero Serofero", "Mathematics", "English", "Nepali", "L.C/Drawing", "Science", "P.L"],
    ["Nepali", "English", "Mathematics", "Science", "Social", "Computer/PL", "L.C/Drawing"],
    ["English", "Social", "Mathematics", "Science", "Nepali", "PL/L.C", "Computer"],
    ["Nepali", "English/PL", "Mathematics", "Science", "Social", "Health/Computer", "L.C"],
    ["English/Health", "Nepali", "Mathematics", "Social", "PL/L.C", "Science", "Computer/O. Maths"],
    ["English/PL", "Nepali", "Mathematics", "Science", "Social Studies", "Health/Computer", "L.C/O. Maths"],
];

export default function Schedule({ onScheduleUpdate, examLevel = "primary", startDate, initialSubjectsMatrix, initialDates, classesOverride, readOnly = false }) {
    const [classes, setClasses] = useState([]);
    const [subjectsMatrix, setSubjectsMatrix] = useState(
        initialSubjectsMatrix && Array.isArray(initialSubjectsMatrix)
            ? initialSubjectsMatrix.map((r) => [...r])
            : initialSubjects.map((r) => [...r])
    );
    const [editedDates, setEditedDates] = useState(
        Array.isArray(initialDates) && initialDates.length > 0 ? initialDates : []
    );
    const [availableSubjects, setAvailableSubjects] = useState([]);
    const [loadingSubjects, setLoadingSubjects] = useState(false);
    const [subjectsError, setSubjectsError] = useState("");

    // Initialize with 7 empty date columns if not provided
    useEffect(() => {
        if (!initialDates || initialDates.length === 0) {
            setEditedDates(Array.from({ length: 7 }, () => null));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // When a startDate is chosen, auto-fill subsequent days across columns
    useEffect(() => {
        if (isValid(startDate)) {
            const len = editedDates.length || 7;
            const days = Array.from({ length: len }, (_, i) => addDays(startDate, i));
            setEditedDates(days);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate, editedDates.length]);

    // Ensure subjects length matches the number of dates (columns)
    useEffect(() => {
        setSubjectsMatrix((prev) =>
            prev.map((row) => {
                const desiredLen = editedDates.length;
                const current = row || [];
                if (desiredLen === current.length) return current;
                if (desiredLen < current.length) {
                    return current.slice(0, desiredLen);
                }
                return [...current, ...Array(desiredLen - current.length).fill("-")];
            })
        );
    }, [editedDates]);

    useEffect(() => {
        // classes can be overridden by parent
        if (Array.isArray(classesOverride) && classesOverride.length > 0) {
            setClasses(classesOverride.map((grade) => ({ grade })));
        } else {
            fetchAvailableClasses();
        }
        fetchAvailableSubjects();
        // Reset subjects matrix when level changes only if not editing existing
        if (!initialSubjectsMatrix) {
            setSubjectsMatrix(initialSubjects.map((r) => [...r]));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [examLevel]);

    const fetchAvailableSubjects = async () => {
        try {
            setLoadingSubjects(true);
            setSubjectsError("");
            const level = ["primary", "secondary", "bachelor"].includes(examLevel)
                ? examLevel
                : "primary";
            const response = await fetch(`/api/admin/courses/subjects/${level}`);
            if (!response.ok) {
                // Fallback: if endpoint not available for non-primary
                if (level !== "primary") {
                    const fallback = await fetch(`/api/admin/courses/subjects/primary`);
                    if (fallback.ok) {
                        const fb = await fallback.json();
                        setAvailableSubjects(fb.data || []);
                    } else {
                        setAvailableSubjects([]);
                    }
                } else {
                    setAvailableSubjects([]);
                }
            } else {
                const data = await response.json();
                setAvailableSubjects(data.data || []);
            }
        } catch (error) {
            console.error("Error fetching subjects:", error);
            setSubjectsError("Failed to load subjects.");
            setAvailableSubjects([]);
        } finally {
            setLoadingSubjects(false);
        }
    };

    const fetchAvailableClasses = async () => {
        try {
            // If override provided, skip fetch
            if (Array.isArray(classesOverride) && classesOverride.length > 0) {
                setClasses(classesOverride.map((grade) => ({ grade })));
                return;
            }
            const response = await fetch('/api/admin/courses/primary/classes');
            const data = await response.json();
            setClasses(data.data);
            console.log(data.data);
        } catch (error) {
            console.error('Error fetching classes:', error);
            return [];
        }
    };

    const prevScheduleRef = useRef(initialSubjects);
    const prevDatesRef = useRef([]);
    useEffect(() => {
        if (!onScheduleUpdate) return;

        const scheduleChanged =
            JSON.stringify(prevScheduleRef.current) !== JSON.stringify(subjectsMatrix);
        const datesChanged =
            JSON.stringify(prevDatesRef.current) !== JSON.stringify(editedDates);

        if (scheduleChanged || datesChanged) {
            // Build combined schedule array for compatibility
            const combined = classes.map((className, idx) => ({
                className: className.grade,
                subjects: subjectsMatrix[idx] || [],
            }));
            onScheduleUpdate(combined, editedDates);

            // Also log separated arrays as requested
            const dates = editedDates;
            // Console structured output
            // eslint-disable-next-line no-console
            console.log({ classes, subjectsMatrix, dates });
            prevScheduleRef.current = subjectsMatrix;
            prevDatesRef.current = editedDates;
        }
    }, [subjectsMatrix, editedDates, onScheduleUpdate, classes]);


    const updateSubject = (rowIndex, colIndex, value) => {
        if (readOnly) return;
        setSubjectsMatrix((prev) =>
            prev.map((row, rIdx) => {
                if (rIdx === rowIndex) {
                    const newRow = [...row];
                    newRow[colIndex] = value;
                    return newRow;
                }
                return row;
            })
        );
    };

    const updateDate = (index, newDate) => {
        if (readOnly) return;
        setEditedDates((prev) => {
            const next = [...prev];
            if (!newDate || !isValid(newDate)) {
                next[index] = null;
                return next;
            }
            next[index] = newDate;
            for (let i = index + 1; i < next.length; i++) {
                next[i] = addDays(newDate, i - index);
            }
            return next;
        });
    };

    const memoizedSubjects = useMemo(() => availableSubjects, [availableSubjects]);

    const addDay = () => {
        setEditedDates((prev) => {
            const last = prev?.[prev.length - 1];
            let toAppend = null;
            if (isValid(last)) {
                toAppend = addDays(last, 1);
            } else if (isValid(startDate)) {
                // If last is not valid but we have a startDate, append sequentially after the last valid index
                const lastValidIndex = [...prev].reverse().findIndex((d) => isValid(d));
                if (lastValidIndex !== -1) {
                    const idxFromEnd = lastValidIndex; // distance from end
                    const absoluteIdx = prev.length - 1 - idxFromEnd;
                    const base = prev[absoluteIdx];
                    toAppend = addDays(base, prev.length - absoluteIdx);
                } else {
                    // No valid dates yet, keep null to let user pick
                    toAppend = null;
                }
            } else {
                toAppend = null;
            }
            return [...prev, toAppend];
        });
    };

    return (
        <div className="overflow-x-auto max-w-full">
            <div className="flex items-center justify-end mb-2 gap-2">
                <Button type="button" size="sm" variant="outline" onClick={addDay}>+ Add Day</Button>
            </div>
            <Table className="min-w-[700px]">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[140px] sticky left-0 bg-background z-10">Class</TableHead>
                        {editedDates.map((date, index) => (
                            <TableHead key={index} className="w-[120px] text-center">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start text-xs"
                                        >
                                            <CalendarIcon className="mr-1 h-3 w-3" />
                                            {date && isValid(date) ? format(date, "eee, MMM d") : "Pick date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={date ?? undefined}
                                            onSelect={(newDate) => updateDate(index, newDate)}
                                            className="rounded-md border"
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {classes.map((className, rowIndex) => (
                        <MemoizedRow
                            key={rowIndex}
                            className={className.grade}
                            subjects={subjectsMatrix[rowIndex] || []}
                            rowIndex={rowIndex}
                            memoizedSubjects={memoizedSubjects}
                            updateSubject={updateSubject}
                        />
                    ))}
                </TableBody>
            </Table>
            {loadingSubjects && (
                <div className="text-xs text-muted-foreground mt-2">Loading subjects...</div>
            )}
            {!loadingSubjects && memoizedSubjects?.length === 0 && (
                <div className="text-xs text-amber-600 mt-2">No subjects available for the selected level.</div>
            )}
            {subjectsError && (
                <div className="text-xs text-red-600 mt-2">{subjectsError}</div>
            )}
        </div>
    );
}

// 🧡 Memoized row so only changed row updates
const Row = ({ className, subjects, rowIndex, memoizedSubjects, updateSubject }) => {
    return (
        <TableRow>
            <TableCell className="w-[140px] font-medium sticky left-0 bg-background">
                {className}
            </TableCell>
            {subjects.map((subject, colIndex) => (
                <TableCell key={colIndex} className="w-[120px]">
                    <Select
                        value={subject}
                        onValueChange={(value) => updateSubject(rowIndex, colIndex, value)}
                    >
                        <SelectTrigger className="w-full text-xs">
                            <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                            {memoizedSubjects?.map((subj) => (
                                <SelectItem
                                    key={subj._id}
                                    value={subj.name}
                                    className="text-xs"
                                >
                                    {subj.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </TableCell>
            ))}
        </TableRow>
    );
};

const MemoizedRow = React.memo(Row);
