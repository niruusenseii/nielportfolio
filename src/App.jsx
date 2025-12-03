import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaLinkedin, FaGithub, FaBars, FaTimes } from "react-icons/fa";
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
        '--bg-color': isDark ? '#0F172A' : '#F8FAFC',        // Slate 900 -> Slate 50
        '--text-color': isDark ? '#E2E8F0' : '#1E293B',      // Slate 200 -> Slate 800
        '--text-secondary': isDark ? '#94A3B8' : '#64748B',  // Slate 400 -> Slate 500
        
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
            overflow-x: hidden; /* Prevent horizontal scroll */
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
        
        /* Utility Helpers */
        .text-secondary { color: var(--text-secondary) !important; }
        .border-theme { border-color: var(--border-color-light) !important; }
        .bg-tag { background-color: var(--tag-bg) !important; color: var(--tag-text) !important; }
        .text-accent { color: var(--accent-link) !important; }
        .bg-accent { background-color: var(--accent-violet-primary) !important; }
        .bg-accent:hover { background-color: var(--accent-violet-hover) !important; }
    `;
};


const ProjectCard = ({ imgSrc, title, description, tags, demoLink }) => (
    <div className="glass-effect rounded-xl overflow-hidden group flex flex-col h-full transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
        <div className="relative overflow-hidden h-48 sm:h-56">
            <img 
                src={imgSrc} 
                alt={title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/1e293b/e2e8f0?text=Image+Not+Found'; }} 
            />
        </div>
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-secondary mb-4 text-sm sm:text-base flex-grow line-clamp-3">{description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag, index) => (
                    <span key={index} className="bg-tag text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full">{tag}</span>
                ))}
            </div>
            <a href={demoLink} target="_blank" rel="noreferrer" className="text-accent font-semibold text-sm hover:underline mt-auto inline-flex items-center gap-1">
                View Demo &rarr;
            </a>
        </div>
    </div>
);

const SkillBadge = ({ icon, name }) => (
    <div className="flex items-center gap-3 glass-effect px-4 py-3 rounded-lg hover:bg-white/5 transition-colors cursor-default w-full sm:w-auto justify-center sm:justify-start">
        <div className="shrink-0">{icon}</div>
        <span className="font-medium text-sm sm:text-base">{name}</span>
    </div>
);

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
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
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'header-scrolled py-3' : 'py-5'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <a href="#hero" className="z-50 relative">
                    <img src={logoImage} alt="NI Logo" className="h-8 w-auto md:h-10 transition-all" />
                </a>

                <nav className="hidden md:flex space-x-8">
                    {navLinks.map(link => (
                        <a key={link.href} href={link.href} className="text-sm font-medium hover:text-accent transition-colors opacity-90 hover:opacity-100">
                            {link.label}
                        </a>
                    ))}
                </nav>

                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)} 
                    className="md:hidden text-2xl z-50 focus:outline-none text-secondary hover:text-accent transition-colors"
                >
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-0 left-0 w-full h-screen bg-[var(--bg-color)] flex flex-col items-center justify-center space-y-8 md:hidden shadow-xl"
                    >
                        {navLinks.map(link => (
                            <a 
                                key={link.href} 
                                href={link.href} 
                                onClick={() => setIsMenuOpen(false)} 
                                className="text-2xl font-bold hover:text-accent transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

const AnimatedSection = ({ children, id, className = "" }) => (
    <motion.section
        id={id}
        className={className}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
    >
        {children}
    </motion.section>
);

export default function App() {
    const theme = useTimeBasedTheme(); 

    const projects = [
        {
            imgSrc: adlImage,
            title: "Online Hotel Booking System",
            description: "A comprehensive reservation platform featuring real-time availability, secure payment processing, and an admin dashboard for efficient property management.",
            tags: ["Laravel", "PHP", "MySQL", "Bootstrap"],
            demoLink: "#"
        },
        {
            imgSrc: bcflatsImage,
            title: "Hotel Management App",
            description: "An automated solution for room organization, check-in/out tracking, and revenue reporting. Designed to streamline daily hotel operations.",
            tags: ["Angular", "Node.js", "Sequelize", "Tailwind"],
            demoLink: "https://hotelbookingui.onrender.com/"
        },
        {
            imgSrc: "https://placehold.co/600x400/1e293b/a78bfa?text=Portfolio",
            title: "Personal Portfolio",
            description: "A responsive, high-performance portfolio website built with React and Framer Motion to showcase my development journey.",
            tags: ["React", "Framer Motion", "CSS Variables"],
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
        <div className="min-h-screen relative selection:bg-violet-500/30">
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

            <AnimatePresence>
                {isModalOpen && (
                    <div 
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            className="glass-effect rounded-2xl p-6 md:p-8 w-full max-w-sm relative text-center shadow-2xl"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button onClick={() => setIsModalOpen(false)} className="absolute top-3 right-3 text-secondary hover:text-red-500 transition-colors p-2">
                                <FaTimes size={20} />
                            </button>

                            <h3 className="text-xl font-bold mb-2">Connect With Me</h3>
                            <p className="text-secondary mb-6 text-sm">Find me on these platforms:</p>

                            <div className="grid grid-cols-3 gap-4 justify-items-center">
                                {[
                                    { icon: <FaFacebook />, color: "hover:text-blue-600", link: "https://www.facebook.com/nielivan.eroy" },
                                    { icon: <FaTwitter />, color: "hover:text-sky-400", link: "https://x.com/" },
                                    { icon: <FaInstagram />, color: "hover:text-pink-600", link: "https://www.instagram.com/airroy_04/" },
                                    { icon: <FaGithub />, color: "hover:text-gray-400", link: "https://github.com/niruusenseii" },
                                    { icon: <FaLinkedin />, color: "hover:text-blue-700", link: "https://linkedin.com/" },
                                    { icon: <FaEnvelope />, color: "hover:text-red-500", link: "mailto:johndoe@example.com" },
                                ].map((social, i) => (
                                    <a key={i} href={social.link} target="_blank" rel="noreferrer" className={`text-3xl text-secondary transition-all transform hover:scale-110 ${social.color}`}>
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <main className="relative z-10 pt-20">
                <AnimatedSection id="hero" className="min-h-[90vh] flex items-center justify-center container mx-auto px-6"> 
                    <div className="max-w-4xl text-center md:text-left"> 
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mb-6">
                            Hi, I'm <span className="gradient-text">Niel Ivan</span>.
                            <br className="hidden md:block" />
                            I build things for the web.
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-secondary max-w-2xl mx-auto md:mx-0 mb-8 leading-relaxed">
                            A passionate developer based in Consolacion, Cebu. I specialize in creating beautiful, intuitive, and high-performance web applications that solve real-world problems.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <button onClick={() => setIsModalOpen(true)} className="bg-accent text-white font-semibold px-8 py-3.5 rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                Let's Talk
                            </button>
                            <a href="#projects" className="border-theme border text-secondary font-semibold px-8 py-3.5 rounded-lg hover:bg-[var(--tag-bg)] hover:text-[var(--text-color)] transition-all duration-300">
                                View Work
                            </a>
                        </div>
                    </div>
                </AnimatedSection>

                <AnimatedSection id="about" className="py-16 md:py-24 container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
                        <div className="w-full max-w-xs md:max-w-md md:w-1/3 relative group">
                            <div className="absolute inset-0 bg-accent rounded-2xl transform rotate-6 opacity-20 group-hover:rotate-3 transition-transform duration-300"></div>
                            <img src={nielImage} alt="Niel" className="rounded-2xl shadow-2xl relative z-10 w-full h-auto object-cover aspect-square" />
                        </div>
                        <div className="w-full md:w-2/3 text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start">
                                About Me <span className="hidden md:block h-px w-20 bg-[var(--border-color-light)]"></span>
                            </h2>
                            <div className="space-y-4 text-secondary text-base md:text-lg leading-relaxed">
                                <p>
                                    Hello! I'm Niel Ivan, a developer with a passion for creating engaging user experiences. My journey into web development started years ago, and since then, I've been honing my skills in modern web technologies.
                                </p>
                                <p>
                                    When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or just relaxing in Consolacion or Borbon.
                                </p>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                <AnimatedSection id="projects" className="py-16 md:py-24 container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
                        <p className="text-secondary max-w-2xl mx-auto">Some of the projects I've built to demonstrate my skills in frontend and backend development.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {projects.map((project, i) => (
                            <ProjectCard key={i} {...project} />
                        ))}
                    </div>
                </AnimatedSection>

                <AnimatedSection id="skills" className="py-16 md:py-24 container mx-auto px-6 bg-[var(--tag-bg)]/20">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-12">Technical Skills</h2>
                        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                            {skills.map((skill) => (
                                <SkillBadge key={skill.name} {...skill} />
                            ))}
                        </div>
                    </div>
                </AnimatedSection>

                <AnimatedSection id="contact" className="py-20 md:py-32 container mx-auto px-6 text-center">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Get In Touch</h2>
                        <p className="text-secondary text-lg mb-10">
                            I'm currently available for freelance work and open to new opportunities. If you have a project in mind or just want to say hello, feel free to reach out.
                        </p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="inline-block bg-accent text-white font-semibold px-10 py-4 rounded-full shadow-lg hover:shadow-accent/40 hover:-translate-y-1 transition-all duration-300 text-lg"
                        >
                            Say Hello
                        </button>
                    </div>
                </AnimatedSection>
            </main>

            <footer className="py-8 border-t border-theme glass-effect">
                <div className="container mx-auto px-6 text-center text-secondary text-sm">
                    <p>&copy; 2025 Niel Ivan Eroy.</p>
                </div>
            </footer>
        </div>
    );
}