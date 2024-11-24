import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'; // إذا كنت تستخدم react-select
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateEvent() {
  const [event, setEvent] = useState({
    name: '',
    event_cost: '',
    location: '',
    locationar: '',
    client_id: '',
    event_img: ''
  });
  const [clients, setClients] = useState([]); // لتخزين قائمة العملاء
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get('https://7starsevents.ae/api/client', {
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    .then(response => {
      setClients(response.data[0]);
    })
    .catch(error => console.error('Error fetching clients:', error));
  }, []);
  

  function handleSubmit(e) {
    e.preventDefault();
    setShowConfirm(true);
  }

  function confirmCreate() {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append('name', event.name);
    formData.append('event_cost', event.event_cost);
    formData.append('location', event.location);
    formData.append('locationar', event.locationar);
    formData.append('client_id', event.client_id);
    formData.append('event_img', event.event_img);

    axios.post('https://7starsevents.ae/api/event', formData, {
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    .then(result => {
      setShowConfirm(false);
      toast.success("Created Successfuly", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
      setEvent({ name: '', event_cost: '', location: '', client_id: '', event_img: '' });
      setTimeout(() => {
        navigate("/Admin/Events");
      }, 2000);
    })
    .catch(error => {
      setShowConfirm(false);
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
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-700 mb-6 sm:mb-8">
        Create a New Event
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-customBlack p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
        
        {/* رفع صورة الحدث */}
        <label className="text-white font-medium">
          Upload Event Image
          <input 
            type="file" 
            onChange={(e) => setEvent({...event, event_img: e.target.files[0]})}
            className="mt-2 block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-customBlack hover:file:orange-blue-100"
          />
        </label>

        {/* اسم الحدث */}
        <label className="text-white font-medium">
          Event Name
          <input 
            type="text" 
            placeholder="Enter Event name" 
            value={event.name}
            onChange={(e) => setEvent({...event, name: e.target.value})}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </label>
        <label className="text-white font-medium  ">
          Client
          <Select
            options={clients.map(client => ({ label: client.name, value: client.id }))}
            onChange={(option) => setEvent({...event, client_id: option.value})}
            placeholder="Select Client"
            className="mt-2 text-customBlack "
          />
        </label>

        {/* تكلفة الحدث */}
        <label className="text-white font-medium">
          Event Cost
          <input 
            type="number" 
            placeholder="Enter Event Cost" 
            value={event.event_cost}
            onChange={(e) => setEvent({...event, event_cost: e.target.value})}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </label>

        {/* موقع الحدث */}
        <label className="text-white font-medium">
          Location
          <input 
            type="text" 
            placeholder="Enter Location" 
            value={event.location}
            onChange={(e) => setEvent({...event, location: e.target.value})}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </label>
        {/* موقع الحدث */}
        <label className="text-white font-medium">
          Location In Arabic
          <input 
            type="text" 
            placeholder="Enter Location In Arabic" 
            value={event.locationar}
            onChange={(e) => setEvent({...event, locationar: e.target.value})}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </label>

        {/* معرف العميل باستخدام react-select */}
        

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
            <p>Are you sure you want to create this event?</p>
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
