import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchNewsByIdApi } from "../services/api.js";
import { t } from "i18next";

export default function NewsDetailPage() {
    const { id } = useParams();
    const [news, setNews] = useState(null);
    const { i18n } = useTranslation();
    const [noTranslation, setNoTranslation] = useState(false);


    const formatDate = (dateStr) => new Date(dateStr).toLocaleString()


    useEffect(() => {
        fetchNewsByIdApi(id, i18n.language)
            .then(res => {
                if (res?.status === 204) {
                    setNoTranslation(true);
                    return;
                }
                setNews(res.data);
                setNoTranslation(false);
            });
    }, [id, i18n.language]);


    if (noTranslation) return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800 flex items-center justify-center">
            <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
                <div className="text-yellow-500 text-6xl mb-4">🌐</div>
                <p className="text-xl text-gray-600 dark:text-gray-300">{t("translation")}...</p>
            </div>
        </div>
    );
    
    if (!news) return (
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
                <article className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                        {/* Hero Image */}
                        <div className="relative h-96 overflow-hidden">
                            <img
                                src={`http://localhost:5270/news/images/${news.imageFileName}`}
                                alt={news.title}
                                className="w-full h-full object-contain"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="flex items-center space-x-4 text-white/90 text-sm mb-4">
                                    <span className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {formatDate(news.createdAt)}
                                    </span>
                                    {news.modifiedAt !== news.createdAt && (
                                        <span className="flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            {t('updated')}: {formatDate(news.modifiedAt)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8">
                            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6 leading-tight">
                                {news.title}
                            </h1>

                            <h2 className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed font-medium">
                                {news.subtitle}
                            </h2>

                            <div className="prose prose-lg dark:prose-invert max-w-none">
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-lg">
                                    {news.text}
                                </p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-8 pb-8">
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center space-x-6">
                                        <span className="flex items-center">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {t('created')}: {formatDate(news.createdAt)}
                                        </span>
                                        {news.modifiedAt !== news.createdAt && (
                                            <span className="flex items-center">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                {t('updated')}: {formatDate(news.modifiedAt)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}