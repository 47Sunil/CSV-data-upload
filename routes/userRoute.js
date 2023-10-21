import express from "express";
import trimRequest from "trim-request";
import { registerUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(trimRequest.all, registerUser);
router.route("/login").post(trimRequest.all, loginUser);

export default router;
