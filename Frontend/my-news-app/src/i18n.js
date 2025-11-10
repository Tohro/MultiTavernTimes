import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            login: "Login",
            email: "Email",
            password: "Password",
            submit: "Submit",
            news: "News",
            home: "Home",
            logout: "Logout",
            create: "Create",
            edit: "Edit",
            delete: "Delete",
            loading: "Loading",
            save: "Save",
            translation: "there is no translation of the article"
        }
    },
    ru: {
        translation: {
            login: "Вход",
            email: "Эл. почта",
            password: "Пароль",
            submit: "Отправить",
            news: "Новости",
            home: "Главная",
            logout: "Выход",
            create: "Создать",
            edit: "Редактировать",
            delete: "Удалить",
            loading: "Загрузка",
            save: "Сохранить",
            translation: "Нет перевода" 
        }
    }
};

i18n.use(initReactI18next).init({
    resources,
    lng: "ru",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false
    }
});

export default i18n;