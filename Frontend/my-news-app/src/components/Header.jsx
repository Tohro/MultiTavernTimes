import { Link, useNavigate } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import Navigation from './Navigation';
import { useTranslation } from 'react-i18next';
import {useContext} from "react";
import {AuthContext} from "../services/AuthContext.jsx";
import {logoutApi} from "../services/api.js";

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
        <header className="flex justify-between items-center px-4 py-3 border-b border-gray-300  shadow-sm  dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            <Navigation/>
            <div className="flex items-center gap-4">
                <LanguageSwitcher/>
                {isAuthenticated ? (
                    <button
                        onClick={handleLogout}
                        className="text-sm px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
                    >
                        {t('logout')}
                    </button>
                ) : (
                    <Link
                        to="/login"
                        className="text-sm px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
                    >
                        {t('login')}
                    </Link>
                )}
            </div>
        </header>

    );
}