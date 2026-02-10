import React, { useEffect, useState } from 'react' // ✅ Added useState import
import { useUserAuth } from '../../hooks/useUserAuth'
import DashboardLayout from '../../components/layouts/DashboardLayout';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import Modal from '../../components/layouts/Modal'; // ✅ Import
import EmojiPickerPopup from '../../components/layouts/EmojiPickerPopup'; // ✅ Import
import ExpenseList from '../../components/Expense/ExpenseList'; // ✅ Import
import DeleteAlert from '../../components/Income/DeleteAlert'; // ✅ Import

const Expense = () => {
  useUserAuth();
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  // State for Delete Alert
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  // Form Data
  const [formData, setFormData] = useState({
    category: "", 
    amount: "",
    date: "",
    icon: ""
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Fetch Expenses
  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`);
      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong fetching expenses.", error);
    } finally {
      setLoading(false);
    }
  }

  // Add Expense
  const handleAddExpense = async (e) => {
    e.preventDefault();
    if(!formData.category || !formData.amount || !formData.date){
        alert("Please fill all fields");
        return;
    }
    try {
        await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
            category: formData.category, 
            amount: Number(formData.amount),
            date: formData.date,
            icon: formData.icon
        });
        setFormData({ category: "", amount: "", date: "", icon: "" });
        setOpenAddExpenseModal(false);
        fetchExpenseDetails(); 
    } catch (error) {
        console.error("Error adding expense:", error);
    }
  }

  // Download Expenses
  const handleDownloadExpenseDetails = async () => {
    try {
        const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
            responseType: 'blob', 
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Expense_Details.xlsx');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Error downloading expense details:", error);
    }
  };

  // Delete Expense
  const deleteExpense = async (id) => {
      try {
          await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
          setOpenDeleteAlert({ show: false, data: null });
          fetchExpenseDetails(); 
      } catch (error) {
          console.error("Error deleting expense:", error);
      }
  };

  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  return (
      <DashboardLayout activeMenu="Expense">
          <div className="my-5 mx-auto">
            <div className="grid grid-cols-1 gap-6">
              
              {/* 1. Overview Section */}
              <div className="">
                <ExpenseOverview
                  transactions={expenseData}
                  onExpenseIncome={()=>setOpenAddExpenseModal(true)}
                />
              </div>

              {/* 2. ✅ Expense List Section (You were missing this) */}
              <ExpenseList
                 transactions={expenseData}
                 onDelete={(id)=>{
                    setOpenDeleteAlert({show:true,data:id});
                 }}
                 onDownload={handleDownloadExpenseDetails}
              />

            </div>

            {/* 3. ✅ Add Expense Modal (You were missing this) */}
            <Modal
              isOpen={openAddExpenseModal}
              onClose={() => setOpenAddExpenseModal(false)}
              title="Add Expense"
            >
              <form onSubmit={handleAddExpense} className="flex flex-col gap-4 mt-2">
                <EmojiPickerPopup
                    icon={formData.icon} 
                    onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
                />
                <div>
                    <label className="text-xs text-gray-500 font-medium">Category</label>
                    <input 
                        type="text" 
                        placeholder="e.g. Rent, Food" 
                        className="input-box"
                        value={formData.category}
                        onChange={(e) => handleChange("category", e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-xs text-gray-500 font-medium">Amount</label>
                    <input 
                        type="number" 
                        placeholder="5000" 
                        className="input-box" 
                        value={formData.amount}
                        onChange={(e) => handleChange("amount", e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-xs text-gray-500 font-medium">Date</label>
                    <input 
                        type="date" 
                        className="input-box" 
                        value={formData.date}
                        onChange={(e) => handleChange("date", e.target.value)}
                    />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <button type="button" className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200" onClick={() => setOpenAddExpenseModal(false)}>Cancel</button>
                    <button type="submit" className="btn-primary w-auto px-6">Add</button>
                </div>
              </form>
            </Modal>

            {/* 4. ✅ Delete Alert Modal (You were missing this) */}
            <Modal
                isOpen={openDeleteAlert.show}
                onClose={()=>setOpenDeleteAlert({show:false,data:null})}
                title="Delete Expense"
            >
              <DeleteAlert
                content="Are you sure you want to delete this expense detail?"
                onDelete={()=>deleteExpense(openDeleteAlert.data)}
              />
            </Modal>

          </div>
    </DashboardLayout>
  )
}

export default Expense;