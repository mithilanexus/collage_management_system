"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { Calendar, ArrowLeft } from "lucide-react";

const schema = z.object({
  eventName: z.string().min(1),
  eventType: z.string().min(1),
  description: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  startTime: z.string().min(1),
  endTime: z.string().min(1),
  venue: z.string().min(1),
  organizer: z.string().min(1),
  expectedAttendees: z.coerce.number().int().nonnegative(),
  registeredAttendees: z.coerce.number().int().nonnegative().default(0),
  registrationRequired: z.boolean().default(false),
  registrationDeadline: z.string().optional(),
  entryFee: z.coerce.number().int().nonnegative().default(0),
  status: z.string().min(1),
  priority: z.string().min(1),
  image: z.string().optional(),
  contact: z.string().optional(),
  email: z.string().email().optional(),
  budget: z.coerce.number().int().nonnegative().optional(),
  sponsors: z.string().optional(),
});

export default function AddEventPage() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      eventName: "",
      eventType: "Academic",
      description: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      venue: "",
      organizer: "",
      expectedAttendees: 0,
      registeredAttendees: 0,
      registrationRequired: false,
      registrationDeadline: "",
      entryFee: 0,
      status: "Upcoming",
      priority: "Medium",
      image: "",
      contact: "",
      email: "",
      budget: 0,
      sponsors: "",
    },
  });

  const onSubmit = async(values) => {
    const payload = {
      ...values,
      sponsors: values.sponsors
        ? values.sponsors.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
    };
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/campus/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log("Create Event payload", payload);
      if (data.success) {
        toast.success("Event created");
        router.push("/admin/campus/events");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          <h1 className="text-2xl sm:text-3xl font-bold">Create Event</h1>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Event Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="eventName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Name</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="eventType" render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Academic">Academic</SelectItem>
                      <SelectItem value="Cultural">Cultural</SelectItem>
                      <SelectItem value="Sports">Sports</SelectItem>
                      <SelectItem value="Career">Career</SelectItem>
                      <SelectItem value="Alumni">Alumni</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              {([
                { name: "venue", label: "Venue" },
                { name: "organizer", label: "Organizer" },
                { name: "startDate", label: "Start Date", type: "date" },
                { name: "endDate", label: "End Date", type: "date" },
                { name: "startTime", label: "Start Time", type: "time" },
                { name: "endTime", label: "End Time", type: "time" },
                { name: "expectedAttendees", label: "Expected Attendees", type: "number" },
                { name: "registeredAttendees", label: "Registered Attendees", type: "number" },
                { name: "entryFee", label: "Entry Fee (Rs.)", type: "number" },
                { name: "budget", label: "Budget (Rs.)", type: "number" },
                { name: "contact", label: "Contact" },
                { name: "email", label: "Email", type: "email" },
                { name: "image", label: "Image URL", full: true },
              ]).map((cfg) => (
                <FormField key={cfg.name}
                  control={form.control}
                  name={cfg.name}
                  render={({ field }) => (
                    <FormItem className={cfg.full ? "md:col-span-2" : undefined}>
                      <FormLabel>{cfg.label}</FormLabel>
                      <FormControl>
                        <Input type={cfg.type || "text"} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              <FormField control={form.control} name="status" render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Upcoming">Upcoming</SelectItem>
                      <SelectItem value="Ongoing">Ongoing</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="priority" render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select priority" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="registrationRequired" render={({ field }) => (
                <FormItem>
                  <FormLabel>Registration Required</FormLabel>
                  <div className="flex items-center h-10">
                    <Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(Boolean(v))} />
                  </div>
                </FormItem>
              )} />

              <FormField control={form.control} name="registrationDeadline" render={({ field }) => (
                <FormItem>
                  <FormLabel>Registration Deadline</FormLabel>
                  <FormControl><Input type="date" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl><Textarea rows={4} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="sponsors" render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Sponsors (comma separated)</FormLabel>
                  <FormControl><Input placeholder="Alumni Network, Local Business" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="md:col-span-2 flex items-center justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => router.push("/admin/campus/events")}>Cancel</Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
