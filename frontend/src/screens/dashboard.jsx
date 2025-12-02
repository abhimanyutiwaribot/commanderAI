import { useState } from "react"
import ChatInput from "../components/chat-input-ui"
import Hero from "../components/hero-ui"
import ChatInterface from "../components/chat-interface-ui"

const generateAiResponse = (userCommand) => {
    return `Hello! you asked "${userCommand}". I am CommanderAI, how can i help you further?`
}
export default function Dashboard(){
    const [isChatting, setIsChatting] = useState(false);
    const [inputCommand, setInputCommand] = useState([]);

    const handleSend = (newMessageText) => {
        const userMessage = { 
            id: Date.now(), 
            text: newMessageText, 
            sender: 'user' 
        };
        
        const aiMessage = {
            id: Date.now() + 1,
            text: generateAiResponse(newMessageText),
            sender: 'ai'
        };

        setInputCommand(prevMessages => [...prevMessages, userMessage, aiMessage]);
        
        if (!isChatting) {
            setIsChatting(true);
        }
    };

    const dashboardClasses = isChatting ? "pt-5 pb-5 flex flex-col items-center min-h-screen justify-end transition-all duration-500" : "pt-48 pb-5 flex flex-col items-center min-h-screen transition-all duration-500";
    return (
        <div className={dashboardClasses}>
            {!isChatting && <Hero/>}

            {isChatting && <ChatInterface command= {inputCommand}/>}

            <div className="w-96 mx-auto m-10">
                <ChatInput onSend={handleSend} isChatting={isChatting}/>
            </div>
            
        </div>
    )
}