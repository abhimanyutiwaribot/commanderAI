import React, { useEffect, useRef } from 'react';

// This component displays a single message bubble
const MessageBubble = ({ command }) => {
    // Apply styling based on the sender
    const isUser = command.sender === 'user';
    
    // User message (right-aligned, dark background)
    const bubbleClasses = isUser
        ? "bg-emerald-700 text-white self-end rounded-t-xl rounded-bl-xl ml-auto"
        : "bg-gray-200 text-zinc-900 self-start rounded-t-xl rounded-br-xl mr-auto"; // AI message (left-aligned, light background)

    return (
        <div className={`flex max-w-2xl my-2 p-4 shadow-lg ${bubbleClasses}`}>
            <p>{command.text}</p>
        </div>
    );
};

export default function ChatInterface({ command }) {

    const chatendref = useRef(null)

    const scrollview = () => {
        chatendref.current?.scrollIntoView({ behavior: "smooth"})
    }

    useEffect(() => {
        scrollview();
    }, [command])

    return (
        <div className="flex flex-col w-11/12 max-w-5xl mx-auto flex-grow overflow-y-auto mb-5">
            {command.map((command) => (
                <MessageBubble key={command.id} command={command} />
            ))}

            <div ref={chatendref}/>
        </div>
    );
}