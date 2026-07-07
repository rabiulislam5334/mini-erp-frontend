# Mini ERP — Frontend

Modern, responsive **Inventory & Sales Management System** frontend built with React, TypeScript, and Tailwind CSS. Part of a full-stack MERN ERP solution.

**Live URL**: [Frontend Live Link](https://mini-erp-frontend-kappa.vercel.app)  
**Backend API**: `https://mini-erp-backend-kappa.vercel.app/api/v1`

---

## ✨ Features

- **Authentication** — Login with JWT + Protected Routes
- **Role-Based Access Control** — Admin, Manager, Employee
- **Dashboard** — Statistics cards + Low stock alerts
- **Products Management** — Full CRUD with image upload, search & pagination
- **Sales Management** — Create sales with multiple products, auto total calculation
- **Customers Management** — View & manage customer records
- **Team Management** — Admin can add team members (Manager/Employee)
- **Modern UI** — Built with Shadcn/UI + Tailwind CSS (beautiful & responsive)

---

## 🛠 Tech Stack

| Technology              | Purpose                          |
|-------------------------|----------------------------------|
| React 18 + TypeScript   | Core framework                   |
| React Router v6         | Routing & Protected Routes       |
| TanStack Query          | Data fetching & caching          |
| Zustand                 | Lightweight auth state management|
| Tailwind CSS + Shadcn/UI| Styling & Component Library      |
| Lucide React            | Icons                            |
| Vite                    | Build tool                       |

---

## 📁 Project Structure

```bash
src/
├── components/          # Reusable UI components
│   ├── ui/              # Shadcn components
│   ├── products/        # Product specific components
│   ├── sales/           # Sale form dialog etc.
│   └── users/           # User management
├── hooks/               # Custom hooks (useProducts, useSales, etc.)
├── pages/               # Main pages (Dashboard, Products, Sales, Users)
├── services/            # API service functions
├── store/               # Zustand stores (authStore)
├── lib/                 # API client (axios instance)
├── types/               # TypeScript interfaces
├── routes/              # ProtectedRoute component
└── utils/               # Helper functions

🚀 Getting Started
Prerequisites

Node.js (v18+)
Backend API running (or use deployed URL)

Installation
Bashgit clone https://github.com/rabiulislam5334/mini-erp-frontend.git
cd mini-erp-frontend
npm install
Environment Variables
Create .env file in root:
env VITE_API_BASE_URL=https://mini-erp-backend-kappa.vercel.app/api/v1
Run the Application
Bashnpm run dev
Open http://localhost:5173

🔑 Default Admin Login

Email: rakib@gmail.com
Password: admin1234


📋 Available Pages & Features

PageFeaturesAccessible ByLoginJWT AuthenticationPublicDashboardStats cards + Low stock productsAll rolesProductsCRUD, Image upload, Search, PaginationAll rolesSalesCreate sale (multi-product), HistoryAll rolesCustomersManage customersAdmin + ManagerUsersAdd team members (Admin only)Admin only

🎨 UI/UX Highlights

Fully responsive (Mobile + Desktop)
Beautiful data tables with sorting & pagination
Loading spinners & error states
Toast notifications
Clean, professional design using Shadcn/UI


🔧 Scripts
Bashnpm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build

📌 Key Implementation Details

TanStack Query for efficient data fetching & caching
Form validation using Zod (sync with backend)
ProtectedRoute component with role checking
Automatic stock validation on sales
Image preview before upload
Consistent error handling


🚀 Deployment
Deployed on Vercel (Frontend)
Connected with Backend API via environment variable.



















