import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from "recharts"
import moment from 'moment' 

const CustomBarChart = ({ data }) => {
    
    const getBarColor = (index) => {
        return index % 2 === 0 ? "#875cf5" : "#cfbefb"
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
                    {/* Format the date inside the tooltip (e.g., 25th Jan 2026) */}
                    <p className="text-xs font-medium text-gray-600">
                        {moment(payload[0].payload.date).format("Do MMM YYYY")}
                    </p>
                    <p className='text-sm font-semibold text-primary'>
                        Amount: <span className='ml-1'>${payload[0].value}</span>
                    </p>
                </div>
            )
        }
        return null;
    }

    return (
        <div className='bg-white mt-6 rounded-lg p-5'> 
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid stroke="none" />
                    
                    <XAxis 
                        dataKey="date" 
                        // ✅ FIX: Format "2026-01-25" to "25 Jan"
                        tickFormatter={(date) => moment(date).format("D MMM")} 
                        tick={{ fontSize: 12, fill: "#555" }} 
                        stroke="none" 
                    />
                    
                    <YAxis 
                        tick={{ fontSize: 12, fill: "#555" }} 
                        stroke="none" 
                    />
                    
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                    
                    <Bar
                        dataKey="amount"
                        fill="#FF8042"
                        radius={[10, 10, 0, 0]}
                    >
                        {data?.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getBarColor(index)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomBarChart;