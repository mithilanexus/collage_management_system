import mongoose from "mongoose";
const resourceSchema = new mongoose.Schema(
    {
        resourceName: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        availability: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        capacity: {
            type: String,
            required: true,
        },
        currentUsage: {
            type: Number,
            required: true,
        },
        cost: {
            type: String,
            required: true,
        },
        provider: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        accessMethod: {
            type: String,
            required: true,
        },
        supportContact: {
            type: String,
            required: true,
        },
        lastUpdated: {
            type: Date,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        features: {
            type: [String],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Resource || mongoose.model("Resource", resourceSchema);
