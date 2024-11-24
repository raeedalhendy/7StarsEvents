import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Contact() {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    function CreateContact() {
        navigate('/Admin/CreateContact');
    }

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get('https://7starsevents.ae/api/contact', {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(result => {
            setContacts(result.data[0]);
            setIsLoading(false);
        })
        .catch(error => {
            setIsLoading(false);
        });
    }, []);

    // Handle contact deletion
    const handleDelete = (id) => {
        const token = localStorage.getItem("token");

        axios.delete(`https://7starsevents.ae/api/contact/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(() => {
            setContacts(contacts.filter(contact => contact.id !== id));
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
    };

    function formatURL(url) {
        return url.startsWith('http') ? url : `https://${url}`;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
            <h1 className="text-3xl font-bold text-black mb-6">
                Contact Information
            </h1>

            {/* Button to create a new contact - hidden if there's only one contact */}
            {contacts.length !== 1 && (
                <button 
                    onClick={CreateContact} 
                    className="mt-6 px-6 py-3 mb-3 bg-orange-500 text-white text-lg font-semibold rounded-lg shadow-md 
                              transition-transform transform hover:scale-105 hover:bg-orange-600"
                >
                    Create New Contact
                </button>
            )}

            {/* Loader */}
            {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-600"></div>
                </div>
            ) : contacts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl">
                    {contacts.map((contact) => (
                        <div key={contact.id} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
                            <div className="text-center mb-6">
                                <img 
                                    src={`https://7starsevents.ae/contactimges/${contact.logo}`}
                                    alt="Contact Logo" 
                                    className="w-24 h-24 object-cover rounded-full mx-auto mb-4 shadow-md"
                                />
                                <h2 className="text-xl font-semibold text-gray-700">
                                    {contact.phone}
                                </h2>
                                <p className="text-gray-500">
                                    {contact.email}
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div className="text-gray-700 font-medium">
                                    <p>Instagram</p>
                                    <a 
                                        href={formatURL(contact.insta)} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-orange-500 hover:underline">
                                        View Profile
                                    </a>
                                </div>
                                <div className="text-gray-700 font-medium">
                                    <p>Tiktok</p>
                                    <a 
                                        href={formatURL(contact.faceboock)} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-orange-500 hover:underline">
                                        View Profile
                                    </a>
                                </div>
                                <div className="text-gray-700 font-medium">
                                    <p>LinkedIn</p>
                                    <a 
                                        href={formatURL(contact.linkedin)} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-orange-500 hover:underline">
                                        View Profile
                                    </a>
                                </div>
                                <div className="text-gray-700 font-medium">
                                    <p>YouTube</p>
                                    <a 
                                        href={formatURL(contact.telegram)} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-orange-500 hover:underline">
                                        View Profile
                                    </a>
                                </div>
                            </div>

                            <div className=' flex justify-between'>
                                {/* Delete button */}
                            <button 
                                onClick={() => handleDelete(contact.id)} 
                                className="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-red-600"
                            >
                                Delete
                            </button>
                            
                            <button 
                                        onClick={() => navigate(`/Admin/ContactUpdate/${contact.id}`)}
                                        className="mt-4 px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-red-600"
                            >
                                Update
                            </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center">
                    <p className="text-gray-500 text-xl italic mb-4">
                        No contact information available yet.
                    </p>
                    <p className="text-gray-400 mb-6">
                        Add a contact to get started 🚀
                    </p>
                </div>
            )}
        </div>
    );
}
