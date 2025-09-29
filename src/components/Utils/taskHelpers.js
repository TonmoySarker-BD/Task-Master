import { FaExclamationTriangle, FaExclamation, FaInfoCircle, FaBriefcase, FaHome, FaUser } from 'react-icons/fa';

/**
 * Utility functions for task management and display
 */

// Return icon components instead of JSX elements
export const getPriorityIcon = (priority) => {
    switch (priority) {
        case 'High':
            return FaExclamationTriangle;
        case 'Medium':
            return FaExclamation;
        case 'Low':
            return FaInfoCircle;
        default:
            return FaInfoCircle;
    }
};

export const getCategoryIcon = (category) => {
    switch (category) {
        case 'Work':
            return FaBriefcase;
        case 'Home':
            return FaHome;
        case 'Personal':
            return FaUser;
        default:
            return FaUser;
    }
};

export const getPriorityBadgeClass = (priority) => {
    switch (priority) {
        case 'High':
            return 'badge-error text-white';
        case 'Medium':
            return 'badge-warning text-white';
        case 'Low':
            return 'badge-success text-white';
        default:
            return 'badge-neutral';
    }
};

export const getCategoryBadgeClass = (category) => {
    switch (category) {
        case 'Work':
            return 'badge-primary text-white';
        case 'Home':
            return 'badge-secondary text-white';
        case 'Personal':
            return 'badge-accent text-white';
        default:
            return 'badge-neutral';
    }
};

// Helper function to get priority color class
export const getPriorityColorClass = (priority) => {
    switch (priority) {
        case 'High':
            return 'text-red-500';
        case 'Medium':
            return 'text-yellow-500';
        case 'Low':
            return 'text-green-500';
        default:
            return 'text-gray-500';
    }
};

// Helper function to get category color class
export const getCategoryColorClass = (category) => {
    switch (category) {
        case 'Work':
            return 'text-blue-500';
        case 'Home':
            return 'text-green-500';
        case 'Personal':
            return 'text-purple-500';
        default:
            return 'text-gray-500';
    }
};