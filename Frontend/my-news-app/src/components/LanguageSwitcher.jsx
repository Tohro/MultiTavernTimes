import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <select className="dark:bg-gray-800 text-gray-800 dark:text-gray-200" value={i18n.language} onChange={(e) => changeLanguage(e.target.value)}>
            <option value="ru">RU</option>
            <option value="en">EN</option>
        </select>
    );
}