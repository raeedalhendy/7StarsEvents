    import React, { useEffect, useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import axios from 'axios';
    import { toast } from 'react-toastify';

    export default function Slider() {
    const [sliders, setSliders] = useState([]); // لتخزين الصور
    const [loading, setLoading] = useState(true); // للتحكم بمؤشر التحميل
    const navigate = useNavigate();

    // جلب بيانات الصور عند تحميل الصفحة
    useEffect(() => {
        const token = localStorage.getItem('token');
        axios
        .get('https://7starsevents.ae/api/slider', {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        })
        .then((response) => {
            setSliders(response.data[0]); // تخزين الصور
            setLoading(false); // إيقاف التحميل
        })
        .catch((error) => {
            console.error('Error fetching sliders:', error);
            toast.error('Failed to fetch sliders');
            setLoading(false);
        });
    }, []);

    // دالة حذف صورة
    const deleteSlider = (id) => {
        const token = localStorage.getItem('token');
        axios.delete(`https://7starsevents.ae/api/slider/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
        .then(() => {
            setSliders(sliders.filter(slider => slider.id !== id));
            toast.success('Slider deleted successfully');
        })
        .catch((error) => {
            console.error('Error deleting slider:', error);
            toast.error('Failed to delete slider');
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-700 mb-6 sm:mb-8">
            Sliders
        </h2>

        {/* زر إضافة سلايدر جديد */}
        <button
            onClick={() => navigate('/Admin/CreateSlider')}
            className="mb-6 px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-300"
        >
            Add New Slider
        </button>

        {/* عرض الصور */}
        {loading ? (
            <p>Loading sliders...</p>
        ) : sliders.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sliders.map((slider) => (
                <div
                key={slider.id}
                className="relative bg-gray-100 rounded-lg shadow-lg p-4"
                >
                <img
                    src={`https://7starsevents.ae/sliderimges/${slider.img}`} // رابط الصورة
                    alt="Slider"
                    className="w-full h-48 object-cover rounded"
                />
                <div className="flex justify-between mt-4">
                    {/* زر تعديل */}
                    <button
                    onClick={() => navigate(`/Admin/EditSlider/${slider.id}`)}
                    className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition duration-300"
                    >
                    Edit
                    </button>

                    {/* زر حذف */}
                    <button
                    onClick={() => deleteSlider(slider.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                    >
                    Delete
                    </button>
                </div>
                </div>
            ))}
            </div>
        ) : (
            <p>No sliders available</p>
        )}
        </div>
    );
    }
