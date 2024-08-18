import React from 'react';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import './App.css';
import AuthPage from './components/auth.tsx';
import HomePage  from './components/home.tsx';
import NavbarComp from './components/navbar.tsx';
import Events from './components/events.tsx';


function App() {
    return (
        <div className='main'>
        <Router>
            <NavbarComp/>
            <Routes>
                <Route path='/'  element={<HomePage/>}/>
                <Route path='/auth' element={<AuthPage/>}/>
                <Route path='/events' element={<Events/>}/>
            </Routes>
        </Router>
        </div>
    )
}

export default App;
