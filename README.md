# 🧠 Backend Developer Intern – Project Assignment

---

## 🚀 Tech Stack

**Backend:** Node.js, Express.js, MongoDB, Mongoose
**Frontend:** React (Vite)
**Authentication:** JWT, bcrypt password hashing
**Documentation:** Swagger UI + Postman Collection
**Validation:** express-validator
**Logging:** morgan
**Versioning:** API v1
**Database:** MongoDB (Local or Atlas)

---

## 📂 Project Overview

This project demonstrates secure, scalable backend API development with user authentication, role-based access control, and CRUD operations. It also includes a simple React frontend for testing the APIs.

---

## ⚙️ Features Implemented

### ✅ Backend (Primary Focus)

1. **User Authentication**

   * Registration and Login APIs
   * Passwords hashed using **bcrypt**
   * JWT-based authentication

2. **Role-Based Access Control (RBAC)**

   * Two roles: `user` and `admin`
   * Admins can view/update/delete all tasks

3. **CRUD Operations (Tasks)**

   * Users can manage their own tasks
   * Admins have full control

4. **API Versioning**

   * Base URL: `/api/v1/...`

5. **Validation & Error Handling**

   * Input validation using `express-validator`
   * Custom error handler middleware

6. **API Documentation (Swagger)**

   * Accessible at: [http://localhost:4000/api/v1/docs](http://localhost:4000/api/v1/docs)

7. **Postman Collection**

   * Included inside **server folder** as: `intern_task.postman_collection.json`

---

### ✅ Frontend (Supportive)

1. **React (Vite) App**

   * Register new users
   * Login and store JWT token in localStorage
   * Dashboard to view, create, edit, and delete tasks

2. **Axios-based API calls**

   * Connected directly to backend

3. **Role Handling**

   * Access restricted to authenticated users only

---

## 🤍 Project Structure

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
│   │   └── controller/   # Controllers
│   ├── .env
│   ├── server.js         # Entry point
│   ├── package.json
│   └── intern_task.postman_collection.json
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

## 🔁 Installation & Setup

### Step 1️⃣ Backend Setup

#### Prerequisites:

* Node.js (v18+)
* MongoDB (Local or Atlas)
* Postman (for API testing)

#### Installation:

```bash
cd backend
npm install
```

#### Environment Variables:

Create a `.env` file inside `/backend`:

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/intern_task_db
JWT_SECRET=SuperStrongSecretKey
JWT_EXPIRES_IN=1h
```

#### Run Server:

```bash
npm run dev
```

Expected output:

```
🚀 Server running on port 4000
✅ MongoDB connected
```

#### Swagger Documentation:

Visit → [http://localhost:4000/api/v1/docs](http://localhost:4000/api/v1/docs)

---

### Step 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Visit → [http://localhost:5173](http://localhost:5173)

#### Available Pages:

* `/register` → Register new users
* `/login` → Login page
* `/dashboard` → JWT protected dashboard

---

## 🧮 API Endpoints

| Method | Endpoint                | Description             | Auth Required | Role       |
| ------ | ----------------------- | ----------------------- | ------------- | ---------- |
| POST   | `/api/v1/auth/register` | Register a new user     | ❌             | Any        |
| POST   | `/api/v1/auth/login`    | Login and get JWT token | ❌             | Any        |
| GET    | `/api/v1/tasks`         | Get all/self tasks      | ✅             | user/admin |
| POST   | `/api/v1/tasks`         | Create a new task       | ✅             | user/admin |
| PUT    | `/api/v1/tasks/:id`     | Update existing task    | ✅             | user/admin |
| DELETE | `/api/v1/tasks/:id`     | Delete task             | ✅             | user/admin |

---

## 📩 Postman Collection

File Location → `/backend/intern_task.postman_collection.json`

Import into Postman → Collections → Import → Select this JSON file.

---

## 📊 Example Backend Logs

```
🚀 Server running on port 4000
✅ MongoDB connected
POST /api/v1/auth/register 201
POST /api/v1/auth/login 200
GET /api/v1/tasks 200
POST /api/v1/tasks 201
PUT /api/v1/tasks/:id 200
DELETE /api/v1/tasks/:id 200
```

Save these logs as `backend_logs.txt` for submission.

---

## 🧱 Scalability & Deployment Notes

1. Stateless JWT enables **horizontal scaling** behind load balancers.
2. Use **MongoDB Atlas** for sharded, replicated DB clusters.
3. Deploy backend using **Docker + Nginx**.
4. Split Auth & Tasks into **microservices**.
5. Integrate **Redis** for caching and rate-limiting.
6. Implement **Winston + Morgan** for centralized logging.
7. Setup **CI/CD** pipelines with **GitHub Actions**.

---

## 🛡️ Security Implementations

* Passwords hashed using **bcrypt** (salt rounds = 10)
* **JWT** tokens with 1-hour expiry
* **Role-based access control (RBAC)**
* **Input validation** using express-validator
* **CORS** limited to frontend origin (`localhost:5173`)
* **.env** used to hide secrets

---

## 🧾 Deliverables

* ✅ GitHub Repository (Frontend + Backend)
* ✅ Working APIs (Auth + CRUD)
* ✅ React Frontend integrated with backend
* ✅ Postman Collection (`intern_task.postman_collection.json`)
* ✅ Log file (`backend_logs.txt`)
* ✅ Scalability & Security notes

---

## 📧 Submission Instructions

**Email Subject:** `Backend Developer Task Submission`
**To:**

* [saami@bajarangs.com](mailto:saami@bajarangs.com)
* [nagasai@bajarangs.com](mailto:nagasai@bajarangs.com)
* [chetan@bajarangs.com](mailto:chetan@bajarangs.com)
  **CC:**
* [sonika@primetrade.ai](mailto:sonika@primetrade.ai)

### Attach:

1. GitHub Repository Link → [https://github.com/PavanCH19/mern-backend-intern-task.git](https://github.com/PavanCH19/mern-backend-intern-task.git)
2. `backend_logs.txt`
3. `intern_task.postman_collection.json`
4. Resume

---

## 🏁 Example Demo Flow

1. Register a user
2. Login → JWT saved to localStorage
3. Dashboard → Create / Edit / Delete tasks
4. Swagger UI → Test endpoints visually

---

## 📸 Optional Screenshots

Include screenshots of:

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

This project showcases:

* RESTful API design principles
* Secure JWT Authentication
* Scalable architecture with Node.js & MongoDB
* Functional Frontend integration using React
