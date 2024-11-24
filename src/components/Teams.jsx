import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Teams() {
    const navigate = useNavigate();
    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false);
    const [teamToDelete, setTeamToDelete] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get('https://7starsevents.ae/api/team', {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(result => {
            const teamsData = result.data[0];
            setTeams(teamsData);
            setIsLoading(false);
        })
        .catch(error => {
            setIsLoading(false);
        });
    }, []);

    function confirmDelete(id) {
        setTeamToDelete(id);
        setShowConfirm(true);
    }

    function DeleteItem() {
        const token = localStorage.getItem("token");

        axios.delete(`https://7starsevents.ae/api/team/${teamToDelete}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
        .then(() => {
            setTeams(prevTeams => prevTeams.filter(team => team.id !== teamToDelete));
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
        <div className="flex flex-col w-full items-center justify-center min-h-screen p-4 sm:p-8 lg:p-16 bg-gray-50">
            <div className="flex flex-col sm:flex-row sm:justify-between w-full items-center mb-6">
                <h1 className="text-4xl font-bold text-gray-800">Teams</h1>
                <button 
                    onClick={() => navigate('/Admin/CreateTeam')} 
                    className="mt-4 sm:mt-0 px-6 py-2 bg-orange-600 text-white text-base font-semibold rounded-lg shadow hover:bg-orange-700 transition duration-200"
                >
                    Create Team
                </button>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-600"></div>
                </div>
            ) : (
                teams.length === 0 ? (
                    <div className="text-center">
                        <p className="text-gray-500 text-lg italic mb-2">
                            No teams here yet... but stay tuned!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full">
                        {teams.map((team) => (
                            <div key={team.id} className="bg-white flex flex-col gap-3 p-6 rounded-lg shadow-lg transition hover:shadow-orange-900 hover:shadow-2xl">
                                <img 
                                    className="w-full min-h-72 object-cover rounded-lg"
                                    src={`https://7starsevents.ae/teamimges/${team.img_team}`}
                                    alt={team.name}
                                />
                                <h2 className="text-xl font-semibold text-gray-900">{team.name}</h2>
                                <p className="text-gray-600">{team.details}</p>
                                <p className="text-gray-600">{team.dec}</p>

                                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                                    <button 
                                        onClick={() => navigate(`/Admin/Team/${team.id}`)}
                                        className="flex-1 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition duration-200"
                                    >
                                        View Details
                                    </button>
                                    <button 
                                        onClick={() => confirmDelete(team.id)}  
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
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
                        <p>Are you sure you want to delete this team?</p>
                        <div className="flex justify-end mt-6">
                            <button 
                                onClick={() => setShowConfirm(false)}
                                className="mr-4 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-200"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={DeleteItem}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
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
