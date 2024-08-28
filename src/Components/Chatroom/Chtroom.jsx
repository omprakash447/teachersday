import React, { useEffect, useState } from 'react';
import data from '../Data/Mydata';
import "./Chatroom.css";

function Chtroom() {
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showChatroom, setShowChatroom] = useState(false);
    const [typing, setTyping] = useState(false);
    const [currentBotMessage, setCurrentBotMessage] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowChatroom(true);
        }, 4000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (typing) {
            const timeout = setTimeout(() => {
                if (currentBotMessage.length < chatHistory[chatHistory.length - 1].text.length) {
                    setCurrentBotMessage(prev => prev + chatHistory[chatHistory.length - 1].text.charAt(currentBotMessage.length));
                } else {
                    setTyping(false);
                }
            }, 50);

            return () => clearTimeout(timeout);
        }
    }, [typing, currentBotMessage, chatHistory]);

    const getResponse = (userMessage) => {
        const response = data.find(item => item.input.toLowerCase() === userMessage.trim().toLowerCase());
        return response ? response.output : "Sorry, I don't understand that.";
    };

    const handleClick = () => {
        if (message.trim() !== "") {
            setChatHistory([...chatHistory, { type: 'user', text: message }]);
            setMessage("");
            setLoading(true);
            setTimeout(() => {
                const botResponse = getResponse(message);
                setChatHistory(prevHistory => [...prevHistory, { type: 'bot', text: botResponse }]);
                setCurrentBotMessage("");
                setTyping(true);
                setLoading(false);
            }, 3000);
        }
    };

    return (
        <div className='Chatroom'>
            {!showChatroom ? (
                    <div className="splash-screen">
                        <h1 style={{textAlign:"center" , fontFamily:"sans-serif"}}>Welcome Boyzzzz...Lets Chatt</h1>
                        <img src="https://i.pinimg.com/originals/2f/d7/d0/2fd7d0b543b75edf9c2e0c6054f3f66a.gif" alt="Splash Screen" />
                    </div>
            ) : (
                <>
                    <div className="body">
                        {chatHistory.map((msg, index) => (
                            <p key={index} className={msg.type === 'user' ? 'user-message' : 'bot-message'}>
                                {msg.type === 'bot' && typing && chatHistory[chatHistory.length - 1].text === msg.text ? currentBotMessage : msg.text}
                            </p>
                        ))}
                        {loading && <div className="loading">
                            <img src="https://th.bing.com/th/id/R.dd7ad331abd907c2f82665652a2c1e55?rik=PzYxnURDTPHL2g&riu=http%3a%2f%2f10.url.cn%2feth%2fajNVdqHZLLBns4futWQOJOCb6OKKYmucy2t43UyzPzK4rvq0lE5XJwM8LGzPkkPKibRGop8NxHgk%2f&ehk=EnRNZSrwSHf1pOMT8UnCnrOIk%2bDr0Q%2fXWjL6RcTEJc4%3d&risl=&pid=ImgRaw&r=0" alt="Loading" />
                        </div>}
                    </div>
                    <div className="inputs">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message..."
                        />
                        <button onClick={handleClick}>Send</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Chtroom;
