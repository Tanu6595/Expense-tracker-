import mongoose from "mongoose";
const userSchema=mongoose.Schema({
    email:{
        type:String,
        reqired:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        reqired:true,
        trim:true,
    },

});
const User=mongoose.model("User",userSchema);
export default User;