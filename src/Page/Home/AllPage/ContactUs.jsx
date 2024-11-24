    import axios from 'axios';
    import React, { useEffect, useState } from 'react';
    import { useTheme } from './../../../components/ThemeContext.jsx';
    import logo from "./../../../assets/img/logonobg.png";
    import bg from "../../../assets/img/b2.jpg";
import { useTranslation } from 'react-i18next';

    export default function ContactUs() {
    const [contacts, setContacts] = useState([]);
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    const { t } = useTranslation();

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get('https://7starsevents.ae/api/home', {
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
        })
        .then(result => {
        setContacts(result.data[1]);
        })
        .catch(error => {
        });
    }, []);

    return (
        <div className="relative min-h-screen">
            <div className="fixed inset-0 z-0">
                <img src={bg} alt="" className="w-full h-full object-cover blur-sm" />
            </div>

        <div className={`relative z-10 min-h-screen pt-16 px-4 flex flex-col ${isDarkMode ? 'transition-all duration-700 bg-customBlack bg-opacity-10' : 'transition-all duration-700 bg-opacity-10'}`}>
        <div className="text-center py-6 px-4">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-orange-500">{t("Contact Us")}</h2>
            <p className="text-lg sm:text-xl mt-2 sm:mt-4 text-gray-400">{t("We'd love to hear from you!")}</p>
        </div>
        <img src={logo} alt="" className='w-full xl:w-2/5 lg:w-3/5 md:w-3/4 sm:w-full  mx-auto' />

        {contacts.length > 0 ? (
            <div className="flex justify-center px-4">
            <div className="max-w-4xl w-full p-4 sm:p-8">
                {contacts.map(contact => (
                    <div 
                    key={contact.id} 
                    className={`flex flex-col items-center p-4 sm:p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 ${isDarkMode ? 'bg-customBlack' : 'bg-white'} mb-4 sm:mb-8`}
                    >
                    <div 
                    />

                    <div className="space-y-2 mb-6 sm:mb-6">
                    <a href={`mailto:${contact.email}`} className="text-md sm:text-2xl text-orange-400 hover:text-orange-600 flex items-center py-4">
                        <span className="">📧</span>
                        <span className="break-all">{contact.email}</span>
                    </a>
                    <a href={`tel:${contact.phone}`} className="text-md sm:text-2xl text-orange-400 hover:text-orange-600">
                        <span className='flex items-center'>
                        <span className=''>📞</span>{contact.phone}
                        </span>
                    </a>
                    </div>

                    <div className="flex space-x-4 sm:space-x-6 mt-4 sm:mt-6">
                    {contact.linkedin && (
                        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-3xl sm:text-4xl text-orange-400 hover:text-orange-500">
                        <i className="fab fa-linkedin"></i>
                        </a>
                    )}
                    {contact.insta && (
                        <a href={contact.insta} target="_blank" rel="noopener noreferrer" className="text-3xl sm:text-4xl text-orange-400 hover:text-orange-500">
                        <i className="fab fa-instagram"></i>
                        </a>
                    )}
                    {contact.faceboock && (
                        <a href={contact.faceboock} target="_blank" rel="noopener noreferrer" className="text-3xl sm:text-4xl text-orange-400 hover:text-orange-500">
                        <i className="fab fa-tiktok"></i>
                        </a>
                    )}
                    {contact.telegram && (
                        <a href={contact.telegram} target="_blank" rel="noopener noreferrer" className="text-3xl sm:text-4xl text-orange-400 hover:text-orange-500">
                        <i className="fab fa-youtube"></i>
                        </a>
                    )}
                    </div>
                </div>
                ))}
            </div>
            </div>
        ) : (
            <div className="text-center mt-10 text-lg sm:text-xl text-gray-400">
            No contacts available at the moment.
            </div>
        )}

        {/* Adding Google Maps iframe */}
        <div className="py-8 px-4">
            <h3 className="text-2xl sm:text-3xl text-center text-orange-500 mb-4 sm:mb-6">{t("Find Us on the Map")}</h3>
            <div className="flex justify-center">
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1803.9578947280947!2d55.34777936140975!3d25.27341809441551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5cede8d4b4b9%3A0x2cc48d5963271dbb!2s7%20Stars%20Events!5e0!3m2!1sar!2sfr!4v1731195828208!5m2!1sar!2sfr"            
                width="100%" 
                height="500" 
                className="rounded-lg shadow-md sm:w-3/4 lg:w-1/2" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
            ></iframe>
            </div>
        </div>
        </div>
        </div>
    );
    }
