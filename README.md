# 🧠 Backend Developer Intern – Project Assignment

### 🚀 Tech Stack

**Backend:** Node.js, Express.js, MongoDB, Mongoose
**Frontend:** React (Vite)
**Auth:** JWT Authentication, bcrypt password hashing
**Docs:** Swagger UI + Postman Collection
**Validation:** express-validator
**Logging:** morgan
**Versioning:** API v1
**Database:** MongoDB (local or Atlas)

---

## 📁 Project Overview

This project demonstrates secure, scalable backend API development with user authentication, role-based access control, and CRUD operations — integrated with a simple React frontend for testing APIs.

---

## ⚙️ Features Implemented

### ✅ Backend (Primary Focus)

* **User Registration & Login**

  * Passwords hashed using **bcrypt**
  * JWT-based authentication
* **Role-Based Access**

  * `user` and `admin` roles
* **CRUD APIs**

  * Entity: **Tasks**
  * Users can manage their own tasks
  * Admin can view/update/delete all tasks
* **API Versioning**

  * Base URL: `/api/v1/...`
* **Validation & Error Handling**

  * Using `express-validator` and custom middleware
* **Swagger API Documentation**

  * Live Docs: [http://localhost:4000/api/v1/docs](http://localhost:4000/api/v1/docs)
* **Postman Collection**

  * Provided below for quick testing

### ✅ Frontend (Supportive)

* **React (Vite) UI**

  * Register new users
  * Login and store JWT token in localStorage
  * Dashboard to view, create, and delete tasks
* **Fetch-based API calls**

  * Connected directly with backend
* **Role Handling**

  * Access restricted to logged-in users only

---

## 🧮 Project Structure

```
backend_task/
│
├── backend/
│   ├── src/
│   │   ├── config/       # MongoDB connection
│   │   ├── models/       # User & Task models
│   │   ├── routes/v1/    # Auth & Task routes
│   │   ├── middleware/   # Auth, Role, Error handlers
│   │   ├── docs/         # Swagger setup
│   │   ├── utils/        # Logger
│   │   └── controller/   # api controller
│   ├── .env
│   ├── server.js         # entry point 
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── pages/        # Register, Login, Dashboard
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    └── package.json
```

---

## 🡩‍💻 Installation & Setup

### 1️⃣ Backend Setup

#### 🪾 Prerequisites:

* Node.js (v18+)
* MongoDB (Local or Atlas)
* Postman (for API testing)

#### 📦 Installation:

```bash
cd backend
npm install
```

#### ⚙️ Environment Setup:

Create `.env` file inside `/backend`:

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/intern_task_db
JWT_SECRET=SuperStrongSecretKey
JWT_EXPIRES_IN=1h
```

#### ▶️ Run Server:

```bash
npm run dev
```

✅ Output should show:

```
🚀 Server running on port 4000
✅ MongoDB connected
```

#### 🧯 Swagger Docs:

Visit → [http://localhost:4000/api/v1/docs](http://localhost:4000/api/v1/docs)

---

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Visit → [http://localhost:5173](http://localhost:5173)

#### ✨ Pages:

* **Register:** `/register`
* **Login:** `/login`
* **Dashboard:** `/dashboard` (JWT Protected)

---

## 🥪 API Endpoints

| Method | Endpoint                | Description                      | Auth Required | Role       |
| ------ | ----------------------- | -------------------------------- | ------------- | ---------- |
| POST   | `/api/v1/auth/register` | Register new user                | ❌             | Any        |
| POST   | `/api/v1/auth/login`    | Login user                       | ❌             | Any        |
| GET    | `/api/v1/tasks`         | Get tasks (self / all for admin) | ✅             | user/admin |
| POST   | `/api/v1/tasks`         | Create new task                  | ✅             | user/admin |
| PUT    | `/api/v1/tasks/:id`     | Update task                      | ✅             | user/admin |
| DELETE | `/api/v1/tasks/:id`     | Delete task                      | ✅             | user/admin |

---

## 📩 Postman Collection

Save this file as `intern_task.postman_collection.json` and import into Postman.

👉 [Download Postman JSON](https://pastebin.com/raw/7WvG1t5z)
*(or copy from chat earlier)*

---

## 📊 Example Log Output

Your backend console should show logs like this when tested via Postman or frontend:

```
🚀 Server running on port 4000
✅ MongoDB connected
POST /api/v1/auth/register 201
POST /api/v1/auth/login 200
GET /api/v1/tasks 200
POST /api/v1/tasks 201
DELETE /api/v1/tasks/:id 200
```

Save these logs as `backend_logs.txt` for submission.

---

## 🥱 Scalability & Deployment Notes

* Stateless JWT enables **horizontal scaling** behind a load balancer.
* Use **MongoDB Atlas** (auto-sharded, replicated).
* Deploy backend with **Docker + Nginx + Node.js**.
* Split Auth & Tasks into **microservices** for modular scaling.
* Use **Redis** for:

  * Caching frequently accessed data
  * Rate-limiting (e.g., login attempts)
* Add **Winston + Morgan** for centralized logging.
* Future: CI/CD via **GitHub Actions** and container orchestration via **Kubernetes**.

---

## 🛡️ Security Implementations

* Passwords are **hashed with bcrypt** (salt rounds = 10).
* **JWT** used for stateless authentication (expires in 1h).
* **Role-based access control** (RBAC) for admin/user.
* **Input validation** using express-validator.
* **CORS** enabled only for frontend origin (`localhost:5173`).
* **Environment variables** hidden using `.env`.

---

## 📟 Deliverables

* ✅ Backend hosted on GitHub with README.md
* ✅ Working APIs (Auth + CRUD)
* ✅ Basic React frontend connected to APIs
* ✅ Postman collection file
* ✅ Short scalability note
* ✅ Log file from server (backend_logs.txt)

---

## 📧 Submission Instructions

**Subject:** `Frontend Developer Task`
**To:**

* [saami@bajarangs.com](mailto:saami@bajarangs.com)
* [nagasai@bajarangs.com](mailto:nagasai@bajarangs.com)
* [chetan@bajarangs.com](mailto:chetan@bajarangs.com)
  **CC:**
* [sonika@primetrade.ai](mailto:sonika@primetrade.ai)

Attach:

1. GitHub Repo Link (Frontend + Backend) "https://github.com/PavanCH19/mern-backend-intern-task.git"
2. `backend_logs.txt`
3. Postman Collection (`intern_task.postman_collection.json`)
4. Resume

---

## 🏁 Example Demo Flow

1. Register → Login
2. Copy JWT Token (auto stored in localStorage)
3. Visit Dashboard → Create, View, Delete tasks
4. View API Docs on Swagger UI

---

## 📸 (Optional) Add Screenshots

If you want to impress the reviewers, include screenshots of:

* ✅ Swagger UI
* ✅ Postman test results
* ✅ React dashboard showing tasks

---

## 👨‍💻 Author

**Name:** Pavan C H
**Role:** Backend Developer (Intern Candidate)
**University:** Visvesvaraya Technological University, Mysore
**Stack:** MERN (MongoDB, Express, React, Node.js)

---

## ⭐ Final Notes

This project demonstrates:

* API design best practices (REST principles)
* Secure authentication (JWT + bcrypt)
* Clean project structure for scalability
* Functional frontend integration
