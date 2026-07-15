import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://Raghav:bHn3whroS2JhJKMI@cluster0.bd0vm.mongodb.net/hy-system?retryWrites=true&w=majority&appName=Cluster0";
const MONGODB_DB = "files_uploader";

if (!MONGODB_URI) {
  throw new Error("Please add MONGODB_URI to your .env.local file.");
}

const globalWithMongoose = global;

let cached = globalWithMongoose.mongoose;

if (!cached) {
  cached = globalWithMongoose.mongoose = {
    conn: null,
    promise: null
  };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: MONGODB_DB
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
