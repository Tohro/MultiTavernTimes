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
    const [errors, setErrors] = useState({});
    const [serverErrors, setServerErrors] = useState({});

    useEffect(() => {
        fetchNewsByIdApi(id, i18n.language)
            .then(res => {
                if (res.status === 204) {
                    setNews({
                        newsId: id,
                        title: '',
                        subtitle: '',
                        text: '',
                        imageFileName: news.imageFileName
                    });
                    setServerErrors({});
                } else {
                    setNews(res.data);
                }
            })
            .catch(err => {
                console.error('Ошибка загрузки новости:', err);
            });
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
          let res =  await updateNewsApi(
                news.newsId,
                news.imageFileName,
                i18n.language,
                news.title,
                news.subtitle,
                news.text
            );
          console.log(res);
        } catch (err) {
            if (err.response?.status === 400 && err.response?.data?.errors) {
                setServerErrors(err.response.data.errors);
            }
        }
    };


    if (!news) return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-xl text-gray-600 dark:text-gray-300">{t('loading')}...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800 py-8">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                            {t('edit_news')}
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            {t('editing_existing')}
                        </p>
                    </div>

                    {/* Form */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
                        {/* Current Image */}
                        {news.imageFileName && (
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    {t('current_image')}
                                </label>
                                <div className="relative rounded-xl overflow-hidden shadow-lg">
                                    <img
                                        src={`http://localhost:5270/news/images/${news.imageFileName}`}
                                        alt={news.title}
                                        className="w-full h-64 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                </div>
                            </div>
                        )}

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {t('image')} ({t('change_image')})
                            </label>
                            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors duration-200">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="image-upload-edit"
                                />
                                <label htmlFor="image-upload-edit" className="cursor-pointer">
                                    <div className="space-y-4">
                                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto">
                                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-gray-600 dark:text-gray-300 font-medium">
                                                {t('click_to_change')}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {t('file_formats')}
                                            </p>
                                        </div>
                                    </div>
                                </label>
                            </div>
                            {uploading && (
                                <div className="mt-2 flex items-center text-blue-600">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                                    <span className="text-sm">{t('loading')}...</span>
                                </div>
                            )}
                            {errors.image && <p className="text-sm text-red-500 mt-2 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {errors.image}
                            </p>}
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {t('title')}
                            </label>
                            <input
                                type="text"
                                value={news.title}
                                onChange={e => setNews({...news, title: e.target.value})}
                                placeholder={t('enter_title')}
                                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200"
                            />
                            {errors.title && <p className="text-sm text-red-500 mt-2 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {errors.title}
                            </p>}
                        </div>

                        {/* Subtitle */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {t('subtitle')}
                            </label>
                            <input
                                type="text"
                                value={news.subtitle}
                                onChange={e => setNews({...news, subtitle: e.target.value})}
                                placeholder={t('enter_subtitle')}
                                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200"
                            />
                            {errors.subtitle && <p className="text-sm text-red-500 mt-2 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {errors.subtitle}
                            </p>}
                        </div>

                        {/* Text */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {t('text')}
                            </label>
                            <textarea
                                value={news.text}
                                onChange={e => setNews({...news, text: e.target.value})}
                                placeholder={t('enter_text')}
                                rows={8}
                                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200 resize-none"
                            />
                            {errors.text && <p className="text-sm text-red-500 mt-2 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {errors.text}
                            </p>}
                            {serverErrors.Text && (
                                <p className="text-sm text-red-500 mt-2 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {serverErrors.Text[0]}
                                </p>
                            )}
                        </div>

                        {/* Save Button */}
                        <div className="pt-4">
                            <button
                                onClick={handleSave}
                                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                <span className="flex items-center justify-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {t('save')}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}