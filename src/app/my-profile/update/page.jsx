"use client";

import { useSession } from "@/lib/auth-client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { FiUser, FiImage, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

export default function UpdateProfilePage() {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);

    // Redirect if not logged in
    useEffect(() => {
        if (!isPending && !session) {
            router.replace("/login");
        }
    }, [session, isPending, router]);

    // Pre-fill form with current values
    const hasInitialized = useRef(false);

    useEffect(() => {
        if (session?.user && !hasInitialized.current) {
            hasInitialized.current = true;
            setName(session.user.name || "");
            setImage(session.user.image || "");
            setPreview(session.user.image || "");
        }
    }, [session]);

    // Live preview when image URL changes
    const handleImageChange = (e) => {
        const val = e.target.value;
        setImage(val);
        setPreview(val);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("Name cannot be empty.");
            return;
        }

        setLoading(true);
        try {
            await authClient.updateUser({
                name: name.trim(),
                image: image.trim() || undefined,
            });
            toast.success("☀️ Profile updated successfully!");
            router.push("/my-profile");
        } catch (err) {
            console.error(err);
            toast.error("Failed to update profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (isPending) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-orange-50 to-yellow-50">
                <div className="w-10 h-10 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!session) return null;

    const initials = name
        ? name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
        : "U";

    return (
        <div className="min-h-screen bg-linear-to-br from-orange-50 to-yellow-50 py-16 px-4">
            <div className="max-w-md mx-auto">
                {/* Back link */}
                <Link
                    href="/my-profile"
                    className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium mb-6 transition-colors"
                >
                    <FiArrowLeft />
                    Back to Profile
                </Link>

                <div className="bg-white rounded-3xl shadow-xl p-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-1">
                        Update Profile
                    </h1>
                    <p className="text-sm text-gray-400 mb-8">
                        Change your name or profile photo.
                    </p>

                    {/* Avatar preview */}
                    <div className="flex justify-center mb-8">
                        <div className="w-24 h-24 rounded-full border-4 border-orange-200 overflow-hidden bg-orange-100 flex items-center justify-center shadow-md">
                            {preview ? (
                                <Image
                                    src={preview}
                                    alt="Preview"
                                    width={96}
                                    height={96}
                                    className="w-full h-full object-cover"
                                    referrerPolicy="no-referrer"
                                    onError={() => setPreview("")}
                                />
                            ) : (
                                <span className="text-2xl font-bold text-orange-500">
                                    {initials}
                                </span>
                            )}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-1">
                                Full Name
                            </label>
                            <div className="relative">
                                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your full name"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm text-gray-700"
                                />
                            </div>
                        </div>

                        {/* Photo URL */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-1">
                                Photo URL
                            </label>
                            <div className="relative">
                                <FiImage className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400" />
                                <input
                                    type="url"
                                    value={image}
                                    onChange={handleImageChange}
                                    placeholder="https://example.com/photo.jpg"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm text-gray-700"
                                />
                            </div>
                            <p className="text-xs text-gray-400 mt-1">
                                Paste any public image URL — preview updates live above.
                            </p>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-md mt-2"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                "Save Changes"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}