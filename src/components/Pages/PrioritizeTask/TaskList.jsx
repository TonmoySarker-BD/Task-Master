import React from 'react';
import { FaTrash, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { FaListCheck } from 'react-icons/fa6';

/**
 * Component to display and manage the list of tasks
 * Handles editing, deleting, and clearing tasks
 */
const TaskList = ({
    tasks,
    editingIndex,
    editText,
    setEditText,
    startEdit,
    saveEdit,
    cancelEdit,
    removeTask,
    clearAllTasks
}) => {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <FaListCheck className="text-primary" />
                    Your Tasks ({tasks.length})
                </h2>
                {tasks.length > 0 && (
                    <button
                        onClick={clearAllTasks}
                        className="btn btn-outline btn-error btn-sm"
                    >
                        <FaTrash />
                        Clear All
                    </button>
                )}
            </div>

            {tasks.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-6xl text-gray-300 mb-4">📝</div>
                    <p className="text-gray-500 text-lg">No tasks added yet. Start by adding your first task above!</p>
                </div>
            ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                    {tasks.map((task, index) => (
                        <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-200 hover:border-primary/30 transition-all duration-300">
                            {editingIndex === index ? (
                                <>
                                    <input
                                        type="text"
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                                        className="flex-1 input input-bordered input-sm"
                                        autoFocus
                                    />
                                    <button
                                        onClick={saveEdit}
                                        className="btn btn-success btn-sm"
                                    >
                                        <FaSave />
                                    </button>
                                    <button
                                        onClick={cancelEdit}
                                        className="btn btn-outline btn-sm"
                                    >
                                        <FaTimes />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <span className="flex-1 text-gray-800 font-medium">{task}</span>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => startEdit(index)}
                                            className="btn btn-outline btn-primary btn-sm"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => removeTask(index)}
                                            className="btn btn-outline btn-error btn-sm"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskList;