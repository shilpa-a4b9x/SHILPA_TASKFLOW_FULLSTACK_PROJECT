# TaskFlow — Frontend

React (Vite) frontend for the TaskFlow task manager. Connects to your existing backend API.

## Folder structure

```
taskflow-frontend/
├── src/
│   ├── api/
│   │   ├── axios.js        # axios instance + auth token interceptor
│   │   ├── authApi.js      # login/register/profile calls
│   │   └── tasksApi.js     # task CRUD calls
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── PrivateRoute.jsx
│   │   └── TaskModal.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Tasks.jsx
│   │   └── Profile.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── .env.example
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Setup (local)

```bash
npm install
```

`.env` file already set:
```
VITE_API_URL=http://localhost:8000/api
```
Apne backend ka actual port/URL yahan daal do agar 8000 nahi hai.

```bash
npm run dev
```
App khulega `http://localhost:5173` par.

## Backend API contract this frontend expects

Agar tumhare backend ke routes ya response shapes alag hain, sirf `src/api/authApi.js` aur `src/api/tasksApi.js` mein path change karo — baaki kuch touch nahi karna padega.

**Auth**
- `POST /auth/register` → body `{ name, email, password }` → response `{ token, user }`
- `POST /auth/login` → body `{ email, password }` → response `{ token, user }`
- `GET /auth/profile` → response `{ user }`
- `PUT /auth/profile` → body `{ name }` → response `{ user }`

**Tasks** (JWT required in `Authorization: Bearer <token>` header — already handled automatically)
- `GET /tasks` → array of tasks
- `POST /tasks` → body `{ title, description, dueDate, priority, category, status }`
- `PUT /tasks/:id` → same body, for edits
- `PATCH /tasks/:id` → body `{ completed }`, to toggle checkbox
- `DELETE /tasks/:id`

Task object shape expected: `{ _id, title, description, dueDate, priority, category, status, completed, createdAt }`

## Deployment (Vercel — free, easiest)

1. GitHub par ek naya repo banao aur ye `taskflow-frontend` folder push kar do.
2. [vercel.com](https://vercel.com) par jao → Sign up with GitHub → **Add New Project** → apna repo select karo.
3. Framework preset: **Vite** (auto-detect ho jayega).
4. **Environment Variables** mein add karo:
   - Key: `VITE_API_URL`
   - Value: tumhare deployed backend ka URL, e.g. `https://taskflow-backend.onrender.com/api`
5. **Deploy** dabao. 1-2 minute mein live link mil jayega jaise `https://taskflow-frontend.vercel.app`.

⚠️ Important: Backend bhi deploy hona chahiye (Render/Railway) tabhi live frontend kaam karega — localhost:8000 sirf tumhare apne laptop par chalega.

Agar backend abhi tak deploy nahi kiya, bata dena — wo bhi kara deta hoon (Render par free hosting available hai).
