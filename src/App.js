import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './app.scss';
import Login from './Pages/Login/Login';
import Suivi from './Pages/Suivi/Suivi';
import Reports from './Pages/Reports/Reports';

import ProtectedRoute from './Utils/ProtectedRoute';
import CrudTable from './Components/CrudTable/CrudTable';
import Users from './Pages/Users/Users';
import ForgetPassword from './Pages/forgrtPassword/Forget';
import Dashboard from './Pages/Dashboard/Dashboard';

function App() {

    return (
        <div className='App'>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route path="/login" element={<Login />} />
                        <Route path="/forgot-password" element={<ForgetPassword />} />
                        <Route path="/suivi" element={
                            <ProtectedRoute>
                                <Suivi />
                            </ProtectedRoute>
                        } />
                        <Route path="/Reports" element={
                            <ProtectedRoute>
                                <Reports />
                            </ProtectedRoute>
                        } />
                        <Route path="/users" element={
                            <ProtectedRoute>
                                <Users />
                            </ProtectedRoute>
                        } />
                        <Route path="/dashboard" element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        } />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
