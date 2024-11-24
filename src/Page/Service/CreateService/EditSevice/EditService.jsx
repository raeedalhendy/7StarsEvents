import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditService() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [titel, setTitel] = useState('');
    const [dec, setDec] = useState('');
    const [titelar, setTitelar] = useState('');
    const [decar, setDecar] = useState('');
    const [img_ser, setImg_ser] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get(`https://7starsevents.ae/api/service/${id}`, {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            const serviceData = response.data[0];
            setTitel(serviceData.titel || "");
            setDec(serviceData.dec || '');
            setTitelar(serviceData.titelar || "");
            setDecar(serviceData.decar || '');
            setImg_ser(serviceData.img_ser || null);
        })
        .catch(error => {
            console.error("Error fetching service data:", error);
        });
    }, [id]);

    function handleSubmit(event) {
        event.preventDefault();

        const newErrors = {};

        // تحقق من وجود العنوان والوصف
        if (!titel.trim()) newErrors.titel = "Title is required.";
        if (!dec.trim()) newErrors.dec = "Description is required.";
        if (!titelar.trim()) newErrors.titelar = "Title is required.";
        if (!decar.trim()) newErrors.decar = "Description is required.";
        // تحقق من وجود صورة
        if (!img_ser) newErrors.img_ser = "Image is required.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setShowConfirm(true);
    }

    function confirmUpdate() {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append('titel', titel);
        formData.append('dec', dec);
        formData.append('titelar', titelar);
        formData.append('decar', decar);
        formData.append("_method", "PUT");

        if (img_ser && typeof img_ser !== "string") {
            formData.append('img_ser', img_ser);
        }

        axios.post(`https://7starsevents.ae/api/service/${id}`, formData, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        })
        .then(response => {
            setShowConfirm(false);
            toast.success("Updated Successfully!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });            setTimeout(() => {
                navigate("/Admin/Services");
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
            console.error("Error updating service:", error);
            setShowConfirm(false);
        });
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-700 mb-6 sm:mb-8">
                Update Service
            </h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-customBlack p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
                
                <label className="text-white font-medium">
                    Upload Service Image
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => setImg_ser(e.target.files[0])}
                        className="mt-2 block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-customBlack hover:file:bg-blue-100"
                    />
                    {errors.img_ser && <p className="text-red-500 mt-1 text-sm">{errors.img_ser}</p>}
                </label>

                <label className="text-white font-medium">
                    Service Title
                    <input 
                        type="text" 
                        value={titel}
                        onChange={(e) => setTitel(e.target.value)}
                        placeholder="Enter Title" 
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    {errors.titel && <p className="text-red-500 mt-1 text-sm">{errors.titel}</p>}
                </label>
                <label className="text-white font-medium">
                    Service Title In Arabic
                    <input 
                        type="text" 
                        value={titelar}
                        onChange={(e) => setTitelar(e.target.value)}
                        placeholder="Enter Title In Arabic" 
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    {errors.titelar && <p className="text-red-500 mt-1 text-sm">{errors.titelar}</p>}
                </label>
                
                <label className="text-white font-medium">
                    Service Description
                    <input 
                        type="text" 
                        value={dec}
                        onChange={(e) => setDec(e.target.value)}
                        placeholder="Enter Description" 
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    {errors.dec && <p className="text-red-500 mt-1 text-sm">{errors.dec}</p>}
                </label>
                <label className="text-white font-medium">
                    Service Description In Arabic
                    <input 
                        type="text" 
                        value={decar}
                        onChange={(e) => setDecar(e.target.value)}
                        placeholder="Enter Description In Arabic" 
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    {errors.decar && <p className="text-red-500 mt-1 text-sm">{errors.decar}</p>}
                </label>
                
                
                <button 
                    type="submit" 
                    className="mt-4 w-full py-2 transform hover:scale-105 hover:bg-orange-600 bg-orange-500 text-white font-semibold rounded-lg transition duration-300 ease-in-out"
                >
                    Update
                </button>
            </form>

            {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Confirm Update</h2>
                        <p>Are you sure you want to update this Service?</p>
                        <div className="flex justify-end mt-6">
                            <button 
                                onClick={() => setShowConfirm(false)}
                                className="mr-4 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-200"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={confirmUpdate}
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
