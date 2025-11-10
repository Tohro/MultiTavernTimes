import { createContext, useReducer } from 'react';

import { authReducer, initialAuthState } from './authReducer';
import {sha256} from "../utils/hash.js";
import {loginAuthApi, updateNewsApi} from "./api.js";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, initialAuthState);

    const login = async (email, password) => {
        const emailHash = await sha256(email);
        const passwordHash = await sha256(password);
        try {
            const res = await loginAuthApi(emailHash,passwordHash);

            if (res.status === 200) {
                dispatch({ type: 'LOGIN_SUCCESS' });
                return true;
            }
        } catch (err) {
            console.error('Login failed:', err);
            return false;
        }
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <AuthContext value={{ ...state, login, logout }}>
            {children}
        </AuthContext>
    );
}