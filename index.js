const express = require("express");
const logger = require("./middlewares/logger");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const mongoDB = require("./connection");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie, restricToUser } = require("./middlewares/authentication");

const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const livetvRouter = require("./routes/livetv");
const tvlinkRouter = require("./routes/tvlink");
const categoryRouter = require("./routes/category");
const eventsRouter = require("./routes/eventsRoute");
const clientRouter = require("./routes/clientRouter");

const app = express();

async function connectDB() {
  try {
    await mongoDB(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.d0tal.mongodb.net/live-tv?retryWrites=true&w=majority&appName=Cluster0`);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Failed to Connect", error);
    process.exit(1);
  }
}

connectDB();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://live-tvs.netlify.app/"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(logger);

app.get("/", (req, res) => {
  return res.send({ status: "Server Running Successfully!" });
});

// Routes
app.use("/api", clientRouter);
app.use("/api/user", userRouter);
app.use("/api/admin/category", restricToUser(["editor", "admin"]), categoryRouter);
app.use("/api/admin/livetv", restricToUser(["editor", "admin"]), livetvRouter);
app.use("/api/admin/livetv", restricToUser(["editor", "admin"]), tvlinkRouter);
app.use("/api/admin/events", restricToUser(["editor", "admin"]), eventsRouter);
app.use("/api/admin", restricToUser(["admin"]), adminRouter);

module.exports = app;
