import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
});

mongoose.model("users", userSchema); // This is to create a CLASS. 'users' is the collection NAME in MongoDB
// creates a new collection called 'users' in the MONGOOSE database (this is bc there are  TWO arguments)
