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

    if (loading) return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-xl text-gray-600 dark:text-gray-300">{t("loading")}...</p>
            </div>
        </div>
    );
    
    if (error) return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800 flex items-center justify-center">
            <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                <p className="text-xl text-red-600 dark:text-red-400">Ошибка загрузки: {error}</p>
            </div>
        </div>
    );
    
    if (!items || items.length === 0) return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800 flex items-center justify-center">
            <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
                <div className="text-gray-400 text-6xl mb-4">📰</div>
                <p className="text-xl text-gray-600 dark:text-gray-300">{t("nonews")}</p>
            </div>
        </div>
    );



    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800">
            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                        {t('news')}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        {t('latest_news')}
                    </p>
                </div>

                {/* Create Button */}
                {isAuthenticated && (
                    <div className="flex justify-end mb-8">
                        <button
                            onClick={handleCreate}
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 hover:from-emerald-600 hover:to-teal-700"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            {t('create')}
                        </button>
                    </div>
                )}

                {/* News Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {items.map(news => (
                        <NewsCard
                            key={news.newsId}
                            news={news}
                            onEdit={handleEdit}
                            onDelete={() => deleteNews(news.newsId)}
                        />
                    ))}
                </div>

                {/* Load More Section */}
                {totalCount !== items.length && (
                    <div className="text-center mt-12">
                        <button
                            onClick={handleLoadNext}
                            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 hover:from-blue-600 hover:to-indigo-700"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            {t('load_more')}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default NewsListPage;