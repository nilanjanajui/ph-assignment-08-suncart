"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiEdit2, FiMail, FiUser } from "react-icons/fi";

export default function MyProfilePage() {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!isPending && !session) {
            router.replace("/login");
        }
    }, [session, isPending, router]);

    if (isPending) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-orange-50 to-yellow-50">
                <div className="w-10 h-10 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!session) return null;

    const user = session.user;
    const initials = user?.name
        ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
        : "U";

    return (
        <div className="min-h-screen bg-linear-to-br from-orange-50 to-yellow-50 py-16 px-4">
            <div className="max-w-md mx-auto">
                {/* Card */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    {/* Banner */}
                    <div className="h-28 bg-linear-to-r from-orange-400 to-yellow-400" />

                    {/* Avatar */}
                    <div className="flex flex-col items-center -mt-14 px-6 pb-8">
                        <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg overflow-hidden bg-orange-100 flex items-center justify-center">
                            {user?.image ? (
                                <Image
                                    src={user.image}
                                    alt={user.name}
                                    width={112}
                                    height={112}
                                    className="w-full h-full object-cover"
                                    referrerPolicy="no-referrer"
                                />
                            ) : (
                                <span className="text-3xl font-bold text-orange-500">
                                    {initials}
                                </span>
                            )}
                        </div>

                        {/* Name */}
                        <h1 className="mt-4 text-2xl font-bold text-gray-800">
                            {user?.name || "User"}
                        </h1>

                        {/* Email */}
                        <div className="flex items-center gap-2 mt-1 text-gray-500 text-sm">
                            <FiMail className="text-orange-400" />
                            <span>{user?.email}</span>
                        </div>

                        {/* Divider */}
                        <div className="w-full border-t border-gray-100 my-6" />

                        {/* Info rows */}
                        <div className="w-full space-y-4">
                            <div className="flex items-center gap-3 bg-orange-50 rounded-xl px-4 py-3">
                                <FiUser className="text-orange-400 text-lg shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-400">Full Name</p>
                                    <p className="text-sm font-semibold text-gray-700">
                                        {user?.name || "—"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 bg-orange-50 rounded-xl px-4 py-3">
                                <FiMail className="text-orange-400 text-lg shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-400">Email Address</p>
                                    <p className="text-sm font-semibold text-gray-700">
                                        {user?.email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Update button */}
                        <Link
                            href="/my-profile/update"
                            className="mt-8 w-full flex items-center justify-center gap-2 bg-linear-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-md"
                        >
                            <FiEdit2 />
                            Update Profile
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}