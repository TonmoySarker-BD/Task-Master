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
    history: "prioritizationHistory",
};

// Backend configuration
const BACKEND_CONFIG = {
    baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000",
    endpoints: {
        prioritize: "/prioritize",
    },
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
            const savedTasks = JSON.parse(localStorage.getItem(STORAGE_KEYS.tasks) || "[]");
            const savedPrioritized = JSON.parse(
                localStorage.getItem(STORAGE_KEYS.prioritized) || "[]"
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

        // Also save to history if we have prioritized tasks
        if (prioritizedTasks.length > 0) {
            saveToHistory(prioritizedTasks);
        }
    }, [prioritizedTasks]);

    // Save session to history
    const saveToHistory = (tasks) => {
        try {
            const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.history) || "[]");
            const newSession = {
                id: Date.now(),
                date: new Date().toISOString(),
                tasks: tasks,
                taskCount: tasks.length,
            };

            // Add to beginning of history and keep only last 50 sessions
            const updatedHistory = [newSession, ...history].slice(0, 50);
            localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(updatedHistory));
        } catch (error) {
            console.error("Error saving to history:", error);
        }
    };

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

    // Backend prioritization with fallback
    const prioritizeTasks = async () => {
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

        try {
            // console.log("Sending tasks to backend:", tasks);

            const response = await fetch(`${BACKEND_CONFIG.baseURL}${BACKEND_CONFIG.endpoints.prioritize}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ tasks }),
            });

            // console.log("Response status:", response.status);

            if (!response.ok) {
                throw new Error(`Backend responded with ${response.status}`);
            }

            const result = await response.json();
            console.log("Backend response:", result);

            // Handle both response formats: direct array or { prioritized: array }
            const prioritizedData = Array.isArray(result) ? result : result.prioritized;

            if (!Array.isArray(prioritizedData)) {
                throw new Error("Invalid response format from backend");
            }

            setPrioritizedTasks(prioritizedData);

            Swal.fire({
                icon: "success",
                title: "Tasks Prioritized!",
                text: `AI has organized ${prioritizedData.length} tasks by priority.`,
                confirmButtonColor: "#10B981",
                timer: 2000,
            });

        } catch (error) {
            console.error("Backend error, using fallback:", error);

            // Fallback to local prioritization
            const fallbackPrioritized = tasks.map((task) => {
                let priority = "Medium";
                let category = "Personal";

                const text = task.toLowerCase();

                // Priority logic
                if (text.includes("urgent") || text.includes("asap") ||
                    text.includes("important") || text.includes("deadline") ||
                    text.includes("emergency") || text.includes("critical")) {
                    priority = "High";
                } else if (text.includes("maybe") || text.includes("sometime") ||
                    text.includes("whenever") || text.includes("optional")) {
                    priority = "Low";
                }

                // Category logic
                if (text.includes("work") || text.includes("meeting") ||
                    text.includes("report") || text.includes("boss") ||
                    text.includes("office") || text.includes("project")) {
                    category = "Work";
                } else if (text.includes("home") || text.includes("clean") ||
                    text.includes("buy") || text.includes("groceries") ||
                    text.includes("plumber") || text.includes("laundry")) {
                    category = "Home";
                } else if (text.includes("vacation") || text.includes("travel") ||
                    text.includes("movie") || text.includes("hobby") ||
                    text.includes("friend") || text.includes("family")) {
                    category = "Personal";
                }

                return { task, priority, category };
            });

            setPrioritizedTasks(fallbackPrioritized);

            Swal.fire({
                icon: "info",
                title: "Using Smart Fallback",
                text: "Backend unavailable. Using intelligent local prioritization.",
                confirmButtonColor: "#3B82F6",
                timer: 2000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Handle Enter key in input
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
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
                        Add your tasks below and let AI organize them by priority and category automatically.
                    </p>

                    {/* Backend Status Indicator */}
                    <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full text-sm">
                        <div className={`w-2 h-2 rounded-full ${BACKEND_CONFIG.baseURL.includes(import.meta.env.VITE_BACKEND_URL) ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></div>
                        <span className="text-gray-600">
                            {BACKEND_CONFIG.baseURL.includes(import.meta.env.VITE_BACKEND_URL)
                                ? 'Connected to backend'
                                : 'Using fallback mode'
                            }
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Task Management */}
                    <div className="space-y-6">
                        <TaskInput
                            inputTask={inputTask}
                            setInputTask={setInputTask}
                            addTask={addTask}
                            onKeyPress={handleKeyPress}
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
                                    className="btn btn-primary btn-lg text-white px-12 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <span className="loading loading-spinner loading-md"></span>
                                    ) : (
                                        <FaRocket className="text-xl" />
                                    )}
                                    {isLoading ? "AI is Thinking..." : "Prioritize with AI"}
                                </button>

                                {tasks.length > 0 && (
                                    <p className="text-sm text-gray-500 mt-3">
                                        {tasks.length} task{tasks.length !== 1 ? 's' : ''} ready for AI analysis
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right Column - Results */}
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