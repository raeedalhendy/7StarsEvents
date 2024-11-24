import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateContact() {
    const navigate = useNavigate();

    const [contact, setContact] = useState({
        phone: "",
        email: "", 
        insta: "",
        faceboock: "",  
        linkedin: "",
        telegram: "",
        logo: null 
    });
    const [showConfirm, setShowConfirm] = useState(false); // لإظهار نافذة التأكيد

    // Handle input changes
    function handleInputChange(e) {
        const { name, value } = e.target;
        setContact(prevContact => ({
            ...prevContact,
            [name]: value
        }));
    }

    // Handle file change
    function handleFileChange(e) {
        setContact(prevContact => ({
            ...prevContact,
            logo: e.target.files[0]
        }));
    }

    // دالة التأكيد
    function ContactSubmit(e) {
        e.preventDefault();
        setShowConfirm(true); // إظهار نافذة التأكيد
    }

    // دالة تقديم البيانات بعد التأكيد
    function confirmSubmit() {
        const token = localStorage.getItem("token");

        // Use FormData to handle file upload
        const formData = new FormData();
        formData.append("phone", contact.phone);
        formData.append("email", contact.email);
        formData.append("insta", contact.insta);
        formData.append("faceboock", contact.faceboock);  // Updated field name
        formData.append("linkedin", contact.linkedin);
        formData.append("telegram", contact.telegram);
        if (contact.logo) {
            formData.append("logo", contact.logo);
        }

        axios.post("https://7starsevents.ae/api/contact", formData, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        })
        .then(result => {
            setShowConfirm(false); // إخفاء نافذة التأكيد
            setContact({ phone: "", email: "", insta: "", faceboock: "", linkedin: "", telegram: "", logo: null }); // إعادة تعيين الحقول
            toast.success("Created Successfully!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });           
            // إظهار رسالة النجاح
            setTimeout(() => {
                navigate("/Admin/Contacts"); // الانتقال إلى صفحة الإدارة بعد عرض الرسالة
            }, 2000);
        })
        .catch(error => {
            toast.error("Please Try Again!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setShowConfirm(false); // إخفاء نافذة التأكيد في حالة الخطأ
        });
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-700 mb-6 sm:mb-8 text-center">
                Create New Contact
            </h2>
            
            <form onSubmit={ContactSubmit} className="flex flex-col gap-4 bg-customBlack p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md lg:max-w-lg">
                
                {/* Logo Upload */}
                <label className="text-white font-medium">
                    Upload Contact Logo
                    <input 
                        type="file" 
                        className="mt-2 block w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-customBlack hover:file:bg-orange-100"
                        onChange={handleFileChange}
                    />
                </label>
                
                <div className='flex gap-3'>
                    {/* Facebook Input */}
                    <label className="text-white font-medium">
                        TikTok
                        <input 
                            type="text" 
                            name="faceboock"
                            value={contact.faceboock}
                            placeholder="Enter Tiktok URL" 
                            onChange={handleInputChange}
                            className="mt-2 w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </label>
                    
                    {/* Instagram Input */}
                    <label className="text-white font-medium">
                        Instagram
                        <input 
                            type="text" 
                            name="insta"
                            value={contact.insta}
                            placeholder="Enter Instagram URL" 
                            onChange={handleInputChange}
                            className="mt-2 w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </label>
                </div>

                {/* LinkedIn Input */}
                <label className="text-white font-medium">
                    LinkedIn
                    <input 
                        type="text" 
                        name="linkedin"
                        value={contact.linkedin}
                        placeholder="Enter LinkedIn URL" 
                        onChange={handleInputChange}
                        className="mt-2 w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </label>

                {/* Phone Number Input */}
                <label className="text-white font-medium">
                    Phone Number
                    <input 
                        type="tel" 
                        name="phone"
                        value={contact.phone}
                        placeholder="Enter Phone Number" 
                        onChange={handleInputChange}
                        className="mt-2 w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </label>

                <div className='flex gap-3'>
                    {/* Email Input */}
                    <label className="text-white font-medium">
                        Email
                        <input 
                            type="email" 
                            name="email"
                            value={contact.email}
                            placeholder="Enter Email Address" 
                            onChange={handleInputChange}
                            className="mt-2 w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </label>

                    {/* Telegram Input */}
                    <label className="text-white font-medium">
                        Youtube
                        <input 
                            type="text" 
                            name="telegram"
                            value={contact.telegram}
                            placeholder="Enter Youtube URL" 
                            onChange={handleInputChange}
                            className="mt-2 w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </label>
                </div>
                
                {/* Submit Button */}
                <button className="mt-4 w-full py-2 transform hover:scale-105 hover:bg-orange-600 bg-orange-500 text-white font-semibold rounded-lg transition duration-300 ease-in-out">
                    Create
                </button>
            </form>

            {/* نافذة التأكيد */}
            {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Confirm Creation</h2>
                        <p>Are you sure you want to create this contact?</p>
                        <div className="flex justify-end mt-6">
                            <button 
                                onClick={() => setShowConfirm(false)}
                                className="mr-4 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-200"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={confirmSubmit}
                                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition duration-200"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            
        </div>
    );
}
