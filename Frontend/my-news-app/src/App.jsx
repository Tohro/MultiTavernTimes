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
            <Suspense fallback={<div>Loading translations...</div>}>
                <Header />
                <main style={{ padding: '1rem' }}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/news" element={<NewsListPage />} />
                        <Route path="/news/:id" element={<NewsDetailPage />} />
                        <Route path="/news/edit/:id" element={<NewsEditPage />} />
                        <Route path="/news/create" element={<NewsCreatePage />} />
                    </Routes>
                </main>
            </Suspense>
        </Router>
    );
}