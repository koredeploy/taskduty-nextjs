// import mongoose from "mongoose"

// const connectMongoDB = async ()=>{
//     try {
//         await mongoose.connect(process.env.MONGODB_URI)
//         console.log("Connected to MongoDB");
//     } catch (error) {
//         console.log("Error connecting to mongoDB", error);
//     }
// }


import mongoose, { ConnectOptions } from "mongoose";

const connectMongoDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};

export default connectMongoDB;