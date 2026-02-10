import React, { useState } from 'react'
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from 'react-icons/lu';

const EmojiPickerPopup = ({ icon, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        // Added 'relative' here so the popup can anchor to this container
        <div className='relative flex flex-col md:flex-row items-start gap-5 mb-6'>
            
            {/* Trigger Button */}
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => setIsOpen(true)}>
                
                <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-primary rounded-lg border border-gray-200">
                    {icon ? (
                         // ✅ FIX 1: Handle Emoji (Text) vs Image (URL)
                         // If it looks like a URL (http/data), use <img>. Otherwise, use <span> for text emojis.
                        (icon.startsWith('http') || icon.startsWith('data:')) ? (
                            <img src={icon} alt="Icon" className='w-full h-full object-contain p-1.5' />
                        ) : (
                            <span className="text-3xl pb-1">{icon}</span>
                        )
                    ) : (
                        <LuImage />
                    )}
                </div>
                
                <p className="text-sm font-medium text-gray-600">
                    {icon ? "Change Icon" : "Pick Icon"}
                </p>
            </div>

            {/* Popup Window */}
            {isOpen && (
                // ✅ FIX 2: Changed to 'absolute' to prevent layout shifting
                // 'top-14' places it right below the button
                <div className="absolute top-14 left-0 z-20 shadow-xl rounded-xl">
                    {/* Close Button */}
                    <button 
                        className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-3 -right-3 z-30 hover:bg-red-50 text-gray-500 hover:text-red-500 shadow-sm cursor-pointer" 
                        onClick={(e) => {
                            e.stopPropagation(); // Prevents clicking "through" the button
                            setIsOpen(false);
                        }}
                    >
                        <LuX size={16} />
                    </button>

                    <EmojiPicker
                        open={isOpen}
                        onEmojiClick={(emoji) => {
                            onSelect(emoji?.imageUrl || emoji?.emoji);
                            setIsOpen(false);
                        }}
                    />
                </div>
            )}
        </div>
    )
}

export default EmojiPickerPopup;