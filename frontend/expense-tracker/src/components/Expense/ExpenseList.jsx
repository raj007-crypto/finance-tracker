import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const ExpenseList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className='card'>
      
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h5 className="text-lg font-medium">Expenses</h5>
        
        <button className="card-btn" onClick={onDownload}>
          <LuDownload className='text-base' /> Download
        </button>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {transactions && transactions.length > 0 ? (
          transactions.map((expense) => (
            <TransactionInfoCard
              key={expense._id}
              title={expense.category} // ✅ Changed source to category
              icon={expense.icon}
              date={moment(expense.date).format("Do MMM YYYY")}
              amount={expense.amount}
              type="expense" // ✅ Changed type to expense (Red color)
              onDelete={() => onDelete(expense._id)}
            />
          ))
        ) : (
          // Empty State Message
          <div className="col-span-2 text-center py-10 text-gray-400 text-sm">
            No expense transactions found.
          </div>
        )}
      </div>
      
    </div>
  )
}

export default ExpenseList;