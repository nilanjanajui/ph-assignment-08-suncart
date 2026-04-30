"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FiSun, FiMenu, FiX, FiUser, FiLogOut } from "react-icons/fi";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();

    const handleSignOut = async () => {
        await authClient.signOut();
        toast.success("Logged out successfully!");
        router.push("/");
        setIsDropdownOpen(false);
    };

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
    ];

    return (
        <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

                {/* Brand */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="bg-linear-to-r from-orange-400 to-yellow-400 p-1.5 rounded-lg">
                        <FiSun className="text-white" size={20} />
                    </div>
                    <span className="font-extrabold text-xl bg-linear-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                        SunCart
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-gray-600 hover:text-orange-500 font-medium transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Desktop Auth */}
                <div className="hidden md:flex items-center gap-3">
                    {isPending ? (
                        <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
                    ) : session ? (
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center gap-2 focus:outline-none"
                            >
                                {session.user?.image ? (
                                    <Image
                                        src={session.user.image}
                                        alt="avatar"
                                        width={36}
                                        height={36}
                                        className="rounded-full border-2 border-orange-400 object-cover"
                                    />
                                ) : (
                                    <div className="w-9 h-9 rounded-full border-2 border-orange-400 bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                                        {session.user?.name?.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                                    <div className="px-4 py-2 border-b border-gray-100">
                                        <p className="text-sm font-semibold text-gray-800 truncate">{session.user?.name}</p>
                                    </div>
                                    <Link
                                        href="/my-profile"
                                        onClick={() => setIsDropdownOpen(false)}
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-500"
                                    >
                                        <FiUser size={14} /> My Profile
                                    </Link>
                                    <button
                                        onClick={handleSignOut}
                                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                                    >
                                        <FiLogOut size={14} /> Log Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="text-orange-500 font-semibold hover:text-orange-600 transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="bg-linear-to-r from-orange-400 to-yellow-400 text-white font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-gray-600 hover:text-orange-500"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-gray-700 hover:text-orange-500 font-medium"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    {session ? (
                        <>
                            <Link
                                href="/my-profile"
                                className="text-gray-700 hover:text-orange-500 font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                My Profile
                            </Link>
                            <button onClick={handleSignOut} className="text-left text-red-500 font-medium">
                                Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-orange-500 font-medium" onClick={() => setIsMenuOpen(false)}>
                                Login
                            </Link>
                            <Link href="/register" className="text-orange-500 font-medium" onClick={() => setIsMenuOpen(false)}>
                                Register
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}