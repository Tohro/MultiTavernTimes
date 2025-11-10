import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { AuthContext } from '../services/AuthContext.jsx';

export default function LoginPage() {
    const [email, setEmail] = useState('admin@example.com');
    const [password, setPassword] = useState('password');
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { isAuthenticated, login } = useContext(AuthContext);
    const handleLogin = async () => {
        const success = await login(email, password);
        if (success) {
            navigate('/news');
        } else {
            alert('Login failed');
        }
    };

    return (
        <>
            <div>
                <h2>{t('login')}</h2>
                <input placeholder={t('email')} value={email} onChange={e => setEmail(e.target.value)}/>
                <input placeholder={t('password')} type="password" value={password}
                       onChange={e => setPassword(e.target.value)}/>

                <button onClick={handleLogin}>{t('submit')}</button>
            </div>
        </>
    );
}