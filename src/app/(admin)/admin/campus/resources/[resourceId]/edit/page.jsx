"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { Zap, ArrowLeft } from "lucide-react";

const schema = z.object({
  resourceName: z.string().min(1),
  category: z.string().min(1),
  type: z.string().min(1),
  description: z.string().min(1),
  availability: z.string().min(1),
  location: z.string().min(1),
  capacity: z.string().min(1),
  currentUsage: z.union([z.coerce.number(), z.string()]).optional(),
  cost: z.string().min(1),
  provider: z.string().min(1),
  status: z.string().min(1),
  accessMethod: z.string().min(1),
  supportContact: z.string().min(1),
  lastUpdated: z.string().min(1),
  image: z.string().optional(),
  features: z.string().optional(),
});

export default function EditResourcePage() {
  const params = useParams();
  const id = params?.resourceId;
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      resourceName: "",
      category: "Academic",
      type: "Service",
      description: "",
      availability: "",
      location: "",
      capacity: "",
      currentUsage: "",
      cost: "",
      provider: "",
      status: "Active",
      accessMethod: "",
      supportContact: "",
      lastUpdated: "",
      image: "",
      features: "",
    },
  });

  useEffect(() => {
    if (!id) return;
    const mock = {
      resourceName: "Campus WiFi Network",
      category: "Technology",
      type: "Infrastructure",
      description: "High-speed wireless internet across campus.",
      availability: "24/7",
      location: "Campus-wide",
      capacity: "2000 concurrent users",
      currentUsage: 1250,
      cost: "Rs. 150,000/year",
      provider: "Nepal Telecom",
      status: "Active",
      accessMethod: "Student/Staff Credentials",
      supportContact: "it@college.edu.np",
      lastUpdated: "2024-01-10",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
      features: "High-Speed Internet, Campus-wide Coverage, Secure Access",
    };
    form.reset(mock);
  }, [id]);

  const onSubmit = (values) => {
    const payload = {
      ...values,
      features: values.features
        ? values.features.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      _id: id,
    };
    console.log("Update Resource payload", payload);
    toast.success("Resource updated (frontend only)");
    router.push("/admin/campus/resources");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5" />
          <h1 className="text-2xl sm:text-3xl font-bold">Edit Resource</h1>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resource Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="resourceName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Resource Name</FormLabel>
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
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Transportation">Transportation</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Security">Security</SelectItem>
                      <SelectItem value="Food & Dining">Food & Dining</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="type" render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl><Input placeholder="Service / Infrastructure / Digital Service" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              {([
                { name: "availability", label: "Availability" },
                { name: "location", label: "Location" },
                { name: "capacity", label: "Capacity" },
                { name: "currentUsage", label: "Current Usage" },
                { name: "cost", label: "Cost" },
                { name: "provider", label: "Provider" },
                { name: "accessMethod", label: "Access Method" },
                { name: "supportContact", label: "Support Contact" },
                { name: "lastUpdated", label: "Last Updated", type: "date" },
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
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="features" render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Features (comma separated)</FormLabel>
                  <FormControl><Input placeholder="High-Speed Internet, Secure Access" {...field} /></FormControl>
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

              <div className="md:col-span-2 flex items-center justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => router.push("/admin/campus/resources")}>Cancel</Button>
                <Button type="submit">Update</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
