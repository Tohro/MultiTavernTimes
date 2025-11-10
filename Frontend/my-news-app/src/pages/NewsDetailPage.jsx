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
        <div>
            <h1>{news.title}</h1>
            <img
                src={`http://localhost:5270/news/images/${news.imageFileName}`}
                alt={news.title}
                style={{maxWidth: '100%', height: 'auto'}}
            />
            <h2>{news.subtitle}</h2>
            <p>{news.text}</p>
            <p>Created: {formatDate(news.createdAt)}</p>
            <p>Updated: {formatDate(news.modifiedAt)}</p>
        </div>
    );
}