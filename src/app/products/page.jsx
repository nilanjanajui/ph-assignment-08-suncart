"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import products from "../../../public/products.json";

const categories = ["All", ...new Set(products.map((p) => p.category))];

export default function ProductsPage() {
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [sort, setSort] = useState("default");

    const filtered = useMemo(() => {
        let list = [...products];

        if (activeCategory !== "All") {
            list = list.filter((p) => p.category === activeCategory);
        }

        if (search.trim()) {
            list = list.filter((p) =>
                p.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
        else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
        else if (sort === "rating") list.sort((a, b) => b.rating - a.rating);

        return list;
    }, [search, activeCategory, sort]);

    return (
        <main className="min-h-screen bg-orange-50 py-10 px-4">
            {/* Page Header */}
            <div className="text-center mb-10">
                <span className="inline-block bg-orange-100 text-orange-600 text-sm font-semibold px-4 py-1 rounded-full mb-3">
                    🛍️ Our Collection
                </span>
                <h1 className="text-4xl font-extrabold text-gray-800">
                    All <span className="text-orange-500 italic">Summer</span> Products
                </h1>
                <p className="text-gray-500 mt-2 text-sm">
                    {filtered.length} product{filtered.length !== 1 && "s"} found
                </p>
            </div>

            {/* Controls */}
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-3 mb-8">
                {/* Search */}
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 border border-orange-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                />

                {/* Sort */}
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="border border-orange-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                >
                    <option value="default">Sort: Default</option>
                    <option value="price-asc">Price: Low → High</option>
                    <option value="price-desc">Price: High → Low</option>
                    <option value="rating">Top Rated</option>
                </select>
            </div>

            {/* Category Tabs */}
            <div className="max-w-6xl mx-auto flex flex-wrap gap-2 mb-8">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium border transition cursor-pointer ${activeCategory === cat
                                ? "bg-orange-500 text-white border-orange-500"
                                : "bg-white text-gray-600 border-orange-200 hover:border-orange-400"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Products Grid */}
            <div className="max-w-6xl mx-auto">
                {filtered.length === 0 ? (
                    <div className="text-center py-24 text-gray-400">
                        <p className="text-5xl mb-4">🌴</p>
                        <p className="text-lg font-medium">No products found.</p>
                        <p className="text-sm mt-1">Try a different search or category.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filtered.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}