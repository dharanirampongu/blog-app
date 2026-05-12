# 📝 Blog App

A full-stack blogging platform with role-based access control, built with **React** and **Express.js**.

## 🌐 Live Demo

| Service  | URL |
|----------|-----|
| Frontend | Deployed on **Vercel** |
| Backend  | Deployed on **Render** |

---

## ✨ Features

- **User Registration & Login** — secure authentication with JWT (HTTP-only cookies)
- **Role-Based Access** — three roles: `USER`, `AUTHOR`, `ADMIN`
  - **User** — browse articles, post comments
  - **Author** — write, edit, and manage their own articles
  - **Admin** — manage users, enable / disable accounts
- **Article Management** — full CRUD for articles with categories & comments
- **Image Uploads** — profile pictures & article images via Cloudinary + Multer
- **Protected Routes** — client-side route guards based on user role

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 19 | UI library |
| React Router 7 | Client-side routing |
| Zustand | Global state management |
| Axios | HTTP client |
| React Hook Form | Form handling & validation |
| React Hot Toast | Toast notifications |
| Tailwind CSS 4 | Styling |
| Vite 8 | Build tool & dev server |

### Backend
| Technology | Purpose |
|------------|---------|
| Express 5 | Web framework |
| Mongoose 9 | MongoDB ODM |
| JSON Web Token | Authentication |
| bcryptjs | Password hashing |
| Cloudinary | Cloud image storage |
| Multer | File upload middleware |
| cookie-parser | HTTP-only cookie handling |
| dotenv | Environment variable management |

### Database
- **MongoDB Atlas** (cloud-hosted)

---

## 📁 Project Structure

```
blog-app/
├── blog-app-backend/
│   ├── APIs/
│   │   ├── AdminAPI.js       # Admin routes (user management)
│   │   ├── AuthorAPI.js      # Author routes (article CRUD)
│   │   ├── CommonAPI.js      # Auth routes (register, login, logout)
│   │   └── UserAPI.js        # User routes (profile, comments)
│   ├── config/               # Cloudinary & other config
│   ├── middlewares/
│   │   └── verifyToken.js    # JWT verification middleware
│   ├── models/
│   │   ├── ArticleModel.js   # Article & Comment schemas
│   │   └── UserModel.js      # User schema
│   ├── server.js             # App entry point
│   ├── render.yaml           # Render deployment config
│   └── .env                  # Environment variables (not committed)
│
├── blog-app-frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx          # Navigation bar
│   │   │   ├── Home.jsx            # Landing page
│   │   │   ├── Register.jsx        # User registration
│   │   │   ├── Login.jsx           # User login
│   │   │   ├── UserProfile.jsx     # User dashboard
│   │   │   ├── AuthorProfile.jsx   # Author dashboard
│   │   │   ├── AuthorArticles.jsx  # Author's article list
│   │   │   ├── WriteArticles.jsx   # Create new article
│   │   │   ├── EditArticle.jsx     # Edit existing article
│   │   │   ├── ArticleByID.jsx     # Single article view
│   │   │   ├── ProtectedRoute.jsx  # Role-based route guard
│   │   │   └── Unauthorized.jsx    # 403 page
│   │   ├── store/            # Zustand state stores
│   │   ├── styles/           # Custom stylesheets
│   │   ├── axiosConfig.js    # Centralized Axios instance
│   │   └── App.jsx           # Router configuration
│   ├── vercel.json           # Vercel deployment config
│   └── vite.config.js        # Vite configuration
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- A **MongoDB Atlas** cluster (or local MongoDB instance)
- A **Cloudinary** account (for image uploads)

### 1. Clone the repository

```bash
git clone https://github.com/dharanirampongu/blog-app.git
cd blog-app
```

### 2. Backend setup

```bash
cd blog-app-backend
npm install
```

Create a `.env` file in `blog-app-backend/`:

```env
PORT=4000
DB_URL=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/BlogApp
SECRET_KEY=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the server:

```bash
npm start
```

### 3. Frontend setup

```bash
cd blog-app-frontend
npm install
npm run dev
```

The app will be available at **http://localhost:5173**.

---

## 📡 API Endpoints

### Auth (`/auth`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login & receive JWT cookie |
| POST | `/auth/logout` | Clear auth cookie |

### User (`/user-api`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/user-api/articles` | Get all articles |
| POST | `/user-api/comment` | Add a comment to an article |

### Author (`/author-api`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/author-api/articles` | Get author's articles |
| POST | `/author-api/article` | Create a new article |
| PUT | `/author-api/article` | Update an article |
| DELETE | `/author-api/article/:id` | Soft-delete an article |

### Admin (`/admin-api`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin-api/users` | Get all users |
| PUT | `/admin-api/user/toggle` | Enable / disable a user account |

---

## 🚢 Deployment

| Layer | Platform | Config File |
|-------|----------|-------------|
| Frontend | Vercel | `vercel.json` |
| Backend | Render | `render.yaml` |

> Set the same environment variables listed above in each platform's dashboard.

---

## 📄 License

This project is licensed under the **ISC License**.
