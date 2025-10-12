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
import { Megaphone, ArrowLeft } from "lucide-react";
import { useCreateAnnouncement } from "@/hooks/admin/communications/announcements";

const schema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  targetAudience: z.string().min(1),
  priority: z.enum(["High", "Medium", "Low"]).default("High"),
  status: z.enum(["Draft", "Published", "Expired"]).default("Published"),
  isPinned: z.boolean().default(true),
});

export default function AddExamResultNoticePage() {
  const router = useRouter();
  const { mutateAsync: createAnnouncement } = useCreateAnnouncement();
  const today = new Date().toISOString().slice(0, 10);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "Exam Results Published",
      content: "The exam results have been published. Please log in to the student portal to view detailed results.",
      targetAudience: "All Students",
      priority: "High",
      status: "Published",
      isPinned: true,
    },
  });

  const onSubmit = async (values) => {
    try {
      const payload = {
        title: values.title,
        content: values.content,
        category: "Exam Result",
        priority: values.priority,
        targetAudience: values.targetAudience,
        publishDate: today,
        expiryDate: "",
        status: values.status,
        author: "Exam Office",
        isPinned: values.isPinned,
        image: "",
      };
      const data = await createAnnouncement(payload);
      const success = data?.success !== false;
      toast.success(success ? (data?.message || "Notice created") : "Notice created");
      router.push("/admin/exams/results");
    } catch (error) {
      toast.error(error?.message || "Failed to create notice");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Megaphone className="w-5 h-5" />
          <h1 className="text-2xl sm:text-3xl font-bold">Create Exam Result Notice</h1>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notice Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Title</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="targetAudience" render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Audience</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
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

              <FormField control={form.control} name="status" render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Published">Published</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="isPinned" render={({ field }) => (
                <FormItem>
                  <FormLabel>Pinned</FormLabel>
                  <div className="flex items-center h-10">
                    <Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(Boolean(v))} />
                  </div>
                </FormItem>
              )} />

              <FormField control={form.control} name="content" render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Content</FormLabel>
                  <FormControl><Textarea rows={6} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="md:col-span-2 flex items-center justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => router.push("/admin/exams/results")}>Cancel</Button>
                <Button type="submit">Save Notice</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
