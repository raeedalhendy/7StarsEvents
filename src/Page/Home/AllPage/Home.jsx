import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from "./../../../assets/img/logonobg.png";
import { useTheme } from './../../../components/ThemeContext.jsx';
import { useSearch } from './../../../components/SearchContext.jsx';
import "../../../components/i18n.jsx";
import { useTranslation } from 'react-i18next';

export default function Home() {
    const [events, setEvents] = useState([]);
    const [slide, setSlide] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isReversed, setIsReversed] = useState(false);
    const [clients, setClients] = useState([]);
    const [currentClientSlide, setCurrentClientSlide] = useState(0);
    const { theme, toggleTheme } = useTheme();
    const isDarkMode = theme === 'dark';
    const { searchQuery } = useSearch();
    const [filteredData, setFilteredData] = useState([]);
    const { t, i18n } = useTranslation(); // استخدام i18n للترجمة
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('https://7starsevents.ae/api/home', {
            headers: {
                "Accept": "application/json",
            }
        })
        .then(result => {
            setTimeout(() => {
                setIsLoading(false); // إخفاء مؤشر التحميل بعد إتمام البحث
            }, 1000)
            setSlide(result.data[6]);
            setEvents(result.data[0]);
            setFilteredData(result.data[0]);
            setClients(result.data[3]);
        })
        .catch(error => {
        });
    }, [i18n.language]); // تحديث البيانات عند تغيير اللغة

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prevSlide) => {
                if (!isReversed && prevSlide === slide.length - 1) {
                    setIsReversed(true);
                    return prevSlide - 1;
                } else if (isReversed && prevSlide === 0) {
                    setIsReversed(false);
                    return prevSlide + 1;
                } else {
                    return isReversed ? prevSlide - 1 : prevSlide + 1;
                }
            });
        }, 4000);

        return () => clearInterval(slideInterval);
    }, [slide.length, isReversed]);

    useEffect(() => {
        const autoScroll = setInterval(() => {
            setCurrentClientSlide((prevSlide) => (prevSlide + 1) % clients.length);
        }, 2000);

        return () => clearInterval(autoScroll);
    }, [clients.length]);

    useEffect(() => {
        if (searchQuery === "") {
            setFilteredData(events);
        } else {
            const filtered = events.filter(event =>
                event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.locationar.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredData(filtered);
        }
    }, [events, searchQuery]);

    return (
        <div className={`${isDarkMode ? 'bg-black text-white transition-all duration-700' : 'bg-white text-black transition-all duration-700'} w-full`}>
            
            {/* Slider */}
            <div className="relative h-screen overflow-hidden">
                <div className="absolute top-2/4 bottom-2/4 left-0 w-full flex flex-col items-center justify-center z-10 transition-opacity duration-1000 ease-in-out">
                    <img
                        src={logo}
                        alt="Logo"
                        className="mx-auto w-full xl:w-2/5 lg:w-3/5 md:w-3/4 sm:w-full transition-opacity duration-500 ease-in-out"
                        style={{ opacity: isDarkMode ? 0.9 : 1 }}
                    />
                </div>
                {isLoading ? (
                    <div className="flex absolute bottom-0 top-0 left-0 right-0 justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-600"></div>
                    </div>
                ) : (
                    <div
                        className="flex transition-transform duration-700 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {slide.map((slide, index) => (
                            <div
                                key={index}
                                className="w-full flex-shrink-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
                                style={{
                                    backgroundImage: `url(https://7starsevents.ae/sliderimges/${slide.img})`,
                                    height: '100vh',
                                    opacity: isDarkMode ? 0.8 : 1,
                                }}
                            >
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Clients Slider */}
            <div className={`${isDarkMode ? 'bg-customBlack text-orange-400 transition-all duration-700' : 'bg-white text-orange-400 transition-all duration-700'} py-16 text-center`}>
                <h2 className="text-4xl font-bold mb-8 transition-transform transform duration-700 ease-in-out">
                    {t('Our Clients')}
                </h2>
                <div className="overflow-hidden relative">
                    <div
                        className="flex items-center gap-10 transition-transform duration-500 ease"
                        style={{
                            transform: `translateX(-${currentClientSlide * 45}%)`,
                        }}
                    >
                        {clients.map((client, index) => (
                            <div
                                key={`client-${index}`}
                                className={`flex-shrink-0 flex items-center justify-center w-2/4 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/5 shadow-lg rounded-lg p-4 sm:p-6 transition-colors duration-500 ease-in-out ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}
                            >
                                <img
                                    src={`https://7starsevents.ae/clientimges/${client.logo}`}
                                    alt="Client Logo"
                                    className="w-3/4 h-auto object-contain transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                        ))}
                        
                        {clients.map((client, index) => (
                            <div
                                key={`client-${index}`}
                                className={`flex-shrink-0 flex items-center justify-center w-2/4 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/5 shadow-lg rounded-lg p-4 sm:p-6 transition-colors duration-500 ease-in-out ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}
                            >
                                <img
                                    src={`https://7starsevents.ae/clientimges/${client.logo}`}
                                    alt="Client Logo"
                                    className="w-3/4 h-auto object-contain transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                {/* Events Section */}
                <div className={`${isDarkMode ? 'bg-customBlack text-orange-400 transition-all duration-700' : 'bg-white text-orange-400 transition-all duration-700'} py-16 text-left`}>
                    <h2 className="text-4xl font-bold mb-8 transition-transform transform duration-700 ease-in-out text-center">
                        {t('Our projects')}
                    </h2>
                    
                    
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 px-8 pt-4">
                        {filteredData.map((event, index) => (
                            <div
                                key={event.id}
                                className={` relative shadow-lg rounded-lg p-6 transition-colors duration-500 ease-in-out ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}
                            >
                                <div
                                    className="w-full h-96 bg-cover bg-center rounded-t-lg"
                                    style={{ backgroundImage: `url(https://7starsevents.ae/contactimges/${event.event_img})` }}
                                ></div>
                                <div
                                    className="w-20 h-20 top-0 right-0 rounded-full absolute bg-cover"
                                    style={{ backgroundImage: `url(https://7starsevents.ae/clientimges/${event.client.logo})` }}
                                ></div>
                                <h3 className="text-2xl  font-semibold mt-4">{i18n.language === 'en' ? event.name : event.name}</h3>
                                <h3 className="text-2xl font-semibold mt-4">{i18n.language === 'en' ? event.location : event.locationar}</h3>
                            </div>
                        ))}
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

