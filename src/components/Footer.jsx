import Link from "next/link";
import { FiSun, FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 mt-16">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-gray-700">

                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="bg-linear-to-r from-orange-400 to-yellow-400 p-1.5 rounded-lg">
                                <FiSun className="text-white" size={18} />
                            </div>
                            <span className="font-extrabold text-xl text-white">SunCart</span>
                        </div>
                        <p className="text-sm leading-relaxed text-gray-400">
                            Your one-stop destination for summer essentials. Stay cool, stay stylish.
                        </p>
                        <div className="flex gap-4 mt-4">
                            <a href="#" className="hover:text-orange-400 transition-colors"><FiInstagram size={20} /></a>
                            <a href="#" className="hover:text-orange-400 transition-colors"><FiFacebook size={20} /></a>
                            <a href="#" className="hover:text-orange-400 transition-colors"><FiTwitter size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/" className="hover:text-orange-400 transition-colors">Home</Link></li>
                            <li><Link href="/products" className="hover:text-orange-400 transition-colors">Products</Link></li>
                            <li><Link href="/login" className="hover:text-orange-400 transition-colors">Login</Link></li>
                            <li><Link href="/register" className="hover:text-orange-400 transition-colors">Register</Link></li>
                            <li><Link href="/privacy-policy" className="hover:text-orange-400 transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Contact</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>📧 support@suncart.com</li>
                            <li>📞 +1 (80023456) SUN-CART</li>
                            <li>📍 123 Beach Ave, Miami, FL</li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-6">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} SunCart. All rights reserved. Made with ☀️
                    </p>
                    <Link href="/privacy-policy" className="text-sm text-gray-500 hover:text-orange-400 transition-colors">
                        Privacy Policy
                    </Link>
                </div>
            </div>
        </footer>
    );
}