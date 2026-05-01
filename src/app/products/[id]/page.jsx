"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { FiHeart, FiTruck, FiShield } from "react-icons/fi";
import { HiOutlineCheckCircle } from "react-icons/hi";
import toast from "react-hot-toast";

export default function ProductDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedColor, setSelectedColor] = useState(0);
    const [wishlisted, setWishlisted] = useState(false);
    const [selectedThumb, setSelectedThumb] = useState(0);

    // Auth guard
    useEffect(() => {
        if (!isPending && !session) router.replace("/login");
    }, [session, isPending, router]);

    useEffect(() => {
        if (!session) return;
        fetch("/products.json")
            .then((r) => r.json())
            .then((data) => {
                const found = data.find((p) => p.id === parseInt(id));
                if (!found) {
                    router.replace("/products");
                } else {
                    setProduct(found);
                    setRelatedProducts(data.filter((p) => p.id !== parseInt(id)).slice(0, 3));
                }
            })
            .finally(() => setLoading(false));
    }, [id, session, router]);

    const renderStars = (rating) => {
        const stars = [];
        const full = Math.floor(rating);
        const half = rating % 1 >= 0.5;
        for (let i = 0; i < full; i++)
            stars.push(<FaStar key={`f${i}`} className="text-amber-400 text-sm" />);
        if (half)
            stars.push(<FaStarHalfAlt key="h" className="text-amber-400 text-sm" />);
        while (stars.length < 5)
            stars.push(<FaRegStar key={`e${stars.length}`} className="text-amber-400 text-sm" />);
        return stars;
    };

    // Loading spinner
    if (isPending || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
                    <p className="text-amber-700 font-medium">Loading product...</p>
                </div>
            </div>
        );
    }

    if (!session || !product) return null;

    const discountedPrice = product.discount
        ? (product.price * (1 - product.discount / 100)).toFixed(2)
        : null;

    const colors = ["#8B5E3C", "#1B2B4B", "#A8B5C8"];
    const thumbnails = [product.image, product.image, product.image, product.image];
    const reviewCount = Math.floor((product.rating * 30) + 50);

    return (
        <div className="min-h-screen bg-[#FAF8F5]">
            <div className="max-w-6xl mx-auto px-4 py-10">

                {/* ── MAIN PRODUCT ── */}
                <div className="animate__animated animate__fadeIn grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* LEFT — Image Gallery */}
                    <div>
                        {/* Main image */}
                        <div className="relative rounded-2xl overflow-hidden bg-white aspect-square shadow-sm">
                            <Image
                                src={thumbnails[selectedThumb]}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            <span className="absolute top-4 left-4 bg-white text-gray-800 text-xs font-bold px-3 py-1.5 rounded-full shadow tracking-widest">
                                BEST SELLER
                            </span>
                        </div>

                        {/* Thumbnails */}
                        <div className="flex gap-3 mt-4">
                            {thumbnails.map((thumb, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedThumb(i)}
                                    className={`relative w-18 h-18 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${selectedThumb === i
                                            ? "border-amber-500"
                                            : "border-transparent opacity-70 hover:opacity-100"
                                        }`}
                                >
                                    {i === 3 ? (
                                        <div className="w-full h-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-sm">
                                            +2
                                        </div>
                                    ) : (
                                        <Image
                                            src={thumb}
                                            alt={`Thumbnail ${i + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="72px"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT — Product Info */}
                    <div className="flex flex-col gap-5">

                        {/* Breadcrumb */}
                        <nav className="text-xs text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <Link href="/" className="hover:text-amber-600 transition-colors">Shop</Link>
                            <span>/</span>
                            <span className="hover:text-amber-600 cursor-pointer">{product.category}</span>
                            <span>/</span>
                            <span className="text-gray-700 font-semibold truncate">{product.name}</span>
                        </nav>

                        {/* Product name */}
                        <h1 className="animate__animated animate__fadeInDown text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                            {product.name}
                        </h1>

                        {/* Brand + Stars */}
                        <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-amber-500 font-bold">{product.brand ?? "SunCart"}</span>
                            <div className="flex items-center gap-0.5">{renderStars(product.rating)}</div>
                            <span className="text-gray-500 text-sm">
                                {product.rating} ({reviewCount} reviews)
                            </span>
                        </div>

                        {/* Price + Stock */}
                        <div className="animate__animated animate__fadeInUp animate__delay-1s flex items-center justify-between flex-wrap gap-3">
                            <div className="flex items-end gap-3">
                                <span className="text-4xl font-extrabold text-gray-900">
                                    ${discountedPrice ?? product.price}
                                </span>
                                {discountedPrice && (
                                    <span className="text-gray-400 line-through text-lg mb-1">
                                        ${product.price}
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-1.5 text-green-600 bg-green-50 border border-green-100 px-3 py-1.5 rounded-full text-sm font-semibold">
                                <HiOutlineCheckCircle className="text-base" />
                                IN STOCK
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base border-t border-gray-200 pt-5">
                            {product.description ||
                                "A premium summer essential crafted for the modern explorer. Designed to keep you cool, protected, and stylish all season long. Perfect for beach days, city strolls, and every adventure in between."}
                        </p>

                        {/* Color selector */}
                        <div>
                            <p className="text-sm font-semibold text-gray-800 mb-3">Select Color</p>
                            <div className="flex gap-3">
                                {colors.map((color, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedColor(i)}
                                        style={{ backgroundColor: color }}
                                        className={`w-8 h-8 rounded-full transition-all duration-200 ${selectedColor === i
                                                ? "ring-2 ring-offset-2 ring-amber-500 scale-110"
                                                : "hover:scale-105"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Buy Now + Wishlist */}
                        <div className="animate__animated animate__fadeInUp animate__delay-2s flex gap-3 items-center mt-1">
                            <button
                                onClick={() => toast.success("Buy Now coming soon!")}
                                className="flex-1 py-4 rounded-2xl font-bold text-white text-base tracking-wide shadow-md hover:shadow-lg hover:opacity-90 transition-all"
                                style={{ background: "linear-gradient(90deg, #F97316, #EF4444)" }}
                            >
                                Buy Now
                            </button>
                            <button
                                onClick={() => {
                                    setWishlisted((prev) => !prev);
                                    toast(wishlisted ? "Removed from wishlist" : "Added to wishlist ❤️");
                                }}
                                className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center shrink-0 transition-all ${wishlisted
                                        ? "border-red-400 bg-red-50"
                                        : "border-gray-200 hover:border-amber-400 bg-white"
                                    }`}
                            >
                                <FiHeart
                                    className={`text-xl transition-colors ${wishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
                                        }`}
                                />
                            </button>
                        </div>

                        {/* Free Shipping + Warranty */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                                <FiTruck className="text-amber-500 text-xl shrink-0" />
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">Free Shipping</p>
                                    <p className="text-xs text-gray-400">On orders over $100</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                                <FiShield className="text-amber-500 text-xl shrink-0" />
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">2 Year Warranty</p>
                                    <p className="text-xs text-gray-400">Full lens protection</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── YOU MIGHT ALSO LIKE ── */}
                {relatedProducts.length > 0 && (
                    <div className="mt-20">
                        <div className="flex items-end justify-between mb-8">
                            <div>
                                <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-1">
                                    Summer Essentials
                                </p>
                                <h2 className="animate__animated animate__fadeInDown text-2xl md:text-3xl font-extrabold text-gray-900">
                                    You Might Also Like
                                </h2>
                            </div>
                            <Link
                                href="/products"
                                className="text-amber-500 font-semibold text-sm hover:underline"
                            >
                                View All →
                            </Link>
                        </div>

                        <div className="animate__animated animate__fadeInUp animate__delay-1s grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {relatedProducts.map((p) => (
                                <Link
                                    key={p.id}
                                    href={`/products/${p.id}`}
                                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                                >
                                    <div className="relative h-52 overflow-hidden">
                                        <Image
                                            src={p.image}
                                            alt={p.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    </div>
                                    <div className="p-4 flex items-start justify-between gap-2">
                                        <div>
                                            <p className="font-bold text-gray-900 leading-snug">{p.name}</p>
                                            <p className="text-xs text-gray-400 mt-0.5">{p.category}</p>
                                        </div>
                                        <span className="text-amber-500 font-extrabold shrink-0">
                                            ${p.price}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}