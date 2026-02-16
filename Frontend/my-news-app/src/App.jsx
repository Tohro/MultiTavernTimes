import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import NewsListPage from './pages/NewsListPage';
import HomePage from './pages/HomePage';
import './i18n';
import NewsDetailPage from "./pages/NewsDetailPage.jsx";
import NewsEditPage from "./pages/NewsEditPage.jsx";
import NewsCreatePage from "./pages/NewsCreatePage.jsx";

export default function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800 text-gray-800 dark:text-gray-200">
                <Suspense fallback={
                    <div className="min-h-screen flex items-center justify-center">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
                            <p className="text-xl text-gray-600 dark:text-gray-300">Loading translations...</p>
                        </div>
                    </div>
                }>
                    <Header/>
                    <main>
                        <Routes>
                            <Route path="/" element={<HomePage/>}/>
                            <Route path="/login" element={<LoginPage/>}/>
                            <Route path="/news" element={<NewsListPage/>}/>
                            <Route path="/news/:id" element={<NewsDetailPage/>}/>
                            <Route path="/news/edit/:id" element={<NewsEditPage/>}/>
                            <Route path="/news/create" element={<NewsCreatePage/>}/>
                        </Routes>
                    </main>
                </Suspense>
            </div>
        </Router>
    );
}