Youtube-tryrun-main/
├── .env # Environment variables
├── index.js # Main server entry
├── Connection/ # MongoDB connection setup
├── Controllers/ # All route handlers (business logic)
├── Routes/ # Express routes
├── Modals/ # Mongoose schema models
├── middleware/ # Authentication, logging middleware
├── node_modules/ # Installed packages
├── package.json # Backend dependencies
├── youtube-frontend/ # Frontend app (React or similar)
## 🚀 Features

- 🔐 **User Authentication** (JWT-based login/signup)
- 📦 **RESTful API** for videos, users, and comments
- 🎞️ **Upload & Manage Videos**
- 💬 **Comment System**
- 🧾 **MongoDB Integration** via Mongoose
- ⚙️ **Middleware support** for authentication
- 🌐 **Frontend UI** (React app with routing & dynamic rendering)

---

## 🛠️ Tech Stack

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- dotenv
- jsonwebtoken (JWT)
- bcryptjs

### Frontend:
- React.js *(inside `youtube-frontend/`)*
- Axios for API calls
- React Router DOM

---
