import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import adlImage from "./assets/adlimage.jpeg";
import bcflatsImage from "./assets/bcflatsimage.jpeg";
import nielImage from "./assets/nielimage.jpg";
import logoImage from "./assets/niel.png";

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
        '--bg-color': isDark ? '#0F172A' : '#FFFFFF',          // Slate 900 -> White
        '--text-color': isDark ? '#E2E8F0' : '#1E293B',        // Slate 200 -> Slate 800
        '--text-secondary': isDark ? '#94A3B8' : '#64748B',    // Slate 400 -> Slate 500
        
        '--glass-bg': isDark ? 'rgba(109, 109, 109, 0.05)' : 'rgba(241, 245, 249, 0.7)', 
        '--glass-border': isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        
        '--header-scrolled-bg': isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.9)', 

        '--tag-bg': isDark ? '#334155' : '#E2E8F0',            // Slate 700 -> Slate 200
        '--tag-text': isDark ? '#E2E8F0' : '#1E293B',          // Slate 200 -> Slate 800

        '--border-color-dark': isDark ? '#1E293B' : '#E2E8F0',      // Slate 800 -> Slate 200
        '--border-color-light': isDark ? '#475569' : '#94A3B8',     // Slate 600 -> Slate 400
        
        '--accent-violet-primary': '#8B5CF6', // Violet 600
        '--accent-violet-hover': '#7C3AED',   // Violet 700
        '--accent-link': '#A78BFA',           // Violet 400

        '--footer-text': isDark ? '#64748B' : '#94A3B8',        // Slate 500 -> Slate 400
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
            transition: background-color 0.3s ease, color 0.3s ease; /* Smooth transition */
        }
        .glass-effect {
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            border: 1px solid var(--glass-border);
        }
        .gradient-text {
            background: linear-gradient(to right, #299dfcff, #2e4dfcff); 
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .antialiased {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        
        /* Tailwind Utility Overrides */

        /* Text Colors */
        .text-slate-400 { color: var(--text-secondary) !important; }
        .text-slate-300 { color: var(--text-color) !important; }
        .text-slate-500 { color: var(--footer-text) !important; }
        
        /* Background Colors */
        .bg-slate-900\\/80 { background-color: var(--header-scrolled-bg) !important; } /* Scrolled Header */
        .bg-slate-700 { background-color: var(--tag-bg) !important; color: var(--tag-text) !important; }
        .hover\\:bg-slate-700:hover { background-color: var(--tag-bg) !important; color: var(--tag-text) !important; }
        
        /* Borders */
        .border-slate-800 { border-color: var(--border-color-dark) !important; } /* Footer border */
        .border-slate-600 { border-color: var(--border-color-light) !important; } /* Secondary button border */
        
        /* Accent colors that are kept constant (just ensure !important if needed) */
        .text-violet-400 { color: var(--accent-link) !important; }
        .hover\\:text-violet-400:hover { color: var(--accent-link) !important; }
        .bg-violet-600 { background-color: var(--accent-violet-primary) !important; }
        .hover\\:bg-violet-700:hover { background-color: var(--accent-violet-hover) !important; }

        /* Modal Background */
        .bg-slate-900 { background-color: var(--bg-color) !important; } 
    `;
};



const ProjectCard = ({ imgSrc, title, description, tags, demoLink }) => (
    <div className="glass-effect rounded-xl overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300">
        <img src={imgSrc} alt={title} className="w-full h-48 object-cover" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/1e293b/e2e8f0?text=Image+Not+Found'; }} />
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

const SkillBadge = ({ icon, name }) => (
    <div className="flex items-center gap-3 glass-effect px-4 py-2 rounded-lg">
        {icon}
        <span>{name}</span>
    </div>
);

const Header = () => {
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
                    <a href="#hero" className="text-xl font-bold tracking-wider hover:text-violet-400 transition-colors">
                        <img 
                            src={logoImage} 
                            alt="NI Logo" 
                            className="h-8 w-auto inline-block"
                        />
                    </a>
                    <nav className="hidden md:flex space-x-8">
                        {navLinks.map(link => (
                            <a key={link.href} href={link.href} className="text-slate-300 hover:text-violet-400 transition-colors">{link.label}</a>
                        ))}
                    </nav>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

const AnimatedSection = ({ children, id, className = "" }) => {
    return (
        <motion.section
            id={id}
            className={className}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {children}
        </motion.section>
    );
};


export default function App() {
    const theme = useTimeBasedTheme(); 

    const projects = [
        {
            imgSrc: adlImage,
            title: "Online Hotel Booking System",
            description: "A hotel reservation website with a modern design, booking management, and a seamless checkout process.",
            tags: ["Laravel", "PHP", "CSS", "HTML", "JS"],
            demoLink: "#"
        },
        {
            imgSrc: bcflatsImage,
            title: "Online Hotel Booking App",
            description: "A full-automated hotel reservation website to help users organize rooms, set check-ins/outs, and track bookings with an intuitive interface.",
            tags: ["Angular", "Node.js", "MySQL", "Tailwind CSS",],
            demoLink: "https://hotelbookingui.onrender.com/"
        },
        {
            imgSrc: "https://placehold.co/600x400/1e293b/a78bfa?text=Project+Three",
            title: "Portfolio Website",
            description: "A personal portfolio website (like this one!) to showcase skills and projects, built with performance in mind.",
            tags: ["HTML", "CSS", "JavaScript", "React"],
            demoLink: "#"
        }
    ];

    const skills = [
        { 
            icon: <svg className="w-6 h-6 text-sky-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 3.5a1.5 1.5 0 011.494 1.355l.006.145H10v2h1.5a1.5 1.5 0 011.494 1.355l.006.145H10v2h3a1.5 1.5 0 011.494 1.355l.006.145H10v2h4.5a1.5 1.5 0 011.494 1.355l.006.145H10a8 8 0 110-16zm0 2a6 6 0 100 12 6 6 0 000-12z"/></svg>, 
            name: "React" 
        },
        { 
            icon: <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM5.5 6.5A.5.5 0 016 6h8a.5.5 0 01.5.5v2a.5.5 0 01-1 0V7H6v1.5a.5.5 0 01-1 0v-2zM6 10h8v3a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-3z"/></svg>, 
            name: "JavaScript (ES6+)" 
        },
        { 
            icon: <svg className="w-6 h-6 text-sky-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 0a10 10 0 100 20 10 10 0 000-20zM8.5 15.5a1 1 0 11-2 0 1 1 0 012 0zm2-7a1 1 0 011-1h1a1 1 0 110 2h-.5v3a1 1 0 11-2 0v-3.5a1 1 0 011-1.5z"/></svg>, 
            name: "HTML5" 
        },
        { 
            icon: <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 20a10 10 0 100-20 10 10 0 000 20zm-2-9a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0zm-2 4a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/></svg>, 
            name: "CSS3" 
        },
        { 
            icon: <svg className="w-6 h-6 text-teal-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm4.6-9.4a.5.5 0 010 .8l-5 5a.5.5 0 01-.7 0l-3-3a.5.5 0 11.7-.7L9.25 13.9l4.65-4.65a.5.5 0 01.7 0z"/></svg>, 
            name: "Tailwind CSS" 
        },
        { 
            icon: <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 0C4.477 0 0 4.477 0 10c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.65.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.578.688.482A10.001 10.001 0 0020 10c0-5.523-4.477-10-10-10z"/></svg>, 
            name: "Git" 
        },
        { 
            icon: <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 0C4.477 0 0 4.477 0 10c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.65.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.578.688.482A10.001 10.001 0 0020 10c0-5.523-4.477-10-10-10z"/></svg>, 
            name: "GitHub" 
        },
        { 
            icon: <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.125-4.334a.75.75 0 11-1.06-1.06L9.69 10.25 7.815 8.375a.75.75 0 111.06-1.06L10.75 9.19l1.875-1.875a.75.75 0 111.06 1.06L11.81 10.25l1.875 1.875a.75.75 0 11-1.06 1.06L10.75 11.31l-1.875 1.875z"/></svg>, 
            name: "Node.js" 
        },
        { 
            icon: <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM7.5 5.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm5 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-2.5 9a4 4 0 01-5 0h5z"/></svg>, 
            name: "Figma" 
        },

        { 
            icon: <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path d="M3 3h14v14H3V3zm2 2v10h10V5H5z"/></svg>, 
            name: "Laravel" 
        },
        { 
            icon: <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" /></svg>, 
            name: "C" 
        },
        { 
            icon: <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" /><text x="6" y="14" fontSize="8" fill="white">C++</text></svg>, 
            name: "C++" 
        },
        { 
            icon: <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" /><text x="5" y="14" fontSize="8" fill="white">C#</text></svg>, 
            name: "C#" 
        },
        { 
            icon: <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2L2 6v8l8 4 8-4V6l-8-4z"/></svg>, 
            name: "Angular" 
        },
        { 
            icon: <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4h12v12H4V4zm6 2a4 4 0 100 8 4 4 0 000-8z"/></svg>, 
            name: "MySQL" 
        },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        injectThemeStyles(theme);

        if (!document.querySelector('script[src="https://cdn.tailwindcss.com"]')) {
            const tailwindScript = document.createElement('script');
            tailwindScript.src = "https://cdn.tailwindcss.com";
            document.head.appendChild(tailwindScript);
        }

        if (!document.querySelector('link[href*="fonts.googleapis.com"]')) {
            const fontLink = document.createElement('link');
            fontLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap";
            fontLink.rel = "stylesheet";
            document.head.appendChild(fontLink);
        }
    }, [theme]);
    
    return (
        <div className="antialiased">
            <div className="absolute top-0 left-0 right-0 z-0 opacity-35" style={{ bottom: 'calc(100% - 650px)' }}> 
                <img 
                    src={nielImage}
                    alt="Abstract background" 
                    className="w-full h-full object-cover transition-all duration-500"
                    style={{ filter: theme === 'dark' ? 'brightness(70%)' : 'grayscale(100%) brightness(180%)' }}
                />
            </div>
            <Header />
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50 -m-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            className="rounded-2xl p-8 text-center shadow-2xl relative w-[90%] max-w-md glass-effect" 
                            initial={{ scale: 0.8, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 20 }}
                            transition={{ type: "spring", stiffness: 200, damping: 18 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                            className="absolute top-4 right-4 text-slate-400 hover:text-white text-2xl"
                            onClick={() => setIsModalOpen(false)}
                            >
                            &times;
                            </button>

                            <h3 className="text-2xl font-bold mb-4">Connect With Me</h3>
                            <p className="text-slate-400 mb-6">
                            Follow or contact me through any of these platforms:
                            </p>

                            <div className="flex justify-center gap-6 text-3xl">
                            <a href="https://www.facebook.com/nielivan.eroy" target="_blank" className="text-blue-500 hover:scale-110 transition-transform">
                                <FaFacebook />
                            </a>
                            <a href="https://x.com/" target="_blank" className="text-sky-400 hover:scale-110 transition-transform">
                                <FaTwitter />
                            </a>
                            <a href="https://www.instagram.com/airroy_04/" target="_blank" className="text-pink-500 hover:scale-110 transition-transform">
                                <FaInstagram />
                            </a>
                            <a href="mailto:johndoe@example.com" className="text-red-400 hover:scale-110 transition-transform">
                                <FaEnvelope />
                            </a>
                            <a href="https://linkedin.com/" target="_blank" className="text-blue-600 hover:scale-110 transition-transform">
                                <FaLinkedin />
                            </a>
                            <a href="https://github.com/niruusenseii" target="_blank" className="text-gray-400 hover:scale-110 transition-transform">
                                <FaGithub />
                            </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <main className="container mx-auto px-6 pt-24">
                <AnimatedSection id="hero" className="min-h-screen flex items-center relative overflow-hidden"> 
                    <div className="relative z-10 max-w-3xl"> 
                        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                            Hi, I'm <span className="gradient-text">Niel Ivan Eroy</span>.
                            <br />
                            I build things for the web.
                        </h1>
                        <p className="mt-6 text-lg md:text-xl text-slate-400">
                            I'm a passionate developer based in Consolacion, Cebu. Specializing in creating beautiful, intuitive, and high-performance web applications.
                        </p>
                        <div className="mt-10">
                            <a href="#contact" className="bg-violet-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-violet-700 transition-all duration-300">
                                Get In Touch
                            </a>
                            <a href="#projects" className="ml-4 border-2 border-slate-600 text-slate-300 font-semibold px-8 py-3 rounded-lg hover:bg-slate-700 transition-all duration-300 hover:text-white">
                                View My Work
                            </a>
                        </div>
                    </div>
                </AnimatedSection>

                <AnimatedSection id="about" className="py-20 md:py-32">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">About Me</h2>
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/3">
                            <img src={nielImage} alt="Niel" className="rounded-full shadow-lg w-64 h-64 md:w-full md:h-auto object-cover mx-auto" />
                        </div>
                        <div className="md:w-2/3">
                            <p className="text-slate-400 mb-4">
                                Hello! I'm Niel Ivan, a developer with a passion for creating engaging user experiences. My journey into web development started years ago, and since then, I've been honing my skills in modern web technologies. I love the challenge of turning complex problems into simple, beautiful, and intuitive designs.
                            </p>
                            <p className="text-slate-400 mb-4">
                                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, creating graphic designs or just relaxing here in Consolacion or Borbon. I'm always eager to learn and grow, both personally and professionally.
                            </p>
                            <p className="text-slate-400">
                                I'm currently seeking new opportunities where I can contribute to a team, solve challenging problems, and create amazing products.
                            </p>
                        </div>
                    </div>
                </AnimatedSection>

                <AnimatedSection id="projects" className="py-20 md:py-32">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">My Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map(project => (
                            <ProjectCard key={project.title} {...project} />
                        ))}
                    </div>
                </AnimatedSection>

                <AnimatedSection id="skills" className="py-20 md:py-32">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">My Skills</h2>
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                            {skills.map(skill => (
                                <SkillBadge key={skill.name} {...skill} />
                            ))}
                        </div>
                    </div>
                </AnimatedSection>

                <AnimatedSection id="contact" className="py-20 md:py-32">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
                        <p className="text-slate-400 mb-8">
                            I'm currently available for freelance work and open to new opportunities. If you have a project in mind or just want to say hello, feel free to reach out. I'll do my best to get back to you!
                        </p>

                        <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-block bg-violet-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-violet-700 transition-all duration-300 text-lg"
                        >
                        Say Hello
                        </button>
                    </div>
                </AnimatedSection>
            </main>

            <footer className="py-8 border-t border-slate-800">
                <div className="container mx-auto px-6 text-center text-slate-500">
                    <p>&copy; 2025 Niel Ivan Eroy. Designed & Built with &hearts;.</p>
                </div>
            </footer>
        </div>
    );
}