import React from 'react';
import { useNavigate } from 'react-router-dom';
import bg from "../assets/img/b2.jpg";

export default function NotFoundPage() {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-cover bg-center text-white relative"
            style={{
                backgroundImage: `url(${bg})`,
            }}
        >
            <div className="text-center space-y-6 bg-black/60 p-8 rounded-lg shadow-lg">
                <h1 className="text-6xl sm:text-8xl font-extrabold text-orange-400">
                    404
                </h1>
                <p className="text-2xl sm:text-3xl flex items-center justify-center space-x-3">
                    <span>Oops!</span>
                    <span role="img" aria-label="Sad face" className="text-5xl">
                        😢
                    </span>
                </p>
                <p className="text-lg sm:text-xl text-gray-300">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <button
                    onClick={goToHome}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-medium transition-all duration-200 shadow-md"
                >
                    Go to Home
                </button>
            </div>
        </div>
    );
}
