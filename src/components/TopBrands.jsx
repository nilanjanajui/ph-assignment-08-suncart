const brands = [
    { name: "Neutrogena", emoji: "🧴" },
    { name: "Coppertone", emoji: "☀️" },
    { name: "Banana Boat", emoji: "🍌" },
    { name: "Hawaiian Tropic", emoji: "🌺" },
    { name: "EltaMD", emoji: "💊" },
    { name: "La Roche-Posay", emoji: "🌿" },
];

export default function TopBrands() {
    return (
        <section className="py-14 px-4 bg-white">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
                Top Brands
            </h2>
            <p className="text-center text-gray-500 mb-10">
                We carry the best names in summer care
            </p>
            <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {brands.map((brand, i) => (
                    <div
                        key={i}
                        className="flex flex-col items-center justify-center bg-orange-50 hover:bg-orange-100 transition rounded-2xl p-5 cursor-pointer"
                    >
                        <span className="text-4xl mb-2">{brand.emoji}</span>
                        <span className="text-sm font-semibold text-gray-700 text-center">
                            {brand.name}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}