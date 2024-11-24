import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Event() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get('https://7starsevents.ae/api/event', {
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    .then(result => {
      setEvents(result.data[0]);
      setIsLoading(false);
    })
    .catch(error => {
      setIsLoading(false);
    });
  }, []);

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    axios.delete(`https://7starsevents.ae/api/event/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(() => {
      setEvents(events.filter(event => event.id !== id));
      toast.success("Deleted Successfuly", {
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
      toast.error("Sometihng Wrong", {
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

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 p-4 sm:p-6 min-h-screen">
      <div className="flex flex-col sm:flex-row gap-4 justify-between w-full items-center mb-6">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 text-center sm:text-left">Events</h1>
        <button 
          onClick={() => navigate('/Admin/CreateEvent')} 
          className="px-4 py-2 sm:px-6 sm:py-2 bg-orange-600 text-white text-sm sm:text-base font-semibold rounded-lg shadow hover:bg-orange-700 transition duration-200"
        >
          Create Event
        </button>
      </div>

      {/* Loader */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-16 sm:w-16 border-t-4 border-orange-600"></div>
        </div>
      ) : events.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full">
          {events.map(event => (
            <div key={event.id} className="bg-white shadow-lg rounded-lg p-4 sm:p-6 mb-4 sm:mb-8 w-full max-w-xs sm:max-w-lg mx-auto">
              <div className="text-center mb-4 sm:mb-6">
                <img 
                  src={`https://7starsevents.ae/contactimges/${event.event_img}`} 
                  alt="Event Logo" 
                  className="w-full h-40 sm:h-48 object-cover rounded-lg mb-3 shadow-md"
                />
                <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
                  {event.name}
                </h2>
                <p className="text-gray-500 text-sm sm:text-base">
                  {event.date} - {event.location}
                </p>
              </div>

              <p className="text-gray-700 text-sm sm:text-base mt-2 sm:mt-4">{event.description}</p>

              <div className="flex flex-col sm:flex-row justify-end mt-4 sm:mt-6 space-y-2 sm:space-y-0 sm:space-x-2">
                <button 
                  onClick={() => navigate(`/Admin/Event/${event.id}`)}
                  className="px-3 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-600 transition duration-200"
                >
                  Edit Event
                </button>
                <button 
                  onClick={() => handleDelete(event.id)}
                  className="px-3 py-2 bg-red-500 text-white text-sm font-medium rounded-lg shadow hover:bg-red-600 transition duration-200"
                >
                  Delete Event
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-4">
          <p className="text-gray-500 text-lg sm:text-xl italic mb-2 sm:mb-4">
            No events available yet.
          </p>
          <p className="text-gray-400 text-sm sm:text-base mb-4">
            Add an event to get started 🚀
          </p>
        </div>
      )}
    </div>
  );
}
