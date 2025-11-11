import { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {fetchNewsByIdApi} from "../services/api.js";
import {t} from "i18next";

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


    if (noTranslation) return <div>{t("translation")}...</div>;
    if (!news) return <div>{t("loading")}...</div>;
    

    return (
        <div className="max-w-2xl mx-auto px-4 py-8 space-y-6 bg-white border border-gray-300 rounded shadow dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            <h1 className="text-3xl font-bold ">{news.title}</h1>

            <img
                src={`http://localhost:5270/news/images/${news.imageFileName}`}
                alt={news.title}
                className="w-full h-auto rounded border border-gray-200"
            />

            <h2 className="text-xl font-semibold ">{news.subtitle}</h2>

            <p className="text-gray-300 whitespace-pre-line break-words">{news.text}</p>

            <div className="text-sm text-gray-500 space-y-1">
                <p>🕰️ {t('created')}: {formatDate(news.createdAt)}</p>
                <p>✏️ {t('updated')}: {formatDate(news.modifiedAt)}</p>
            </div>
        </div>
    );
}