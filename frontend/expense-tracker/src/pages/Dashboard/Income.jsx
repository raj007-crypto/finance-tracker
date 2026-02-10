import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import Modal from '../../components/layouts/Modal';
import EmojiPickerPopup from '../../components/layouts/EmojiPickerPopup';
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../components/Income/DeleteAlert';
import { useUserAuth } from '../../hooks/useUserAuth';

const Income = () => {
  useUserAuth();
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  // ✅ FIX 1: Add State for Delete Alert (Missing in your code)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const [formData, setFormData] = useState({
    source: "",
    amount: "",
    date: "",
    icon: ""
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`);
      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong.", error);
    } finally {
      setLoading(false);
    }
  }

  const handleAddIncome = async (e) => {
    e.preventDefault();

    if(!formData.source || !formData.amount || !formData.date){
        alert("Please fill all fields");
        return;
    }

    try {
        await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
            source: formData.source,
            amount: Number(formData.amount),
            date: formData.date,
            icon: formData.icon
        });

        setFormData({ source: "", amount: "", date: "", icon: "" });
        setOpenAddIncomeModal(false);
        fetchIncomeDetails(); 
    } catch (error) {
        console.error("Error adding income:", error);
    }
  }

  // ✅ FIX 2: Define the missing download function (Stub)
  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
        responseType: 'blob', // Important: responseType must be 'blob' for file downloads
      });

      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;
      
      // Set the filename for the download
      link.setAttribute('download', 'Income_Details.xlsx'); 
      
      // Append to the body, click it, and remove it
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      
      // Clean up the URL object
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading income details:", error);
      alert("Failed to download income details. Please try again.");
    }
  };

  // ✅ FIX 3: Define the missing delete function
 const deleteIncome = async (id) => {
      try {
          // Step 1: Call the API
          // Since DELETE_INCOME is a function in your utils, we pass 'id' into it
          await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));

          // Step 2: Close the Alert Modal
          setOpenDeleteAlert({ show: false, data: null });

          // Step 3: Refresh the list to remove the deleted item from the UI
          fetchIncomeDetails();
          
      } catch (error) {
          console.error("Error deleting income:", error);
      }
  };

  useEffect(() => {
    fetchIncomeDetails();
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>

          {/* Income List Section */}
          <IncomeList
             transactions={incomeData}
             onDelete={(id)=>{
                // We just open the alert state here. 
                // You will need a Delete Confirmation Modal to actually call deleteIncome(id)
                setOpenDeleteAlert({show:true,data:id});
             }}
             onDownload={handleDownloadIncomeDetails}
          />
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <form onSubmit={handleAddIncome} className="flex flex-col gap-4 mt-2">
            
            <EmojiPickerPopup
                icon={formData.icon} 
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />
            
            <div>
                <label className="text-xs text-gray-500 font-medium">Income Source</label>
                <input 
                    type="text" 
                    placeholder="Salary, Freelance" 
                    className="input-box"
                    value={formData.source}
                    onChange={(e) => handleChange("source", e.target.value)}
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
                <button 
                    type="button" 
                    className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                    onClick={() => setOpenAddIncomeModal(false)}
                >
                    Cancel
                </button>
                <button 
                    type="submit" 
                    className="btn-primary w-auto px-6"
                    // ✅ FIX 4: Removed the broken onClick. 'type=submit' handles it.
                >
                    Add
                </button>
            </div>

          </form>
        </Modal>
        <Modal
        isOpen={openDeleteAlert.show}
        onClose={()=>setOpenDeleteAlert({show:false,data:null})}
        title="Delete Income"
        >
          <DeleteAlert
          content="Are you sure you want to delete this income detail?"
          onDelete={()=>deleteIncome(openDeleteAlert.data)}
          />
        </Modal>

      </div>
    </DashboardLayout>
  )
}

export default Income;