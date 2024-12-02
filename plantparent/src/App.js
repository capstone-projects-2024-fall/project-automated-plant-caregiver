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
import awsExports from './aws-exports'; // Adjust the path if needed


// Configure Amplify globally
Amplify.configure(awsExports);


function App() {
  return (
    
    <Router>
      <Navbar />
      <div className="main-content"> {}
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/Home' element={<Home />} />
            <Route path='/landing' element={<Landing />} />
            <Route path='/chat' element={<Chat />} />
            <Route path='/about' element={<About />} />
            <Route path='/AuthPage' element={<Login />}/>
            <Route path='/test' element= {<TestPage />}/>
          </Routes>
      </div>
    </Router>
  );
}
export default App;