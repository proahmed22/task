import express from "express";
import * as requestsCtrl from "./controller/requests.js";
import * as requestsValidation from "./request.validation.js";
import { validation } from "../../middleware/validation.js";
import { allowedTo, auth } from "../../middleware/auth.js";

const requestsRouter = express.Router();
requestsRouter.post("/", auth, allowedTo("CLIENT"), validation(requestsValidation.createPropertyRequestSchema), requestsCtrl.createPropertyRequest);
requestsRouter.get("/", auth, allowedTo("CLIENT", "AGENT", "ADMIN"), requestsCtrl.getAllPropertyRequests);
requestsRouter.get("/:id", auth, validation(requestsValidation.getSinglePropertyRequestSchema), requestsCtrl.getSpecificPropertyRequest);
requestsRouter.put("/:id", auth, allowedTo("CLIENT"), validation(requestsValidation.updatePropertyRequestSchema), allowedTo("CLIENT"), requestsCtrl.updatePropertyRequest);
requestsRouter.delete("/:id", auth, allowedTo("CLIENT"), validation(requestsValidation.deletePropertyRequestSchema), requestsCtrl.deletePropertyRequest);
export default requestsRouter;
