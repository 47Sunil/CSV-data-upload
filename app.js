import express from "express";
import mongoSanitize from "express-mongo-sanitize"; // sanitizes user-supplied data to prevent mongoDB operator injection.
// import cookieParser from "cookie-parser"; // to parse cookie header and req.cookie with an object keyed by the cookie name.
import routes from "./routes/index.js";

//  create express app
const app = express();

// parse json request url
app.use(express.json());

// parse json request body
app.use(express.urlencoded({ extended: true }));

// sanatize request data
app.use(mongoSanitize());

//! API V1 routes
app.use("/api/v1", routes);

app.get("/", (req, res) => {
  res.send("API is working");
});

export default app;
