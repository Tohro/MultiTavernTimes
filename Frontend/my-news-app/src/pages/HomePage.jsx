import { useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from "react-router-dom";
import NewsCard from "../components/NewsCard.jsx";
import { deleteNewsApi, fetchNewsListApi } from "../services/api.js";
import { t } from "i18next";

export default function HomePage() {
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { i18n } = useTranslation();
    const navigate = useNavigate();

    const handleEdit = (news) => {
        navigate(`/news/edit/${news.newsId}`);
    };

    const handleDelete = (news) => {
         deleteNewsApi(news.newsId)
            .then(() => {
                setNews(prev => prev.filter(n => n.newsId !== news.newsId));
            })
            .catch(err => {
                console.error('Ошибка удаления:', err);
            });
    };

    useEffect(() => {
        fetchNewsListApi(i18n.language,0,5)
            .then(res => {
            setNews(res.data.items);
            setIsLoading(false);
                console.log(res.data);
        });
    }, [i18n.language]);

    if (isLoading) return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-xl text-gray-600 dark:text-gray-300">{t("loading")}...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800">
            <div className="container mx-auto px-4 py-8">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-6">
                        {t('welcome_title')}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        {t('welcome_subtitle')}
                    </p>
                </div>

                {/* Latest News Section */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                            {t('latest_news')}
                        </h2>
                        <Link 
                            to="/news"
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 hover:from-blue-600 hover:to-indigo-700"
                        >
                            {t('view_all')}
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                    
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {news.map(n => (
                            <NewsCard
                                key={n.newsId}
                                news={n}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                </div>

                {/* Features Section */}
                <div className="grid md:grid-cols-3 gap-8 mt-16">
                    <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{t('fast')}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{t('fast_desc')}</p>
                    </div>
                    <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{t('reliable')}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{t('reliable_desc')}</p>
                    </div>
                    <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{t('multilingual')}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{t('multilingual_desc')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}