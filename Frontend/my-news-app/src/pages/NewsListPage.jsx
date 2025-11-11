import React, { useContext, useEffect } from 'react';
import { NewsContext } from '../services/NewsContext';
import NewsCard from '../components/NewsCard';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../services/AuthContext.jsx";
import {t} from "i18next";

function NewsListPage() {
    const { i18n } = useTranslation();
    const { items, loading, error, totalCount, loadListNews, deleteNews,loadNextListNews } = useContext(NewsContext);
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);
    const handleEdit = (news) => {
        navigate(`/news/edit/${news.newsId}`);
    };
    const handleCreate = (news) => {
        navigate(`/news/create`);
    };

    const handleLoadNext =()=>
    {
        loadNextListNews(i18n.language);    
    }
    


    useEffect(() => {
        loadListNews(i18n.language);
    }, [i18n.language]);

    if (loading) return <p className="text-center text-gray-500 py-4">{t("loading")}...</p>;
    if (error) return <p className="text-center text-red-500 py-4">Ошибка загрузки: {error}</p>;
    if (!items || items.length === 0) return <p className="text-center text-gray-500 py-4">{t("nonews")}</p>;

    const content =
        totalCount === items.length ? (
            <p className="text-center text-gray-500 py-4">{t("nonews")}</p>
        ) : (
            <div className="text-center mt-4">
                <button
                    onClick={handleLoadNext}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Есть новости для отображения
                </button>
            </div>
        );

    return (
        <div className="max-w-2xl mx-auto px-4 py-8 space-y-4">
            {isAuthenticated && (
                <div className="text-right mb-4">
                    <button
                        onClick={handleCreate}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    >
                        {t('create')}
                    </button>
                </div>
            )}

            {items.map(news => (
                <NewsCard
                    key={news.newsId}
                    news={news}
                    onEdit={handleEdit}
                    onDelete={() => deleteNews(news.newsId)}
                />
            ))}

            {content}
        </div>
    
    );
}

export default NewsListPage;