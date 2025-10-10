"use client";

import { useEffect, useState } from "react";
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
import { Building, ArrowLeft } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useFacility, useUpdateFacility } from "@/hooks/admin/campus/facilities";

const schema = z.object({
  name: z.string().min(1, "Required"),
  type: z.string().min(1, "Required"),
  location: z.string().min(1, "Required"),
  capacity: z.coerce.number().int().nonnegative(),
  totalRooms: z.coerce.number().int().nonnegative(),
  availableRooms: z.coerce.number().int().nonnegative(),
  facilities: z.string().optional(),
  description: z.string().min(1, "Required"),
  status: z.string().min(1, "Required"),
  maintenanceDate: z.string().min(1, "Required"),
  image: z.string().optional(),
  manager: z.string().min(1, "Required"),
  contact: z.string().min(1, "Required"),
  operatingHours: z.string().min(1, "Required"),
  yearBuilt: z.coerce.number().int().nonnegative(),
});

export default function EditFacilityPage() {
  const params = useParams();
  const id = params?.facilityId;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      type: "Academic",
      location: "",
      capacity: 0,
      totalRooms: 0,
      availableRooms: 0,
      facilities: "",
      description: "",
      status: "Active",
      maintenanceDate: "",
      image: "",
      manager: "",
      contact: "",
      operatingHours: "",
      yearBuilt: new Date().getFullYear(),
    },
  });
 
  const { data: facilityResp, isLoading: loadingFacility } = useFacility(id, {});
  useEffect(() => {
    if (!id) return;
    if (!loadingFacility) {
      const payload = facilityResp?.data || facilityResp;
      if (payload) form.reset(payload);
      setLoading(false);
    }
  }, [id, loadingFacility, facilityResp]);

  const { mutateAsync: updateFacility } = useUpdateFacility();
  const onSubmit = async (values) => {
    const payload = {
      ...values,
      facilities: values.facilities
        ? values.facilities.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
    };
    try {
      const data = await updateFacility({ id, payload });
      const success = data?.success !== false;
      toast.success(success ? (data?.message || "Facility updated") : "Facility updated");
      router.push("/admin/campus");
    } catch (error) {
      console.error("Error updating facility:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building className="w-5 h-5" />
          <h1 className="text-2xl sm:text-3xl font-bold">Edit Facility</h1>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Facility Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={(e) => { e.preventDefault(); setConfirmOpen(true); }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Same fields as Add */}
              {([
                { name: "name", label: "Facility Name", placeholder: "" },
                { name: "location", label: "Location", placeholder: "" },
                { name: "capacity", label: "Capacity", type: "number" },
                { name: "totalRooms", label: "Total Rooms", type: "number" },
                { name: "availableRooms", label: "Available Rooms", type: "number" },
                { name: "manager", label: "Manager" },
                { name: "contact", label: "Contact" },
                { name: "operatingHours", label: "Operating Hours", full: true },
                { name: "yearBuilt", label: "Year Built", type: "number" },
                { name: "maintenanceDate", label: "Maintenance Date", type: "date" },
                { name: "image", label: "Image URL", full: true },
                { name: "facilities", label: "Facilities (comma separated)", full: true },
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

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Academic">Academic</SelectItem>
                        <SelectItem value="Laboratory">Laboratory</SelectItem>
                        <SelectItem value="Library">Library</SelectItem>
                        <SelectItem value="Dining">Dining</SelectItem>
                        <SelectItem value="Recreation">Recreation</SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Under Maintenance">Under Maintenance</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea rows={4} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="md:col-span-2 flex items-center justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => router.push("/admin/campus")}>Cancel</Button>
                <Button type="submit">Update</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Skeleton while loading */}
      {loading && (
        <div className="space-y-6">
          <div className="h-6 w-40 bg-muted rounded animate-pulse" />
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className={i % 6 === 0 ? "md:col-span-2 space-y-2" : "space-y-2"}>
                    <div className="h-4 w-24 bg-muted/70 rounded animate-pulse" />
                    <div className="h-10 w-full bg-muted rounded animate-pulse" />
                  </div>
                ))}
                <div className="md:col-span-2 flex items-center justify-end gap-2 pt-2">
                  <div className="h-10 w-24 bg-muted rounded animate-pulse" />
                  <div className="h-10 w-28 bg-muted rounded animate-pulse" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Update Confirmation */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Update facility?</AlertDialogTitle>
            <AlertDialogDescription>
              This will save your changes to the facility. You can’t undo this action.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => { setConfirmOpen(false); form.handleSubmit(onSubmit)(); }}>Confirm Update</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
