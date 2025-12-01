import Chat from "../components/chat-ui"
import Hero from "../components/hero-ui"
export default function Dashboard(){
    return (
        <div className="pt-48 flex flex-col items-center min-h-screen">
            <Hero/>
            <div className="w-96 mx-auto m-10">
                <Chat/>
            </div>
            
        </div>
    )
}