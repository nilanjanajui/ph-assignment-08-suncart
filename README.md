# ☀️ SunCart — Summer Essentials eCommerce

![Build](https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge)
![Deploy](https://img.shields.io/badge/deployed-Vercel-black?style=for-the-badge\&logo=vercel)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge\&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge\&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=for-the-badge\&logo=tailwind-css)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge\&logo=mongodb)
![Auth](https://img.shields.io/badge/Auth-BetterAuth-purple?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

A modern, fully responsive eCommerce web application built for summer enthusiasts. SunCart lets users explore and purchase seasonal products — sunglasses, skincare, beach accessories, clothing, and more — with a clean UI, smooth animations, and secure authentication.

🔗 **Live Site:** [https://ph-assignment-08-suncart-83dg.vercel.app](https://ph-assignment-08-suncart-83dg.vercel.app)

---

## 📸 Features

* 🌅 **Hero Slider** — Animated multi-slide banner showcasing summer deals and offers
* 🛍️ **Product Catalogue** — 20 summer products with search, category filter, and sort (price / rating)
* 🔒 **Protected Routes** — Product detail pages accessible only to authenticated users
* 🔐 **Authentication** — Email/password sign-up & login + Google OAuth via BetterAuth
* 👤 **My Profile** — View your name, email, and profile photo in a polished card layout
* ✏️ **Update Profile** — Change your display name and profile photo with a live preview
* 📱 **Fully Responsive** — Mobile-first design with a hamburger menu for small screens
* ✨ **Animations** — Smooth entrance animations powered by Animate.css throughout the app
* 🔔 **Toast Notifications** — Real-time feedback for login, register, logout, and errors
* 🔏 **Privacy Policy** — Dedicated privacy policy page linked from the footer

---

## 🛠️ Tech Stack

| Layer          | Technology                          |
| -------------- | ----------------------------------- |
| Framework      | Next.js 16 (App Router, JavaScript) |
| Styling        | Tailwind CSS v4                     |
| UI Components  | HeroUI                              |
| Authentication | BetterAuth                          |
| Database       | MongoDB Atlas                       |
| Animations     | Animate.css                         |
| Notifications  | react-hot-toast                     |
| Icons          | react-icons                         |
| Deployment     | Vercel                              |

---

## 📦 NPM Packages

```json
"dependencies": {
  "next": "16.2.4",
  "react": "19.2.4",
  "react-dom": "19.2.4",
  "better-auth": "^1.6.9",
  "@better-auth/mongo-adapter": "^1.6.9",
  "mongodb": "^7.2.0",
  "@heroui/react": "^3.0.3",
  "@heroui/styles": "^3.0.3",
  "animate.css": "^4.1.1",
  "react-hot-toast": "^2.6.0",
  "react-icons": "^5.6.0"
}
```

---

## 🗂️ Project Structure

```
src/
├── app/
│   ├── api/auth/[...all]/   # BetterAuth API handler
│   ├── login/               # Login page
│   ├── register/            # Register page
│   ├── products/            # All products page
│   ├── products/[id]/       # Product detail (protected)
│   ├── my-profile/          # Profile page (protected)
│   ├── my-profile/update/   # Update profile page (protected)
│   ├── privacy-policy/      # Privacy policy page
│   ├── layout.js            # Root layout with Navbar & Footer
│   ├── page.js              # Home page
│   └── globals.css          # Global styles + Tailwind + Animate.css
├── components/
│   ├── Navbar.jsx           # Responsive navbar with auth state
│   ├── Footer.jsx           # Footer with links and privacy policy
│   ├── HeroSlider.jsx       # Animated hero banner slider
│   ├── ProductCard.jsx      # Reusable product card component
│   ├── SummerCareTips.jsx   # Summer tips section
│   ├── TopBrands.jsx        # Brand showcase section
│   └── Providers.jsx        # App-level context providers
└── lib/
├── auth.js              # BetterAuth server config
└── auth-client.js       # BetterAuth client config
public/
└── products.json            # Static product data (20 items)
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js 18+
* A MongoDB Atlas cluster
* A Google OAuth app (for Google sign-in)

### Installation

```bash
# Clone the repository
git clone https://github.com/nilanjanajui/ph-assignment-08-suncart.git

# Navigate into the project
cd ph-assignment-08-suncart

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_random_secret_key
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Key Pages

| Route                | Access       | Description                                                 |
| -------------------- | ------------ | ----------------------------------------------------------- |
| `/`                  | Public       | Home page with hero slider, featured products, tips, brands |
| `/products`          | Public       | Full product catalogue with search, filter, sort            |
| `/products/[id]`     | 🔒 Protected | Full product detail page                                    |
| `/login`             | Public       | Email/password login + Google OAuth                         |
| `/register`          | Public       | Registration with name, email, photo URL, password          |
| `/my-profile`        | 🔒 Protected | View profile info                                           |
| `/my-profile/update` | 🔒 Protected | Edit name and profile photo                                 |
| `/privacy-policy`    | Public       | Privacy policy                                              |

---

## 🌐 Deployment

This project is deployed on Vercel with environment variables configured in the Vercel dashboard. Any push to the `main` branch triggers an automatic production deployment.

---

## 👩‍💻 Author

**Nilanjana** — [https://github.com/nilanjanajui](https://github.com/nilanjanajui)
