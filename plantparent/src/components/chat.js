import React, { useState } from 'react';
import styled from 'styled-components';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
`;

const ChatBox = styled.div`
  flex-grow: 1;
  padding: 16px;
  overflow-y: auto;
  background-color: #f9f9f9;
`;

const MessageWrapper = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.sender === 'user' ? 'flex-end' : 'flex-start')};
`;

const SenderInfo = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-bottom: 4px;
  align-self: ${(props) => (props.sender === 'user' ? 'flex-end' : 'flex-start')};
`;

const ProfilePic = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 8px;
`;

const OnlineStatus = styled.span`
  width: 8px;
  height: 8px;
  background-color: green;
  border-radius: 50%;
  margin-left: 5px;
`;

const Message = styled.div`
  padding: 10px;
  border-radius: 8px;
  max-width: 80%;
  font-size: 14px;
  line-height: 1.4;
  background-color: ${(props) => (props.sender === 'user' ? '#d1f0ff' : '#e8e8e8')};
  align-self: ${(props) => (props.sender === 'user' ? 'flex-end' : 'flex-start')};
`;

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SendButton = styled.button`
  margin-left: 8px;
  padding: 8px 12px;
  font-size: 14px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Chat = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello, Oracle of Planti!', sender: 'user' },
    { text: 'Hi! What information about plants would you like to know?', sender: 'ai' }
  ]);
  const [input, setInput] = useState('');

  const handleInputChange = (e) => setInput(e.target.value);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInput('');

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await response.json();

      const botMessage = { text: data.response, sender: 'ai' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { text: 'Sorry, something went wrong. Please try again later.', sender: 'ai' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  return (
    <ChatContainer>
      <ChatBox>
        {messages.map((message, index) => (
          <MessageWrapper key={index} sender={message.sender}>
            {message.sender === 'ai' ? (
              <SenderInfo sender="ai">
                <ProfilePic src="https://imagizer.imageshack.com/img922/4007/AosLgM.jpg" alt="Plant Parent" />
                Plant Parent
                <OnlineStatus />
              </SenderInfo>
            ) : (
              <SenderInfo sender="user">User</SenderInfo>
            )}
            <Message sender={message.sender}>{message.text}</Message>
          </MessageWrapper>
        ))}
      </ChatBox>

      <InputContainer>
        <Input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <SendButton onClick={sendMessage}>Send</SendButton>
      </InputContainer>
    </ChatContainer>
  );
};

export default Chat;