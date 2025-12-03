import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom'; 
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaLinkedin, FaGithub, FaTimes } from "react-icons/fa";

import adlImage from "../assets/adlimage.jpeg";
import bcflatsImage from "../assets/bcflatsimage.jpeg";
import nielImage from "../assets/nielimage.jpg";


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

const ProjectCard = ({ imgSrc, title, description, tags, demoLink, isInternal }) => (
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
            <p className="text-[var(--text-secondary)] mb-4 text-sm sm:text-base flex-grow line-clamp-3">{description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag, index) => (
                    <span key={index} className="bg-[var(--tag-bg)] text-[var(--tag-text)] text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full">{tag}</span>
                ))}
            </div>
            
            {isInternal ? (
                <Link to={demoLink} className="text-[var(--accent-link)] font-semibold text-sm hover:underline mt-auto inline-flex items-center gap-1">
                    View Gallery &rarr;
                </Link>
            ) : (
                <a href={demoLink} target="_blank" rel="noreferrer" className="text-[var(--accent-link)] font-semibold text-sm hover:underline mt-auto inline-flex items-center gap-1">
                    View Demo &rarr;
                </a>
            )}
        </div>
    </div>
);

const SkillBadge = ({ icon, name }) => (
    <div className="flex items-center gap-3 glass-effect px-4 py-3 rounded-lg hover:bg-white/5 transition-colors cursor-default w-full sm:w-auto justify-center sm:justify-start">
        <div className="shrink-0">{icon}</div>
        <span className="font-medium text-sm sm:text-base">{name}</span>
    </div>
);


