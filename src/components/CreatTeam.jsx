import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function CreatTeam() {
    const [Team, setTeam] = useState({
        name: '',
        details: '',
        dec : "",
        namear: '',
        detailsar: '',
        decar : "",
        img: ""
    });
    const [showConfirm, setShowConfirm] = useState(false); // لإظهار نافذة التأكيد
    const navigate = useNavigate();

    // دالة إظهار نافذة التأكيد
    function handleSubmit(e) {
        e.preventDefault();
        setShowConfirm(true); // إظهار نافذة التأكيد
    }

    // دالة تأكيد الإنشاء
    function confirmCreate() {
        const token = localStorage.getItem("token");

        const formData = new FormData();
        formData.append('name', Team.name);
        formData.append('namear', Team.namear);
        formData.append('details', Team.details);
        formData.append('detailsar', Team.detailsar);
        formData.append('dec', Team.dec);
        formData.append('decar', Team.decar);

        formData.append('img', Team.img);     
        
        axios.post('https://7starsevents.ae/api/team', formData, {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(result => {
            setShowConfirm(false); // إخفاء نافذة التأكيد
            toast.success("Craeted Successfully!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setTeam({ name: '', details: '', dec: "", img: ""  , namear :'' , detailsar : "" , decar :''}); // إعادة تعيين الحقول
            setTimeout(() => {
                navigate("/Admin/Teams"); // إعادة التوجيه بعد فترة قصيرة
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
            setShowConfirm(false);
        });
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-700 mb-6 sm:mb-8">
                Create a New Employee
            </h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-customBlack p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
                
                {/* رفع صورة الموظف */}
                <label className="text-white font-medium">
                    Upload Employee Photo
                    <input 
                        type="file" 
                        onChange={(e) => setTeam({...Team, img: e.target.files[0]})}
                        className="mt-2 block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-customBlack hover:file:bg-blue-100"
                    />
                </label>

                <label className="text-white font-medium">
                    Employee Name
                    <input 
                        type="text" 
                        placeholder="Enter Employee name" 
                        value={Team.name}
                        onChange={(e) => setTeam({...Team, name: e.target.value})}
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </label>
                
                {/* اسم الموظف */}
                <label className="text-white font-medium">
                    Employee Name Arabic
                    <input 
                        type="text" 
                        placeholder="Enter Employee name arabic" 
                        value={Team.namear}
                        onChange={(e) => setTeam({...Team, namear: e.target.value})}
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </label>
                
                {/* معلومات الموظف */}
                <label className="text-white font-medium">
                    Employee Job Title 
                    <input 
                        type="text" 
                        placeholder="Enter Employee Job Title  " 
                        value={Team.dec}
                        onChange={(e) => setTeam({...Team, dec: e.target.value})}
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </label>

                <label className="text-white font-medium">
                    Employee Job Title Arabic
                    <input 
                        type="text" 
                        placeholder="Enter Employee Title Arabic" 
                        value={Team.decar}
                        onChange={(e) => setTeam({...Team, decar: e.target.value})}
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </label>
                {/* معلومات الموظف */}
                <label className="text-white font-medium">
                    Employee Info
                    <input 
                        type="text" 
                        placeholder="Enter Employee Info" 
                        value={Team.details}
                        onChange={(e) => setTeam({...Team, details: e.target.value})}
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </label>
                <label className="text-white font-medium">
                    Employee Info Arabic
                    <input 
                        type="text" 
                        placeholder="Enter Employee Info Arabic " 
                        value={Team.detailsar}
                        onChange={(e) => setTeam({...Team, detailsar: e.target.value})}
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </label>
                
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
                        <p>Are you sure you want to create this from team?</p>
                        <div className="flex justify-end mt-6">
                            <button 
                                onClick={() => setShowConfirm(false)}
                                className="mr-4 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-200"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={confirmCreate} // استدعاء دالة التأكيد
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
