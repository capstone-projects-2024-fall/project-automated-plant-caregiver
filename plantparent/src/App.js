import React from 'react';
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Chat from './components/chat';
import About from './components/about';
import Landing from './components/landing';


function App() {
  return (
    
    <Router>
      <Navbar />
      <div style={{ padding: '20px' }}>
          <Routes>
            <Route path ='/' element={<Home/>}/>
            <Route path ='/Home' element={<Home/>}/>
            <Route path ='/chat' element={<Chat/>}/>
            <Route path ='/about' element={<About/>}/>
          </Routes>
      </div>
    </Router>
  );
}
export default App;