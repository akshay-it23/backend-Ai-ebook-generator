import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Dropdown, { DropdownItem, DropdownDivider } from '../ui/Dropdown';
import { getInitials } from '../../utils/helpers';

const ProfileDropdown = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
    };

    const handleProfile = () => {
        navigate('/profile');
    };

    const trigger = (
        <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-full gradient-secondary flex items-center justify-center text-white font-semibold">
                {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                    getInitials(user?.name || 'User')
                )}
            </div>
            <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </button>
    );

    return (
        <Dropdown trigger={trigger} align="right">
            <div className="px-4 py-3 border-b border-border">
                <p className="text-sm font-semibold text-text-primary">{user?.name}</p>
                <p className="text-xs text-text-muted">{user?.email}</p>
            </div>

            <DropdownItem
                onClick={handleProfile}
                icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                }
            >
                Profile
            </DropdownItem>

            <DropdownDivider />

            <DropdownItem
                onClick={handleLogout}
                icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                }
                className="text-error hover:text-error"
            >
                Logout
            </DropdownItem>
        </Dropdown>
    );
};

export default ProfileDropdown;
