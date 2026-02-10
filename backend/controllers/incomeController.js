//Add income source
const xlsx=require('xlsx');
const Income=require("../models/Income");
exports.addIncome=async(req,res)=>{
    const userId=req.user.id;
    try{
        const{icon,source,amount,date}=req.body;
    
    if(!source||!amount||!date){
        return res.status(400).json({message:"All fields are required"});
    }
    const newIncome=new Income({
        userId,
        icon,
        source,
        amount,
        date:new Date(date)
    });
    await newIncome.save();
    res.status(200).json(newIncome);
}catch(error){
    res.status(500).json({message:"Server Error"});
}
}
exports.getAllIncome=async(req,res)=>{
    const userId=req.user.id;
    try{
        const income=await Income.find({userId}).sort({date:-1});
        res.json(income);
    }catch(error){
        res.status(500).json({message:"Server Error"});
    }
};
exports.deleteIncome = async (req, res) => {
    const userId = req.user.id;
    const incomeId = req.params.id;

    try {
        // Step 1: Find the item by ID first (ignoring user for a moment)
        const incomeItem = await Income.findById(incomeId);

        if (!incomeItem) {
            return res.status(404).json({ message: "Income item not found" });
        }

        // Step 2: Compare User IDs safely (converting both to Strings)
        // This fixes the issue where ObjectId('123') !== '123'
        if (incomeItem.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Unauthorized: You do not own this item" });
        }

        // Step 3: Delete the item
        await Income.findByIdAndDelete(incomeId);

        res.json({ message: "Income deleted successfully" });
    } catch (error) {
        console.error("Error deleting income:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        // ✅ FIX 1: Correct Sort Syntax
        const income = await Income.find({ userId }).sort({ date: -1 });

        const data = income.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date ? item.date.toISOString().split('T')[0] : 'N/A', // Format date cleanly
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");

        // ✅ FIX 2: Write to Buffer (Memory) instead of Disk
        const excelBuffer = xlsx.write(wb, { bookType: 'xlsx', type: 'buffer' });

        res.setHeader('Content-Disposition', 'attachment; filename=income_details.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(excelBuffer);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};