import React, { useContext, useEffect } from 'react';
import { NewsContext } from '../services/NewsContext';
import NewsCard from '../components/NewsCard';
import { useTranslation } from 'react-i18next';
import {Link, useNavigate} from "react-router-dom";
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

    if (loading) return <p>Загрузка новостей...</p>;
    if (error) return <p>Ошибка загрузки: {error}</p>;
    if (!items || items.length === 0) return <p>Нет новостей для отображения.</p>;
    let content = totalCount === items.length ?
        (<p>Нет новостей для отображения.</p>):
        (<button onClick={()=>{handleLoadNext()}}>Есть новости для отображения.</button>)
   
    return (
        <div className="news-list-page">
            {
                isAuthenticated && (
                    <button onClick={()=>{handleCreate()}}>{t('create')}</button>)
            }
            {items.map(news => (
                <NewsCard key={news.newsId} news={news} onEdit={handleEdit} onDelete={()=>deleteNews(news.newsId)} />
            ))}

            {
                content
            }
        </div>
    );
}

export default NewsListPage;