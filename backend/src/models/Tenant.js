import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dbName: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "SUSPENDED"],
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);

const Tenant = mongoose.models.Tenant || mongoose.model("Tenant", tenantSchema);

export default Tenant;