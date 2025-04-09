## Files Folder Structure 🗃️📂

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

### 📝 Register API

**URL:**  
`POST http://localhost:6000/api/auth/register`

**Example:**

````json
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


### 🔐 Login API

**URL:**
`POST http://localhost:6000/api/auth/login`

**Example:**

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

````
