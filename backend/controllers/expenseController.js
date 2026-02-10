//Add income source
const xlsx=require('xlsx');
const Expense=require("../models/Expense");
exports.addExpense=async(req,res)=>{
    const userId=req.user.id;
    try{
        const{icon,category,amount,date}=req.body;
    
    if(!category||!amount||!date){
        return res.status(400).json({message:"All fields are required"});
    }
    const newExpense=new Expense({
        userId,
        icon,
        category,
        amount,
        date:new Date(date)
    });
    await newExpense.save();
    res.status(200).json(newExpense);
}catch(error){
    res.status(500).json({message:"Server Error"});
}
}
exports.getAllExpense=async(req,res)=>{
    const userId=req.user.id;
    try{
        const expense=await Expense.find({userId}).sort({date:-1});
        res.json(expense);
    }catch(error){
        res.status(500).json({message:"Server Error"});
    }
};
exports.deleteExpense=async(req,res)=>{
    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message:"Expense deleted successfully"});
    }catch(error){
        res.status(500).json({message:"Server Error"});
    }
};
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        // ✅ FIX 1: Correct Sort Syntax
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        const data = expense.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date ? item.date.toISOString().split('T')[0] : 'N/A', // Format date cleanly
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");

        // ✅ FIX 2: Write to Buffer (Memory) instead of Disk
        const excelBuffer = xlsx.write(wb, { bookType: 'xlsx', type: 'buffer' });

        res.setHeader('Content-Disposition', 'attachment; filename=expense_details.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(excelBuffer);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};