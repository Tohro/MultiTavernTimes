import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchNewsByIdApi, updateNewsApi, uploadRes} from '../services/api.js';

export default function NewsEditPage() {
    const { id } = useParams();
    const { i18n, t } = useTranslation();
    const [news, setNews] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [errors, setErrors] = useState({});
    const [serverErrors, setServerErrors] = useState({});

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
        const newErrors = {};
        if (!news.title?.trim()) newErrors.title = t('validationRequired');
        if (!news.subtitle?.trim()) newErrors.subtitle = t('validationRequired');
        if (!news.text?.trim()) newErrors.text = t('validationRequired');
        if (!news.imageFileName) newErrors.image = t('validationImageRequired');

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        
        try {
            await updateNewsApi(
                news.newsId,
                news.imageFileName,
                i18n.language,
                news.title,
                news.subtitle,
                news.text
            );
        } catch (err) {
            if (err.response?.status === 400 && err.response?.data?.errors) {
                setServerErrors(err.response.data.errors);
            }
        }
    };


    if (!news) return <div>{t('loading')}</div>;

    return (
        <div className="max-w-xl mx-auto mt-12 p-6 bg-white border border-gray-300 rounded shadow space-y-6 dark:bg-gray-800 ">
            <h2 className="text-2xl font-semibold text-center text-gray-400">{t('edit')}</h2>

            {news.imageFileName && (
                <img
                    src={`http://localhost:5270/news/images/${news.imageFileName}`}
                    alt={news.title}
                    className="w-full h-auto border border-gray-200 rounded"
                />
            )}

            <div>
                <label className="block mb-1 text-sm font-medium text-gray-400">{t('image')}</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                />
                {uploading && <p className="mt-2 text-sm text-gray-500">{t('loading')}...</p>}
                {errors.image && <p className="text-sm text-red-500 mt-1">{errors.image}</p>}
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium text-gray-400">{t('title')}</label>
                <input
                    value={news.title}
                    onChange={e => setNews({...news, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium text-gray-400">{t('subtitle')}</label>
                <input
                    value={news.subtitle}
                    onChange={e => setNews({...news, subtitle: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.subtitle && <p className="text-sm text-red-500 mt-1">{errors.subtitle}</p>}
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium text-gray-400">{t('text')}</label>
                <textarea
                    value={news.text}
                    onChange={e => setNews({...news, text: e.target.value})}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.text && <p className="text-sm text-red-500 mt-1">{errors.text}</p>}
                {serverErrors.Text && (
                    <p className="text-sm text-red-500 mt-1">{serverErrors.Text[0]}</p>
                )}
            </div>

            <button
                onClick={handleSave}
                className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
                {t('save')}
            </button>
        </div>
    );
}