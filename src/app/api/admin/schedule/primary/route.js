 import PrimaryClassScheduleModel from "@/models/admin/schedule/primaryLeveSchedule.model";
 import connectDB from "@/lib/coonectDb";
 import { ok, created, serverError, badRequest } from "@/lib/apiResponse";
 import { PrimaryScheduleUpsertSchema } from "@/lib/validation/admin";

 export async function GET(req) {
   try {
     await connectDB();
     const schedule = await PrimaryClassScheduleModel.find({}).lean();
     return ok(schedule, "Schedule fetched successfully");
   } catch (error) {
     return serverError("Failed to fetch data", error.message);
   }
 }

 export async function POST(req) {
   try {
     await connectDB();
     const body = await req.json();
     const parsed = PrimaryScheduleUpsertSchema.safeParse(body);
     if (!parsed.success) {
       return badRequest("Validation failed", parsed.error.flatten());
     }
     const reqData = parsed.data;

     const existingSchedule = await PrimaryClassScheduleModel.findOne({ classId: reqData.classId }).lean();
     if (existingSchedule) {
       const updatedSchedule = await PrimaryClassScheduleModel.findByIdAndUpdate(
         existingSchedule._id,
         reqData,
         { new: true }
       );
       return ok(updatedSchedule, "Schedule updated successfully");
     }

     const newSchedule = await PrimaryClassScheduleModel.create(reqData);
     return created(newSchedule, "Schedule added successfully");
   } catch (error) {
     return serverError("Failed to create data", error.message);
   }
 }
