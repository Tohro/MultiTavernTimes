import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <select value={i18n.language} onChange={(e) => changeLanguage(e.target.value)}>
            <option value="ru">RU</option>
            <option value="en">EN</option>
        </select>
    );
}