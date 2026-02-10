import React, { useEffect, useState } from 'react'
import CustomPieChart from '../../components/Charts/CustomPieChart'

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
    const [chartData, setChartData] = useState([]);

    const prepareChartData = () => {
        // Added safety check (|| []) to prevent crash if data is null
        const dataArr = (data || []).map((item) => ({
            name: item?.source,
            amount: item?.amount,
        }));
        setChartData(dataArr)
    };

    useEffect(() => {
        prepareChartData();
        return () => { };
    }, [data]);

    return (
        <div className='card'>
            {/* ✅ FIX 1: Changed 'flex-items-center' to 'flex items-center' */}
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Last 60 Days Income</h5>
            </div>
            
            <CustomPieChart
                data={chartData}
                label="Total Income"
                totalAmount={`$${totalIncome}`}
                showTextAnchor
                // ✅ FIX 2: Changed 'color' to 'colors' to match your CustomPieChart component
                colors={COLORS} 
            />
        </div>
    )
}

export default RecentIncomeWithChart;