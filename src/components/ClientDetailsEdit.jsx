import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ClientDetailsEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [namear, setNamear] = useState('');

    const [logo, setLogo] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get(`https://7starsevents.ae/api/client/${id}`, {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            const clientData = response.data[0];
            setName(clientData.name || '');
            setNamear(clientData.namear || '');
            setLogo(clientData.logo || null);
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
        if (!name.trim()) newErrors.name = "Name is required.";
        if (!namear.trim()) newErrors.namear= "Arabic Name is required.";

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
        formData.append('namear', namear);

        formData.append("_method", "PUT");

        if (logo && typeof logo !== "string") {
            formData.append('logo', logo);
        }

        axios.post(`https://7starsevents.ae/api/client/${id}`, formData, {
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
                navigate("/Admin/Clients");
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
                Update Client
            </h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-customBlack p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
                
                <label className="text-white font-medium">
                    Upload Client Logo
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => setLogo(e.target.files[0])}
                        className="mt-2 block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-customBlack hover:file:bg-blue-100"
                    />
                </label>

                <label className="text-white font-medium">
                    Client Name
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Client name" 
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    {errors.name && <p className="text-red-500 mt-1 text-sm">{errors.name}</p>}
                </label>
                <label className="text-white font-medium">
                    Client Arabic Name 
                    <input 
                        type="text" 
                        value={namear}
                        onChange={(e) => setNamear(e.target.value)}
                        placeholder="Enter Arabic Client Name" 
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    {errors.namear && <p className="text-red-500 mt-1 text-sm">{errors.namear}</p>}
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
                        <p>Are you sure you want to update this Client Name?</p>
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
