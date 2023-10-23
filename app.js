const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
// const connectDB = require("./config/db");
const app = express();
const bodyParser = require("body-parser");
// const machineRoutes = require("./routes/machine");
const School = require("./model/school");
app.use(cors());
app.use(bodyParser.json());
// app.use("/machines", machineRoutes);
// connectDB();
// mongoose.connect(
//   "mongodb+srv://vidhit:123@cluster0.anwojwe.mongodb.net/your-database-name",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   console.log("mongodb connection succesful")
// );

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/register", async (req, res) => {
  const { client, stage } = req.body;
  const userData = {
    client,
    stage,
  };
  try {
    // Create an instance of the User model with the received data
    // const saveSchool = new School(userData);
    // console.log(saveSchool, "hi");
    try {
      const webHookUrl = "http://192.168.1.4:8083/handler-webhook";
      const result = await axios.post(webHookUrl, userData);
      console.log("Webhook response:", result.data);
    } catch (error) {
      console.error("Error sending webhook:", error);
    }
    // Save the user data to the database
    // const resp = await saveSchool.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user" });
  }
});

app.listen(8082, (req, res) => {
  console.log("listening on port 8082");
});
