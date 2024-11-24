import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select'; // استيراد مكتبة Select
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EventDetailsEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [eventCost, setEventCost] = useState('');
    const [clientId, setClientId] = useState('');
    const [location, setLocation] = useState('');
    const [locationar, setLocationar] = useState('');

    const [clients, setClients] = useState([]); // قائمة العملاء للاقتراحات
    const [showConfirm, setShowConfirm] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("token");
    
        // تحميل بيانات الحدث
        axios.get(`https://7starsevents.ae/api/event/${id}`, {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            const eventData = response.data[0];
            setName(eventData.name || '');
            setEventCost(eventData.event_cost || '');
            setClientId(eventData.client_id || ''); // تحديث clientId
            setLocation(eventData.location || '');
            setLocationar(eventData.locationar || '');
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
    
        // تحميل بيانات العملاء للاقتراحات
        axios.get('https://7starsevents.ae/api/client', {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            const clientOptions = response.data[0].map(client => ({
                label: client.name,
                value: client.id
            }));
            setClients(clientOptions);
            
            // تعيين clientId الحالي كقيمة افتراضية
            const currentClient = clientOptions.find(option => option.value === clientId);
            if (currentClient) {
                setClientId(currentClient.value);
            }
        })
        .catch(error => {
            toast.error("Please Try Again", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        });
    }, [id, clientId]);
    

    function handleSubmit(event) {
        event.preventDefault();

        const newErrors = {};
        if (!name.trim()) newErrors.name = "Event name is required.";
        if (!eventCost.trim()) newErrors.eventCost = "Event cost is required.";
        if (!clientId) newErrors.clientId = "Client ID is required."; // تغيير للتحقق من القيمة الخالية
        if (!location.trim()) newErrors.location = "Event location is required.";
        if (!locationar.trim()) newErrors.location = "Event location arabic is required.";


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
        formData.append('event_cost', eventCost);
        formData.append('client_id', clientId);
        formData.append('location', location);
        formData.append('locationar', locationar);

        formData.append("_method", "PUT");

        axios.post(`https://7starsevents.ae/api/event/${id}`, formData, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        })
        .then(response => {
            setShowConfirm(false);
            setTimeout(() => {
                navigate("/Admin/Events");
            }, 2000);
        })
        .catch(error => {
            console.error("Error updating event:", error);
            setShowConfirm(false);
        });
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-700 mb-6 sm:mb-8">
                Update Event
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-customBlack p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
                <label className="text-white font-medium">
                    Event Name
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Event name" 
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    {errors.name && <p className="text-red-500 mt-1 text-sm">{errors.name}</p>}
                </label>

                <label className="text-white font-medium">
                    Event Cost
                    <input 
                        type="number" 
                        value={eventCost}
                        onChange={(e) => setEventCost(e.target.value)}
                        placeholder="Enter Event Cost" 
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    {errors.eventCost && <p className="text-red-500 mt-1 text-sm">{errors.eventCost}</p>}
                </label>

                <label className="text-white font-medium">
                    Client
                    <Select
                        options={clients}
                        value={clients.find(option => option.value === clientId) || null} // القيمة الافتراضية
                        onChange={(option) => setClientId(option.value)}
                        placeholder="Select Client"
                        className="mt-2 text-customBlack"
                    />

                    {errors.clientId && <p className="text-red-500 mt-1 text-sm">{errors.clientId}</p>}
                </label>

                <label className="text-white font-medium">
                    Location
                    <input 
                        type="text" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter Event Location" 
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    {errors.location && <p className="text-red-500 mt-1 text-sm">{errors.location}</p>}
                </label>
                <label className="text-white font-medium">
                    Location arabic
                    <input 
                        type="text" 
                        value={locationar}
                        onChange={(e) => setLocationar(e.target.value)}
                        placeholder="Enter Event Location arabic" 
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    {errors.locationar && <p className="text-red-500 mt-1 text-sm">{errors.locationar}</p>}
                </label>
                

                <button 
                    type="submit" 
                    className="mt-4 w-full py-2 transform hover:scale-105 hover:bg-orange-600 bg-orange-500 text-white font-semibold rounded-lg transition duration-300 ease-in-out"
                >
                    Update Event
                </button>
            </form>

            {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Confirm Update</h2>
                        <p>Are you sure you want to update this Event?</p>
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
