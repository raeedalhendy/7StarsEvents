import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TeamDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [info, setInfo] = useState('');
    const [dec, setDec] = useState('');
    const [namear, setNamear] = useState('');
    const [infoar, setInfoar] = useState('');
    const [decar, setDecar] = useState('');
    const [photo, setPhoto] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get(`https://7starsevents.ae/api/team/${id}`, {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            const teamData = response.data[0];

            if (teamData) {
                setName(teamData.name || ''); // التأكد من وجود القيمة
                setInfo(teamData.details || '');
                setDec(teamData.dec || ''); // إضافة قيمة الـ description هنا
                setNamear(teamData.namear || ''); // التأكد من وجود القيمة
                setInfoar(teamData.detailsar || '');
                setDecar(teamData.decar || ''); // 
                setPhoto(teamData.img_team || null); // استخدام img_team بدلاً من img
            }
           
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
            });        });
    }, [id]);

    function handleSubmit(event) {
        event.preventDefault();

        const newErrors = {};
        if (!name || !name.trim()) newErrors.name = "Name is required.";
        if (!info || !info.trim()) newErrors.info = "Details are required.";
        if (!dec || !dec.trim()) newErrors.dec = "Description is required.";

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
        formData.append('name', name);
        formData.append('details', info);
        formData.append('dec', dec);
        formData.append('namear', namear);
        formData.append('detailsar', infoar);
        formData.append('decar', decar);

        formData.append("_method", "PUT");

        if (photo && typeof photo !== "string") {
            formData.append('img', photo);
        }

        axios.post(`https://7starsevents.ae/api/team/${id}`, formData, {
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
            });
            setTimeout(() => {
                navigate("/Admin/Teams"); // إعادة التوجيه بعد فترة قصيرة
            }, 2000);
        })
        .catch(error => {
            toast.erreo("Please Try Again!", {
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
                Update Employee
            </h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-customBlack p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
                
                <label className="text-white font-medium">
                    Upload Employee Photo
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        className="mt-2 block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-customBlack hover:file:bg-blue-100"
                    />
                </label>

                <label className="text-white font-medium">
                Employee Name
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Employee name" 
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    {errors.name && <p className="text-red-500 mt-1 text-sm">{errors.name}</p>}
                </label>
                <label className="text-white font-medium">
                Employee Name In Arabic
                    <input 
                        type="text" 
                        value={namear}
                        onChange={(e) => setNamear(e.target.value)}
                        placeholder="Enter Employee name" 
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    {errors.name && <p className="text-red-500 mt-1 text-sm">{errors.name}</p>}
                </label>
                
                <label className="text-white font-medium">
                Employee Job Title 
                <input 
                        type="text" 
                        value={dec}
                        onChange={(e) => setDec(e.target.value)}
                        placeholder="Enter Employee description" 
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    {errors.dec && <p className="text-red-500 mt-1 text-sm">{errors.dec}</p>}
                </label>
                <label className="text-white font-medium">
                Employee Job Title In Arabic
                <input 
                        type="text" 
                        value={decar}
                        onChange={(e) => setDecar(e.target.value)}
                        placeholder="Enter Employee description" 
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    {errors.dec && <p className="text-red-500 mt-1 text-sm">{errors.dec}</p>}
                </label>

                <label className="text-white font-medium">
                Employee Details
                    <input 
                        type="text" 
                        value={info}
                        onChange={(e) => setInfo(e.target.value)}
                        placeholder="Enter Employee Details" 
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    {errors.info && <p className="text-red-500 mt-1 text-sm">{errors.info}</p>}
                </label>
                <label className="text-white font-medium">
                Employee Details In Arabic
                    <input 
                        type="text" 
                        value={infoar}
                        onChange={(e) => setInfoar(e.target.value)}
                        placeholder="Enter Employee Details" 
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    {errors.info && <p className="text-red-500 mt-1 text-sm">{errors.info}</p>}
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
                        <p>Are you sure you want to update this team's details?</p>
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
