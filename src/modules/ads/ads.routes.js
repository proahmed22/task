// Import the necessary modules and controllers
import express from "express";
import * as adsCtrl from "./controller/ads.js";
import * as adsValidation from "./ads.validation.js";
import { validation } from "../../middleware/validation.js";
import { allowedTo, auth } from './../../middleware/auth.js';

// Create an Express router
const adsRouter = express.Router();
adsRouter.post("/", auth, allowedTo("AGENT", "ADMIN"), validation(adsValidation.createNewAdSchema), adsCtrl.createNewAd);
adsRouter.get("/match/:id", auth, adsCtrl.matchAd)
adsRouter.get("/:id", auth, validation(adsValidation.getSingleAdSchema), adsCtrl.getSpecificAd)
adsRouter.get("/", auth, allowedTo("ADMIN"), adsCtrl.getAllAds)
adsRouter.put("/", auth, allowedTo("AGENT"), validation(adsValidation.updateAdSchema), adsCtrl.updateAd)
adsRouter.delete("/", auth, allowedTo("AGENT"), validation(adsValidation.deleteAdSchema), adsCtrl.deleteAd)

export default adsRouter
