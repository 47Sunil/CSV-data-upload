import express from "express";
import { uploadData, getData } from "../controllers/uploadDataController.js";
import multer from "multer";
import { fileURLToPath, URL } from "url";
import { isAuthenticated } from "../middlewares/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = new URL(import.meta.url).pathname;

const app = express();

app.use(express.static(new URL("dataFile", import.meta.url).pathname));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./dataFile/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage });

const router = express.Router();

router.route("/").post(isAuthenticated, upload.single("file"), uploadData);
router.route("/list").get(isAuthenticated, getData);
export default router;
