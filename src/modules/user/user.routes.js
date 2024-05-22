import express from "express";
import * as userCtrl from "./controller/user.js";
import { allowedTo, auth } from "../../middleware/auth.js";

const userRouter = express.Router();

userRouter.get("/", auth, allowedTo("ADMIN"), userCtrl.adminGetStatistics)

export default userRouter;
