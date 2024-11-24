import React from 'react';
import { useTheme } from './../../../components/ThemeContext.jsx'; 
import bg1 from "./../../../assets/img/about1.png";
import logo from "./../../../assets/img/logonobg.png";
import bg from "../../../assets/img/b2.jpg";
import { useTranslation } from 'react-i18next';


export default function AboutUs() {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    const { t } = useTranslation();

    return (
    <div className="relative min-h-screen">
        <div className="fixed inset-0 z-0">
                <img src={bg} alt="" className="w-full h-full object-cover blur-sm" />
            </div>
        <div className={`relative z-10 min-h-screen pt-16 px-4 items-center flex flex-col ${isDarkMode ? 'transition-all duration-700 bg-customBlack bg-opacity-10' : 'transition-all duration-700  bg-opacity-10'}`}>
            <h1 className="text-4xl font-bold text-orange-400 text-center mb-8">{t('OUR JOURNEY STARTED IN 2008')}</h1>
            <img src={logo} alt="" className='w-full xl:w-2/5 lg:w-2/5 md:w-2/4 sm:w-2/4 mx-auto' />

            <p className="text-2xl text-white leading-relaxed text-center max-w-3xl mb-10">
                {t("Our company started to get very well known in the region and it is competing with other companies. We started doing fixed installation systems besides live events, like audio, lighting systems, and LED screens. The company is growing fast and exponentially. Because of our professionalism and OCD at our work, we built up a very close relationship with our clients.")}
                <br /><br />
                {t("We currently have two warehouses in Dubai and Sharjah, in addition to office spaces in Dubai and Abu Dhabi in TwoFour54. We have added extra services in order to serve our clients with full force and cover all their needs ,from live, studio, and post production.")}
            </p>
            
            <div className="flex flex-col  lg:flex-row gap-8 pb-4 items-center">
                <img src={bg1} alt="About Us 1" className="w-full max-w-lg rounded-lg shadow-lg transition-transform transform hover:scale-105" />
            </div>
        </div>
        <footer className="w-full  py-4 relative z-30  text-white flex flex-col justify-center items-center ">
            <div className="text-center">
                <p className="text-xl ">
                    &copy; {new Date().getFullYear()} | جميع الحقوق محفوظة | All rights reserved
                </p>
                
            </div>
        </footer>
    </div>
    );
}
