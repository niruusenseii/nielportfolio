import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Import Components
import Home from './components/Home'; 
import GraphicDesignSection from './components/graphiccomponent'; // Check this filename matches yours
import Header from './components/Header';
// Import Background Image
import nielImage from "./assets/nielimage.jpg"; // Check if path is correct (./assets or ./components/assets)

// --- THEME LOGIC (Must be inside App.jsx now) ---
const useTimeBasedTheme = () => {
    const [theme, setTheme] = useState('dark'); 
    useEffect(() => {
        const updateTheme = () => {
            const hour = new Date().getHours();
            const isDay = hour >= 7 && hour < 19;
            setTheme(isDay ? 'light' : 'dark');
        };

        updateTheme();
        const intervalId = setInterval(updateTheme, 60000);
        return () => clearInterval(intervalId);
    }, []);

    return theme;
};

const injectThemeStyles = (theme) => {
    const isDark = theme === 'dark';

    const colors = {
        '--bg-color': isDark ? '#0F172A' : '#F8FAFC',
        '--text-color': isDark ? '#E2E8F0' : '#1E293B',
        '--text-secondary': isDark ? '#94A3B8' : '#64748B',
        '--glass-bg': isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.7)', 
        '--glass-border': isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
        '--header-bg': isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.95)', 
        '--tag-bg': isDark ? '#334155' : '#E2E8F0',
        '--tag-text': isDark ? '#E2E8F0' : '#1E293B',
        '--border-color-dark': isDark ? '#1E293B' : '#E2E8F0',
        '--border-color-light': isDark ? '#475569' : '#CBD5E1',
        '--accent-violet-primary': '#8B5CF6', 
        '--accent-violet-hover': '#7C3AED',
        '--accent-link': isDark ? '#A78BFA' : '#7C3AED',
        '--footer-text': isDark ? '#64748B' : '#94A3B8',
    };

    let style = document.getElementById('theme-styles');
    if (!style) {
        style = document.createElement('style');
        style.id = 'theme-styles';
        document.head.appendChild(style);
    }
    
    Object.keys(colors).forEach(key => {
        document.documentElement.style.setProperty(key, colors[key]);
    });

    style.textContent = `
        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            scroll-behavior: smooth;
            transition: background-color 0.5s ease, color 0.5s ease;
            overflow-x: hidden;
        }
        .glass-effect {
            background: var(--glass-bg);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid var(--glass-border);
        }
        .header-scrolled {
            background-color: var(--header-bg) !important;
            backdrop-filter: blur(8px);
            border-bottom: 1px solid var(--glass-border);
        }
        .gradient-text {
            background: linear-gradient(to right, #3b82f6, #8b5cf6); 
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    `;
};

// Scroll Reset Component
const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

export default function App() {
    const theme = useTimeBasedTheme(); 
    useEffect(() => {
        injectThemeStyles(theme);
        // Inject Tailwind and Fonts dynamically if not in index.html
        if (!document.querySelector('script[src="https://cdn.tailwindcss.com"]')) {
            const s = document.createElement('script');
            s.src = "https://cdn.tailwindcss.com";
            document.head.appendChild(s);
        }
        if (!document.querySelector('link[href*="fonts.googleapis.com"]')) {
            const l = document.createElement('link');
            l.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap";
            l.rel = "stylesheet";
            document.head.appendChild(l);
        }
    }, [theme]);

    return (
        <Router>
            <ScrollToTop />
            <div className="min-h-screen relative selection:bg-violet-500/30">
                {/* Global Background */}
                <div className="fixed top-0 left-0 w-full h-[80vh] z-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--bg-color)] z-10" />
                    <img 
                        src={nielImage}
                        alt="Background" 
                        className="w-full h-full object-cover opacity-20"
                        style={{ filter: theme === 'dark' ? 'grayscale(100%) brightness(60%)' : 'grayscale(100%) opacity(0.3)' }}
                    />
                </div>

                <Header /> 

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/graphics" element={<GraphicDesignSection />} />
                </Routes>

                <footer className="py-8 border-t border-[var(--border-color-dark)] glass-effect relative z-10">
                    <div className="container mx-auto px-6 text-center text-[var(--text-secondary)] text-sm">
                        <p>&copy; 2025 Niel Ivan Eroy. All Rights Reserved.</p>
                    </div>
                </footer>
            </div>
        </Router>
    );
}