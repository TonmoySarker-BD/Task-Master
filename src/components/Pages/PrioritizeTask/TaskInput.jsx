import React from 'react';
import { FaPlus } from 'react-icons/fa';

/**
 * Component for adding new tasks
 * Handles task input and addition
 */
const TaskInput = ({ inputTask, setInputTask, addTask }) => {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaPlus className="text-primary" />
                Add New Task
            </h2>
            <div className="flex gap-3">
                <input
                    type="text"
                    value={inputTask}
                    onChange={(e) => setInputTask(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTask()}
                    placeholder="Enter a task (e.g., Finish monthly report)"
                    className="flex-1 input input-bordered input-lg focus:input-primary"
                />
                <button
                    onClick={addTask}
                    className="btn btn-primary btn-lg text-white px-6"
                >
                    <FaPlus />
                    Add
                </button>
            </div>
        </div>
    );
};

export default TaskInput;