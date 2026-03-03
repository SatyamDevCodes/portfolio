import { Routes, Route } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import Page from './components/Page';
import './App.css'
import Sidebar from "./components/SideBar";
import { Toaster } from "react-hot-toast";

function App() {

  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/super-admin-portal-9335" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/sidebar" element={<Sidebar />} />
      </Routes>
    </>
  )
}

export default App




