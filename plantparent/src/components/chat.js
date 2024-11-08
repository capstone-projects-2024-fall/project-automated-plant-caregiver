import React, { useState, useEffect, useRef } from 'react';
import './chat.css';
// Import the actual callLambda function
import { callLambda as actualCallLambda } from './Chatbot_Lambda_Function';

// Define the dummy function
const dummyCallLambda = async (message, image = null) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let dummyResponse = {
        message: `Response: ${message || 'No message provided'}  ${image ? "|| Image: " + image.name : ''}`,
        imageUrl: image instanceof File ? URL.createObjectURL(image) : null
      };

      resolve(dummyResponse);
    }, 1000);
  });
};

// Use the dummy function for testing
console.log(`NODE_ENV: ${process.env.NODE_ENV}`); // Add this line to verify NODE_ENV
const callLambda = process.env.NODE_ENV === 'developments' ? dummyCallLambda : actualCallLambda;

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Load initial message
    setMessages([
      { text: 'Hello, Oracle of Planti!', sender: 'user' },
      { text: 'Hi! What information about plants would you like to know?', sender: 'ai' }
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() && !selectedFile) return;

    try {
      setIsLoading(true);
      const userMessage = { text: input, sender: 'user' };
      if (selectedFile) {
        userMessage.imageUrl = URL.createObjectURL(selectedFile);
      }
      setMessages(prev => [...prev, userMessage]);
      setInput('');

      console.log('Calling callLambda');
      const response = await callLambda(
        input,
        selectedFile,
        localStorage.getItem('userId') // Add user tracking if needed
      );

      console.log('Received response:', response);
      setMessages(prev => [...prev, {
        text: response.message,
        sender: 'ai'
      }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'ai',
        error: true
      }]);
    } finally {
      setIsLoading(false);
      setSelectedFile(null);
      setFileName('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === 'user' ? 'user-message' : 'ai-message'} ${message.error ? 'error' : ''}`}
          >
            {message.imageUrl && (
              <img src={message.imageUrl} alt="Uploaded" className="uploaded-image" />
            )}
            <div className="message-text">{message.text}</div>
          </div>
        ))}
        {isLoading && (
          <div className="loading-indicator">
            <span>Oracle is thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <input
          type="file"
          id="file-input"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setSelectedFile(file);
              setFileName(file.name);
            }
          }}
        />
        <button
          onClick={() => document.getElementById('file-input').click()}
          disabled={isLoading}
        >
          Choose File
        </button>
        {fileName && <span className="file-name">{fileName}</span>}
        <button onClick={sendMessage} disabled={isLoading}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;