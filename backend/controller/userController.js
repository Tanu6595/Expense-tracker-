import User from "../model/userSchema.js";

export const getAllUsers = async (req, res) => {
    try {

        const users = await User.find({});
        console.log("Users retrieved:", users);
        if (users.length > 0) {
            return res.status(200).json({ users });
        } else {
            return res.status(404).json({ message: "we don't have users" });
        }
    } catch (error) {
        console.log("getting error while GET Method:"); 
                
    }
};

export const addUser = async (req, res) => {
    const user=req.body;

    try {
         const existinguse=await User.findOne({email:user.email});
         if(!existinguse){
             const addUser=new User(user);
             await addUser.save();
             return res.status(201).json({message:"user added"})
         }
         return res.status(409).json({message:"existing user"})
    } catch (error) {
        console.log("getting error while POST Method:");
         
    }
};
