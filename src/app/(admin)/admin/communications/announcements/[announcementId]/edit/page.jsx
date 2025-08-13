"use client";

import { useParams, useRouter } from "next/navigation";
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

const schema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  category: z.string().min(1),
  priority: z.enum(["High", "Medium", "Low"]).default("Medium"),
  targetAudience: z.string().min(1),
  publishDate: z.string().min(1),
  expiryDate: z.string().optional(),
  status: z.enum(["Draft", "Published", "Expired"]).default("Draft"),
  author: z.string().min(1),
  isPinned: z.boolean().default(false),
  image: z.string().optional(),
});

export default function EditAnnouncementPage() {
  const { announcementId } = useParams();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      content: "",
      category: "Academic",
      priority: "Medium",
      targetAudience: "All Students",
      publishDate: "",
      expiryDate: "",
      status: "Draft",
      author: "",
      isPinned: false,
      image: "",
    },
  });

  const onSubmit = async (values) => {
    console.log("Update Announcement", { id: announcementId, ...values });
    toast.success("Announcement updated (frontend only)");
    router.push("/admin/communications/announcements");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Megaphone className="w-5 h-5" />
          <h1 className="text-2xl sm:text-3xl font-bold">Edit Announcement</h1>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Announcement Details</CardTitle>
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

              <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Academic">Academic</SelectItem>
                      <SelectItem value="Library">Library</SelectItem>
                      <SelectItem value="Sports">Sports</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
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

              {([
                { name: "targetAudience", label: "Target Audience" },
                { name: "author", label: "Author" },
                { name: "publishDate", label: "Publish Date", type: "date" },
                { name: "expiryDate", label: "Expiry Date", type: "date" },
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
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Published">Published</SelectItem>
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
                <Button type="button" variant="outline" onClick={() => router.push("/admin/communications/announcements")}>Cancel</Button>
                <Button type="submit">Update</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
