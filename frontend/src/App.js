//// frontend/src/App.js
//
import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import './style.css';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };


    return (
        <div>
              {isLoggedIn ? (
                <DashboardPage onLogout={handleLogout} />
              ) : (
                <HomePage onLogin={handleLogin} />
            )}
        </div>
    );
};

export default App;
//
//import React, { useState } from 'react';
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import HomePage from './pages/HomePage';
//import DashboardPage from './pages/DashboardPage';
//import './style.css';
//
//const App = () => {
//    const [isLoggedIn, setIsLoggedIn] = useState(false);
//
//    const handleLogin = () => {
//        setIsLoggedIn(true);
//    };
//
//    const handleLogout = () => {
//        setIsLoggedIn(false);
//    };
//
//    return (
//        <Router>
//            <div className="container">
//                <Routes>
//                    <Route path="/" element={isLoggedIn ? <DashboardPage onLogout={handleLogout} /> : <HomePage onLogin={handleLogin} />} />
//                    {isLoggedIn && <Route path="/*" element={<DashboardPage onLogout={handleLogout} />} />}
//                </Routes>
//            </div>
//        </Router>
//    );
//};
//
//export default App;
