# 🌱 GreenChamps

**GreenChamps** is an eco-conscious MERN stack web application that encourages users to complete daily sustainable challenges and earn digital badges. It promotes environmental responsibility in a fun, trackable way through engaging challenges and visual progress indicators.

---

## Project Preview

### Home Page

![Dashboard Screenshot](./client/src/assets/homepage.jpeg)

### 🎯 Dashboard with Daily Challenge

![Dashboard Screenshot](./client/src/assets/dashboard.jpeg)

### 🏅 Badge Display

![Badges Screenshot](./client/src/assets/badges.jpeg)

### 📚 Challenge Library

![Library Screenshot](./client/src/assets/challenge-library.jpeg)

## 🚀 Features

- ✅ **User Authentication** (Register/Login with JWT)
- 📅 **Daily Eco-Challenges** with completion tracking
- 🏅 **Badges** earned by completing challenges
- 📚 **Challenge Library** to view all available challenges.
- 🎨 **Responsive UI** with icons, animations, and custom CSS
- 🔒 Protected routes for user-specific data

---

## 🛠 Tech Stack

**Frontend**

- React
- Axios
- React Icons
- Custom CSS (no Tailwind)

**Backend**

- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)
- dotenv

---

## 📁 Folder Structure

## Sample Files Folder Structure 🗃️📂

```

greenchamps/
├── client/                     # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/         # Reusable components (e.g., Navbar, BadgeCard)
│   │   ├── pages/              # App pages (Login, Signup, Dashboard, Profile)
│   │   ├── services/           # Axios calls to backend
│   │   ├── App.js
│   │   ├── main.js
│   │   └── index.css
│   └── package.json
│
├── server/                     # Node + Express Backend
│   ├── controllers/            # Logic for routes (e.g., auth, challenge)
│   ├── models/                 # MongoDB models (User, Challenge, Badge)
│   ├── routes/                 # Express route handlers
│   ├── middleware/             # Auth middleware (JWT)
│   ├── utils/                  # Helper functions
│   ├── server.js               # Entry point
│   └── package.json
│
├── .env                        # Environment variables
├── .gitignore
└── README.md

```

---

### 📝 Register API

**URL:**  
`POST http://localhost:8080/api/auth/register`

**Example:**

```json
// Request
{
  "name": "test",
  "email": "test@example.com",
  "password": "123"
}

// Response
{
  "message": "User registered successfully"
}
```

### 📝 Login API

**URL:**  
`POST http://localhost:8080/api/auth/login`

```json

// Request
{
  "email": "test@example.com",
  "password": "123"
}

// Response
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2Y2NWNhNDI1NTM1MTU2YWFjMTk1YjIiLCJpYXQiOjE3NDQxOTkwNDUsImV4cCI6MTc0NDI4NTQ0NX0.dCRvIlNtdxRiXA09g-_UEHh92UcS5_68MK-kLRcvTzA",
  "user": {
    "name": "test",
    "email": "test@example.com",
    "_id": "67f65ca425535156aac195b2"
  }
}
```
