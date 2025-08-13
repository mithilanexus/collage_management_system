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
import { Bell, ArrowLeft } from "lucide-react";

const schema = z.object({
  title: z.string().min(1),
  message: z.string().min(1),
  type: z.enum(["Academic", "Finance", "Library", "Sports", "System"]).default("Academic"),
  priority: z.enum(["High", "Medium", "Low"]).default("Medium"),
  targetAudience: z.string().min(1),
  deliveryMethod: z.array(z.enum(["Push", "Email", "SMS"])).default(["Push"]),
  scheduledTime: z.string().optional(),
  status: z.enum(["Draft", "Scheduled", "Sent"]).default("Draft"),
  expiryDate: z.string().optional(),
  isUrgent: z.boolean().default(false),
});

export default function CreateNotificationPage() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      message: "",
      type: "Academic",
      priority: "Medium",
      targetAudience: "All Students",
      deliveryMethod: ["Push"],
      scheduledTime: "",
      status: "Draft",
      expiryDate: "",
      isUrgent: false,
    },
  });

  const onSubmit = async (values) => {
    console.log("Create Notification payload", values);
    toast.success("Notification created (frontend only)");
    router.push("/admin/communications/notifications");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          <h1 className="text-2xl sm:text-3xl font-bold">Create Notification</h1>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notification Details</CardTitle>
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

              <FormField control={form.control} name="type" render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Academic">Academic</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Library">Library</SelectItem>
                      <SelectItem value="Sports">Sports</SelectItem>
                      <SelectItem value="System">System</SelectItem>
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
                { name: "scheduledTime", label: "Scheduled Time", type: "datetime-local" },
                { name: "expiryDate", label: "Expiry Date", type: "date" },
              ]).map((cfg) => (
                <FormField key={cfg.name}
                  control={form.control}
                  name={cfg.name}
                  render={({ field }) => (
                    <FormItem>
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
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                      <SelectItem value="Sent">Sent</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="isUrgent" render={({ field }) => (
                <FormItem>
                  <FormLabel>Urgent</FormLabel>
                  <div className="flex items-center h-10">
                    <Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(Boolean(v))} />
                  </div>
                </FormItem>
              )} />

              {/* Delivery Methods */}
              <div className="md:col-span-2 border rounded-lg p-4 space-y-2">
                <div className="text-sm font-medium">Delivery Methods</div>
                <div className="flex flex-wrap gap-4">
                  {(["Push", "Email", "SMS"]).map((method) => (
                    <label key={method} className="flex items-center gap-2 text-sm">
                      <Checkbox
                        checked={form.getValues("deliveryMethod").includes(method)}
                        onCheckedChange={(checked) => {
                          const current = form.getValues("deliveryMethod");
                          const next = checked ? Array.from(new Set([...current, method])) : current.filter((m) => m !== method);
                          form.setValue("deliveryMethod", next);
                        }}
                      />
                      {method}
                    </label>
                  ))}
                </div>
              </div>

              <FormField control={form.control} name="message" render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Message</FormLabel>
                  <FormControl><Textarea rows={6} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="md:col-span-2 flex items-center justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => router.push("/admin/communications/notifications")}>Cancel</Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
