import React, { useState } from 'react';

export default function ChatInput({onSend, isChatting}) {
    const [inputValue, setInputValue] = useState('');

    const inputClasses = "peer w-full h-16 border border-zinc-950 pl-5 pr-16 bg-gray-900 rounded-full text-white focus:outline-none focus:ring-0 focus:border-zinc-950 transition-all duration-300";
    const buttonClasses = "w-12 h-12 rounded-full bg-black text-white absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 hover:bg-zinc-800";

    const handleSubmit = (e) => {
        e.preventDefault();

        if(inputValue.trim()){
            onSend(inputValue);
            setInputValue(' ')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="bg-gray-900 relative w-full mx-auto px-4 md:px-0 shadow-2xl shadow-black/70 rounded-full">
            <input
                className={inputClasses}
                placeholder="Ask, Search or Chat..."
                aria-label="Ask, Search or Chat"
                name="chat-input"
                id="chat-input"
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button type='submit' className={buttonClasses} disabled={!inputValue.trim()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                </svg>
            </button>
        </form>
    )
}