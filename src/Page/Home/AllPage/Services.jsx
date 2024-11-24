import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from "./../../../assets/img/logonobg.png";
import { useTheme } from './../../../components/ThemeContext.jsx'; 
import bg from "../../../assets/img/b2.jpg";
import { useSearch } from './../../../components/SearchContext.jsx';
import { useTranslation } from 'react-i18next';

export default function Services() {
    const { searchQuery } = useSearch();
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    const { t, i18n } = useTranslation(); // إضافة الترجمة
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        axios.get('https://7starsevents.ae/api/home')
            .then(response => {
                setTimeout(() => {
                    setIsLoading(false); // إخفاء مؤشر التحميل بعد إتمام البحث
                }, 1000)
                setServices(response.data[4]);
                setFilteredServices(response.data[4]);
            })
            .catch(error => {
            });
    }, []);

    useEffect(() => {
        if (searchQuery === "") {
            setFilteredServices(services);
        } else {
            const filtered = services.filter(service =>
                service.dec.toLowerCase().includes(searchQuery.toLowerCase()) ||
                service.titel.toLowerCase().includes(searchQuery.toLowerCase()) ||
                service.decar.toLowerCase().includes(searchQuery.toLowerCase()) ||
                service.titelar.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredServices(filtered);
        }
    }, [services, searchQuery]);

    return (
        <div className="relative min-h-screen">
            <div className="fixed inset-0 z-0">
                <img src={bg} alt="" className="w-full h-full object-cover blur-sm" />
            </div>
            <div className={`pt-16 relative z-10 min-h-screen ${isDarkMode ? 'bg-customBlack bg-opacity-10 text-white' : 'bg-white bg-opacity-10 text-gray-800'} transition-all duration-700`}>
                <div className="container mx-auto px-4 ">
                    <h2 className="text-4xl font-bold mb-10 text-center text-orange-400">{t('Our Services')}</h2>
                    <div className="flex justify-between items-center ">
                        <img src={logo} alt="Logo" className="w-full xl:w-2/5 lg:w-3/5 md:w-3/4 sm:w-full mx-auto" />
                    </div>

                    {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-600"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8 pt-8 pb-8">
                        {
                            filteredServices.map(service => (
                                <div 
                                    key={service.id} 
                                    className={`${isDarkMode ? 'bg-customBlack' : 'bg-white'} shadow-lg rounded-lg overflow-hidden transform hover:scale-95 transition duration-300`}
                                >
                                    <h3 className={`p-4 text-center ${isDarkMode ? 'text-orange-400' : ''} text-xl font-semibold`}>
                                        {i18n.language === 'en' ? service.titel : service.titelar}  {/* عرض العنوان حسب اللغة */}
                                    </h3>
                                    <img 
                                        src={`https://7starsevents.ae/servimges/${service.img_ser}`} 
                                        alt={service.titel} 
                                        className="w-full h-56 object-cover"
                                    />
                                    <div className="p-4">
                                        <p className="text-lg">
                                            {i18n.language === 'en' ? service.dec : service.decar}  {/* عرض الوصف حسب اللغة */}
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
            )}
                </div>
            </div>
        </div>
    );
}