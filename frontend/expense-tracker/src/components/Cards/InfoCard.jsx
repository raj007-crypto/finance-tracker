import React from 'react'

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className='flex items-center gap-5 bg-white p-6 rounded-lg border border-gray-200/50 shadow-sm'>
        
        {/* Icon Section */}
        <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
            {icon}
        </div>

        {/* Text Section (Grouped together) */}
        <div>
            <h6 className='text-gray-500 text-sm mb-1'>{label}</h6>
            <span className='text-2xl font-bold text-slate-900'>${value}</span>
        </div>
        
    </div>
  )
}

export default InfoCard