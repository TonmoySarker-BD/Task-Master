import React, { useState, useEffect } from "react";
import { FaRocket } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import Swal from "sweetalert2";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import PrioritizedResults from "./PrioritizedResults";
import {
    getPriorityIcon,
    getCategoryIcon,
    getPriorityBadgeClass,
    getCategoryBadgeClass,
} from "../../Utils/taskHelpers";

const STORAGE_KEYS = {
    tasks: "userTasks",
    prioritized: "prioritizedTasks",
};

const PrioritizeTask = () => {
    const [tasks, setTasks] = useState([]);
    const [inputTask, setInputTask] = useState("");
    const [prioritizedTasks, setPrioritizedTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editText, setEditText] = useState("");

    // Dynamic title
    useEffect(() => {
        document.title = "Prioritize Tasks - Task Master Pro";
    }, []);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const savedTasks = JSON.parse(localStorage.getItem(STORAGE_KEYS.tasks));
            const savedPrioritized = JSON.parse(
                localStorage.getItem(STORAGE_KEYS.prioritized)
            );
            if (Array.isArray(savedTasks)) setTasks(savedTasks);
            if (Array.isArray(savedPrioritized)) setPrioritizedTasks(savedPrioritized);
        } catch (err) {
            console.error("Corrupted localStorage, clearing...", err);
            localStorage.removeItem(STORAGE_KEYS.tasks);
            localStorage.removeItem(STORAGE_KEYS.prioritized);
        }
    }, []);

    // Save to localStorage whenever tasks change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(tasks));
    }, [tasks]);

    // Save prioritized tasks to localStorage
    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEYS.prioritized,
            JSON.stringify(prioritizedTasks)
        );
    }, [prioritizedTasks]);

    const addTask = () => {
        if (!inputTask.trim()) {
            Swal.fire({
                icon: "warning",
                title: "Empty Task",
                text: "Please enter a task!",
                confirmButtonColor: "#3B82F6",
            });
            return;
        }
        setTasks((prev) => [...prev, inputTask.trim()]);
        setInputTask("");
    };

    const startEdit = (index) => {
        setEditingIndex(index);
        setEditText(tasks[index]);
    };

    const saveEdit = () => {
        if (!editText.trim()) {
            Swal.fire({
                icon: "warning",
                title: "Empty Task",
                text: "Task cannot be empty!",
                confirmButtonColor: "#3B82F6",
            });
            return;
        }
        setTasks((prev) =>
            prev.map((t, i) => (i === editingIndex ? editText.trim() : t))
        );
        setEditingIndex(null);
        setEditText("");
    };

    const cancelEdit = () => {
        setEditingIndex(null);
        setEditText("");
    };

    const removeTask = (index) => {
        Swal.fire({
            title: "Delete Task?",
            text: "Are you sure you want to delete this task?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Yes, delete it!",
        }).then((res) => {
            if (res.isConfirmed) {
                setTasks((prev) => prev.filter((_, i) => i !== index));
                Swal.fire({
                    title: "Deleted!",
                    text: "Task has been deleted.",
                    icon: "success",
                    confirmButtonColor: "#3B82F6",
                    timer: 1200,
                });
            }
        });
    };

    const clearAllTasks = () => {
        if (tasks.length === 0) return;
        Swal.fire({
            title: "Clear All Tasks?",
            text: "This will remove all your tasks!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Yes, clear all!",
        }).then((res) => {
            if (res.isConfirmed) {
                setTasks([]);
                setPrioritizedTasks([]);
                Swal.fire({
                    title: "Cleared!",
                    text: "All tasks removed.",
                    icon: "success",
                    confirmButtonColor: "#3B82F6",
                    timer: 1200,
                });
            }
        });
    };

    // Simple local-only prioritization logic
    const prioritizeTasks = () => {
        if (tasks.length === 0) {
            Swal.fire({
                icon: "warning",
                title: "No Tasks",
                text: "Please add some tasks first!",
                confirmButtonColor: "#3B82F6",
            });
            return;
        }

        setIsLoading(true);

        // Simulate processing delay for UX
        setTimeout(() => {
            const prioritized = tasks.map((task) => {
                let priority = "Medium";
                let category = "Personal";

                const text = task.toLowerCase();
                if (text.includes("urgent") || text.includes("asap")) priority = "High";
                if (text.includes("maybe") || text.includes("sometime"))
                    priority = "Low";

                if (text.includes("work") || text.includes("meeting"))
                    category = "Work";
                if (text.includes("home") || text.includes("clean") || text.includes("buy"))
                    category = "Home";

                return { task, priority, category };
            });

            setPrioritizedTasks(prioritized);
            Swal.fire({
                icon: "success",
                title: "Tasks Prioritized!",
                text: "Your tasks are now organized.",
                confirmButtonColor: "#10B981",
                timer: 1500,
            });
            setIsLoading(false);
        }, 700);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-2xl">
                            <FaListCheck className="text-3xl text-white" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-800">Task Prioritizer</h1>
                    </div>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Add tasks below and let AI-inspired logic organize them by priority
                        and category automatically.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                        <TaskInput
                            inputTask={inputTask}
                            setInputTask={setInputTask}
                            addTask={addTask}
                        />

                        <TaskList
                            tasks={tasks}
                            editingIndex={editingIndex}
                            editText={editText}
                            setEditText={setEditText}
                            startEdit={startEdit}
                            saveEdit={saveEdit}
                            cancelEdit={cancelEdit}
                            removeTask={removeTask}
                            clearAllTasks={clearAllTasks}
                        />

                        {tasks.length > 0 && (
                            <div className="text-center">
                                <button
                                    onClick={prioritizeTasks}
                                    disabled={isLoading}
                                    className="btn btn-primary btn-lg text-white px-12 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                                >
                                    {isLoading ? (
                                        <span className="loading loading-spinner loading-md"></span>
                                    ) : (
                                        <FaRocket className="text-xl mr-2 inline" />
                                    )}
                                    {isLoading ? "Prioritizing..." : "Prioritize Tasks"}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        <PrioritizedResults
                            prioritizedTasks={prioritizedTasks}
                            getPriorityIcon={getPriorityIcon}
                            getCategoryIcon={getCategoryIcon}
                            getPriorityBadgeClass={getPriorityBadgeClass}
                            getCategoryBadgeClass={getCategoryBadgeClass}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrioritizeTask;
