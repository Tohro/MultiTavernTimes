import axios from 'axios';

const API_BASE = 'http://localhost:5270/api/news';

const api = axios.create({
    baseURL: API_BASE,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

//Аутентификация
export const loginAuthApi = (emailHash, passwordHash) =>
    api.post('/admin/login', {
        emailHash,
        passwordHash
    });

// logout
export const logoutApi = () => api.post('/logout',{});

//Проверка 
export const loginCheck =()=> api.get('/check');

//Создать новость
export const createNewsApi = (imageFileName, language, title, subtitle, text) =>
    api.post('/create', {imageFileName, language, title, subtitle, text});


//Обновить новость
export const updateNewsApi = (id, imageFileName, language, title, subtitle, text) =>
    api.put(`/update`, {newsId:id, imageFileName, language, title, subtitle, text});

//Удалить новость
export const deleteNewsApi = (id) =>
    api.delete(`/${id}`);



//Получить одну новость по Id, language
export const fetchNewsByIdApi = (id, language) =>
    api.get(`/${id}/${language}`);

//Получить список новостей
export const fetchNewsListApi = (language, skip = 0, take = 10) =>
    api.get('/list', {
        params: { language, skip, take },
    });

//Upload
// export const uploadRes =(formData)=>
//     axios.create( {
//         baseURL: API_BASE,    
//         headers: { 'Content-Type': 'multipart/form-data' },
//         withCredentials: true
// }).post('/upload', {image:formData});


export const uploadRes = (formData) => {
    return axios.post(`${API_BASE}/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
    });
};


