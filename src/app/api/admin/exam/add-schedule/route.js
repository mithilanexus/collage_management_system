import ExamScheduleModel from "@/models/admin/exam/exam_schedule.model";
import connectDB from "@/lib/coonectDb";
import { ok, created, serverError } from "@/lib/apiResponse";

export async function GET(req) {
  try {
    await connectDB();
    const schedule = await ExamScheduleModel.find({}).lean();
    return ok(schedule, "Schedule fetched successfully");
  } catch (error) {
    return serverError("Failed to fetch data", error.message);
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const reqData = await req.json();
    const existingSchedule = await ExamScheduleModel.findOne({ examLevel: reqData.examLevel, examName: reqData.examName }).lean();
    if (existingSchedule) {
      const updatedSchedule = await ExamScheduleModel.findByIdAndUpdate(existingSchedule._id, reqData, { new: true }).lean();
      return ok(updatedSchedule, "Schedule updated successfully");
    }
    const newSchedule = await ExamScheduleModel.create(reqData);
    return created(newSchedule, "Schedule added successfully");
  } catch (error) {
    return serverError("Failed to create data", error.message);
  }
}