"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { FiStar, FiShoppingCart, FiArrowLeft, FiHeart } from "react-icons/fi";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import toast from "react-hot-toast";

export default function ProductDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [wishlisted, setWishlisted] = useState(false);

    // 🔐 Auth guard
    useEffect(() => {
        if (!isPending && !session) {
            router.replace("/login");
        }
    }, [session, isPending, router]);

    // 📦 Load product
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
                }
            })
            .finally(() => setLoading(false));
    }, [id, session, router]);

    // ⭐ Render stars
    const renderStars = (rating) => {
        const stars = [];
        const full = Math.floor(rating);
        const half = rating % 1 >= 0.5;
        for (let i = 0; i < full; i++)
            stars.push(<FaStar key={`f${i}`} className="text-amber-400" />);
        if (half)
            stars.push(<FaStarHalfAlt key="h" className="text-amber-400" />);
        while (stars.length < 5)
            stars.push(<FaRegStar key={`e${stars.length}`} className="text-amber-400" />);
        return stars;
    };

    const handleAddToCart = () => {
        toast.success(`${product.name} added to cart! 🛒`);
    };

    const handleWishlist = () => {
        setWishlisted((prev) => !prev);
        toast(wishlisted ? "Removed from wishlist" : "Added to wishlist ❤️");
    };

    // ⏳ Loading / auth pending
    if (isPending || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-amber-50">
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

    return (
        <div className="min-h-screen bg-amber-50 py-10 px-4">
            <div className="max-w-5xl mx-auto">

                {/* Back button */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-amber-700 hover:text-amber-900 mb-8 font-medium transition-colors group"
                >
                    <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    Back to Products
                </button>

                {/* Main card */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">

                        {/* Image side */}
                        <div className="relative bg-amber-100 min-h-87.5 md:min-h-120">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            {/* Discount badge */}
                            {product.discount && (
                                <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                                    -{product.discount}%
                                </span>
                            )}
                            {/* Wishlist button */}
                            <button
                                onClick={handleWishlist}
                                className="absolute top-4 right-4 bg-white rounded-full p-2.5 shadow-md hover:scale-110 transition-transform"
                            >
                                <FiHeart
                                    className={`text-xl ${wishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                                />
                            </button>
                        </div>

                        {/* Info side */}
                        <div className="p-8 flex flex-col justify-between gap-6">
                            <div>
                                {/* Category pill */}
                                <span className="inline-block bg-amber-100 text-amber-700 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                                    {product.category}
                                </span>

                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug mb-3">
                                    {product.name}
                                </h1>

                                {/* Stars + rating */}
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex">{renderStars(product.rating)}</div>
                                    <span className="text-gray-500 text-sm">
                                        ({product.rating} / 5)
                                    </span>
                                </div>

                                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                    {product.description}
                                </p>
                            </div>

                            <div className="border-t pt-6 flex flex-col gap-5">
                                {/* Price */}
                                <div className="flex items-end gap-3">
                                    <span className="text-3xl font-extrabold text-amber-600">
                                        ${discountedPrice ?? product.price}
                                    </span>
                                    {discountedPrice && (
                                        <span className="text-gray-400 line-through text-lg mb-0.5">
                                            ${product.price}
                                        </span>
                                    )}
                                </div>

                                {/* Quantity selector */}
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-medium text-gray-700">Qty:</span>
                                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                                        <button
                                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                            className="px-3 py-2 text-amber-600 hover:bg-amber-50 font-bold text-lg transition-colors"
                                        >
                                            −
                                        </button>
                                        <span className="px-4 py-2 font-semibold text-gray-800 min-w-10 text-center">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() => setQuantity((q) => q + 1)}
                                            className="px-3 py-2 text-amber-600 hover:bg-amber-50 font-bold text-lg transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Action buttons */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        onClick={handleAddToCart}
                                        className="flex-1 flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-white font-bold py-3 px-6 rounded-2xl transition-colors shadow-md hover:shadow-lg"
                                    >
                                        <FiShoppingCart className="text-lg" />
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={() => toast("Buy Now coming soon! 🚀")}
                                        className="flex-1 bg-gray-900 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-2xl transition-colors"
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom info strip */}
                    <div className="bg-amber-50 border-t border-amber-100 px-8 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
                        {[
                            { label: "Brand", value: product.brand ?? "SunCart" },
                            { label: "Category", value: product.category },
                            { label: "Rating", value: `${product.rating} ⭐` },
                            { label: "Stock", value: product.stock > 0 ? `${product.stock} left` : "Out of stock" },
                        ].map(({ label, value }) => (
                            <div key={label}>
                                <p className="text-gray-400 uppercase tracking-wide text-xs mb-1">{label}</p>
                                <p className="font-semibold text-gray-800">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}