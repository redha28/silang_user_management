import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import FlashMessage from '../Components/FlashMessage';

export default function Layout({ children, title }) {
    const { auth } = usePage().props;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Fix scroll effect for header to prevent repeated animations
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        // Initial check
        handleScroll();

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    // Close mobile menu on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <FlashMessage />

            <header
                className={`sticky w-full top-0 z-50 transition-all duration-300 ${
                    scrolled
                        ? 'bg-gray-800 shadow-lg py-2'
                        : 'bg-gray-900 py-4'
                }`}
            >
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href="/" className="text-xl font-bold text-white flex items-center group">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-blue-400 group-hover:text-blue-300 transition-transform duration-300 group-hover:rotate-12" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                <span className="transition-colors duration-300 group-hover:text-blue-300">SILANG</span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-4">
                            <Link href="/" className="text-gray-300 hover:text-white hover:scale-105 transition-all duration-200">Beranda</Link>

                            {auth?.user ? (
                                <>
                                    <Link href="/users" className="text-gray-300 hover:text-white hover:scale-105 transition-all duration-200">Pengguna</Link>
                                    <div className="flex items-center space-x-4">
                                        <span className="text-gray-300">
                                            {auth.user.name}
                                            {auth.user.role === 'admin' && (
                                                <span className="ml-1 px-2 py-1 bg-red-600 text-white text-xs rounded-full animate-pulse">
                                                    Admin
                                                </span>
                                            )}
                                        </span>
                                        <Link
                                            href="/logout"
                                            method="post"
                                            as="button"
                                            className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                                        >
                                            Keluar
                                        </Link>
                                    </div>
                                </>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <Link
                                        href="/login"
                                        className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                                    >
                                        Masuk
                                    </Link>
                                </div>
                            )}
                        </nav>

                        {/* Hamburger Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-gray-300 hover:text-white focus:outline-none transition-transform duration-300 transform hover:scale-110"
                                aria-label="Toggle menu"
                            >
                                {!isMobileMenuOpen ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <div
                        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                            isMobileMenuOpen
                                ? 'max-h-screen opacity-100 py-4'
                                : 'max-h-0 opacity-0'
                        }`}
                    >
                        <nav className="flex flex-col space-y-4">
                            <Link
                                href="/"
                                className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded transition-colors duration-200"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Beranda
                            </Link>

                            {auth?.user ? (
                                <>
                                    <Link
                                        href="/users"
                                        className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded transition-colors duration-200"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Pengguna
                                    </Link>
                                    <div className="border-t border-gray-700 pt-2">
                                        <div className="flex items-center justify-between px-3 py-2">
                                            <span className="text-gray-300">
                                                {auth.user.name}
                                                {auth.user.role === 'admin' && (
                                                    <span className="ml-1 px-2 py-1 bg-red-600 text-white text-xs rounded-full">
                                                        Admin
                                                    </span>
                                                )}
                                            </span>
                                            <Link
                                                href="/logout"
                                                method="post"
                                                as="button"
                                                className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded transition-all duration-200"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                Keluar
                                            </Link>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col space-y-2 pt-2">
                                    <Link
                                        href="/login"
                                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-center transition-all duration-200"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Masuk
                                    </Link>
                                </div>
                            )}
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main content with flex-grow to push footer down */}
            <main className="flex-grow container mx-auto p-4 pt-8">
                {title && <h1 className="text-3xl font-bold mb-6">{title}</h1>}
                <div className="animate-fadeIn">
                    {children}
                </div>
            </main>

            {/* Footer stays at the bottom */}
            <footer className="bg-gray-800 text-white text-center py-4 mt-8">
                <div className="container mx-auto">
                    <p>© {new Date().getFullYear()} SILANG App. Hak Cipta Dilindungi.</p>
                </div>
            </footer>
        </div>
    );
}
