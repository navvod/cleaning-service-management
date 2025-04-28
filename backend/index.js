const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const bookRoutes = require("./src/routes/bookingRoutes");
const serviceRoutes = require("./src/routes/serviceRoutes");


dotenv.config();
connectDB();


const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/booking", bookRoutes);
app.use("/api/service", serviceRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

