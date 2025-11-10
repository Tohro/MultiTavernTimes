import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {useContext} from "react";
import {AuthContext} from "../services/AuthContext.jsx";

export default function NewsCard({ news, onEdit, onDelete }) {
    const { isAuthenticated} = useContext(AuthContext);
    const { t } = useTranslation();


    return (
        <>
        <div style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '1rem' }}>
            <Link to={`/news/${news.newsId}`}>
                <h3>{news.title}</h3>
                <p>{news.subtitle}</p>
            </Link>
            {isAuthenticated && (
                <div style={{ marginTop: '0.5rem' }}>
                    <button onClick={() => onEdit(news)}>{t('edit')}</button>
                    <button onClick={() => onDelete(news)}>{t('delete')}</button>
                </div>
            )}
        </div>
        </>
    );
}