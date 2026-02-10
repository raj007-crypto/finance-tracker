import React, { useEffect, useState } from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';

const L30DaysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]); // Fixed casing: setChartData

  useEffect(() => {
    // Added safety check (|| []) so it doesn't crash if data is null
    const result = prepareExpenseBarChartData(data || []);
    setChartData(result);
  }, [data]);

  return (
    <div className='card col-span-1'>
      {/* ✅ FIX: Changed 'flex-items-center' to 'flex items-center' */}
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 30 Days Expenses</h5>
      </div>
      
      <CustomBarChart data={chartData} />
    </div>
  )
}

export default L30DaysExpenses;