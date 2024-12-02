import React from 'react';
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Chat from './components/chat';
import About from './components/about';
import Landing from './components/landing';
import Login from './components/AuthPage';
import TestPage from './components/testPage';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react'; // Import the Authenticator
import awsExports from './aws-exports'; // Adjust the path if needed
import '@aws-amplify/ui-react/styles.css'; // Import Amplify styles

// Configure Amplify globally
Amplify.configure(awsExports);

function App() {
    return (
        <Authenticator.Provider>
            <Router>
                <Navbar />
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/Home" element={<Home />} />
                        <Route path="/landing" element={<Landing />} />
                        <Route path="/chat" element={<Chat />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/AuthPage" element={<Login />} />
                        <Route path="/test" element={<TestPage />} />
                    </Routes>
                </div>
            </Router>
        </Authenticator.Provider>
    );
}

export default App;
