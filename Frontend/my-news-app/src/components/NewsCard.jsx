import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {useContext} from "react";
import {AuthContext} from "../services/AuthContext.jsx";

export default function NewsCard({ news, onEdit, onDelete }) {
    const { isAuthenticated} = useContext(AuthContext);
    const { t } = useTranslation();


    return (
        <>
            <div
                className="border border-gray-600 p-4 mb-4 rounded shadow-sm bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                <Link
                    to={`/news/${news.newsId}`}
                    className="block hover:bg-gray-200 dark:hover:bg-gray-700 transition rounded p-2"
                >
                    <h3 className="text-lg font-semibold">{news.title}</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-400">{news.subtitle}</p>
                </Link>

                {isAuthenticated && (
                    <div className="mt-2 flex gap-2">
                        <button
                            onClick={() => onEdit(news)}
                            className="px-3 py-1 text-sm rounded bg-yellow-600 text-white hover:bg-yellow-700 transition"
                        >
                            {t('edit')}
                        </button>
                        <button
                            onClick={() => onDelete(news)}
                            className="px-3 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-700 transition"
                        >
                            {t('delete')}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}