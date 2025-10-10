"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/DatePicker";
import Schedule from "./Schedule";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSaveExamSchedule } from "@/hooks/admin/exams";

export default function AddExamSchedule() {
    const [formData, setFormData] = useState({
        examLevel: '',
        examName: '',
        startDate: null,
        endDate: null
    });
    const [scheduleData, setScheduleData] = useState({
        dates: [],
        schedule: []
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleScheduleUpdate = (updatedSchedule, updatedDates) => {
        setScheduleData({
            dates: updatedDates,
            schedule: updatedSchedule
        });
    };
const router = useRouter()
    const { mutateAsync: saveExamSchedule } = useSaveExamSchedule();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const examData = {
            ...formData,
            ...scheduleData
        };

        try {
            const data = await saveExamSchedule(examData);
            const success = data?.success !== false; // support http wrapper return or API json
            const message = data?.message || "Schedule added successfully";
            if (success) {
                toast.success(message);
                router.push("/admin/exams");
            } else {
                toast.error(message);
            }
        } catch (err) {
            toast.error(err?.message || "Failed to save schedule");
        }
    };

    const datesIncomplete = !formData.startDate; // only startDate required now
    const canSubmit = !!formData.examLevel && !!formData.examName && !datesIncomplete;

    return (
        <div>
            <Card className="shadow-lg rounded-2xl">
                <CardHeader>
                    <CardTitle>Add Exam Schedule</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Create a perfect exam routine with dates and subjects!
                    </p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="examLevel">Exam Level</Label>
                                <Select
                                    value={formData.examLevel}
                                    onValueChange={(value) => handleInputChange('examLevel', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="primary">Primary</SelectItem>
                                        <SelectItem value="secondary">Secondary</SelectItem>
                                        <SelectItem value="bachelor">Bachelor</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="examName">Exam Name</Label>
                                <Input
                                    type="text"
                                    id="examName"
                                    value={formData.examName}
                                    onChange={(e) => handleInputChange('examName', e.target.value)}
                                    className="block w-full"
                                />
                            </div>
                            <div className="space-y-2">
                                <DatePicker
                                    label="Start Date"
                                    value={formData.startDate}
                                    onChange={(date) => handleInputChange('startDate', date)}
                                    placeholder="Select start date"
                                    required={true}
                                />
                            </div>
                            <div className="space-y-2">
                                <DatePicker
                                    label="End Date"
                                    value={formData.endDate}
                                    onChange={(date) => handleInputChange('endDate', date)}
                                    placeholder="Select end date"
                                    required={true}
                                />
                            </div>
                        </div>

                        <div className="my-6 space-y-2">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium">Exam Schedule</h3>
                                {datesIncomplete && (
                                    <span className="text-xs text-muted-foreground">Select a start date to build the schedule grid.</span>
                                )}
                            </div>
                            <Schedule
                                onScheduleUpdate={handleScheduleUpdate}
                                examLevel={formData.examLevel || 'primary'}
                                startDate={formData.startDate}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="bg-primary-foreground text-primary-background hover:bg-primary-foreground/90"
                            disabled={!canSubmit}
                        >
                            Add Schedule
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}