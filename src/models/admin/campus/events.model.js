import mongoose from "mongoose";
const eventSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    eventType: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    venue: { type: String, required: true },
    organizer: { type: String, required: true },
    expectedAttendees: { type: Number, required: true },
    registeredAttendees: { type: Number, required: true },
    registrationRequired: { type: Boolean, required: true },
    registrationDeadline: { type: Date, required: true },
    entryFee: { type: Number, required: true },
    status: { type: String, enum: ["Upcoming", "Ongoing", "Completed", "Cancelled"], required: true },
    priority: { type: String, enum: ["High", "Medium", "Low"], required: true },
    image: { type: String },
    contact: { type: String },
    email: { type: String },
    budget: { type: Number },
    sponsors: [{ type: String }]
});

const EventModel = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default EventModel;
