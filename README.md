📚 Book Review System

A full-featured Book Review System built with **Node.js**, **Express**, **MongoDB**, and **TypeScript**. Users can sign up, log in, view books, and write reviews. Authenticated users can create, update, or delete their own reviews.

---

## Features

### 🔐 User Authentication

- ✅ Register and login with email & password
- ✅ Passwords are hashed using **bcryptjs**
- ✅ Auth handled with **JWT**

### 📚 Books

- ✅ Add new books (Authenticated users only)
- ✅ Get all books (pagination + optional filters: author, genre)
- ✅ Get single book details with:
  - ✅ Average rating
  - ✅ All reviews (with pagination)

### ✍️ Reviews

- ✅ Submit a review (Only once per book per user)
- ✅ Update your review
- ✅ Delete your review

### 🔍 Search

- ✅ Search books by **title** or **author** (case-insensitive & partial match)

---

## 🛠️ Tech Stack

| Tech               | Description                 |
| ------------------ | --------------------------- |
| Node.js + Express  | Backend API                 |
| MongoDB + Mongoose | NoSQL Database              |
| TypeScript         | Strongly-typed development  |
| JWT                | Authentication              |
| bcryptjs           | Password encryption         |
| express-rate-limit | Security: API Rate Limiting |
| cors, morgan       | Middleware                  |
| dotenv             | Environment configs         |

---

## 📂 Project Structure

src/
├── controllers/
├── services/
├── models/
├── repositories/
├── routes/
├── middleware/
├── utils/
└── index.ts

yaml
Copy
Edit

---

## 🔐 Environment Variables

Create a `.env` file in the root:

```env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
▶️ Getting Started
📦 Install Dependencies

npm install
⚙️ Build the Project

tsc
   Start the Server

npm start
Or with ts-node-dev (for development):


npx ts-node-dev src/index.ts
📬 API Endpoints
🔑 Auth
Method	Endpoint	Description
POST	/signup	Register new user
POST	/login	Login and get JWT

📚 Books
Method	Endpoint	Description
POST	/books	Add a new book (auth required)
GET	/books	Get all books (with filters)
GET	/books/:id	Get book details with reviews

✍️ Reviews
Method	Endpoint	Description
POST	/books/:id/reviews	Submit a review (auth required)
PUT	/reviews/:id	Update your own review
DELETE	/reviews/:id	Delete your own review

🔎 Search
Method	Endpoint	Description
GET	/search	Search books by title/author

🛡️ Security Features
JWT Authentication

Rate limiting with express-rate-limit

Input validation & sanitization

Environment-based configuration

✅ Future Improvements
 User roles (admin)

 Book cover uploads (Cloudinary)

 Better error handling and validation

 Frontend (React.js) integration

📸 Screenshots
(Add screenshots of your API response in Postman or UI, if you build frontend)

🧑‍💻 Author
Harisankar – Self-taught MERN Stack Developer
 Goal: Get a full-time software developer job @ ₹5 LPA+
🌱 Currently learning and building real-world projects.

🌐 License
This project is licensed under the MIT License.
