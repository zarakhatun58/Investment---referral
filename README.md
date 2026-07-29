# MERN Investment & Referral Platform

A full-stack Investment & Referral Management Platform built with the MERN Stack as part of a technical assessment. The application allows users to register using referral codes, invest in different plans, earn daily ROI, receive multi-level referral income, and monitor all activities through a responsive dashboard.

---

# Live Demo

Frontend

```
https://your-frontend-url.onrender.com
```

Backend API

```
https://your-backend-url.onrender.com/api
```

---

# GitHub Repository

```
https://github.com/yourusername/investment-referral-platform
```

---

# Tech Stack

## Frontend

* React.js
* TypeScript
* Vite
* Zustand
* Axios
* Tailwind CSS
* Recharts
* Lucide React

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs
* node-cron

## Database

* MongoDB Atlas

---

# Features

## Authentication

* User Registration
* User Login
* JWT Authentication
* Password Encryption using bcrypt
* Protected API Routes

---

## Dashboard

Displays

* Wallet Balance
* Total Investments
* Total ROI Earned
* Total Level Income
* Investment Statistics

---

## Investment Module

* View Investment Plans
* Create New Investment
* Investment History
* Investment Status
* Daily ROI Information

---

## Referral Module

* Referral Code Generation
* Direct Referrals
* Referral Tree
* Multi-Level Referral Income
* Referral History

---

## ROI Module

* Daily ROI Calculation
* ROI History
* Wallet Balance Updates
* Duplicate Protection

---

## Charts

* Investment Summary
* ROI Analytics
* Referral Income Analytics

---

# Folder Structure

```
investment-referral-platform

├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── cron
│   ├── validators
│   ├── utils
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── stores
│   │   ├── services
│   │   ├── hooks
│   │   ├── lib
│   │   └── types
│   │
│   ├── public
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

---

# Database Schema

## User

* Full Name
* Email
* Mobile
* Password (Encrypted)
* Referral Code
* Referred By
* Wallet Balance
* Total ROI Earned
* Total Level Income Earned
* Account Status

---

## Investment

* User
* Investment Amount
* Plan Name
* Start Date
* End Date
* Daily ROI
* Status

---

## ROI History

* User
* Investment
* ROI Amount
* Date
* Status

---

## Referral Income

* Receiver User
* Source User
* Referral Level
* Income Amount
* Date

---

# Business Logic

## User Registration

* Validate input
* Check duplicate email/mobile
* Validate referral code
* Encrypt password
* Generate referral code
* Save user
* Return JWT Token

---

## Login

* Validate email
* Verify password
* Generate JWT
* Return authenticated user

---

## Investment

* Validate investment amount
* Validate investment plan
* Calculate end date
* Save investment
* Display investment history

---

## Daily ROI

Every active investment

* Calculate ROI
* Store ROI History
* Update Wallet
* Update Total ROI Earned

---

## Referral Income

When ROI is generated

* Traverse parent hierarchy
* Calculate commission
* Credit wallet
* Save referral transaction
* Update total level income

---

# Cron Job

A scheduled job executes every day at **12:00 AM**.

Responsibilities

* Process active investments
* Generate Daily ROI
* Update Wallet Balance
* Store ROI History
* Calculate Referral Income

Duplicate processing is prevented using transaction validation and ROI history checks, making the process idempotent.

---

# API Endpoints

## Authentication

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/auth/register |
| POST   | /api/auth/login    |
| GET    | /api/auth/profile  |

---

## Dashboard

| Method | Endpoint       |
| ------ | -------------- |
| GET    | /api/dashboard |

---

## Plans

| Method | Endpoint   |
| ------ | ---------- |
| GET    | /api/plans |

---

## Investments

| Method | Endpoint         |
| ------ | ---------------- |
| GET    | /api/investments |
| POST   | /api/investments |

---

## ROI

| Method | Endpoint |
| ------ | -------- |
| GET    | /api/roi |

---

## Referrals

| Method | Endpoint              |
| ------ | --------------------- |
| GET    | /api/referrals/direct |
| GET    | /api/referrals/tree   |
| GET    | /api/referrals/income |

---

# Environment Variables

## Backend (.env)

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

JWT_EXPIRES_IN=7d

CLIENT_URL=http://localhost:5173
```

---

## Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/investment-referral-platform.git
```

---

## Backend

```bash
cd backend

npm install

npm run dev
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# Build

Backend

```bash
npm start
```

Frontend

```bash
npm run build
```

---

# Security

* JWT Authentication
* Password Hashing using bcrypt
* Protected Routes
* Request Validation
* Rate Limiting
* Secure Environment Variables
* MongoDB Validation
* Error Handling

---

# Performance Optimizations

* MongoDB Indexing
* Efficient Aggregation
* Lean Queries
* Optimized API Responses
* Zustand State Management
* Lazy Component Rendering

---

# Assumptions

* One investment belongs to one user.
* ROI is generated once per day.
* Referral income is calculated only when ROI is generated.
* Users can have multiple investments.
* Referral hierarchy supports up to 10 levels.
* Only active investments generate ROI.
* Completed or cancelled investments stop generating ROI.
* Wallet balance is updated immediately after successful ROI processing.

---

# Future Improvements

* Admin Dashboard
* Email Notifications
* SMS Verification
* Two-Factor Authentication
* Payment Gateway Integration
* Investment Plan Management
* Withdrawal Module
* Wallet Transactions
* Audit Logs
* Docker Deployment
* Unit & Integration Tests
* CI/CD Pipeline

---

# Author

**Jahanara Khatun**

Senior MERN Stack Developer

* React.js
* Node.js
* Express.js
* MongoDB
* TypeScript
* Tailwind CSS

---

# License

This project was developed by Jahanara Khatun for technical assessment purposes.
