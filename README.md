# THEMOTOFAM — The Bike Marketplace

> **Find • Compare • Connect • Ride**

**THEMOTOFAM** is a centralized, full-stack web marketplace designed to facilitate buying and selling new, used, and pre-owned bikes across India. The platform tackles common classifieds issues—such as fake listings, outdated inventory, and lack of seller trust—by introducing mandatory admin moderation and automated 30-day listing re-verification cycles.

---

## 📌 Project Overview

* **Institution:** PES University, Department of Computer Applications
* **Student:** Jeeva P (SRN: PES1PG25CA091)[cite: 1]
* **Faculty Guide:** Shivaleela B Hiremath, Associate Professor[cite: 1]
* **Project Type:** Capstone Project • Phase 1[cite: 1]

---

## ⚡ Key Features

* **Admin-Approved Listings:** Every submitted bike listing undergoes administrative review and approval before becoming visible to public buyers[cite: 1].
* **30-Day Re-Verification Lifecycle:** The system tracks listing ages and prompts sellers every 30 days to re-confirm availability[cite: 1]. Unverified or inactive bikes are automatically deactivated or removed[cite: 1].
* **Advanced Search & Filtering:** Filter motorcycles by brand, model, price, year, mileage, condition, and location[cite: 1].
* **Side-by-Side Comparison:** Compare bike specifications across multiple models simultaneously to make informed purchase decisions[cite: 1].
* **Direct Buyer-to-Seller Communication:** Instant connectivity via direct Click-to-Call (`tel:`) and WhatsApp chat triggers[cite: 1].
* **Role-Based Portals:** Granular separation of concerns for Buyers, Sellers/Dealers, and System Administrators[cite: 1].
* **Listing Management:** Sellers can post multiple photos, add detailed bike specifications, track approval status (Pending, Approved, Rejected, Expired), or temporarily deactivate listings[cite: 1].

---

## 🛠️ Tech Stack

* **Frontend:** React, HTML5, CSS3, JavaScript, Bootstrap / Tailwind CSS[cite: 1]
* **Backend:** Node.js, Express.js[cite: 1]
* **Database:** MongoDB[cite: 1]
* **Authentication:** JWT-based user & admin authentication[cite: 1]
* **Communication & APIs:** WhatsApp API & Click-to-Call integration[cite: 1]
* **Version Control & Tools:** Git, GitHub, VS Code[cite: 1]

---

## 🎨 Design System & Theme

The project supports dynamic **Light** and **Dark** modes using the following brand palette:

| Element | Color | Hex Code | Purpose |
| :--- | :--- | :--- | :--- |
| **Primary Accent** | 🟥 Red | `#E53935` | Call-to-action buttons, badges, price highlights |
| **Header / Nav** | ⬛ Black | `#111111` | Top navbar, dark mode backgrounds |
| **Dark Gray** | 🌑 Dark Gray | `#2B2B2B` | Cards, secondary containers, borders |
| **Light Gray** | 🩶 Light Gray | `#F5F5F5` | Light mode page background |
| **White** | ⚪ White | `#FFFFFF` | Light mode card containers, typography |

---

## 📂 Project Architecture

```text
motofam/
├── frontend/                   # React SPA (Vite)
│   ├── public/                 # Static assets & brand icons
│   └── src/
│       ├── assets/             # Brand logos, placeholder graphics
│       ├── components/         # Reusable UI (Navbar, Footer, BikeCard, Badges)
│       ├── context/            # AuthContext & ThemeContext (Dark/Light mode)
│       ├── pages/              # Public, Seller, and Admin views
│       ├── services/           # Axios API service endpoints
│       └── store/              # Zustand global state (Compare drawer, Filters)
│
├── backend/                    # Express.js REST API
│   ├── config/                 # Database & cloud storage configurations
│   ├── controllers/            # Auth, Bike listings, Admin, & Verification controllers
│   ├── middlewares/            # Role-based access control & JWT handlers
│   ├── models/                 # Mongoose schemas (User, Bike, VerificationLog)
│   ├── jobs/                   # Automated cron jobs for 30-day expiry enforcement
│   └── routes/                 # API route declarations
│
└── README.md
