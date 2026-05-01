"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff, FiSun } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        authClient.getSession().then(({ data }) => {
            if (data?.session) router.replace("/");
        });
    }, [router]);

    const handleGoogle = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("Please enter your name.");
            return;
        }
        if (password !== confirm) {
            toast.error("Passwords do not match.");
            return;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters.");
            return;
        }

        setLoading(true);

        const { error } = await authClient.signUp.email({
            name: name.trim(),
            email,
            password,
            image: photoURL.trim() || undefined,
            callbackURL: "/login",
        });

        setLoading(false);

        if (error) {
            toast.error(error.message || "Registration failed. Please try again.");
        } else {
            toast.success("☀️ Account created! Please sign in.");
            router.push("/login");
        }
    };

    return (
        <main className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-yellow-100 flex items-center justify-center px-4 py-12">
            <div className="animate__animated animate__fadeInDown w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="animate__animated animate__bounceIn inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-100 mb-3">
                        <FiSun className="text-amber-500 text-3xl" />
                    </div>
                    <h1 className="animate__animated animate__fadeInDown animate__delay-1s text-2xl font-bold text-gray-800">
                        Create your account
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Join SunCart and embrace the summer ☀️</p>
                </div>

                {/* Google OAuth */}
                <button
                    onClick={handleGoogle}
                    className="animate__animated animate__fadeInUp animate__delay-1s w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition mb-6"
                >
                    <FcGoogle className="text-xl" />
                    Sign up with Google
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-xs text-gray-400">or register with email</span>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Form */}
                <form onSubmit={handleRegister} className="space-y-4">

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
                        />
                    </div>

                    {/* Photo URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Photo URL <span className="text-gray-400 font-normal">(optional)</span>
                        </label>
                        <input
                            type="url"
                            value={photoURL}
                            onChange={(e) => setPhotoURL(e.target.value)}
                            placeholder="https://example.com/photo.jpg"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPass ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Min. 6 characters"
                                className="w-full px-4 py-3 pr-11 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPass((p) => !p)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-500 transition"
                            >
                                {showPass ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirm ? "text" : "password"}
                                required
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                placeholder="Re-enter your password"
                                className="w-full px-4 py-3 pr-11 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm((p) => !p)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-500 transition"
                            >
                                {showConfirm ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                        {confirm && (
                            <p className={`text-xs mt-1 ${password === confirm ? "text-green-500" : "text-red-400"}`}>
                                {password === confirm ? "✓ Passwords match" : "✗ Passwords do not match"}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="animate__animated animate__fadeInUp animate__delay-2s w-full bg-amber-400 hover:bg-amber-500 text-white font-semibold py-3 rounded-xl transition disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                    >
                        {loading ? "Creating account…" : "Create Account"}
                    </button>
                </form>

                {/* Login link */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?{" "}
                    <Link href="/login" className="text-amber-500 font-semibold hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </main>
    );
}