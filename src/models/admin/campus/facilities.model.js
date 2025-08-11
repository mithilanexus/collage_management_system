import mongoose from "mongoose";

const facilitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  totalRooms: { type: Number, required: true },
  availableRooms: { type: Number, required: true },
  facilities: { type: [String], default: [] },
  description: { type: String },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  maintenanceDate: { type: Date },
  image: { type: String },
  manager: { type: String },
  contact: { type: String },
  operatingHours: { type: String },
  yearBuilt: { type: Number }
}, { timestamps: true });

export default mongoose.models.Facility || mongoose.model("Facility", facilitySchema);
