import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createNewsApi, uploadRes } from '../services/api.js';

export default function NewsCreatePage() {
    const { i18n, t } = useTranslation();
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [text, setText] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [serverErrors, setServerErrors] = useState({});

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);

        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        } else {
            setPreviewUrl(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const newErrors = {};
        if (!title?.trim()) newErrors.title = t('validationRequired');
        if (!subtitle?.trim()) newErrors.subtitle = t('validationRequired');
        if (!text?.trim()) newErrors.text = t('validationRequired');
        if (!imageFile) newErrors.image = t('validationImageRequired');

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsSubmitting(false);
            return;
        }

        try {
            let imageFileName = '';

            if (imageFile) {
                const formData = new FormData();
                formData.append('image', imageFile);

                const uploadImage = await uploadRes(formData);
                imageFileName = uploadImage.data.fileName;
            }

            try {
                await createNewsApi(
                    imageFileName,
                    i18n.language,
                    title,
                    subtitle,
                    text
                );
            } catch (err) {
                if (err.response?.status === 400 && err.response?.data?.errors) {
                    setServerErrors(err.response.data.errors);
                    return
                }
            }




            // Очистка формы
            setTitle('');
            setSubtitle('');
            setText('');
            setImageFile(null);
            setPreviewUrl(null);
        } catch (err) {
            console.error(err);            
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto mt-12 p-6 bg-white border border-gray-300 rounded shadow space-y-6 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
        >
            <h2 className="text-2xl font-semibold text-center text-gray-400">{t('create_news')}</h2>

            <div>
                <label className="block mb-1 text-sm font-medium text-gray-400">{t('title')}</label>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium text-gray-400">{t('subtitle')}</label>
                <input
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.subtitle && <p className="text-sm text-red-500 mt-1">{errors.subtitle}</p>}
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium text-gray-400">{t('text')}</label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={5}
                />
                {errors.text && <p className="text-sm text-red-500 mt-1">{errors.text}</p>}
                {serverErrors.Text && (
                    <p className="text-sm text-red-500 mt-1">{serverErrors.Text[0]}</p>
                )}

            </div>

            <div>
                <label className="block mb-1 text-sm font-medium text-gray-400">{t('image')}</label>
                <input 
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                />

                {previewUrl && (
                    <div className="mt-4">
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-full h-auto border border-gray-300 rounded"
                        />
                    </div>
                )}

                {errors.image && <p className="text-sm text-red-500 mt-1">{errors.image}</p>}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 rounded text-white transition ${
                    isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
                }`}
            >
                {isSubmitting ? t('submitting') : t('submit')}
            </button>

            
        </form>
    );
}