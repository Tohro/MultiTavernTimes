import { useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import NewsCard from "../components/NewsCard.jsx";
import {deleteNewsApi, fetchNewsListApi} from "../services/api.js";
import {useNavigate} from "react-router-dom";
import {t} from "i18next";

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

    if (isLoading) return <div>{t("loading")}...</div>;


    return (
        <div className="max-w-2xl mx-auto px-4">
            {news.map(n => (
                <NewsCard
                    key={n.newsId}
                    news={n}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
}