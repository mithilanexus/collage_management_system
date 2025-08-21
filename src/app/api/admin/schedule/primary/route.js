import PrimaryClassScheduleModel from "@/models/admin/schedule/primaryLevelPeriodSlot.model";

export async function GET(req) {
    try {
        const schedule = await PrimaryClassScheduleModel.find({}).lean();
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

        const newSchedule = await PrimaryClassScheduleModel.create(reqData);

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
