import PrimaryClassScheduleModel from "@/models/admin/schedule/primaryLeveSchedule.model";

export async function GET(req, context) {
    try {
        const schedule = await PrimaryClassScheduleModel.find({classId: context.params.sheduleId}).lean();
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

export async function PUT(req, context) {
    try {
        const reqData = await req.json();

        const updatedSchedule = await PrimaryClassScheduleModel.findByIdAndUpdate(
            context.params.sheduleId,
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
    } catch (error) {
        return Response.json(
            {
                message: "Failed to update data",
                success: false,
                error: error.message,
            }
        );
    }
}

export async function DELETE(req, context) {
    try {
        const deletedSchedule = await PrimaryClassScheduleModel.findByIdAndDelete(context.params.sheduleId);

        return Response.json(
            {
                message: "Schedule deleted successfully",
                success: true,
                data: deletedSchedule,
            }
        );
    } catch (error) {
        return Response.json(
            {
                message: "Failed to delete data",
                success: false,
                error: error.message,
            }
        );
    }
}
