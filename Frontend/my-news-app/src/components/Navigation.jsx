import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Navigation() {
    const { t } = useTranslation();

    const linkClass = ({ isActive }) =>
        `mr-4 ${isActive ? 'underline text-blue-600' : 'text-gray-700 hover:text-blue-500'}`;

    return (
        <nav className="flex items-center gap-4">
            <NavLink to="/" className={linkClass}>
                {t('home')}
            </NavLink>
            <NavLink to="/news" className={linkClass}>
                {t('news')}
            </NavLink>
        </nav>
    );
}