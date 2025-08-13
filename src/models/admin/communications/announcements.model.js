import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: true,
    },
    targetAudience: {
        type: String,
        required: true,
    },
    publishDate: {
        type: Date,
        required: true,
    },
    expiryDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    isPinned: {
        type: Boolean,
        required: true,
    }, 
    views: {
        type: Number,
        default: 0,
    },
    image: {
        type: String,
        required: true,
    },
});

const Announcement = mongoose.models.Announcement || mongoose.model("Announcement", announcementSchema);

export default Announcement;
