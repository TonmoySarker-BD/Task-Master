import React from 'react';
import { FaRocket, FaGithub, FaLinkedin, FaHeart, FaShieldAlt } from 'react-icons/fa';
import { GoZap } from 'react-icons/go';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-primary to-secondary text-white mt-20">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/20 rounded-xl">
                                <FaRocket className="text-2xl text-white" />
                            </div>
                            <span className="text-2xl font-bold">TaskMaster Pro</span>
                        </div>
                        <p className="text-white/80 text-lg leading-relaxed">
                            Smart task prioritization powered by AI. Focus on what matters most and achieve your goals faster.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300 transform hover:scale-110"
                            >
                                <FaGithub className="w-6 h-6" />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300 transform hover:scale-110"
                            >
                                <FaLinkedin className="w-6 h-6" />
                            </a>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white">Why Choose Us</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-white/80">
                                <GoZap className="text-yellow-400" />
                                <span>AI-Powered Prioritization</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/80">
                                <FaShieldAlt className="text-green-400" />
                                <span>Local Storage Privacy</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/80">
                                <FaRocket className="text-blue-300" />
                                <span>Instant Results</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white">Quick Links</h3>
                        <div className="space-y-2">
                            <a href="#" className="block text-white/80 hover:text-white transition-colors text-lg">How It Works</a>
                            <a href="#" className="block text-white/80 hover:text-white transition-colors text-lg">Features</a>
                            <a href="#" className="block text-white/80 hover:text-white transition-colors text-lg">Support</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/20">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-white text-center md:text-left">
                            © {new Date().getFullYear()} TaskMaster Pro. All rights reserved.
                        </p>
                        <div className="flex items-center gap-2 text-white">
                            <span>Made By</span>
                            <FaHeart className="text-red-500 animate-pulse" />
                            <a target='_blank' href="https://tonmoysarker.com/">TonmoySarkerBD</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;