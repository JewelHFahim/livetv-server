const express = require("express");
require("dotenv").config();
const path = require("path");
const mongoDB = require("./connection");
const cookieParser = require("cookie-parser");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

const userRouter = require("./routes/user");
const categoryRouter = require("./routes/category");

const app = express();
const PORT = process.env.PORT || 8000;

// Mongodb Connections
// mongoDB("mongodb://127.0.0.1:27017/live-tv")
mongoDB(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.d0tal.mongodb.net/live-tv?retryWrites=true&w=majority&appName=Cluster0`
)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log("MongoDB Failed to Connect", error);
  });

// Middlewares
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

// routes
app.use("/user", userRouter);
app.use("/api/category", categoryRouter);

app.listen(PORT, () => {
  console.log("Server Running on PORT:", PORT);
});
