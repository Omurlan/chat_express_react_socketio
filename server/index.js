const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose").default;
const userRoute = require("./routes/userRoute");
const chatRoute = require("./routes/chatRoute");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);

app.get("/", (req, res) => {
  res.send("Here is chat API");
});

const port = process.env.PORT || 8000;
const uri = process.env.MONGODB_URI;

app.listen(port, (req, res) => {
  console.log(`SERVER RUNNING ON PORT ${port}`);
});

mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB connection failed", error.message);
  });
