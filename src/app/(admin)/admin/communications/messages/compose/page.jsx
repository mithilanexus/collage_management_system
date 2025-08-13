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
import { MessageSquare, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const schema = z.object({
  subject: z.string().min(1, "Subject is required"),
  recipient: z.string().min(1, "Recipient is required"),
  recipientType: z.enum(["Student", "Teacher", "Department", "Class", "Broadcast"]).default("Student"),
  category: z.enum(["Academic", "Finance", "Library", "Sports"]).default("Academic"),
  priority: z.enum(["High", "Medium", "Low"]).default("Medium"),
  message: z.string().min(1, "Message is required"),
  hasAttachment: z.boolean().default(false),
});

export default function ComposeMessagePage() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      subject: "",
      recipient: "",
      recipientType: "Student",
      category: "Academic",
      priority: "Medium",
      message: "",
      hasAttachment: false,
    },
  });

  const onSubmit = (values) => {
    console.log("Compose Message payload", values);
    toast.success("Message sent (frontend only)");
    router.push("/admin/communications/messages");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          <h1 className="text-2xl sm:text-3xl font-bold">Compose Message</h1>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Message</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="subject" render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Subject</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="recipient" render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient</FormLabel>
                  <FormControl><Input placeholder="Name, class or group" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="recipientType" render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Student">Student</SelectItem>
                      <SelectItem value="Teacher">Teacher</SelectItem>
                      <SelectItem value="Department">Department</SelectItem>
                      <SelectItem value="Class">Class</SelectItem>
                      <SelectItem value="Broadcast">Broadcast</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Academic">Academic</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Library">Library</SelectItem>
                      <SelectItem value="Sports">Sports</SelectItem>
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

              <FormField control={form.control} name="message" render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Message</FormLabel>
                  <FormControl><Textarea rows={6} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="hasAttachment" render={({ field }) => (
                <FormItem>
                  <FormLabel>Attachment</FormLabel>
                  <div className="flex items-center h-10">
                    <Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(Boolean(v))} />
                    <span className="ml-2 text-sm">Has attachment</span>
                  </div>
                </FormItem>
              )} />

              <div className="md:col-span-2 flex items-center justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => router.push("/admin/communications/messages")}>Cancel</Button>
                <Button type="submit">Send</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
