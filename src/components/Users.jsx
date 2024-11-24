import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get('https://7starsevents.ae/api/user', {
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(result => {
        setUsers(result.data[0]);
        setLoading(false);
      })
      .catch(error => {
        setError("Error fetching users data");
        setLoading(false);
      });
  }, []);

  const handleAdminToggle = (id, field) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === id ? { ...user, [field]: !user[field] } : user
      )
    );
  };

  const handleSave = (user) => {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("is_admin", user.is_admin ? 1 : 0);
    formData.append("mine_admin", user.mine_admin ? 1 : 0);
    formData.append("_method", "PUT");

    axios.post(`https://7starsevents.ae/api/user/${user.id}`, formData, {
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    })
      .then(response => {
        toast.success("User Updated!", {
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
        setError("Failed to update user data.");
      });
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");

    axios.delete(`https://7starsevents.ae/api/user/${id}`, {
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => {
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
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
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
        setError("Failed to delete user.");
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-600"></div>
      </div>
    );
  }

  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col  items-center justify-center px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-black mb-4">User Management</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl text-white ">
        {users.map(user => (
          <div key={user.id} className="border rounded-lg p-4 shadow-md flex flex-col bg-gray-800">
            <span className="font-semibold text-orange-400">{user.email}</span>

            {/* Checkbox for is_admin */}
            <label className="flex items-center mt-2 text-white">
              <input
                type="checkbox"
                checked={user.is_admin}
                onChange={() => handleAdminToggle(user.id, 'is_admin')}
                className="mr-2 appearance-none h-5 w-5 border border-gray-300 rounded-sm checked:bg-orange-500 checked:border-transparent focus:outline-none"
              />
              <span>Admin</span>
            </label>

            {/* Checkbox for mine_admin */}
            <label className="flex items-center mt-2 text-white">
              <input
                type="checkbox"
                checked={user.mine_admin}
                onChange={() => handleAdminToggle(user.id, 'mine_admin')}
                className="mr-2 appearance-none h-5 w-5 border border-gray-300 rounded-sm checked:bg-orange-500 checked:border-transparent focus:outline-none"
              />
              <span>Mini Admin</span>
            </label>

            <div className="flex mt-4 space-x-2">
              <button
                onClick={() => handleSave(user)}
                className="bg-orange-500 text-white p-2 rounded hover:bg-orange-600 transition-transform transform hover:scale-105"
              >
                Save
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-transform transform hover:scale-105"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
