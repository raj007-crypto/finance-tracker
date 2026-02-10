import React, { useEffect, useState } from 'react'
import { LuPlus } from "react-icons/lu";
import CustomBarChart from '../Charts/CustomBarChart';
import { prepareIncomeBarChartData } from '../../utils/helper';

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions || []);
    setChartData(result);
  }, [transactions]);

  return (
    <div className='card'>
      {/* ✅ Header Section: Text on Left, Button on Right */}
      <div className="flex items-center justify-between mb-4">
        
        {/* Left Side: Title & Description */}
        <div>
          <h5 className="text-lg font-medium">Income Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your earnings and analyze your income trends
          </p>
        </div>

        {/* Right Side: Add Button */}
        <button className="add-btn" onClick={onAddIncome}>
          <LuPlus className='text-lg' /> Add Income
        </button>
      </div>

      {/* ✅ Chart Section */}
      <div className="mt-4">
        <CustomBarChart data={chartData} />
      </div>
    </div>
  )
}

export default IncomeOverview;