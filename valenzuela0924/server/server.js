const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Student = require("./models/Student");
 
require("dotenv").config();
 
const app = express();
 
app.use(cors());
app.use(express.json());
 
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });
 
let students = [
    {
        id: 1,
        name: "Juan Dela Cruz",
        course: "BSIT",
        age: 20
    },
    {
        id: 2,
        name: "Maria Santos",
        course: "BSCS",
        age: 19
    }
];
 
app.get("/", (req, res) => {
    res.send("Server is running!");
});
 
app.get("/students", async (req, res) => {
    const students = await Student.find();
 
    res.json(students);
});
 
app.listen(5000, () => {
    console.log("Server running on port 5000");
});