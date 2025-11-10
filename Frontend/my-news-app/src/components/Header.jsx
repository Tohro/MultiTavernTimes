import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import LanguageSwitcher from './LanguageSwitcher';
import Navigation from './Navigation';
import { useTranslation } from 'react-i18next';
import {useContext} from "react";
import {AuthContext} from "../services/AuthContext.jsx";

export default function Header() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { isAuthenticated, login, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout()
        navigate('/');
    };

    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid #ccc' }}>
            <Navigation />
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <LanguageSwitcher />
                {isAuthenticated ? (
                    <button onClick={handleLogout}>{t('logout')}</button>
                ) : (
                    <Link to="/login">{t('login')}</Link>
                )}
            </div>
        </header>
    );
}