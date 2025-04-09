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
