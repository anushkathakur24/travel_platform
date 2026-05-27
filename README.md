# ✈️ TravelConnect

> A full-stack travel community platform built with the MERN stack — helping travellers discover stays, find restaurants, connect with trip buddies, and get AI-powered destination recommendations.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=flat-square&logo=node.js)
![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_9-47A248?style=flat-square&logo=mongodb)
![JWT](https://img.shields.io/badge/Auth-JWT-F9A825?style=flat-square&logo=jsonwebtokens)

---

## 📸 Features

| Feature | Description |
|---|---|
|  **Authentication** | JWT-based signup/login with bcrypt password hashing, protected routes, and persistent sessions |
|  **Accommodations** | Browse and filter stays by location, price range, and type (budget → luxury) |
|  **Restaurants** | Discover dining options by city using live search |
|  **Travel Buddies** | Post your upcoming trip, connect with other travellers heading to the same destination, and manage incoming connection requests |
|  **AI Chatbot** | Keyword-driven travel assistant covering 10+ destinations with tips on food, weather, visas, packing, and safety |
|  **Recommendations** | Curated destination guides (food, activities, best time to visit, budget, tips) for Paris, Tokyo, Goa, Bali, Manali, Ladakh, Kerala, Rajasthan, Maldives, Dubai |

---

## 🏗️ Tech Stack

### Frontend
- **React 19** with functional components and hooks
- **React Router v7** for client-side navigation
- **React Bootstrap 5** for UI components
- **Context API** for global auth state
- **Custom SVG icon library** — zero third-party icon dependency (23 Lucide-style icons hand-coded in `Icons.js`)
- Scroll-aware animated navbar, CSS custom properties theming, fade-up animations

### Backend
- **Node.js 20** + **Express 5**
- **MongoDB** with **Mongoose 9** — async pre-save hooks, instance methods, `.populate()`, dynamic `$regex` / `$gte` / `$lte` query filters
- **JWT** authentication (`jsonwebtoken`) with 7-day expiry and Bearer token scheme
- **bcryptjs** with salt rounds 12 for password hashing
- **CORS** restricted to frontend origin via env variable
- Modular route architecture (`/auth`, `/accommodations`, `/buddies`, `/recommendations`, `/chat`)

---

## 📁 Project Structure

```
travel_platform/
├── client/                     # React frontend (CRA)
│   └── src/
│       ├── components/
│       │   ├── Icons.js        # Custom zero-dependency SVG icon library
│       │   ├── NavbarComp.js   # Scroll-aware animated navbar
│       │   ├── Chatbot.js      # Floating AI travel assistant widget
│       │   ├── AIRecommendations.js
│       │   └── Footer.js
│       ├── context/
│       │   └── AuthContext.js  # Global auth state with localStorage persistence
│       ├── pages/
│       │   ├── Home.js
│       │   ├── Accommodations.js
│       │   ├── Restaurants.js
│       │   ├── TravelBuddies.js  # Includes "My Buddies" + connection requests UI
│       │   ├── Login.js
│       │   └── Signup.js
│       └── utils/
│           └── api.js          # Lightweight fetch wrapper with JWT injection
│
└── server/                     # Express backend
    ├── models/
    │   ├── User.js             # bcrypt pre-save hook, matchPassword instance method
    │   ├── Accommodation.js
    │   └── Buddy.js            # connectionRequests: [ObjectId ref User]
    ├── middleware/
    │   └── authMiddleware.js   # protect + optionalAuth middleware
    ├── routes/
    │   ├── auth.js             # signup, login, /me, /profile
    │   ├── accommodations.js   # CRUD + dynamic filtering
    │   ├── buddies.js          # CRUD + /connect + /mine endpoints
    │   ├── recommendations.js  # Static destination data with fallback
    │   └── chat.js             # Keyword rule engine (OpenAI-ready)
    ├── seed.js                 # DB seeder — 9 accommodations, 6 buddies
    └── server.js               # Entry point, CORS, MongoDB connect, error handler
```

---

##  Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Community (local) or a MongoDB Atlas URI

### 1. Clone the repo

```bash
git clone https://github.com/anushkathakur24/travel_platform.git
cd travel_platform
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create `server/.env`:

```env
MONGO_URI=mongodb://localhost:27017/travelconnect
JWT_SECRET=your_super_secret_key
PORT=5000
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

Seed the database (optional — adds sample hotels and travel buddies):

```bash
node seed.js
```

Start the server:

```bash
npm run dev      # with nodemon (auto-restart)
# or
npm start        # plain node
```

### 3. Set up the frontend

```bash
cd ../client
npm install
npm start        # runs on http://localhost:3000
```

The React dev server proxies `/api/*` requests to `localhost:5000` automatically.

---

## 🔌 API Endpoints

### Auth — `/api/auth`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/signup` | — | Register new user |
| POST | `/login` | — | Login, returns JWT |
| GET | `/me` | ✅ | Get current user profile |
| PUT | `/profile` | ✅ | Update name, bio, avatar, interests |

### Accommodations — `/api/accommodations`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | — | List with optional `?location=`, `?type=`, `?minPrice=`, `?maxPrice=` |
| GET | `/:id` | — | Single listing |
| POST | `/` | ✅ | Create listing |
| PUT | `/:id` | ✅ | Update listing |
| DELETE | `/:id` | ✅ | Delete listing |

### Travel Buddies — `/api/buddies`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | — | List with optional `?destination=` filter |
| GET | `/mine` | ✅ | Your listings with populated connection requests |
| GET | `/:id` | — | Single buddy listing |
| POST | `/` | ✅ | Create listing |
| PUT | `/:id` | ✅ | Update own listing |
| DELETE | `/:id` | ✅ | Delete own listing |
| POST | `/:id/connect` | ✅ | Send connection request |

### Other
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/recommendations` | Get destination guide by name |
| GET | `/api/recommendations/:destination` | Direct destination lookup |
| GET | `/api/recommendations` | List all available destinations |
| POST | `/api/chat` | Send message to AI travel chatbot |

---

## 🔒 Security Highlights

- Passwords hashed with **bcrypt** (12 salt rounds) via Mongoose pre-save hook — raw passwords never stored
- `password` field has `select: false` — never returned in any query by default
- JWT verified on every protected request via `authMiddleware`
- Duplicate email handled at both application level and MongoDB unique index (race condition safe)
- CORS restricted to `CLIENT_URL` environment variable
- JSON body size limited to **10kb**
- Ownership checks on all mutation endpoints (you can only edit/delete your own listings)

---

## 🌱 Future Improvements

- Real-time chat between connected travel buddies (Socket.io)
- Swap chat.js keyword engine for OpenAI GPT API (the `getResponse()` function is already isolated for this)
- Image uploads via Cloudinary
- Email notifications on buddy connection requests
- Google OAuth login

---

## 👩‍💻 Authors

**Anushka Thakur** · 

