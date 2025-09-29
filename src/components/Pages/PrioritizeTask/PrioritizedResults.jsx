import React from 'react';
import { Link } from 'react-router';
import { FaRocket, FaHistory, FaExclamationTriangle, FaExclamation, FaInfoCircle } from 'react-icons/fa';
import PrioritySection from './PrioritySection';

/**
 * Component to display the prioritized results from backend
 * Shows tasks organized by priority levels
 */
const PrioritizedResults = ({
    prioritizedTasks,
    getPriorityIcon,
    getCategoryIcon,
    getPriorityBadgeClass,
    getCategoryBadgeClass
}) => {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <FaRocket className="text-primary" />
                    Prioritized Results
                </h2>
                {prioritizedTasks.length > 0 && (
                    <Link to="/history" className="btn btn-outline btn-primary btn-sm">
                        <FaHistory />
                        View History
                    </Link>
                )}
            </div>

            {prioritizedTasks.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-6xl text-gray-300 mb-4">🚀</div>
                    <p className="text-gray-500 text-lg">Your prioritized tasks will appear here after you click "Prioritize Tasks"</p>
                    <div className="mt-4 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl">
                        <p className="text-sm text-gray-600">
                            Tasks are automatically categorized as Work, Home, or Personal and prioritized as High, Medium, or Low.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    <PrioritySection
                        title="High Priority"
                        icon={FaExclamationTriangle}
                        tasks={prioritizedTasks.filter(t => t.priority === 'High')}
                        getPriorityIcon={getPriorityIcon}
                        getCategoryIcon={getCategoryIcon}
                        getPriorityBadgeClass={getPriorityBadgeClass}
                        getCategoryBadgeClass={getCategoryBadgeClass}
                        colorClass="text-red-600"
                    />

                    <PrioritySection
                        title="Medium Priority"
                        icon={FaExclamation}
                        tasks={prioritizedTasks.filter(t => t.priority === 'Medium')}
                        getPriorityIcon={getPriorityIcon}
                        getCategoryIcon={getCategoryIcon}
                        getPriorityBadgeClass={getPriorityBadgeClass}
                        getCategoryBadgeClass={getCategoryBadgeClass}
                        colorClass="text-yellow-600"
                    />

                    <PrioritySection
                        title="Low Priority"
                        icon={FaInfoCircle}
                        tasks={prioritizedTasks.filter(t => t.priority === 'Low')}
                        getPriorityIcon={getPriorityIcon}
                        getCategoryIcon={getCategoryIcon}
                        getPriorityBadgeClass={getPriorityBadgeClass}
                        getCategoryBadgeClass={getCategoryBadgeClass}
                        colorClass="text-green-600"
                    />
                </div>
            )}
        </div>
    );
};

export default PrioritizedResults;