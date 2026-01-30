import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ProfileDropdown from './ProfileDropdown';

const Navbar = () => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="sticky top-0 z-40 glass-strong border-b border-border">
            <div className="container-custom">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold gradient-text hidden sm:block">
                            AI E-Book Creator
                        </span>
                    </Link>

                    {/* Navigation */}
                    {isAuthenticated ? (
                        <div className="flex items-center gap-6">
                            <Link
                                to="/dashboard"
                                className={`text-sm font-medium transition-colors ${isActive('/dashboard')
                                        ? 'text-primary'
                                        : 'text-text-secondary hover:text-text-primary'
                                    }`}
                            >
                                Dashboard
                            </Link>
                            <ProfileDropdown />
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login">
                                <button className="text-text-secondary hover:text-text-primary transition-colors">
                                    Sign In
                                </button>
                            </Link>
                            <Link to="/signup">
                                <button className="btn-primary px-4 py-2 text-sm rounded-lg">
                                    Get Started
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
