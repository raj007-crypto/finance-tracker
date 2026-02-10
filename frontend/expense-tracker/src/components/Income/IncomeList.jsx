import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const IncomeList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className='card'>
      
      {/* Header Section */}
      <div className="flex items-center justify-between ">
        <h5 className="text-lg font-medium">Income Sources</h5>
        
        <button className="card-btn" onClick={onDownload}>
          <LuDownload className='text-base' /> Download
        </button>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactions && transactions.length > 0 ? (
          transactions.map((income) => (
            <TransactionInfoCard
              key={income._id}
              title={income.source}
              icon={income.icon}
              date={moment(income.date).format("Do MMM YYYY")}
              amount={income.amount}
              type="income"
              onDelete={() => onDelete(income._id)}
            />
          ))
        ) : (
          // Empty State Message
          <div className="col-span-2 text-center py-10 text-gray-400 text-sm">
            No income transactions found.
          </div>
        )}
      </div>
      
    </div>
  )
}

export default IncomeList;