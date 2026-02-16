import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useContext } from "react";
import { AuthContext } from "../services/AuthContext.jsx";

export default function NewsCard({ news, onEdit, onDelete }) {
    const { isAuthenticated} = useContext(AuthContext);
    const { t } = useTranslation();

    return (
        <div
            className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
            {/* Image with date overlay */}
            <div className="h-48 relative overflow-hidden">
                <img
                    src={`http://localhost:5270/news/images/${news.imageFileName}`}
                    alt={news.title}
                    className="w-full object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-4 left-4">
                    <span className="text-white text-xs font-medium drop-shadow-lg">
                        {new Date(news.createdAt).toLocaleDateString()}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <Link
                    to={`/news/${news.newsId}`}
                    className="block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200"
                >
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 line-clamp-2 leading-tight">
                        {news.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                        {news.subtitle}
                    </p>
                </Link>

                {/* Action buttons */}
                {isAuthenticated && (
                    <div className="mt-6 flex gap-2">
                        <button
                            onClick={() => onEdit(news)}
                            className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-medium rounded-lg hover:from-amber-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                            </svg>
                            {t('edit')}
                        </button>
                        <button
                            onClick={() => onDelete(news)}
                            className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white text-sm font-medium rounded-lg hover:from-red-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                            {t('delete')}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}