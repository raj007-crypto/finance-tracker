import React from 'react'
import { LuX } from "react-icons/lu"; // Using consistent icons

const Modal = ({ children, isOpen, onClose, title }) => {
  
  // 1. If modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    // Overlay (Dark background)
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm overflow-y-auto'>
      
      {/* Modal Container */}
      <div className="relative w-full max-w-lg mx-4 md:mx-auto bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
          <h3 className="text-lg font-medium text-gray-800">
            {title}
          </h3>
          
          <button
            type="button"
            className='text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors cursor-pointer'
            onClick={onClose}
          >
            <LuX size={22} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="max-h-[80vh] overflow-y-auto no-scrollbar">
          {children}
        </div>

      </div>
    </div>
  )
}

export default Modal;