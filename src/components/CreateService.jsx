import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateService() {
    const navigate = useNavigate();
    const [service, setService] = useState({
        title: '',
        dec: "",
        titlear: '',
        decar: "",
        img_ser : ""
    });
    const [showConfirm, setShowConfirm] = useState(false); // لإظهار نافذة التأكيد

    function handleSubmit(e) {
        e.preventDefault();
        setShowConfirm(true); // إظهار نافذة التأكيد
    }

    function confirmCreate() {
        const token = localStorage.getItem("token");

        const formData = new FormData();
        formData.append('titel', service.title);
        formData.append('dec', service.dec);
        formData.append('titelar', service.titlear);
        formData.append('decar', service.decar);
        formData.append('img_ser', service.img_ser);

        axios.post('https://7starsevents.ae/api/service', formData, {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(result => {
            setShowConfirm(false);
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
            setService({ title: '',dec : "" , img_ser: '' , titlear : '' , decar : '' }); // إعادة تعيين الحقول
            setTimeout(() => {
                navigate("/Admin/Services"); // إعادة التوجيه بعد فترة قصيرة
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
            setShowConfirm(false);
        });
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-700 mb-6 sm:mb-8">
                Create a New Service
            </h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-customBlack p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
                
                {/* رفع صورة العميل */}
                <label className="text-white font-medium">
                    Upload Service Photo
                    <input 
                        type="file" 
                        onChange={(e) => setService({...service, img_ser: e.target.files[0]})}
                        className="mt-2 block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-customBlack hover:file:bg-blue-100"
                    />
                </label>

                {/* اسم العميل */}
                <label className="text-white font-medium">
                    Service Name
                    <input 
                        type="text" 
                        placeholder="Enter Service name" 
                        value={service.title}
                        onChange={(e) => setService({...service, title: e.target.value})}
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </label>
                <label className="text-white font-medium">
                    Service Arabic Name
                    <input 
                        type="text" 
                        placeholder="Enter Service in arabic name" 
                        value={service.titlear}
                        onChange={(e) => setService({...service, titlear: e.target.value})}
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </label>
                <label className="text-white font-medium">
                Description
                    <input 
                        type="text" 
                        placeholder="Enter Description" 
                        value={service.dec}
                        onChange={(e) => setService({...service, dec: e.target.value})}
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </label>
                <label className="text-white font-medium">
                Description In Arabic
                    <input 
                        type="text" 
                        placeholder="Enter Description In Arabic" 
                        value={service.decar}
                        onChange={(e) => setService({...service, decar: e.target.value})}
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </label>
                
                
                {/* زر الإرسال */}
                <button 
                    type="submit" 
                    className="mt-4 w-full py-2 transform hover:scale-105 hover:bg-orange-600 bg-orange-500 text-white font-semibold rounded-lg transition duration-300 ease-in-out"
                >
                    Create
                </button>
            </form>

            {/* نافذة التأكيد */}
            {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Confirm Creation</h2>
                        <p>Are you sure you want to create this service?</p>
                        <div className="flex justify-end mt-6">
                            <button 
                                onClick={() => setShowConfirm(false)}
                                className="mr-4 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-200"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={confirmCreate}
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
