import React from 'react';
import { Link } from 'react-router';
import { FaRocket, FaBrain, FaShieldAlt, FaArrowRight, FaCheckCircle, FaPlay } from 'react-icons/fa';
import { FiZap } from 'react-icons/fi';

const Home = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="py-20 px-4 bg-gradient-to-br from-white via-blue-50 to-indigo-100">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full shadow-lg">
                                <FaRocket className="text-xl" />
                                <span className="font-semibold">AI-Powered Task Management</span>
                            </div>

                            <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                                Focus on What
                                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    {" "}Really Matters
                                </span>
                            </h1>

                            <p className="text-xl text-gray-600 leading-relaxed">
                                Let artificial intelligence prioritize your tasks automatically.
                                Spend less time planning and more time doing what's important.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    to="/prioritize"
                                    className="btn btn-primary btn-lg text-white font-semibold px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                >
                                    <span>Start Prioritizing</span>
                                    <FaArrowRight />
                                </Link>
                                <button className="btn btn-outline btn-lg border-2 border-primary text-primary font-semibold px-8 py-4 text-lg rounded-2xl hover:bg-primary hover:text-white transition-all duration-300">
                                    <FaPlay />
                                    <span>Watch Demo</span>
                                </button>
                            </div>

                            <div className="flex items-center gap-6 pt-4">
                                <div className="flex items-center gap-2">
                                    <FaCheckCircle className="text-green-500 text-xl" />
                                    <span className="text-gray-600 font-medium">No Registration</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaCheckCircle className="text-green-500 text-xl" />
                                    <span className="text-gray-600 font-medium">Instant Results</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaCheckCircle className="text-green-500 text-xl" />
                                    <span className="text-gray-600 font-medium">100% Free</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Content - Hero Image/Illustration */}
                        <div className="relative">
                            <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 shadow-2xl transform rotate-3">
                                <div className="bg-white rounded-2xl p-6 shadow-lg transform -rotate-3">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border-l-4 border-red-500">
                                            <span className="font-semibold text-gray-800">Call the plumber</span>
                                            <span className="badge badge-error text-white">High</span>
                                        </div>
                                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                                            <span className="font-semibold text-gray-800">Finish monthly report</span>
                                            <span className="badge badge-primary text-white">Work</span>
                                        </div>
                                        <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl border-l-4 border-yellow-500">
                                            <span className="font-semibold text-gray-800">Buy groceries</span>
                                            <span className="badge badge-warning text-white">Medium</span>
                                        </div>
                                        <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border-l-4 border-green-500">
                                            <span className="font-semibold text-gray-800">Book vacation</span>
                                            <span className="badge badge-success text-white">Low</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <div className="absolute -top-4 -right-4 bg-yellow-400 text-white p-4 rounded-2xl shadow-lg">
                                <FiZap className="text-2xl" />
                            </div>
                            <div className="absolute -bottom-4 -left-4 bg-green-500 text-white p-4 rounded-2xl shadow-lg">
                                <FaBrain className="text-2xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">
                            How It Works in
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> 3 Simple Steps</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Transform your chaotic to-do list into an organized, prioritized action plan
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="text-center p-8 rounded-3xl bg-gradient-to-b from-blue-50 to-white border border-blue-100 hover:shadow-xl transition-all duration-300">
                            <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-lg">
                                1
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Add Your Tasks</h3>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Simply type or paste your tasks. No need to categorize or prioritize them yourself.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="text-center p-8 rounded-3xl bg-gradient-to-b from-indigo-50 to-white border border-indigo-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                            <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-lg">
                                2
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">AI Analysis</h3>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Our smart algorithm analyzes each task for urgency, importance, and context.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="text-center p-8 rounded-3xl bg-gradient-to-b from-purple-50 to-white border border-purple-100 hover:shadow-xl transition-all duration-300">
                            <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-lg">
                                3
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Get Prioritized List</h3>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Receive a smartly organized list with priorities and categories. Start with what matters most!
                            </p>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            to="/prioritize"
                            className="btn btn-primary btn-lg text-white font-semibold px-12 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            Try It Now - It's Free!
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">
                            Why Choose
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> TaskMaster Pro</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Built with cutting-edge technology and user experience in mind
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left - Features List */}
                        <div className="space-y-8">
                            <div className="flex items-start gap-6 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="p-3 bg-blue-100 rounded-xl">
                                    <FaBrain className="text-2xl text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Smart AI Prioritization</h3>
                                    <p className="text-gray-600 text-lg">
                                        Our advanced algorithm understands context, deadlines, and importance to give you the most accurate priority levels.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="p-3 bg-green-100 rounded-xl">
                                    <FaShieldAlt className="text-2xl text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Complete Privacy</h3>
                                    <p className="text-gray-600 text-lg">
                                        Your data stays on your device. We use local storage, so your tasks never leave your browser.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="p-3 bg-purple-100 rounded-xl">
                                    <FiZap className="text-2xl text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Lightning Fast</h3>
                                    <p className="text-gray-600 text-lg">
                                        Get your prioritized list in seconds. No waiting, no loading screens - just instant results.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right - Stats */}
                        <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 text-white shadow-2xl">
                            <div className="space-y-8">
                                <div className="text-center">
                                    <div className="text-5xl font-bold mb-2">99%</div>
                                    <div className="text-xl opacity-90">Accuracy Rate</div>
                                </div>

                                <div className="text-center">
                                    <div className="text-5xl font-bold mb-2">2.3s</div>
                                    <div className="text-xl opacity-90">Average Processing Time</div>
                                </div>

                                <div className="text-center">
                                    <div className="text-5xl font-bold mb-2">10K+</div>
                                    <div className="text-xl opacity-90">Tasks Prioritized</div>
                                </div>

                                <div className="text-center pt-4">
                                    <div className="inline-flex items-center gap-2 bg-white/20 px-6 py-3 rounded-full">
                                        <FaRocket className="animate-bounce" />
                                        <span className="font-semibold">Trusted by Professionals</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;