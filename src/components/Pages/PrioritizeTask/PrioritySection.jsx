import React from 'react';

/**
 * Component to display tasks by priority level
 * Shows High, Medium, and Low priority tasks separately
 */
const PrioritySection = ({
    title,
    tasks,
    getPriorityIcon, // This returns an icon component
    getCategoryIcon, // This returns an icon component
    getPriorityBadgeClass,
    getCategoryBadgeClass,
    colorClass
}) => {
    if (tasks.length === 0) return null;

    return (
        <div>
            <h3 className={`text-lg font-semibold ${colorClass} mb-3 flex items-center gap-2`}>
                {title} ({tasks.length})
            </h3>
            <div className="space-y-3">
                {tasks.map((task, index) => {
                    // Get the icon components from utility functions
                    const PriorityIconComponent = getPriorityIcon(task.priority);
                    const CategoryIconComponent = getCategoryIcon(task.category);

                    return (
                        <div key={index} className={`p-4 ${getBackgroundColor(colorClass)} rounded-2xl border-l-4 ${getBorderColor(colorClass)}`}>
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-semibold text-gray-800">{task.task}</span>
                                <div className="flex gap-2">
                                    <div className={`badge ${getPriorityBadgeClass(task.priority)} gap-1`}>
                                        {/* Use the icon components as JSX */}
                                        <PriorityIconComponent />
                                        {task.priority}
                                    </div>
                                    <div className={`badge ${getCategoryBadgeClass(task.category)} gap-1`}>
                                        {/* Use the icon components as JSX */}
                                        <CategoryIconComponent />
                                        {task.category}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// Helper functions for styling
const getBackgroundColor = (colorClass) => {
    switch (colorClass) {
        case 'text-red-600': return 'bg-red-50';
        case 'text-yellow-600': return 'bg-yellow-50';
        case 'text-green-600': return 'bg-green-50';
        default: return 'bg-gray-50';
    }
};

const getBorderColor = (colorClass) => {
    switch (colorClass) {
        case 'text-red-600': return 'border-red-500';
        case 'text-yellow-600': return 'border-yellow-500';
        case 'text-green-600': return 'border-green-500';
        default: return 'border-gray-500';
    }
};

export default PrioritySection;