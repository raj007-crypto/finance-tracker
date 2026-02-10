const Income = require("../models/Income");
const Expense = require("../models/Expense");
const mongoose = require("mongoose"); // ✅ Fix 1: Import mongoose

exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        
        // ✅ Fix 1: Use mongoose.Types.ObjectId correctly
        const userObjectId = new mongoose.Types.ObjectId(String(userId));

        // 1. Total Income
        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        // 2. Total Expense
        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        // 3. Last 60 Days Income
        // ✅ Fix 2: Chain sort() BEFORE await
        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // 4. Last 30 Days Expense
        // ✅ Fix 2: Chain sort() BEFORE await
        const last30DaysExpenseTransactions = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        const expenseLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // 5. Recent Transactions (Top 5 Income + Top 5 Expense)
        // ✅ Fix 2: Chain sort() BEFORE await for both queries
        const recentIncome = await Income.find({ userId }).sort({ date: -1 }).limit(5);
        const recentExpense = await Expense.find({ userId }).sort({ date: -1 }).limit(5);

        const lastTransactions = [
            ...recentIncome.map((txn) => ({
                ...txn.toObject(),
                type: "income",
            })),
            ...recentExpense.map((txn) => ({
                ...txn.toObject(),
                type: "expense",
            })),
        ].sort((a, b) => b.date - a.date); // Sort combined list by date

        // 6. Send Response
        res.json({
            totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
            last30DaysExpenses: {
                total: expenseLast30Days,
                transactions: last30DaysExpenseTransactions,
            },
            last60DaysIncome: {
                total: incomeLast60Days,
                transactions: last60DaysIncomeTransactions,
            },
            recentTransactions: lastTransactions,
        });

    } catch (error) {
        console.error("Dashboard Error:", error); // Log error for debugging
        res.status(500).json({ message: "Server Error" });
    }
};