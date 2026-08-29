import { Routes, Route } from "react-router-dom";
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
        <Route path="/sidebar" element={<Sidebar />} />
      </Routes>
    </>
  )
}

export default App




