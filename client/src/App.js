import React from 'react';
import { BrowserRouter , Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Notes from './components/Notes';
import { AuthContextProvider } from './context/AuthContext';
import AuthGuard from './components/AuthGuard';
function App() {
    return (
        <AuthContextProvider> 
            <BrowserRouter>
                {/* <AuthGuard> */}
                    <Routes>
                        <Route path="/login" element={<Login/>} />
                        <Route path="/register" element={<Register/>} />
                        <Route path="/notes" element={<AuthGuard/>} />
                        {/* <Route path="/notes" element={<Notes/>} /> */}
                    </Routes>
                    {/* </AuthGuard> */}
            </BrowserRouter>
        </AuthContextProvider>
    );
}
export default App;