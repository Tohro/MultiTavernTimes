import { Link, useNavigate } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import Navigation from './Navigation';
import { useTranslation } from 'react-i18next';
import { useContext } from "react";
import { AuthContext } from "../services/AuthContext.jsx";
import { logoutApi } from "../services/api.js";

export default function Header() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { isAuthenticated, login, logout } = useContext(AuthContext);


    const handleLogout = async () => {
        try {
            await logoutApi()
            logout();
            navigate('/login');             
        } catch (err) {
            console.error('Ошибка при logout:', err);
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    {/* Logo & Navigation */}
                    <div className="flex items-center space-x-8">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">MT</span>
                            </div>
                            <span className="text-xl font-bold text-gray-800 dark:text-white hidden sm:block">
                                MultiTavernTimes
                            </span>
                        </Link>
                        <Navigation/>
                    </div>

                    {/* Right side controls */}
                    <div className="flex items-center space-x-4">
                        <LanguageSwitcher/>
                        {isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white text-sm font-medium rounded-lg hover:from-red-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                {t('logout')}
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                                {t('login')}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}