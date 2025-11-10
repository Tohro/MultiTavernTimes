import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Navigation() {
    const { t } = useTranslation();

    const linkStyle = ({ isActive }) => ({
        marginRight: '1rem',
        textDecoration: isActive ? 'underline' : 'none'
    });

    return (
        <nav>
            <NavLink to="/" style={linkStyle}>{t('home')}</NavLink>
            <NavLink to="/news" style={linkStyle}>{t('news')}</NavLink>
        </nav>
    );
}