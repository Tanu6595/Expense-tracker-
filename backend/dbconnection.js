import mongoose from "mongoose";

export const connection = async (URL) => {
    try {
        await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("db connected successfully");
    } catch (error) {
        console.log("getting error while connecting with db", error);
    }
};
