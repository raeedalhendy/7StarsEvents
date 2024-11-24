import { useNavigate } from "react-router-dom";
import logo from "./../assets/img/logof.jpg";
import { useState } from "react";
import axios from "axios";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function LogIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const ChangUrlSignUp = () => {
        navigate("/SignUp");
    };
    
    

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        
        axios.post('https://7starsevents.ae/api/login', {
            email: email,
            password: password
        }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "multipart/form-data"
            }
        })
        .then((result) => {
            localStorage.setItem('token', result.data.token);
            localStorage.setItem('is_admin', result.data.is_admin);
            localStorage.setItem('mine_admin', result.data.mine_admin);

            toast.success("Log In Successfully!", {
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
                navigate("/Admin");
            }, 2000); // الانتقال بعد 2 ثانية
        })
        .catch((err) => {
            toast.error("Invalid email or password!", {
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
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-customBlack">
            <form onSubmit={handleSubmit} className="w-full sm:w-3/4 md:w-2/4 lg:w-2/3 h-auto p-6 shadow-lg shadow-black">
                <div className="flex flex-col items-center gap-6">
                    <div className="text-center">
                        <img className="h-40 sm:h-48 md:h-64 w-auto" src={logo} alt="Logo" />
                    </div>
                    <div>
                        <h1 className="text-orange-400 text-xl sm:text-2xl md:text-3xl">Sign In</h1>
                    </div>
                    <div className="flex flex-col gap-5 w-3/4">
                        <div className="flex items-center gap-3">
                            <h1 className="text-orange-400 text-xl"><i className="fa-solid fa-user"></i></h1>
                            <input onChange={handleEmail} value={email} className="h-10 w-full rounded-lg px-4" type="email" placeholder="Enter Your Email" />
                        </div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-orange-400 text-xl"><i className="fa-solid fa-lock"></i></h1>
                            <input onChange={handlePassword} value={password} className="h-10 w-full rounded-lg px-4" type="password" placeholder="Enter Your Password" />
                        </div>
                        <div className="flex ml-4 justify-center">
                            <button type="submit" value='Login' className="text-white h-12 w-32 bg-orange-400 rounded-xl">Sign In</button>
                        </div>
                        <div className="flex justify-center w-full">
                            <h1 className="text-white text-sm sm:text-base">
                                Don’t have an account?
                                <button onClick={ChangUrlSignUp} className="text-orange-400 ml-2 underline">Create Account</button>
                            </h1>
                        </div>
                    </div>
                </div>
                
            </form>
        </div>
    );
}
