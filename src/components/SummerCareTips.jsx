import { FaSun, FaTint, FaUmbrella, FaAppleAlt } from "react-icons/fa";

const tips = [
    {
        icon: <FaSun className="text-yellow-400 text-3xl" />,
        title: "Sun Protection",
        desc: "Apply SPF 30+ sunscreen every 2 hours when outdoors.",
    },
    {
        icon: <FaTint className="text-blue-400 text-3xl" />,
        title: "Stay Hydrated",
        desc: "Drink at least 8 glasses of water daily during summer.",
    },
    {
        icon: <FaUmbrella className="text-pink-400 text-3xl" />,
        title: "Seek Shade",
        desc: "Avoid direct sun exposure between 10am and 4pm.",
    },
    {
        icon: <FaAppleAlt className="text-red-400 text-3xl" />,
        title: "Eat Light",
        desc: "Choose fresh fruits and salads to stay cool and energized.",
    },
];

export default function SummerCareTips() {
    return (
        <section className="animate__animated animate__fadeInLeft py-14 px-4 bg-amber-50">
            <h2 className="animate__animated animate__fadeInDown text-3xl font-bold text-center text-gray-800 mb-2">
                Summer Care Tips
            </h2>
            <p className="animate__animated animate__fadeInUp text-center text-gray-500 mb-10">
                Stay safe and refreshed all season long
            </p>
            <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {tips.map((tip, i) => (
                    <div
                        key={i}
                        className="animate__animated animate__fadeInUp bg-white rounded-2xl p-6 text-center shadow hover:shadow-md transition"
                    >
                        <div className="flex justify-center mb-3">{tip.icon}</div>
                        <h3 className="font-bold text-gray-800 mb-2">{tip.title}</h3>
                        <p className="text-sm text-gray-500">{tip.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}