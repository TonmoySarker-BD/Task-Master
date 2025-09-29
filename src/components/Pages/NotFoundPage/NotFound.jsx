import React from 'react';
import { Link } from 'react-router';
import { FaHome, FaRocket, FaSearch, FaCompass, FaHistory } from 'react-icons/fa';
import { FaListCheck } from 'react-icons/fa6';

const NotFound = () => {
    return (
        <div className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center px-4">
            <div className="max-w-6xl mx-auto text-center">



                {/* Main Message */}
                <div className="space-y-6 mb-12">
                    <h1 className="text-5xl font-bold text-gray-800">
                        Oops! Page Lost in Space
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        The page you're looking for seems to have drifted off into the digital cosmos.
                        Don't worry, even the best explorers sometimes take wrong turns!
                    </p>
                </div>



                {/* Animated Illustration */}
                <div className="relative mb-12">
                    <div className="absolute -top-4 -right-4">
                        <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-white text-2xl shadow-lg animate-bounce">
                            <FaRocket className="rotate-45" />
                        </div>
                    </div>
                    <div className="w-64 h-64 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                        <div className="w-48 h-48 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full flex items-center justify-center">
                            <div className="w-32 h-32 bg-gradient-to-br from-primary/40 to-secondary/40 rounded-full flex items-center justify-center">
                                {/* Animated 404 Number */}
                                <div className="relative mb-8">
                                    <div className="text-9xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                        404
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -bottom-4 -left-4">
                        <div className="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-white text-xl shadow-lg animate-pulse">
                            <FaSearch />
                        </div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute top-4 left-1/4 animate-float">
                        <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
                    </div>
                    <div className="absolute top-8 right-1/4 animate-float-delayed">
                        <div className="w-6 h-6 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="absolute bottom-8 left-1/3 animate-float-slow">
                        <div className="w-4 h-4 bg-red-400 rounded-full"></div>
                    </div>
                </div>

                {/* Helpful Suggestions */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-100 max-w-3xl mx-auto">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
                        <FaCompass className="text-primary" />
                        Quick Navigation
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <Link
                            to="/"
                            className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 border border-blue-100 hover:border-blue-200 group"
                        >
                            <FaHome className='inline-flex text-2xl' />
                            <div className="font-semibold text-gray-800 group-hover:text-primary">Home Page</div>
                            <div className="text-gray-600">Start fresh from home</div>
                        </Link>

                        <Link
                            to="/prioritize"
                            className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl hover:from-green-100 hover:to-emerald-100 transition-all duration-300 border border-green-100 hover:border-green-200 group"
                        >
                            <FaListCheck className='inline-flex text-2xl' />
                            <div className="font-semibold text-gray-800 group-hover:text-primary">Task Prioritizer</div>
                            <div className="text-gray-600">Organize your tasks</div>
                        </Link>

                        <Link
                            to="/history"
                            className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl hover:from-purple-100 hover:to-pink-100 transition-all duration-300 border border-purple-100 hover:border-purple-200 group"
                        >
                            <FaHistory className='inline-flex text-2xl' />
                            <div className="font-semibold text-gray-800 group-hover:text-primary">Priority History</div>
                            <div className="text-gray-600">View past tasks</div>
                        </Link>
                    </div>
                </div>

                {/* Fun Message */}
                <div className="mt-8 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl border border-primary/20">
                    <p className="text-gray-600 italic">
                        "Not all those who wander are lost, but this page definitely is!" 🚀
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NotFound;