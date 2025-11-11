import {createContext, useEffect, useReducer} from 'react';

import { authReducer, initialAuthState } from './authReducer';
import {sha256} from "../utils/hash.js";
import {loginAuthApi, loginCheck} from "./api.js";

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

    useEffect(  () => {
        loginCheck()
            .then(res => {
                if (res.data.isAuthenticated) {
                    dispatch({ type: 'LOGIN_SUCCESS' });               
                }
            })
            .catch(() => {
                logout();
            });
    }, []);

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <AuthContext value={{ ...state, login, logout }}>
            {children}
        </AuthContext>
    );
}