export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const projects = [
        {
            imgSrc: adlImage,
            title: "Online Hotel Booking System",
            description: "A comprehensive reservation platform featuring real-time availability, secure payment processing, and an admin dashboard.",
            tags: ["Laravel", "PHP", "MySQL", "Bootstrap"],
            demoLink: "#",
            isInternal: false
        },
        {
            imgSrc: bcflatsImage,
            title: "Hotel Management App",
            description: "An automated solution for room organization, check-in/out tracking, and revenue reporting.",
            tags: ["Angular", "Node.js", "Sequelize", "Tailwind"],
            demoLink: "https://hotelbookingui.onrender.com/",
            isInternal: false
        },
        {
            imgSrc: "https://placehold.co/600x400/8b5cf6/ffffff?text=Graphic+Arts", // Replace with your art later
            title: "Graphic Design Gallery",
            description: "A collection of my creative works including logos, posters, social media kits, and UI mockups.",
            tags: ["Photoshop", "Illustrator", "Figma", "Canva"],
            demoLink: "/graphics", // Points to your route
            isInternal: true       // Tells card to use <Link>
        }
    ];

    const skills = [
        { icon: <svg className="w-6 h-6 text-sky-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 3.5a1.5 1.5 0 011.494 1.355l.006.145H10v2h1.5a1.5 1.5 0 011.494 1.355l.006.145H10v2h3a1.5 1.5 0 011.494 1.355l.006.145H10v2h4.5a1.5 1.5 0 011.494 1.355l.006.145H10a8 8 0 110-16zm0 2a6 6 0 100 12 6 6 0 000-12z"/></svg>, name: "React" },
        { icon: <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM5.5 6.5A.5.5 0 016 6h8a.5.5 0 01.5.5v2a.5.5 0 01-1 0V7H6v1.5a.5.5 0 01-1 0v-2zM6 10h8v3a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-3z"/></svg>, name: "JavaScript" },
        { icon: <svg className="w-6 h-6 text-sky-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 0a10 10 0 100 20 10 10 0 000-20zM8.5 15.5a1 1 0 11-2 0 1 1 0 012 0zm2-7a1 1 0 011-1h1a1 1 0 110 2h-.5v3a1 1 0 11-2 0v-3.5a1 1 0 011-1.5z"/></svg>, name: "HTML5" },
        { icon: <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 20a10 10 0 100-20 10 10 0 000 20zm-2-9a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0zm-2 4a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/></svg>, name: "CSS3" },
        { icon: <svg className="w-6 h-6 text-teal-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm4.6-9.4a.5.5 0 010 .8l-5 5a.5.5 0 01-.7 0l-3-3a.5.5 0 11.7-.7L9.25 13.9l4.65-4.65a.5.5 0 01.7 0z"/></svg>, name: "Tailwind" },
        { icon: <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 0C4.477 0 0 4.477 0 10c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.65.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.578.688.482A10.001 10.001 0 0020 10c0-5.523-4.477-10-10-10z"/></svg>, name: "Git" },
        { icon: <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.125-4.334a.75.75 0 11-1.06-1.06L9.69 10.25 7.815 8.375a.75.75 0 111.06-1.06L10.75 9.19l1.875-1.875a.75.75 0 111.06 1.06L11.81 10.25l1.875 1.875a.75.75 0 11-1.06 1.06L10.75 11.31l-1.875 1.875z"/></svg>, name: "Node.js" },
        { icon: <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path d="M3 3h14v14H3V3zm2 2v10h10V5H5z"/></svg>, name: "Laravel" },
        { icon: <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" /></svg>, name: "C" },
        { icon: <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" /><text x="6" y="14" fontSize="8" fill="white">C++</text></svg>, name: "C++" },
        { icon: <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" /><text x="5" y="14" fontSize="8" fill="white">C#</text></svg>, name: "C#" },
        { icon: <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2L2 6v8l8 4 8-4V6l-8-4z"/></svg>, name: "Angular" },
        { icon: <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4h12v12H4V4zm6 2a4 4 0 100 8 4 4 0 000-8z"/></svg>, name: "MySQL" },
    ];

    return (
        <div className="pt-20 relative z-10"> 
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
                            <button onClick={() => setIsModalOpen(false)} className="absolute top-3 right-3 text-[var(--text-secondary)] hover:text-red-500 transition-colors p-2">
                                <FaTimes size={20} />
                            </button>

                            <h3 className="text-xl font-bold mb-2">Connect With Me</h3>
                            <p className="text-[var(--text-secondary)] mb-6 text-sm">Find me on these platforms:</p>

                            <div className="grid grid-cols-3 gap-4 justify-items-center">
                                {[
                                    { icon: <FaFacebook />, color: "hover:text-blue-600", link: "https://www.facebook.com/nielivan.eroy" },
                                    { icon: <FaTwitter />, color: "hover:text-sky-400", link: "https://x.com/" },
                                    { icon: <FaInstagram />, color: "hover:text-pink-600", link: "https://www.instagram.com/airroy_04/" },
                                    { icon: <FaGithub />, color: "hover:text-gray-400", link: "https://github.com/niruusenseii" },
                                    { icon: <FaLinkedin />, color: "hover:text-blue-700", link: "https://linkedin.com/" },
                                    { icon: <FaEnvelope />, color: "hover:text-red-500", link: "mailto:johndoe@example.com" },
                                ].map((social, i) => (
                                    <a key={i} href={social.link} target="_blank" rel="noreferrer" className={`text-3xl text-[var(--text-secondary)] transition-all transform hover:scale-110 ${social.color}`}>
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <AnimatedSection id="hero" className="min-h-[90vh] flex items-center justify-center container mx-auto px-6"> 
                <div className="max-w-4xl text-center md:text-left"> 
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mb-6">
                        Hi, I'm <span className="gradient-text">Niel Ivan</span>.
                        <br className="hidden md:block" />
                        I build things for the web.
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto md:mx-0 mb-8 leading-relaxed">
                        A passionate developer based in Consolacion, Cebu. I specialize in creating beautiful, intuitive, and high-performance web applications.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <button onClick={() => setIsModalOpen(true)} className="bg-[var(--accent-violet-primary)] text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-[var(--accent-violet-hover)] hover:-translate-y-1 transition-all duration-300">
                            Let's Talk
                        </button>
                        
                        <Link 
                            to="/graphics" 
                            className="border-[var(--border-color-light)] border text-[var(--text-secondary)] font-semibold px-8 py-3.5 rounded-lg hover:bg-[var(--accent-violet-primary)] hover:text-white hover:-translate-y-1 transition-all duration-300"
                        >
                            View Graphic Arts 🎨
                        </Link>
                    </div>
                </div>
            </AnimatedSection>

            <AnimatedSection id="about" className="py-16 md:py-24 container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
                    <div className="w-full max-w-xs md:max-w-md md:w-1/3 relative group">
                        <div className="absolute inset-0 bg-[var(--accent-violet-primary)] rounded-2xl transform rotate-6 opacity-20 group-hover:rotate-3 transition-transform duration-300"></div>
                        <img src={nielImage} alt="Niel" className="rounded-2xl shadow-2xl relative z-10 w-full h-auto object-cover aspect-square" />
                    </div>
                    <div className="w-full md:w-2/3 text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start">
                            About Me <span className="hidden md:block h-px w-20 bg-[var(--border-color-light)]"></span>
                        </h2>
                        <div className="space-y-4 text-[var(--text-secondary)] text-base md:text-lg leading-relaxed">
                            <p>
                                Hello! I'm Niel Ivan, a developer with a passion for creating engaging user experiences. My journey into web development started years ago, and since then, I've been honing my skills in modern web technologies.
                            </p>
                            <p>
                                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, creating graphic designs, or just relaxing in Consolacion or Borbon.
                            </p>
                        </div>
                    </div>
                </div>
            </AnimatedSection>

            <AnimatedSection id="projects" className="py-16 md:py-24 container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
                    <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">Some of the projects I've built to demonstrate my skills in frontend and backend development.</p>
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
                    <p className="text-[var(--text-secondary)] text-lg mb-10">
                        I'm currently available for freelance work and open to new opportunities. If you have a project in mind or just want to say hello, feel free to reach out.
                    </p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-block bg-[var(--accent-violet-primary)] text-white font-semibold px-10 py-4 rounded-full shadow-lg hover:shadow-accent/40 hover:-translate-y-1 transition-all duration-300 text-lg"
                    >
                        Say Hello
                    </button>
                </div>
            </AnimatedSection>
        </div>
    );
};