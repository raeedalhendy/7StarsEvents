import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useTheme } from './../../../components/ThemeContext.jsx';
import logo from "./../../../assets/img/logonobg.png";
import bg from "../../../assets/img/b2.jpg";
import { useSearch } from './../../../components/SearchContext.jsx';
import { useTranslation } from 'react-i18next';

export default function TheTeam() {
    const [teamMembers, setTeamMembers] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    const popupRef = useRef(null);
    const { searchQuery } = useSearch();
    const { t, i18n } = useTranslation(); // إضافة الترجمة
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
            setTeamMembers(result.data[2]);
            setFilteredData(result.data[2]);

        })
        .catch(error => {
        });
    }, []);

    const closePopup = () => {
        setSelectedMember(null);
    };

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            closePopup();
        }
    };

    useEffect(() => {
        if (searchQuery === "") {
            setFilteredData(teamMembers);
        } else {
            const filtered = teamMembers.filter(team =>
                team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                team.namear.toLowerCase().includes(searchQuery.toLowerCase())

            );
            setFilteredData(filtered);
        }
    }, [teamMembers, searchQuery]);

    useEffect(() => {
        if (selectedMember) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectedMember]);

    return (
        <div className="relative min-h-screen">
            {/* صورة الخلفية */}
            <div className="fixed inset-0 z-0">
                <img src={bg} alt="" className="w-full h-full object-cover blur-sm" />
            </div>

            {/* المحتوى الذي سيظهر فوق الخلفية */}
            <div className={`relative z-10 min-h-screen pt-16 px-4 flex flex-col ${isDarkMode ? 'transition-all duration-700 bg-customBlack bg-opacity-10' : 'transition-all duration-700  bg-opacity-10'}`}>
                <h2 className="text-4xl font-bold mb-10 text-center text-orange-400"> {t('The Team')} </h2>
                <img src={logo} alt="" className="w-full xl:w-2/5 lg:w-3/5 md:w-3/4 sm:w-full mx-auto" />
                

                {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-600"></div>
                </div>
            ) : (
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-4">
                    {filteredData.map((team) => (
                        <div 
                            key={team.id} 
                            onClick={() => setSelectedMember(team)}
                            className={`flex flex-col items-center p-6 sm:p-4 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-all duration-300 ${isDarkMode ? 'bg-customBlack' : 'bg-gray-100'}`}
                        >
                            <img 
                                src={`https://7starsevents.ae/teamimges/${team.img_team}`} 
                                alt={team.name} 
                                className="w-36 h-36 sm:w-28 sm:h-28 rounded-full border-4 border-orange-400 mb-4 object-cover shadow-md" 
                            />
                            <h3 className="text-2xl sm:text-xl font-semibold text-orange-400 mb-2">{i18n.language === 'en' ? team.name : team.namear}</h3>


                        </div>
                    ))}
                </div>
            )}
    
                {/* النافذة المنبثقة */}
                {selectedMember && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div 
                            ref={popupRef}
                            className={`relative w-11/12 max-w-md p-8 rounded-lg shadow-lg ${isDarkMode ? 'bg-customBlack text-white' : 'bg-white text-gray-800'}`}
                        >
                            <button 
                                onClick={closePopup} 
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                            <img 
                                src={`https://7starsevents.ae/teamimges/${selectedMember.img_team}`} 
                                alt={selectedMember.name} 
                                className="w-4/5 rounded-xl border-2 border-orange-400 mb-4 mx-auto object-cover shadow-md" 
                            />
                            <h3 className="text-2xl font-semibold text-center text-orange-400 mb-2">
                            {i18n.language === 'en' ? selectedMember.name : selectedMember.namear}  {/* عرض الوصف حسب اللغة */}
                            </h3>
                            <p className="text-center font-medium mb-2">{i18n.language === 'en' ? selectedMember.details : selectedMember.detailsar} </p>
                            <p className="text-sm text-center">{i18n.language === 'en' ? selectedMember.dec : selectedMember.decar}</p>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
