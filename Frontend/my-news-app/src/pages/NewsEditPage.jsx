import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchNewsByIdApi, updateNewsApi, uploadRes } from '../services/api.js';

export default function NewsEditPage() {
    const { id } = useParams();
    const { i18n, t } = useTranslation();
    const [news, setNews] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchNewsByIdApi(id, i18n.language)
            .then(res => setNews(res.data));
    }, [id, i18n.language]);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setSelectedFile(file);
        const formData = new FormData();
        formData.append('image', file);

        setUploading(true);
        try {
            const res = await uploadRes(formData);
            setNews(prev => ({ ...prev, imageFileName: res.data.fileName }));
        } catch (err) {
            console.error('Ошибка загрузки изображения:', err);
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        await updateNewsApi(
            news.newsId,
            news.imageFileName,
            i18n.language,
            news.title,
            news.subtitle,
            news.text
        );
    };

    if (!news) return <div>{t('loading')}</div>;

    return (
        <div>
            <h2>{t('edit')}</h2>

            {news.imageFileName && (
                <img
                    src={`http://localhost:5270/news/images/${news.imageFileName}`}
                    alt={news.title}
                    style={{ maxWidth: '100%', height: 'auto' }}
                />
            )}

            <div>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                {uploading && <p>{t('loading')}...</p>}
            </div>

            <input
                value={news.title}
                onChange={e => setNews({ ...news, title: e.target.value })}
            />
            <input
                value={news.subtitle}
                onChange={e => setNews({ ...news, subtitle: e.target.value })}
            />
            <textarea
                value={news.text}
                onChange={e => setNews({ ...news, text: e.target.value })}
            />
            <button onClick={handleSave}>{t('save')}</button>
        </div>
    );
}