import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';
import { FaTimes, FaArrowLeft, FaSearchPlus } from "react-icons/fa";

const designWorks = [
    { id: 1, category: "Logo", title: "Tech Start-Up", img: "https://placehold.co/600x600/1e293b/8b5cf6?text=Logo+Design" },
    { id: 2, category: "Social Media", title: "Summer Campaign", img: "https://placehold.co/600x800/1e293b/38b2ac?text=Social+Post" },
    { id: 3, category: "Poster", title: "Music Festival", img: "https://placehold.co/600x900/1e293b/f472b6?text=Event+Poster" },
    { id: 4, category: "UI/UX", title: "Mobile App Mockup", img: "https://placehold.co/600x700/1e293b/facc15?text=App+UI" },
    
    { id: 7, category: "T-Shirt", title: "Retro Streetwear", img: "https://placehold.co/600x800/1e293b/ef4444?text=Retro+Tee+Mockup" },
    { id: 8, category: "T-Shirt", title: "Corporate Merch", img: "https://placehold.co/600x800/1e293b/3b82f6?text=Company+Polo" },
    { id: 9, category: "T-Shirt", title: "Minimalist Typography", img: "https://placehold.co/600x800/1e293b/10b981?text=Typo+Tee" },
    
    { id: 5, category: "Logo", title: "Coffee Brand", img: "https://placehold.co/600x600/1e293b/fb923c?text=Coffee+Logo" },
    { id: 6, category: "Social Media", title: "Product Launch", img: "https://placehold.co/600x600/1e293b/4ade80?text=Product+Ad" },
];

const GraphicDesignSection = () => {
    const [filter, setFilter] = useState('All');
    const [selectedImage, setSelectedImage] = useState(null);

    const categories = ['All', ...new Set(designWorks.map(item => item.category))];

    const filteredWorks = filter === 'All' 
        ? designWorks 
        : designWorks.filter(item => item.category === filter);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setSelectedImage(null);
        };
        
        if (selectedImage) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [selectedImage]);

    return (
        <>
            <motion.section
                id="graphics"
                className="pt-32 pb-20 container mx-auto px-6 min-h-screen relative z-10"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {/* Back Navigation */}
                <div className="mb-8">
                    <Link 
                        to="/" 
                        className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-link)] transition-colors font-medium group"
                    >
                        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Home
                    </Link>
                </div>

                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Graphic Design & Merch</h2>
                    <p className="text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
                        Beyond code, I explore creativity through visual design, apparel, and branding.
                    </p>

                    {/* Filter Buttons (Will now include "T-Shirt") */}
                    <div className="flex flex-wrap justify-center gap-3 mb-10">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                                    filter === cat 
                                    ? 'bg-[var(--accent-violet-primary)] text-white shadow-lg scale-105' 
                                    : 'glass-effect text-[var(--text-secondary)] hover:text-[var(--text-color)] hover:bg-[var(--tag-bg)]'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid Gallery */}
                <motion.div 
                    layout 
                    className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
                >
                    <AnimatePresence>
                        {filteredWorks.map((work) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                                key={work.id}
                                className="relative group rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all bg-[var(--glass-bg)]"
                                onClick={() => setSelectedImage(work)}
                            >
                                <img 
                                    src={work.img} 
                                    alt={work.title} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 aspect-[3/4] md:aspect-auto"
                                    loading="lazy"
                                />
                                
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-4">
                                    <FaSearchPlus className="text-white text-3xl mb-3 opacity-80" />
                                    <span className="text-[var(--accent-violet-primary)] text-xs font-bold uppercase tracking-wider mb-2">{work.category}</span>
                                    <h3 className="text-white font-bold text-lg">{work.title}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </motion.section>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <div 
                        className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button 
                            onClick={() => setSelectedImage(null)}
                            className="fixed top-6 right-6 z-[210] bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-all backdrop-blur-sm"
                            aria-label="Close Modal"
                        >
                            <FaTimes size={24} />
                        </button>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative max-w-5xl w-full max-h-screen flex flex-col items-center justify-center"
                            onClick={(e) => e.stopPropagation()} 
                        >
                            <img 
                                src={selectedImage.img} 
                                alt={selectedImage.title} 
                                className="w-auto max-h-[80vh] object-contain rounded-lg shadow-2xl mb-6"
                            />
                            
                            <div className="text-center text-white">
                                <h3 className="text-2xl font-bold mb-1">{selectedImage.title}</h3>
                                <p className="text-gray-400 text-lg flex items-center justify-center gap-2">
                                    <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent-violet-primary)]"></span>
                                    {selectedImage.category}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default GraphicDesignSection;