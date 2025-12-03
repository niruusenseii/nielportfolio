import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';
import { FaTimes, FaArrowLeft } from "react-icons/fa";

// Sample Data (You can replace these URLs with your own images later)
const designWorks = [
    { id: 1, category: "Logo", title: "Tech Start-Up", img: "https://placehold.co/600x600/1e293b/8b5cf6?text=Logo+Design" },
    { id: 2, category: "Social Media", title: "Summer Campaign", img: "https://placehold.co/600x800/1e293b/38b2ac?text=Social+Post" },
    { id: 3, category: "Poster", title: "Music Festival", img: "https://placehold.co/600x900/1e293b/f472b6?text=Event+Poster" },
    { id: 4, category: "UI/UX", title: "Mobile App Mockup", img: "https://placehold.co/600x700/1e293b/facc15?text=App+UI" },
    { id: 5, category: "Logo", title: "Coffee Brand", img: "https://placehold.co/600x600/1e293b/fb923c?text=Coffee+Logo" },
    { id: 6, category: "Social Media", title: "Product Launch", img: "https://placehold.co/600x600/1e293b/4ade80?text=Product+Ad" },
];

const GraphicDesignSection = () => {
    const [filter, setFilter] = useState('All');
    const [selectedImage, setSelectedImage] = useState(null);

    // Get unique categories
    const categories = ['All', ...new Set(designWorks.map(item => item.category))];

    const filteredWorks = filter === 'All' 
        ? designWorks 
        : designWorks.filter(item => item.category === filter);

    return (
        // ✅ FIX 1: Added 'pt-32' (padding top) so header doesn't cover content
        // ✅ FIX 2: Added 'relative z-10' so this page sits ON TOP of the background
        <motion.section
            id="graphics"
            className="pt-32 pb-20 container mx-auto px-6 min-h-screen relative z-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {/* BACK BUTTON */}
            <div className="mb-8">
                <Link 
                    to="/" 
                    className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-link)] transition-colors font-medium"
                >
                    <FaArrowLeft /> Back to Home
                </Link>
            </div>

            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Graphic Design Gallery</h2>
                <p className="text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
                    Beyond code, I explore creativity through visual design. Here are some of my works.
                </p>

                {/* Filter Buttons */}
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

            {/* Masonry-style Grid */}
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
                            className="relative group rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all"
                            onClick={() => setSelectedImage(work)}
                        >
                            <img 
                                src={work.img} 
                                alt={work.title} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 aspect-[3/4] md:aspect-auto"
                            />
                            
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-4">
                                <span className="text-[var(--accent-violet-primary)] text-xs font-bold uppercase tracking-wider mb-2">{work.category}</span>
                                <h3 className="text-white font-bold text-lg">{work.title}</h3>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <div 
                        className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center"
                            onClick={(e) => e.stopPropagation()} 
                        >
                            <button 
                                onClick={() => setSelectedImage(null)}
                                className="absolute -top-12 right-0 md:-right-10 text-white hover:text-red-500 text-3xl transition-colors z-50"
                            >
                                <FaTimes />
                            </button>
                            <img 
                                src={selectedImage.img} 
                                alt={selectedImage.title} 
                                className="w-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
                            />
                            <div className="mt-4 text-center">
                                <h3 className="text-white text-xl font-bold">{selectedImage.title}</h3>
                                <p className="text-gray-400">{selectedImage.category}</p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.section>
    );
};

export default GraphicDesignSection;