import { createContext, useReducer } from 'react';
import { newsReducer, initialNewsState } from './newsReducer.js';
import {createNewsApi, deleteNewsApi, fetchNewsByIdApi, fetchNewsListApi, updateNewsApi} from "./api.js";

export const NewsContext = createContext(null);

export function NewsProvider({ children }) {
    const [state, dispatch] = useReducer(newsReducer, initialNewsState);
//не нужно
    //createNews
    const addNews = async (imageFileName, language, title, subtitle, text) => {
        const res = await createNewsApi( imageFileName, language, title, subtitle, text)
        dispatch({ type: 'ADD_NEWS', payload: res.data });
    };
//не нужно
    //updateNews
    const updateNews = async (id, imageFileName, language, title, subtitle, text) => {
        const res = await updateNewsApi(id, imageFileName, language, title, subtitle, text)
        dispatch({ type: 'UPDATE_NEWS', payload: res.data });
    };
    //deleteNews
    const deleteNews = async (id) => {
        await deleteNewsApi(id);
        dispatch({ type: 'DELETE_NEWS', payload: id });
    };
//не нужно
    //fetchNewsById
    const getByIdNews = async (id, language) => {
        const res = await fetchNewsByIdApi(id,language)
        
    };
    //fetchNewsList
    const loadListNews = async (language) => {
        dispatch({ type: 'LOAD_START' });
        try {
            const res = await fetchNewsListApi(language,0,3);            
            dispatch({ type: 'LOAD_SUCCESS', payload: res.data.items, total: res.data.totalCount });
        } catch (err) {
            dispatch({ type: 'LOAD_ERROR', error: err.message });
        }
    };
    //fetchNextNewsList
    const loadNextListNews = async (language) => {
        dispatch({ type: 'LOAD_START' });
        try {
            const res = await fetchNewsListApi(language,state.items.length,3);
            dispatch({ type: 'LOAD_NEXT_NEWS', payload: res.data.items, total: res.data.totalCount });
        } catch (err) {
            dispatch({ type: 'LOAD_ERROR', error: err.message });
        }
    };
    

    return (
        <NewsContext value={{
            ...state,
            loadListNews,
            addNews,
            updateNews,
            deleteNews,
            loadNextListNews
        }}>
            {children}
        </NewsContext>
    );
}