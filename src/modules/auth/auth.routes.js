import express from "express";
import * as authCtrl from "./controller/auth.js";
import * as authValidation from "./validation.js";
import { validation } from '../../middleware/validation.js';

const authRouter = express.Router();

authRouter.post("/signUp", validation(authValidation.signUp), authCtrl.signUp)
authRouter.post("/logIn", validation(authValidation.login), authCtrl.login)

export default authRouter;
