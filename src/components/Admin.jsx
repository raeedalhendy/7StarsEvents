import React, { useState, useEffect } from 'react';
import logo from "./../assets/img/logof.jpg";
import { Outlet, useNavigate } from "react-router-dom";
import axios from 'axios';
import { FiLogOut, FiMenu } from 'react-icons/fi';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Admin() {
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState('');
    const [showConfirmLogout, setShowConfirmLogout] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // للتحقق من حجم الشاشة
    const [isMenuOpen, setIsMenuOpen] = useState(false); // للتحكم بظهور القائمة في الوضع المتنقل


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token == "undefined") {
            navigate('/LogIn');
        }
    }, [navigate]);

    useEffect(() => {
        // تحديث حالة الشاشة عند تغيير حجمها
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleNavigation = (path) => {
        navigate(path);
        setActiveItem(path);
        setIsMenuOpen(false); // إغلاق القائمة بعد اختيار عنصر
    };

    function confirmLogout() {
        setShowConfirmLogout(true);
    }

    function LogOut() {
        const token = localStorage.getItem("token");

        axios.post("https://7starsevents.ae/api/logout", {}, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(() => {
            localStorage.removeItem("token");
            setShowConfirmLogout(false);
            toast.success("LogOut Successfully!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setTimeout(() => {
                navigate("/LogIn");
            }, 2000);
        })
        .catch(error => {
            toast.error("Invalid email or password!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setShowConfirmLogout(false);
        });
    }

    return (
        <div className='flex flex-col md:flex-row h-screen'>
            {/* Sidebar */}
            <div className='lg:w-1/4 md:w-2/5 bg-customBlack h-16 md:h-full flex flex-col items-center'>
                {/* القائمة المنبثقة في الوضع المتنقل */}
                {isMobile ? (
                    <div className="w-full flex items-center justify-between p-4">
                        {/* اللوغو وزر القائمة */}
                        <div className="flex items-center">
                            <button 
                                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                                className="flex items-center text-orange-500 focus:outline-none"
                            >
                                <FiMenu size={24} />
                            </button>
                        </div>

                        {/* زر تسجيل الخروج */}
                        <FiLogOut 
                            size={24} 
                            onClick={confirmLogout} 
                            className="text-orange-500 cursor-pointer hover:text-red-600" 
                        />

                        {isMenuOpen && (
                            <div className="absolute z-40 top-14 left-0 w-full bg-customBlack p-4 shadow-lg transition-transform duration-300 transform">
                                <ul className="flex flex-col gap-4 text-lg font-semibold">
                                    {[ {  path: "/Admin/Slider", label: "Slider" }, {  path: "/Admin/Teams", label: "Teams" },{ path: "/Admin/Services", label: "Services" }, { path: "/Admin/Contacts", label: "Contacts" }, { path: "/Admin/Events", label: "Events" }, { path: "/Admin/Clients", label: "Clients" }, { path: "/Admin/Users", label: "Users" }].map((item) => (
                                        <li key={item.path} 
                                            onClick={() => handleNavigation(item.path)} 
                                            className={`cursor-pointer relative pl-2 transition-all duration-200 hover:text-orange-400 
                                            ${activeItem === item.path ? "text-orange-500 font-medium" : "text-white"}`}
                                        >
                                            {item.label}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    // القائمة في الوضع العادي للشاشات الكبيرة
                    <nav className="text-white md:gap-14 flex md:flex-col md:items-center md:justify-start h-full  md:py-10">
                        <img src={logo} alt="logo" className="md:h-48  w-auto object-cover hidden md:block  " />

                        <ul className="flex md:flex-col gap-3 text-sm md:text-lg font-semibold">
                            {[ {  path: "/Admin/Slider", label: "Slider" },{ path: "/Admin/Teams", label: "Teams" },{ path: "/Admin/Services", label: "Services" }, { path: "/Admin/Contacts", label: "Contacts" }, { path: "/Admin/Events", label: "Events" }, { path: "/Admin/Clients", label: "Clients" }, { path: "/Admin/Users", label: "Users" }].map((item) => (
                                <li key={item.path} 
                                    onClick={() => handleNavigation(item.path)} 
                                    className={`cursor-pointer flex items-center relative md:pl-2 transition-all duration-200 hover:text-orange-400 
                                    ${activeItem === item.path ? "text-orange-500 font-medium" : "text-white"}`}
                                >
                                    {item.label}
                                </li>
                            ))}
                        </ul>
                        
                        <button 
                            onClick={confirmLogout} 
                            className="hidden md:block px-4 py-2 bg-orange-500 text-white rounded hover:bg-red-600 transition duration-200"
                        >
                            Log Out
                        </button>
                    </nav>
                )}
            </div>

            {/* Main Content */}
            <div className="w-full flex items-center justify-center p-4 overflow-auto">
                {!activeItem ? (
                    <p className="text-center text-customBlack text-2xl md:text-3xl font-semibold bg-gray-100 rounded-lg shadow-lg p-8 border border-gray-200 max-w-md">
                        Choose one from the list
                    </p>
                ) : (
                    
                    <Outlet />
                )}
            </div>

            {/* Confirmation Popup */}
            {showConfirmLogout && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
                        <p>Are you sure you want to log out?</p>
                        <div className="flex justify-end mt-6">
                            <button 
                                onClick={() => setShowConfirmLogout(false)} 
                                className="mr-4 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-200"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={LogOut} 
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            )}

            
        </div>
    );
}
