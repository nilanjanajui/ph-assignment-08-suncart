import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

export default function ProductCard({ product }) {
    return (
        <div className="animate__animated animate__fadeInUp bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden flex flex-col">
            <div className="relative h-52 w-full">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="eager"
                    className="object-cover"
                />
            </div>
            <div className="p-4 flex flex-col flex-1">
                <span className="text-xs text-orange-500 font-semibold uppercase tracking-wide">
                    {product.brand}
                </span>
                <h3 className="text-gray-800 font-bold text-lg mt-1 mb-2 line-clamp-2">
                    {product.name}
                </h3>
                <div className="flex items-center gap-1 mb-3">
                    <FaStar className="text-yellow-400" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                </div>
                <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-bold text-orange-500">
                        ${product.price}
                    </span>
                    <Link
                        href={`/products/${product.id}`}
                        className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-full transition"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}