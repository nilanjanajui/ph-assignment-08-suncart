import HeroSlider from "@/components/HeroSlider";
import ProductCard from "@/components/ProductCard";
import SummerCareTips from "@/components/SummerCareTips";
import TopBrands from "@/components/TopBrands";
import productsData from "../../public/products.json";
import Link from "next/link";

export default function Home() {
  const featured = productsData.slice(0, 3);

  return (
    <main>
      {/* Hero Slider */}
      <HeroSlider />

      {/* Featured Products */}
      <section className="py-14 px-4 bg-gray-50">
        <h2 className="animate__animated animate__fadeInDown text-3xl font-bold text-center text-gray-800 mb-2">
          Featured Products
        </h2>
        <p className="text-center text-gray-500 mb-10">
          Handpicked summer essentials just for you
        </p>
        <div className="animate__animated animate__fadeInUp animate__delay-1s max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/products"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full transition"
          >
            View All Products
          </Link>
        </div>
      </section>

      {/* Summer Care Tips */}
      <SummerCareTips />

      {/* Top Brands */}
      <TopBrands />
    </main>
  );
}