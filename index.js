const express = require("express");
require("dotenv").config();
const cors = require("cors");

const path = require("path");
const mongoDB = require("./connection");
const cookieParser = require("cookie-parser");
const {
  checkForAuthenticationCookie,
  restricToUser,
} = require("./middlewares/authentication");

const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const categoryRouter = require("./routes/category");

const app = express();
const PORT = process.env.PORT || 8000;

// Mongodb Connections
// mongoDB("mongodb://127.0.0.1:27017/live-tv")
  mongoDB(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.d0tal.mongodb.net/live-tv?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log("MongoDB Failed to Connect", error));

// Middlewares
app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: "https://live-tv-app.netlify.app/login",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);
// app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
  return res.send({ status: "Server Running Successfully!" });
});

app.get("/api", (req, res) => {
  return res.send({ status: "Welcome Live Tv Server" });
});

app.get("/test", (req, res) => {
  return res.render("login");
});

// routes
app.use("/api/user", userRouter);
app.use("/api/admin/category", restricToUser(["editor", "admin"]), categoryRouter);
app.use("/api/admin",restricToUser(["admin"]), adminRouter);

app.listen(PORT, () => {
  console.log("Server Running on PORT:", PORT);
});
