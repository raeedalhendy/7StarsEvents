import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Client() {
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false);
    const [clientToDelete, setClientToDelete] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get('https://7starsevents.ae/api/client', {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(result => {
            const clientData = result.data[0];
            setClients(clientData);
            setIsLoading(false);
        })
        .catch(error => {
            setIsLoading(false);
        });
    }, []);

    function confirmDelete(id) {
        setClientToDelete(id);
        setShowConfirm(true);
    }

    function DeleteItem() {
        const token = localStorage.getItem("token");

        axios.delete(`https://7starsevents.ae/api/client/${clientToDelete}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(() => {
            setClients(prevClients => prevClients.filter(client => client.id !== clientToDelete));
            setShowConfirm(false);
            toast.success("Deleted Successfully!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        })
        .catch(error => {
            setShowConfirm(false);
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
        });
    }

    return (
        <div className="flex flex-col w-full items-center justify-center min-h-screen p-2 sm:p-4 lg:p-16 bg-gray-50">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-52 justify-between w-full items-center mb-4 sm:mb-6">
                <h1 className="text-2xl sm:text-4xl font-bold text-gray-800">Clients</h1>
                <button 
                    onClick={() => navigate('/Admin/CreateClient')} 
                    className="px-4 sm:px-6 py-2 bg-orange-600 text-white text-sm sm:text-base font-semibold rounded-lg shadow hover:bg-orange-700 transition duration-200"
                >
                    Create Client
                </button>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-orange-600"></div>
                </div>
            ) : (
                clients.length === 0 ? (
                    <div className="text-center">
                        <p className="text-gray-500 text-lg italic mb-2">
                            No clients here yet... but stay tuned!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 max-w-full sm:max-w-7xl">
                        {clients.map((client) => (
                            <div key={client.id} className="bg-white flex flex-col gap-3 p-4 sm:p-6 rounded-lg shadow-lg transition hover:shadow-orange-900 hover:shadow-2xl ">
                                <img 
                                    className="w-full h-32 sm:h-48 object-cover rounded-lg mb-2 sm:mb-4"
                                    src={`https://7starsevents.ae/clientimges/${client.logo}`}
                                    alt={client.name}
                                />
                                <h2 className="text-lg sm:text-2xl font-semibold text-gray-900 mb-1">{client.name}</h2>
                                <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-4">{client.details}</p>
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <button 
                                        onClick={() => navigate(`/Admin/Client/${client.id}`)}
                                        className="flex-1 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition duration-200"
                                    >
                                        View Details
                                    </button>
                                    <button 
                                        onClick={() => confirmDelete(client.id)}  
                                        className="flex-1 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition duration-200"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            )}

            {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg max-w-xs">
                        <h2 className="text-lg sm:text-xl font-bold mb-4">Confirm Deletion</h2>
                        <p className="text-sm">Are you sure you want to delete this client?</p>
                        <div className="flex justify-end mt-4 sm:mt-6">
                            <button 
                                onClick={() => setShowConfirm(false)}
                                className="mr-2 sm:mr-4 px-2 sm:px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-200 text-sm sm:text-base"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={DeleteItem}
                                className="px-2 sm:px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200 text-sm sm:text-base"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
