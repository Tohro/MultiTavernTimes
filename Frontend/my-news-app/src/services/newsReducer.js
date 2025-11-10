export const initialNewsState = {
    items: [],
    loading: false,
    error: null,
    totalCount: 0
};

export function newsReducer(state, action) {
    switch (action.type) {
        case 'LOAD_START':
            return { ...state, loading: true, error: null };
        case 'LOAD_SUCCESS':
            return { ...state, loading: false, items: action.payload, totalCount: action.total };
        case 'LOAD_ERROR':
            return { ...state, loading: false, error: action.error };

        case 'ADD_NEWS':
            return { ...state, items: [...state.items, action.payload]};
        case 'UPDATE_NEWS':
            return {
                ...state,
                items: state.items.map(news =>
                    news.id === action.payload.id ? action.payload : news
                )
            };
        case 'DELETE_NEWS':
            return {
                ...state,
                items: state.items.filter(news => news.newsId !== action.payload),
                totalCount: state.totalCount-1
            };

        case 'LOAD_NEXT_NEWS':
            return { ...state, loading: false, items: [...state.items, ...action.payload], totalCount: action.total };
       
        default:
            return state;
    }
}