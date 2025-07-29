Digital CA Platform (Frontend Prototype)
This is a React.js frontend prototype for a Digital Chartered Accountant (CA) Platform, designed to modernize and digitize workflows such as tax filing, compliance reminders, client management, invoicing, and data visualization

Features

✅ Login / Signup Interface (AuthPage)
✅ Dashboard with tax filing overview & compliance reminders
✅ Client Dashboard with client cards & document upload
✅ Forms: GST, PAN, TDS data entry
✅ Invoice Creation with total calculation
✅ Charts & Analytics (Monthly filings, tax revenue, client growth using Recharts)
✅ Responsive UI (Desktop & Mobile)
✅ State Management using React Context API
✅ Uses dummy JSON data (No backend required)

Tech Stack

React.js 19 (Functional Components + Hooks)

React Router DOM v7 (Routing)

Context API (State management)

Recharts (Charts & Analytics)

Plain CSS (Modular component-level styles)

ESLint + Prettier (Code linting & formatting)

Folder Structure

digital-ca-platform/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── auth/          # Login, Signup, AuthPage
│   │   ├── common/        # Header, Sidebar, Layout
│   │   ├── dashboard/     # Dashboard, StatsCard, ReminderCard
│   │   ├── clients/       # ClientDashboard, ClientCard, DocumentUpload
│   │   ├── forms/         # GSTForm, PANForm, TDSForm
│   │   ├── invoice/       # InvoiceCreation, InvoiceTable, InvoiceTotals
│   │   └── charts/        # ChartsSection, MonthlyFilingsChart, etc.
│   ├── context/           # AppContext.js (Context API)
│   ├── data/              # dummyData.js (Static JSON Data)
│   ├── utils/             # helpers.js (Utility functions)
│   ├── App.jsx
│   ├── App.css
│   ├── index.js
├── package.json
└── README.md

Installation & Setup
1️⃣ Clone the repository:
git clone https://github.com/your-username/digital-ca-platform.git
cd digital-ca-platform
2️⃣ Install dependencies:
npm install
3️⃣ Start the development server:
npm start
4️⃣ Open your browser and go to http://localhost:3000
5️⃣ Explore the features and functionalities of the Digital CA Platform prototype!