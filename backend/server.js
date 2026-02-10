require("dotenv").config();
const express=require("express");
const cors=require("cors");
const path=require("path");
const app=express();
const connectDB=require("./config/db");
const authRoutes=require("./routes/authRoutes");
const incomeRoutes=require("./routes/incomeRoutes");
const expenseRoutes=require("./routes/expenseRoutes");
const dashboardRoutes=require("./routes/dashboardRoutes");
app.use(
    cors({
        origin: [
            "http://localhost:5173", // Your local frontend
            "https://finance-tracker-seven-jade.vercel.app" // Your future deployed URL
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true // 👈 IMPORTANT: This allows cookies/tokens to pass through
    })
);
app.use(express.json());
connectDB();
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/income",incomeRoutes);
app.use("/api/v1/expense",expenseRoutes);
app.use("/api/v1/dashboard",dashboardRoutes);
//server uploads folder
app.use("/uploads",express.static(path.join(__dirname,"uploads")));
const PORT=process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Export the app for Vercel
module.exports = app;