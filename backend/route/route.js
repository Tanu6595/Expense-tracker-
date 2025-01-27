import express from "express";
import {getAllUsers,addUser} from "../controller/userController.js";
const router=express.Router();
router.get("/",getAllUsers);
router.get("/signup",addUser);
export default router;
