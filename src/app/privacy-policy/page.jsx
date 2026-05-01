import Link from "next/link";
import { FiSun, FiArrowLeft } from "react-icons/fi";

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-orange-50 py-12 px-4">
            <div className="max-w-3xl mx-auto">

                {/* Back */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium mb-8 transition-colors"
                >
                    <FiArrowLeft />
                    Back to Home
                </Link>

                {/* Header */}
                <div className="flex items-center gap-3 mb-2">
                    <div className="bg-linear-to-r from-orange-400 to-yellow-400 p-2 rounded-lg">
                        <FiSun className="text-white" size={20} />
                    </div>
                    <span className="font-extrabold text-2xl text-gray-800">SunCart</span>
                </div>
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Privacy Policy</h1>
                <p className="text-sm text-gray-400 mb-10">Last updated: January 1, 2025</p>

                {/* Card */}
                <div className="bg-white rounded-3xl shadow-sm border border-orange-100 p-8 md:p-10 space-y-8 text-gray-700 leading-relaxed">

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">1. Introduction</h2>
                        <p className="text-sm">
                            Welcome to SunCart. We are committed to protecting your personal information and your right
                            to privacy. This Privacy Policy explains how we collect, use, and safeguard your information
                            when you visit our website and make purchases from us. Please read this policy carefully. If
                            you disagree with its terms, please discontinue use of our site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">2. Information We Collect</h2>
                        <p className="text-sm mb-3">
                            We collect information that you provide directly to us when you register an account, place
                            an order, or contact us for support. This includes:
                        </p>
                        <ul className="text-sm space-y-2 list-disc list-inside text-gray-600">
                            <li>Full name and email address</li>
                            <li>Profile photo URL (if provided)</li>
                            <li>Authentication data managed securely via BetterAuth</li>
                            <li>Browsing behavior on our platform (pages visited, products viewed)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">3. How We Use Your Information</h2>
                        <p className="text-sm mb-3">We use the information we collect to:</p>
                        <ul className="text-sm space-y-2 list-disc list-inside text-gray-600">
                            <li>Create and manage your SunCart account</li>
                            <li>Process and fulfill your orders</li>
                            <li>Send you order confirmations and account-related emails</li>
                            <li>Improve our website, products, and services</li>
                            <li>Respond to your comments, questions, and customer service requests</li>
                            <li>Monitor and prevent fraudulent transactions</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">4. Cookies</h2>
                        <p className="text-sm">
                            SunCart uses cookies and similar tracking technologies to enhance your browsing experience.
                            Cookies are small data files stored on your device. We use session cookies to keep you
                            logged in and preference cookies to remember your settings. You can instruct your browser
                            to refuse all cookies or to indicate when a cookie is being sent. However, some parts of
                            our site may not function properly without cookies.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">5. Data Sharing</h2>
                        <p className="text-sm">
                            We do not sell, trade, or rent your personal information to third parties. We may share
                            data with trusted service providers who assist us in operating our website and conducting
                            our business, provided those parties agree to keep this information confidential. We may
                            also disclose your information when required by law or to protect the rights, property, or
                            safety of SunCart, our customers, or others.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">6. Data Security</h2>
                        <p className="text-sm">
                            We implement appropriate technical and organizational security measures to protect your
                            personal information against unauthorized access, alteration, disclosure, or destruction.
                            Your account is protected by a password, and we encourage you to use a unique, strong
                            password and to keep it confidential. However, no method of transmission over the internet
                            is 100% secure, and we cannot guarantee absolute security.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">7. Your Rights</h2>
                        <p className="text-sm mb-3">You have the right to:</p>
                        <ul className="text-sm space-y-2 list-disc list-inside text-gray-600">
                            <li>Access the personal data we hold about you</li>
                            <li>Request correction of inaccurate or incomplete data</li>
                            <li>Request deletion of your personal data</li>
                            <li>Withdraw consent at any time where processing is based on consent</li>
                            <li>Lodge a complaint with a data protection authority</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">8. Children&apos;s Privacy</h2>
                        <p className="text-sm">
                            SunCart is not directed to children under the age of 13. We do not knowingly collect
                            personal information from children under 13. If we discover that a child under 13 has
                            provided us with personal information, we will promptly delete it from our servers.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">9. Changes to This Policy</h2>
                        <p className="text-sm">
                            We may update this Privacy Policy from time to time. We will notify you of any changes by
                            posting the new policy on this page with an updated date. You are advised to review this
                            page periodically for any changes. Continued use of our site after any modifications
                            constitutes your acknowledgment of the updated policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">10. Contact Us</h2>
                        <p className="text-sm">
                            If you have any questions or concerns about this Privacy Policy, please contact us at:
                        </p>
                        <div className="mt-3 bg-orange-50 rounded-xl px-5 py-4 text-sm space-y-1 text-gray-600">
                            <p>📧 support@suncart.com</p>
                            <p>📞 +1 (80023456) SUN-CART</p>
                            <p>📍 123 Beach Ave, Miami, FL</p>
                        </div>
                    </section>

                </div>

                <p className="text-center text-xs text-gray-400 mt-8">
                    © {new Date().getFullYear()} SunCart. All rights reserved.
                </p>
            </div>
        </main>
    );
}