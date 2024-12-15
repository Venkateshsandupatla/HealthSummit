const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// serve static files from the public directory
app.use(express.static("public"));


// Connect to MongoDB
// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB Connection Error:", err));

// Listen for MongoDB connection errors
mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error detected:", err);
});


// Registration Schema
const registrationSchema = new mongoose.Schema({

    fullName: String,
    email: String,
    phone: String,
    ticketType: String
});

const Registration = mongoose.model("Registration", registrationSchema);

// Handle GET request to root
app.get("/", (req, res) => {
  res.send("Welcome to the Health Summit Registration Portal!");
});


// Route to handle form submission
app.post("/register", async (req, res) => {
    try {
        const { fullName, email, phone, ticketType } = req.body;

        // Save to MongoDB
        const newRegistration = new Registration({
            fullName,
            email,
            phone,
            ticketType
        });
        await newRegistration.save();

        // Send confirmation email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Registration Confirmation",
            text: `Hello ${fullName},\n\nThank you for registering for the Health Summit. We are excited to see you there!\n\nBest regards,\nHealth Summit Team`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Registration successful and email sent!" });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Error during registration" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
