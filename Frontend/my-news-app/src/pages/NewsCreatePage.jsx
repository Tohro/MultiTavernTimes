import { useState, useEffect } from 'react';
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
    const [error, setError] = useState(null);

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
        setError(null);

        try {
            let imageFileName = '';

            if (imageFile) {
                const formData = new FormData();
                formData.append('image', imageFile);

                const uploadImage = await uploadRes(formData);
                imageFileName = uploadImage.data.fileName;
            }

            await createNewsApi(
                imageFileName,
                i18n.language,
                title,
                subtitle,
                text
            );

            // Очистка формы
            setTitle('');
            setSubtitle('');
            setText('');
            setImageFile(null);
            setPreviewUrl(null);
        } catch (err) {
            console.error(err);
            setError(t('error_creating_news'));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{t('create_news')}</h2>

            <div>
                <label>{t('title')}</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div>
                <label>{t('subtitle')}</label>
                <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} required />
            </div>

            <div>
                <label>{t('text')}</label>
                <textarea value={text} onChange={(e) => setText(e.target.value)} required />
            </div>

            <div>
                <label>{t('image')}</label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {previewUrl && (
                    <div style={{ marginTop: '10px' }}>
                        <img
                            src={previewUrl}
                            alt="Preview"
                            style={{ maxWidth: '100%', height: 'auto', border: '1px solid #ccc' }}
                        />
                    </div>
                )}
            </div>

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? t('submitting') : t('submit')}
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
}