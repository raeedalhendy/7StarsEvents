import React, { useEffect, useState, useRef } from 'react';
import { MdSearch, MdDarkMode, MdLightMode, MdMenu, MdEmail, MdClose } from 'react-icons/md';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from './../../../components/ThemeContext';
import { useSearch } from './../../../components/SearchContext';  
import './../../../components/i18n';  // التأكد من استيراد ملف الترجمة
import { useTranslation } from 'react-i18next';

export default function AllPage() {
    const navigate = useNavigate();

    const { t, i18n } = useTranslation();  // الترجمة و تغيير اللغة
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const menuRef = useRef(null);
    const { theme, toggleTheme } = useTheme();
    const isDarkMode = theme === 'dark';
    const location = useLocation();
    const { searchQuery, setSearchQuery } = useSearch();
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const [isLoading, setIsLoading] = useState(false);
    
    
    const toggleContactPopup = () => {
        navigate("/ContactUs")
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target) && isMenuOpen) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]);

    const isActive = (path) => location.pathname === path;

    
    
    const handleLanguageToggle = () => {
        const newLang = i18n.language === 'en' ? 'ar' : 'en';  // التبديل بين الإنجليزية والعربية
        setIsLoading(true); // تفعيل مؤشر التحميل عند البحث
        i18n.changeLanguage(newLang);
        // يمكنك هنا وضع أي منطق لجلب البيانات إذا كنت تستخدم API.
        setTimeout(() => {
            setIsLoading(false); // إخفاء مؤشر التحميل بعد إتمام البحث
        }, 1000);
    };

    const getPlaceholderText = () => {
        if (location.pathname === '/Services') return 'Search in Services';
        if (location.pathname === '/TheTeam') return 'Search in Team';
        if (location.pathname === '/') return 'Search in Events Locations';
        return 'Search';
    };
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setIsLoading(true); // تفعيل مؤشر التحميل عند البحث
        // يمكنك هنا وضع أي منطق لجلب البيانات إذا كنت تستخدم API.
        setTimeout(() => {
            setIsLoading(false); // إخفاء مؤشر التحميل بعد إتمام البحث
        }, 2000); // محاكاة وقت تحميل
    };


    // تحقق من الصفحة لعرض البحث فقط في Home, Services, وThe Team
    const showSearchInput = ['/', '/Services', '/TheTeam'].includes(location.pathname);

    return (
        <div className={isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}>
            <nav className={`flex items-center justify-end h-16 z-50 lg:justify-between fixed w-full px-4 py-10 ${isDarkMode ? 'bg-transparent text-orange-400' : 'bg-transparent text-orange-400'}`}>
                <ul className={`hidden text-xl lg:flex gap-4 ${isDarkMode ? 'text-orange-400' : 'text-orange-400'}`}>
                    {[
                        { path: "/", label: t("Home") },
                        { path: "/Services", label: t("Services") },
                        { path: "/TheTeam", label: t("The Team") },
                        { path: "/AboutUs", label: t("About Us") },
                        { path: "/ContactUs", label: t("Contact Us") },
                    ].map(({ path, label }) => (
                        <li key={path} className="relative">
                            <Link
                                to={path}
                                className={`hover:text-orange-500 px-2 transition-all duration-500 ${
                                    isActive(path) ? 'border-b-2 border-orange-500' : ''
                                }`}
                            >
                                {label}
                            </Link>
                            {isActive(path) && (
                                <span
                                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-orange-400 transition-width duration-500 ease-in-out"
                                    style={{ width: '100%' }}
                                />
                            )}
                        </li>
                    ))}
                </ul>
                <div className="flex items-center gap-4">
                    {showSearchInput && (
                        <div className="relative hidden md:block">
                            <input
                                placeholder={getPlaceholderText()}
                                value={searchQuery}  
                                onChange={handleSearch}  
                                type="text"  className={`px-10 py-1 rounded-full ${isDarkMode ? 'transition-all duration-700 bg-customBlack text-white' : 'transition-all duration-700 bg-white text-customBlack'}`} 
                            />
                            <MdSearch className={`absolute right-3 top-1 ${isDarkMode ? 'text-orange-400' : 'text-orange-500'}`} size="1.5em" />
                        </div>
                    )}
                    <button onClick={handleLanguageToggle} className="text-xl text-orange-500">
                        {i18n.language === 'en' ? 'AR' : 'EN'}
                    </button>
                    <button onClick={toggleTheme} className="transition-transform transform hover:scale-110">
                        {isDarkMode ? <MdLightMode size="3.5em" className="text-orange-400" /> : <MdDarkMode size="3.5em" className="text-orange-500" />}
                    </button>
                    <button onClick={toggleMenu} className="lg:hidden text-5xl">
                        <MdMenu className={isDarkMode ? 'text-orange-400' : 'text-orange-500'} />
                    </button>
                </div>
                <div 
                    ref={menuRef} 
                    className={`lg:hidden fixed z-50 top-0 left-0 h-screen w-3/4 ${isDarkMode ? 'bg-customBlack text-orange-400' : 'bg-white text-orange-500'} transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
                >
                    <ul className="flex flex-col gap-6 mt-10 px-10">
                        <div className="relative">
                            <input
                            placeholder={getPlaceholderText()}
                            value={searchQuery}  
                            onChange={handleSearch}  
                            type="text"className={`px-4 w-full py-1 rounded-full ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`} />
                            <MdSearch className={`absolute right-3 top-0 ${isDarkMode ? 'text-orange-400' : 'text-orange-500'}`} size="2em" />
                        </div>
                        {[
                            { path: "/", label: t("Home") },
                            { path: "/Services", label: t("Services") },
                            { path: "/TheTeam", label: t("The Team" )},
                            { path: "/AboutUs", label: t("About Us") },
                            { path: "/ContactUs", label: t("Contact Us") },
                        ].map(({ path, label }) => (
                            <li key={path}>
                                <Link to={path} className={`hover:text-orange-500 text-xl ${isActive(path) ? 'border-b-2 border-orange-500' : ''}`} onClick={toggleMenu}>
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            {/* Floating Contact Icon */}
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={toggleContactPopup}
                    className={`p-4 rounded-full shadow-lg hover:scale-105 transition-transform ${
                        isDarkMode ? 'bg-orange-400 text-black' : 'bg-orange-500 text-white'
                    }`}
                >
                    <MdEmail size="2em" />
                </button>
            </div>

            
                

            <div className="">
                {isLoading && (
                    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-50 bg-gray-800 z-50">
                        <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-600"></div>
                    </div>
            </div>
                )}
                <Outlet />
            </div>
            

        </div>
    );
}  
