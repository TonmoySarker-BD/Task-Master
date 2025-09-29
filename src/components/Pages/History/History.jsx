import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { FaHistory, FaTrash, FaEye, FaCalendarAlt, FaFilter, FaRocket,  FaArrowLeft } from 'react-icons/fa';
import Swal from 'sweetalert2';

/**
 * History page to view past prioritized task sessions
 * Shows all previous prioritization results stored in localStorage
 */
const History = () => {
    const [history, setHistory] = useState([]);
    const [filter, setFilter] = useState('all'); // 'all', 'high', 'medium', 'low'
    const [selectedSession, setSelectedSession] = useState(null);

    // Set dynamic document title
    useEffect(() => {
        document.title = "History - Task Master Pro";
    }, []);

    // Load history from localStorage on component mount
    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = () => {
        try {
            const savedHistory = localStorage.getItem('prioritizationHistory');
            const currentPrioritized = localStorage.getItem('prioritizedTasks');

            let historyData = [];

            // Load existing history
            if (savedHistory) {
                historyData = JSON.parse(savedHistory);
            }

            // Add current session if it exists and isn't already in history
            if (currentPrioritized) {
                const currentSession = JSON.parse(currentPrioritized);
                if (currentSession.length > 0) {
                    // Check if current session is already in history
                    const isAlreadyInHistory = historyData.some(session =>
                        JSON.stringify(session.tasks) === JSON.stringify(currentSession)
                    );

                    if (!isAlreadyInHistory) {
                        const newSession = {
                            id: Date.now(),
                            date: new Date().toISOString(),
                            tasks: currentSession,
                            taskCount: currentSession.length
                        };
                        historyData.unshift(newSession); // Add to beginning
                    }
                }
            }

            setHistory(historyData);
        } catch (error) {
            console.error('Error loading history:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Could not load history data',
                confirmButtonColor: '#3B82F6'
            });
        }
    };

    const saveHistory = (historyData) => {
        try {
            localStorage.setItem('prioritizationHistory', JSON.stringify(historyData));
        } catch (error) {
            console.error('Error saving history:', error);
        }
    };

    const deleteSession = (sessionId) => {
        Swal.fire({
            title: 'Delete Session?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#6B7280',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedHistory = history.filter(session => session.id !== sessionId);
                setHistory(updatedHistory);
                saveHistory(updatedHistory);

                Swal.fire({
                    title: 'Deleted!',
                    text: 'Session has been deleted.',
                    icon: 'success',
                    confirmButtonColor: '#3B82F6',
                    timer: 1500
                });
            }
        });
    };

    const clearAllHistory = () => {
        if (history.length === 0) return;

        Swal.fire({
            title: 'Clear All History?',
            text: "This will delete all your prioritization history!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#6B7280',
            confirmButtonText: 'Yes, clear all!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                setHistory([]);
                localStorage.removeItem('prioritizationHistory');

                Swal.fire({
                    title: 'Cleared!',
                    text: 'All history has been deleted.',
                    icon: 'success',
                    confirmButtonColor: '#3B82F6',
                    timer: 1500
                });
            }
        });
    };

    const getPriorityStats = (tasks) => {
        return {
            high: tasks.filter(t => t.priority === 'High').length,
            medium: tasks.filter(t => t.priority === 'Medium').length,
            low: tasks.filter(t => t.priority === 'Low').length
        };
    };

    const getCategoryStats = (tasks) => {
        return {
            work: tasks.filter(t => t.category === 'Work').length,
            home: tasks.filter(t => t.category === 'Home').length,
            personal: tasks.filter(t => t.category === 'Personal').length
        };
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return {
            full: date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }),
            relative: getRelativeTime(date)
        };
    };

    const getRelativeTime = (date) => {
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
        return date.toLocaleDateString();
    };

    const filteredHistory = history.filter(session => {
        if (filter === 'all') return true;
        const stats = getPriorityStats(session.tasks);
        return stats[filter] > 0;
    });

    const getPriorityBadgeClass = (priority) => {
        switch (priority) {
            case 'High': return 'badge-error';
            case 'Medium': return 'badge-warning';
            case 'Low': return 'badge-success';
            default: return 'badge-neutral';
        }
    };

    const getCategoryBadgeClass = (category) => {
        switch (category) {
            case 'Work': return 'badge-primary';
            case 'Home': return 'badge-secondary';
            case 'Personal': return 'badge-accent';
            default: return 'badge-neutral';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-2xl">
                            <FaHistory className="text-3xl text-white" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-800">Priority History</h1>
                    </div>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Review your past task prioritization sessions and track your productivity journey.
                    </p>
                </div>

                {/* Back to Prioritizer */}
                <div className="mb-6">
                    <Link
                        to="/prioritize"
                        className="btn btn-outline btn-primary btn-sm"
                    >
                        <FaArrowLeft />
                        Back to Prioritizer
                    </Link>
                </div>

                {selectedSession ? (
                    // Session Detail View
                    <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <FaCalendarAlt className="text-primary" />
                                Session Details
                            </h2>
                            <button
                                onClick={() => setSelectedSession(null)}
                                className="btn btn-outline btn-sm"
                            >
                                Back to List
                            </button>
                        </div>

                        <div className="mb-6 p-4 bg-gray-50 rounded-2xl">
                            <h3 className="font-semibold text-gray-800 mb-2">
                                {formatDate(selectedSession.date).full}
                            </h3>
                            <div className="flex gap-4 text-sm">
                                <span className="text-gray-600">
                                    {selectedSession.taskCount} tasks total
                                </span>
                                <span className="text-red-600 font-semibold">
                                    {getPriorityStats(selectedSession.tasks).high} High priority
                                </span>
                                <span className="text-yellow-600 font-semibold">
                                    {getPriorityStats(selectedSession.tasks).medium} Medium priority
                                </span>
                                <span className="text-green-600 font-semibold">
                                    {getPriorityStats(selectedSession.tasks).low} Low priority
                                </span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {selectedSession.tasks.map((task, index) => (
                                <div key={index} className="p-4 bg-white border border-gray-200 rounded-2xl hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="font-semibold text-gray-800 text-lg">{task.task}</span>
                                        <div className="flex gap-2">
                                            <div className={`badge ${getPriorityBadgeClass(task.priority)} text-white gap-1`}>
                                                {task.priority}
                                            </div>
                                            <div className={`badge ${getCategoryBadgeClass(task.category)} text-white gap-1`}>
                                                {task.category}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    // History List View
                    <>
                        {/* Filters and Stats */}
                        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 mb-6">
                            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <FaFilter className="text-gray-500" />
                                        <span className="font-semibold text-gray-700">Filter by Priority:</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {['all', 'high', 'medium', 'low'].map(priority => (
                                            <button
                                                key={priority}
                                                onClick={() => setFilter(priority)}
                                                className={`btn btn-sm capitalize ${filter === priority
                                                        ? 'btn-primary'
                                                        : 'btn-outline'
                                                    }`}
                                            >
                                                {priority === 'all' ? 'All Sessions' : priority}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {history.length > 0 && (
                                    <button
                                        onClick={clearAllHistory}
                                        className="btn btn-outline btn-error btn-sm"
                                    >
                                        <FaTrash />
                                        Clear All History
                                    </button>
                                )}
                            </div>

                            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="text-center p-4 bg-red-50 rounded-2xl border border-red-200">
                                    <div className="text-2xl font-bold text-red-600">
                                        {history.reduce((acc, session) => acc + getPriorityStats(session.tasks).high, 0)}
                                    </div>
                                    <div className="text-sm text-red-600 font-semibold">High Priority Tasks</div>
                                </div>
                                <div className="text-center p-4 bg-yellow-50 rounded-2xl border border-yellow-200">
                                    <div className="text-2xl font-bold text-yellow-600">
                                        {history.reduce((acc, session) => acc + getPriorityStats(session.tasks).medium, 0)}
                                    </div>
                                    <div className="text-sm text-yellow-600 font-semibold">Medium Priority Tasks</div>
                                </div>
                                <div className="text-center p-4 bg-green-50 rounded-2xl border border-green-200">
                                    <div className="text-2xl font-bold text-green-600">
                                        {history.reduce((acc, session) => acc + getPriorityStats(session.tasks).low, 0)}
                                    </div>
                                    <div className="text-sm text-green-600 font-semibold">Low Priority Tasks</div>
                                </div>
                            </div>
                        </div>

                        {/* History List */}
                        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                            {filteredHistory.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="text-6xl text-gray-300 mb-4">📊</div>
                                    <h3 className="text-2xl font-bold text-gray-600 mb-4">No History Yet</h3>
                                    <p className="text-gray-500 text-lg mb-6">
                                        {history.length === 0
                                            ? "Your prioritization history will appear here after you prioritize some tasks."
                                            : "No sessions match your current filter."
                                        }
                                    </p>
                                    {history.length === 0 && (
                                        <Link
                                            to="/prioritize"
                                            className="btn btn-primary btn-lg text-white"
                                        >
                                            <FaRocket />
                                            Prioritize Your First Tasks
                                        </Link>
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {filteredHistory.map((session) => {
                                        const stats = getPriorityStats(session.tasks);
                                        getCategoryStats(session.tasks);
                                        const dateInfo = formatDate(session.date);

                                        return (
                                            <div key={session.id} className="p-6 bg-gray-50 rounded-2xl border border-gray-200 hover:border-primary/30 transition-all duration-300">
                                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <FaCalendarAlt className="text-primary" />
                                                            <h3 className="font-semibold text-gray-800 text-lg">
                                                                {dateInfo.full}
                                                            </h3>
                                                            <span className="text-sm text-gray-500">
                                                                {dateInfo.relative}
                                                            </span>
                                                        </div>

                                                        <div className="flex flex-wrap gap-4 text-sm">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-semibold">{session.taskCount} tasks</span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                                                <span className="text-red-600 font-semibold">{stats.high} High</span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                                                <span className="text-yellow-600 font-semibold">{stats.medium} Medium</span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                                                <span className="text-green-600 font-semibold">{stats.low} Low</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => setSelectedSession(session)}
                                                            className="btn btn-primary btn-sm"
                                                        >
                                                            <FaEye />
                                                            View Details
                                                        </button>
                                                        <button
                                                            onClick={() => deleteSession(session.id)}
                                                            className="btn btn-outline btn-error btn-sm"
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default History;