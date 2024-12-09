import React, { useState, useEffect, useRef } from 'react';
import './ChatBot.css';

const ChatBot = ({ plantName, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const fileInputRef = useRef(null);

    useEffect(() => {
        const starterMessage = { text: `Hi, how are you? Let's talk about ${plantName}.`, sender: 'bot' };
        setMessages([starterMessage]);
    }, [plantName]);

    const handleInputChange = (e) => setInput(e.target.value);

    const handlePhotoClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("photo", file);
            formData.append("plantName", plantName);

            const userMessage = { text: "Uploaded a photo 📸", sender: 'user', photo: URL.createObjectURL(file) };
            setMessages((prevMessages) => [...prevMessages, userMessage]);

            try {
                const response = await fetch('http://localhost:3001/api/chat', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();

                const botMessage = { text: data.response, sender: 'bot' };
                setMessages((prevMessages) => [...prevMessages, botMessage]);
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { text: input, sender: 'user' };
        setMessages([...messages, userMessage]);
        setInput('');

        try {
            const response = await fetch('http://localhost:3001/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input, plantName }),

            });
            const data = await response.json();

            const botMessage = { text: data.response, sender: 'bot' };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="chatbot-modal-overlay" onClick={onClose}>
            <div className="chatbot-modal" onClick={(e) => e.stopPropagation()}>
                <div className="chatbot-header">
                    <h4>Plant Care Assistant 🌱</h4>
                    <button onClick={onClose}>✖</button>
                </div>
                <div className="chatbot-messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`chatbot-message ${msg.sender}`}>
                            {msg.photo ? (
                                <img src={msg.photo} alt="Uploaded" className="chatbot-photo" />
                            ) : (
                                msg.text
                            )}
                        </div>
                    ))}
                </div>
                <div className="chatbot-input">
                    <input
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Ask me about your plant..."
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <button className="photo-upload-button" onClick={handlePhotoClick}>📸</button>
                    <button onClick={sendMessage}>Send</button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChatBot;