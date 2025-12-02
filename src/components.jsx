import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";

export const ProjectCard = ({ imgSrc, title, description, tags, demoLink }) => (
    <div className="glass-effect rounded-xl overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300">
        <img 
            src={imgSrc} 
            alt={title} 
            className="w-full h-48 object-cover" 
            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/1e293b/e2e8f0?text=Image+Not+Found'; }} 
        />
        <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-slate-400 mb-4">{description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag, index) => (
                    <span key={index} className="bg-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full">{tag}</span>
                ))}
            </div>
            <a href={demoLink} className="text-violet-400 font-semibold hover:underline">View Demo &rarr;</a>
        </div>
    </div>
);

export const SkillBadge = ({ icon, name }) => (
    <div className="flex items-center gap-3 glass-effect px-4 py-2 rounded-lg">
        {icon}
        <span>{name}</span>
    </div>
);

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: "#about", label: "About" },
        { href: "#projects", label: "Projects" },
        { href: "#skills", label: "Skills" },
        { href: "#contact", label: "Contact" },
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-effect ${isScrolled ? 'bg-slate-900/80' : ''}`}>
            <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    <a href="#hero" className="text-xl font-bold tracking-wider hover:text-violet-400 transition-colors">NI</a>
                    <nav className="hidden md:flex space-x-8">
                        {navLinks.map(link => (
                            <a key={link.href} href={link.href} className="text-slate-300 hover:text-violet-400 transition-colors">{link.label}</a>
                        ))}
                    </nav>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-2xl">
                        <svg xmlns="http://www.w000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
                {navLinks.map(link => (
                    <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="block py-2 px-6 text-slate-300 hover:bg-slate-700">{link.label}</a>
                ))}
            </div>
        </header>
    );
};

export const AnimatedSection = ({ children, id, className = "" }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            if (ref.current) {
                // Check ref.current before calling unobserve in cleanup
                // to avoid issues if the component unmounts before observer fires.
                observer.unobserve(ref.current); 
            }
        };
    }, []);

    return (
        <motion.section
            ref={ref}
            id={id}
            // Tailwind utility classes for animation. The "transition-opacity" 
            // from the original code is kept as a base class.
            className={`transition-opacity duration-600 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${className}`}
        >
            {children}
        </motion.section>
    );
};