import { useNavigate } from 'react-router';
import logo from "./../assets/img/logof.jpg";
import { useState } from 'react';
import axios from 'axios';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
    const navigate = useNavigate();
    const ChangUrlSignUp = () => {
        navigate("/LogIn");
    };
    
    const [userData, setuserData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    });
    
    const handelSupmit = (e) => {
        e.preventDefault();
        
        console.log(userData);
        
        axios.post('https://7starsevents.ae/api/register', userData, {
            headers: {
                "Accept": "application/json",
                "Content-Type" : "multipart/form-data"
            }
        })
        .then(result => {
            localStorage.setItem('token', result.data.token);
            toast.success("Registered Successfully! ,Please wait for admin approval",{
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
            }, 4000); 
        })
        .catch(err => {
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
        <div className="flex items-center justify-center min-h-screen bg-customBlack">
            <div className="w-full sm:w-3/4 md:w-3/4 lg:w-3/4 h-auto p-6 shadow-lg shadow-black">
                <form onSubmit={handelSupmit} className="flex flex-col items-center gap-6">
                    <div className="text-center">
                        <img className="h-40 sm:h-48 md:h-64 w-auto" src={logo} alt="Logo" />
                    </div>
                    <div>
                        <h1 className="text-orange-400 text-xl sm:text-2xl md:text-3xl">Sign Up</h1>
                    </div>
                    <div className="flex flex-col gap-5 w-3/4">
                        <div className='flex gap-6 flex-col md:flex-row'>
                            <div className="flex items-center w-full gap-3">
                                <h1 className="text-orange-400 text-xl"><i className="fa-solid fa-user"></i></h1>
                                <input onChange={(e) => setuserData({...userData, name: e.target.value})} className="h-10 w-full rounded-lg px-4" type="text" placeholder="Enter Your Username" />
                            </div>
                            <div className="flex items-center w-full gap-3">
                                <h1 className="text-orange-400 text-xl"><i className="fa-solid fa-envelope"></i></h1>
                                <input onChange={(e) => setuserData({...userData, email: e.target.value})} className="h-10 w-full rounded-lg px-4" type="email" placeholder="Enter Your Email" />
                            </div>
                        </div>
                        <div className='flex gap-6 flex-col md:flex-row'>
                            <div className="flex items-center w-full gap-3">
                                <h1 className="text-orange-400 text-xl"><i className="fa-solid fa-lock"></i></h1>
                                <input onChange={(e) => setuserData({...userData, password: e.target.value})} className="h-10 w-full rounded-lg px-4" type="password" placeholder="Enter Your Password" />
                            </div>
                            <div className="flex items-center w-full gap-3">
                                <h1 className="text-orange-400 text-xl"><i className="fa-solid fa-lock"></i></h1>
                                <input onChange={(e) => setuserData({...userData, password_confirmation: e.target.value})} className="h-10 w-full rounded-lg px-4" type="password" placeholder="Confirm Your Password" />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button type='submit' className="text-white h-12 w-32 bg-orange-400 rounded-xl">Sign Up</button>
                        </div>
                        <div className="flex justify-center">
                            <h1 className="text-white text-sm sm:text-base">
                                Already have an account?
                                <button onClick={ChangUrlSignUp} className="text-orange-400 ml-2 underline">Sign In</button>
                            </h1>
                        </div>
                    </div>
                    
                </form>
            </div>
        </div>
    );
}