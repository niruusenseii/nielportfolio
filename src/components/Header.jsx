import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from "react-icons/fa";

import logoImage from "../assets/niel.png"; 

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Handle Scroll Effect
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Navigation Logic
    const handleNavigation = (e, targetId) => {
        e.preventDefault();
        
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(targetId);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            const element = document.getElementById(targetId);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    return (
        // ADDED 'glass-effect' HERE to fix the transparency issue
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-effect ${isScrolled ? 'header-scrolled py-3' : 'py-5'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* LOGO */}
                <Link to="/" className="z-50 relative">
                    <img 
                        src={logoImage} 
                        alt="NI Logo" 
                        className="h-8 w-auto md:h-10 transition-all hover:opacity-80" 
                    />
                </Link>

                {/* DESKTOP NAVIGATION */}
                <nav className="hidden md:flex space-x-8">
                    {/* Internal Page Links */}
                    <Link to="/" className={`text-sm font-medium transition-colors ${location.pathname === '/' ? 'text-[var(--accent-link)]' : 'text-[var(--text-color)]'} hover:text-[var(--accent-link)]`}>
                        Home
                    </Link>

                    {/* Scroll Links (About, Projects, Contact) */}
                    <a href="#about" onClick={(e) => handleNavigation(e, 'about')} className="text-sm font-medium text-[var(--text-color)] hover:text-[var(--accent-link)] transition-colors cursor-pointer opacity-90 hover:opacity-100">
                        About
                    </a>
                    <a href="#projects" onClick={(e) => handleNavigation(e, 'projects')} className="text-sm font-medium text-[var(--text-color)] hover:text-[var(--accent-link)] transition-colors cursor-pointer opacity-90 hover:opacity-100">
                        Projects
                    </a>

                    {/* Graphics Page Link */}
                    <Link to="/graphics" className={`text-sm font-medium transition-colors ${location.pathname === '/graphics' ? 'text-[var(--accent-link)]' : 'text-[var(--text-color)]'} hover:text-[var(--accent-link)]`}>
                        Graphics
                    </Link>

                    <a href="#skills" onClick={(e) => handleNavigation(e, 'skills')} className="text-sm font-medium text-[var(--text-color)] hover:text-[var(--accent-link)] transition-colors cursor-pointer opacity-90 hover:opacity-100">
                        Skills
                    </a>
                    
                    <a href="#contact" onClick={(e) => handleNavigation(e, 'contact')} className="text-sm font-medium text-[var(--text-color)] hover:text-[var(--accent-link)] transition-colors cursor-pointer opacity-90 hover:opacity-100">
                        Contact
                    </a>
                </nav>

                {/* MOBILE MENU BUTTON */}
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)} 
                    className="md:hidden text-2xl z-50 focus:outline-none text-[var(--text-secondary)] hover:text-[var(--accent-link)] transition-colors"
                >
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* MOBILE NAVIGATION OVERLAY */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-0 left-0 w-full h-screen bg-[var(--bg-color)] flex flex-col items-center justify-center space-y-8 md:hidden shadow-xl"
                    >
                        <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-[var(--text-color)] hover:text-[var(--accent-link)]">
                            Home
                        </Link>
                        
                        <a href="#about" onClick={(e) => handleNavigation(e, 'about')} className="text-2xl font-bold text-[var(--text-color)] hover:text-[var(--accent-link)]">
                            About
                        </a>
                        
                        <a href="#projects" onClick={(e) => handleNavigation(e, 'projects')} className="text-2xl font-bold text-[var(--text-color)] hover:text-[var(--accent-link)]">
                            Projects
                        </a>

                        <Link to="/graphics" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-[var(--text-color)] hover:text-[var(--accent-link)]">
                            Graphics
                        </Link>

                        <a href="#contact" onClick={(e) => handleNavigation(e, 'contact')} className="text-2xl font-bold text-[var(--text-color)] hover:text-[var(--accent-link)]">
                            Contact
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;