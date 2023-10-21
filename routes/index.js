import express from "express";
import userRoutes from "./userRoute.js";
import dataRoute from "./dataRoute.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/data", dataRoute);

export default router;
