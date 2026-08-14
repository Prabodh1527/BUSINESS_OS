import mongoose from "mongoose";

let mainDbConnection = null;

const connectDB = async () => {
  if (mainDbConnection) return mainDbConnection;

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    mainDbConnection = conn;
    console.log(`✅ MongoDB Connected to Main Database: ${conn.connection.host}`);
    return mainDbConnection;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

// Function to dynamically switch to a tenant's database
export const getTenantDB = (tenantDbName) => {
  if (!mongoose.connection.readyState) {
    throw new Error("Main database connection is not initialized yet.");
  }
  return mongoose.connection.useDb(tenantDbName, { useCache: true });
};

export default connectDB;
