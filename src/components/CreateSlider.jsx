import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateSlider() {
    const [sliderImage, setSliderImage] = useState(null); // لتخزين الصورة
    const [showConfirm, setShowConfirm] = useState(false); // لإظهار نافذة التأكيد
    const navigate = useNavigate();

    // دالة إظهار نافذة التأكيد
    function handleSubmit(e) {
        e.preventDefault();
        setShowConfirm(true); // إظهار نافذة التأكيد
    }

    // دالة تأكيد الإنشاء
    function confirmCreate() {
        const token = localStorage.getItem("token");

        const formData = new FormData();
        formData.append('img', sliderImage);

        axios.post('https://7starsevents.ae/api/slider', formData, {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(result => {
            setShowConfirm(false); // إخفاء نافذة التأكيد
            toast.success("Slider Created Successfully!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setSliderImage(null); // إعادة تعيين الصورة
            setTimeout(() => {
                navigate("/Admin/Slider"); // إعادة التوجيه بعد فترة قصيرة
            }, 2000);
        })
        .catch(error => {
            toast.error("Please Try Again", {
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
                Create a New Slider
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-customBlack p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
                {/* رفع صورة السلايدر */}
                <label className="text-white font-medium">
                    Upload Slider Image
                    <input 
                        type="file" 
                        onChange={(e) => setSliderImage(e.target.files[0])}
                        className="mt-2 block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-customBlack hover:file:bg-blue-100"
                        required
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
                        <p>Are you sure you want to create this slider?</p>
                        <div className="flex justify-end mt-6">
                            <button 
                                onClick={() => setShowConfirm(false)}
                                className="mr-4 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-200"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={confirmCreate} // استدعاء دالة التأكيد
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
