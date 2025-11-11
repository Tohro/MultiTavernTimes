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
            <div className="max-w-sm mx-auto mt-12 p-6 bg-white border border-gray-300 rounded shadow space-y-4 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                <h2 className="text-xl font-semibold text-center text-gray-400">{t('login')}</h2>

                <input
                    type="email"
                    placeholder={t('email')}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="password"
                    placeholder={t('password')}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                >
                    {t('submit')}
                </button>
            </div>
        </>
    );
}