import ExamScheduleModel from "@/models/admin/exam/exam_schedule.model";

export async function GET(req) {
    try {
        const schedule = await ExamScheduleModel.find({}).lean();

        return Response.json(
            {
                message: "Schedule fetched successfully",
                success: true,
                data: schedule,
            }
        );

    } catch (error) {
        return Response.json(
            {
                message: "Failed to fetch data",
                success: false,
                error: error.message,
            }
        );
    }
}

export async function POST(req) {
    try {
        const reqData = await req.json();

        const existingSchedule = await ExamScheduleModel.findOne({ examLevel: reqData.examLevel, examName: reqData.examName }).lean();
        if (existingSchedule) {
            const updatedSchedule = await ExamScheduleModel.findByIdAndUpdate(
                existingSchedule._id,
                reqData,
                { new: true }
            );
            return Response.json(
                {
                    message: "Schedule updated successfully",
                    success: true,
                    data: updatedSchedule,
                }
            );
        }

        const newSchedule = await ExamScheduleModel.create(reqData);


        return Response.json(
            {
                message: "Schedule added successfully",
                success: true,
                data: newSchedule,
            }
        );
    } catch (error) {
        return Response.json(
            {
                message: "Failed to create data",
                success: false,
                error: error.message,
            }
        );
    }
}