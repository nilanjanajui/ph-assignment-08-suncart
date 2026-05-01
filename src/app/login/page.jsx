"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FiMail, FiLock, FiEye, FiEyeOff, FiSun } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    const [form, setForm] = useState({ email: "", password: "" });
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    useEffect(() => {
        if (!isPending && session) {
            router.replace("/");
        }
    }, [session, isPending, router]);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            toast.error("Please fill in all fields.");
            return;
        }

        setLoading(true);
        const { error } = await authClient.signIn.email({
            email: form.email,
            password: form.password,
        });
        setLoading(false);

        if (error) {
            toast.error(error.message || "Login failed. Check your credentials.");
        } else {
            toast.success("Welcome back! ☀️");
            router.push("/");
        }
    };

    const handleGoogleLogin = async () => {
        setGoogleLoading(true);
        const { error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
        if (error) {
            toast.error("Google sign-in failed.");
            setGoogleLoading(false);
        }
    };

    if (isPending || session) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-amber-50">
                <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-md">

                {/* Card */}
                <div className="animate__animated animate__fadeInDown bg-white rounded-3xl shadow-xl overflow-hidden">

                    {/* Top Banner */}
                    <div className="bg-linear-to-r from-amber-400 to-orange-400 px-8 py-8 text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <FiSun className="text-white text-3xl" />
                            <span className="text-white text-2xl font-bold tracking-wide">SunCart</span>
                        </div>
                        <p className="text-amber-100 text-sm">Your summer essentials store ☀️</p>
                    </div>

                    {/* Form Body */}
                    <div className="px-8 py-8">
                        <h2 className="animate__animated animate__fadeInLeft text-2xl font-bold text-gray-800 mb-1">
                            Welcome back
                        </h2>
                        <p className="text-gray-500 text-sm mb-6">
                            Don&apos;t have an account?{" "}
                            <Link href="/register" className="text-amber-500 font-semibold hover:underline">
                                Sign up
                            </Link>
                        </p>

                        {/* Email/Password Form */}
                        <form onSubmit={handleEmailLogin} className="space-y-4">

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email address
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                                        <FiMail />
                                    </span>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <label className="text-sm font-medium text-gray-700">Password</label>
                                </div>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                                        <FiLock />
                                    </span>
                                    <input
                                        type={showPass ? "text" : "password"}
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPass((v) => !v)}
                                        className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                                    >
                                        {showPass ? <FiEyeOff /> : <FiEye />}
                                    </button>
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="animate__animated animate__fadeInUp animate__delay-1s w-full bg-linear-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg mt-2"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Signing in…
                                    </span>
                                ) : (
                                    "Sign In"
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center gap-3 my-6">
                            <div className="flex-1 h-px bg-gray-200" />
                            <span className="text-xs text-gray-400 font-medium">OR</span>
                            <div className="flex-1 h-px bg-gray-200" />
                        </div>

                        {/* Google OAuth */}
                        <button
                            onClick={handleGoogleLogin}
                            disabled={googleLoading}
                            className="animate__animated animate__fadeInUp animate__delay-2s w-full flex items-center justify-center gap-3 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 disabled:opacity-60 text-gray-700 font-medium py-3 rounded-xl transition-all duration-200"
                        >
                            {googleLoading ? (
                                <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <FcGoogle className="text-xl" />
                            )}
                            Continue with Google
                        </button>
                    </div>
                </div>

                {/* Footer note */}
                <p className="text-center text-xs text-gray-400 mt-6">
                    By signing in you agree to SunCart&apos;s Terms & Privacy Policy.
                </p>
            </div>
        </div>
    );
}