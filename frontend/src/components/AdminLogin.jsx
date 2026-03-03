"use client"

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdOutlineSecurity } from "react-icons/md";
import { MdOutlineForwardToInbox } from "react-icons/md";


const Server = import.meta.env.VITE_SERVER_URL;


const AdminLogin = () => {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const API = `${Server}/api/admin`;

  const sendOTP = async () => {
    const res = await axios.post(`${API}/send-otp`);
    setMessage(res.data.msg);
    setStep(2);
  };

  const verifyOTP = async () => {
    const res = await axios.post(`${API}/verify-otp`, { otp });
    setMessage(res.data.msg);
    setStep(3);
  };

  const login = async () => {
    try {
      const res = await axios.post(`${API}/login`, { password });

      localStorage.setItem("adminToken", res.data.token);
      setMessage("Login Successful");

      navigate("/");   // Home pe jaayega
    } catch (err) {
      setMessage(err.response?.data?.msg || "Login failed");
    }
  };

  const forgetPassword = async () => {
    await axios.post(`${API}/reset-password`, { newPassword });
    setMessage("Password Updated. Login again.");
    setStep(1);
  };

  return (
    <div className="grid h-screen place-items-center">
      <div className="min-h-80 w-90 border border-border justify-items-center  rounded-lg p-3">
        <h2 className="h-10 w-10 justify-center text-4xl mb-6 mt-3"><MdOutlineSecurity /></h2>
        <h2 className="px-5 bg-primary p-3 text-black rounded-bl-2xl rounded-tr-2xl rounded-tl-sm rounded-br-sm font-bold">Admin Login</h2>
        <div className="h-0 w-60 border-b mt-10 border-white "> </div>

        {step === 1 && (
          <center>
            <h2 className="mt-8 mb-3 text-2xl  hover:text-primary"><MdOutlineForwardToInbox /></h2>
            <button
              onClick={sendOTP}
              className="bg-transparent border p-2 rounded-2xl px-3 text-sm hover:text-primary hover:border-primary"
            >Send Code</button>
            <p className="text-xs mt-3">SECURE ACCESS PORTAL @Satyam</p>
          </center>
        )}

        {step === 2 && (
          <>
            <label for="OTP" class="block font-medium text-gray-100 mt-5">Enter OTP</label>

            <input
              type="text"
              placeholder="Enter OTP"
              id="OTP"
              name="OTP"
              class="block w-75 rounded-md mt-2 bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-1 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={verifyOTP} className="block mt-4 h-9 w-25 bg-transparent text-primary border border-primary rounded-lg text-sm hover:bg-primary hover:text-black hover:font-bold transition-all ease-in-out">Verify OTP</button>
          </>
        )}

        {step === 3 && (
          <>
            <div className="mt-5">
              <h4 className="text-sm mb-2">Enter Password</h4>
              <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-1 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
            />
            <button onClick={login} className="h-9 w-25 ml-2 bg-transparent text-primary border border-primary rounded-lg text-sm hover:bg-primary hover:text-black hover:font-bold transition-all ease-in-out">Login</button>

            <center><hr className="mt-5 w-70 text-gray-500 opacity-30"/></center>
            <h4 className="text-sm mt-5 mb-2">Forget Password</h4>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-1 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
            />
            <button onClick={forgetPassword} className="h-9 w-25 ml-2 bg-transparent text-primary border border-primary rounded-lg text-sm hover:bg-primary hover:text-black hover:font-bold transition-all ease-in-out">Update</button>
            </div>
          </>
        )}

        <p>{message}</p>
      </div>
    </div>
  );
};

export default AdminLogin;