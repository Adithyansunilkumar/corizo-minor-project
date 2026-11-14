# Student Management System (MERN Stack Minor Project)

A beginner-friendly, clean, and full-stack **Student Management System** built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) demonstrating core **CRUD operations** (Create, Read, Update, Delete) with a clean user interface styled using pure CSS.

---

## 📁 1. Project Folder Structure

```text
corizo-mini-project/
│
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
├── server/
│   ├── models/
│   │   └── Student.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── package.json
└── README.md
```

---

## 🛠️ 2. Technologies Used

| Technology | Role in this Project |
| :--- | :--- |
| **React.js (Frontend)** | Builds the Single Page Application, manages form inputs, search filters, and updates the UI dynamically. |
| **Node.js (Runtime)** | Executes JavaScript outside the browser on the server machine. |
| **Express.js (Backend Framework)** | Provides the REST API routes and handles HTTP requests. |
| **MongoDB (Database)** | NoSQL document database storing student records in the `students` collection. |
| **Mongoose (ODM)** | Object Data Modeling library to define the student schema and perform queries in MongoDB. |
| **Axios (HTTP Client)** | Used inside React to send asynchronous HTTP requests to Express endpoints. |
| **Pure CSS (Styling)** | Clean, responsive, and modern interface without external styling libraries. |

---

## 🚀 3. Features Implemented

1. **Dashboard Overview:** Displays total count of registered students.
2. **Create (Add Student):** Form with validation for Student Name, Email, Phone, Department, and Year of Study.
3. **Read (View Students):** Dynamic table rendering all student records retrieved from MongoDB.
4. **Update (Edit Student):** Clicking **Edit** populates the student details into the form; changes can be saved back to MongoDB.
5. **Delete (Delete Student):** Confirmation prompt before permanently removing a student record.
6. **Real-time Search:** Search bar to instantly filter students by name, email, or department.
7. **Feedback Notifications:** Clear success and error alert banners for all actions.

---

## 🔌 4. Backend REST API Endpoints

| Method | Endpoint | Description | MongoDB Operation |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/students` | Register a new student | `new Student(data).save()` |
| `GET` | `/api/students` | Get all registered students | `Student.find().sort({ createdAt: -1 })` |
| `GET` | `/api/students/:id`| Get single student details | `Student.findById(id)` |
| `PUT` | `/api/students/:id`| Update student details | `Student.findByIdAndUpdate(id, data, { new: true })` |
| `DELETE`| `/api/students/:id`| Delete student by ID | `Student.findByIdAndDelete(id)` |

---

## 🧠 5. How MERN Stack Works in this Project

### A. How React Sends Data Using Axios
1. The user types data into the form inputs in [App.jsx](file:///c:/Users/Adithyan%20S/PROJECTS/corizo-mini-project/client/src/App.jsx).
2. When the user clicks **Register Student**, `handleSubmit()` is triggered.
3. Axios sends a POST request with the form data as a JSON payload:
   ```javascript
   const response = await axios.post('http://localhost:5000/api/students', formData);
   ```
4. Once the server responds with a success status (`201`), React updates the UI and re-fetches the latest student list.

### B. How Express and Mongoose Handle Database Operations
1. Express receives the request in [server.js](file:///c:/Users/Adithyan%20S/PROJECTS/corizo-mini-project/server/server.js).
2. `express.json()` middleware parses the incoming JSON body.
3. Mongoose passes the validated data to MongoDB:
   ```javascript
   const newStudent = new Student(req.body);
   const savedStudent = await newStudent.save();
   ```
4. MongoDB generates a unique `_id` and saves the document in the `students` collection.
5. Express sends back a JSON response with status code `201`:
   ```javascript
   res.status(201).json({ success: true, message: 'Student registered successfully', data: savedStudent });
   ```

---

## ⚙️ 6. Database Setup Instructions

You can use either **Local MongoDB** or **MongoDB Atlas (Free Cloud)**.

### Option A: MongoDB Atlas (Recommended - No local installation required)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and sign up for a free account.
2. Create a free shared cluster (M0 sandbox).
3. Under **Database Access**, create a database user (e.g., username: `admin`, password: `yourpassword`).
4. Under **Network Access**, click **Add IP Address** and choose **Allow Access From Anywhere** (`0.0.0.0/0`).
5. Click **Connect** > **Drivers** > copy your connection string.
6. Open `server/.env` and replace `MONGO_URI`:
   ```env
   MONGO_URI=mongodb+srv://admin:yourpassword@cluster0.xxxxx.mongodb.net/student_management?retryWrites=true&w=majority
   ```

### Option B: Local MongoDB
1. Download and install **MongoDB Community Server** and **MongoDB Compass** from the official MongoDB website.
2. Ensure the MongoDB service is running on port `27017`.
3. In `server/.env`, keep:
   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/student_management
   ```

MongoDB automatically creates the `student_management` database and `students` collection when the first document is inserted.

---

## 💻 7. Installation & Running the Project

### Step 1: Open Terminal
```bash
cd "c:\Users\Adithyan S\PROJECTS\corizo-mini-project"
```

### Step 2: Run the Backend Server
```bash
cd server
npm install
npm run dev
```
The server will start on port `5000` (`http://localhost:5000`).

### Step 3: Run the Frontend Client (In a New Terminal Window)
```bash
cd client
npm install
npm run dev
```
The client will start on `http://localhost:5173`.

Open your browser and visit: `http://localhost:5173`

---

## 🎓 8. Quick College Viva / Practical Exam Questions & Answers

1. **What is CRUD?**
   - Create (`POST`), Read (`GET`), Update (`PUT`), Delete (`DELETE`).
2. **What does MERN stand for?**
   - MongoDB (Database), Express.js (Backend framework), React.js (Frontend library), Node.js (JavaScript runtime environment).
3. **What is CORS and why is it needed?**
   - Cross-Origin Resource Sharing. Because the frontend runs on port `5173` and the backend runs on port `5000`, the browser blocks cross-port requests by default. The `cors` package permits the frontend to communicate with the backend.
4. **Why use Mongoose instead of native MongoDB driver?**
   - Mongoose provides structured schemas, automatic type casting, built-in validation, and an intuitive API for database operations.
5. **How does MongoDB create the `_id`?**
   - MongoDB automatically generates a 12-byte BSON ObjectId containing a timestamp, machine identifier, process ID, and incrementing counter, ensuring global uniqueness without needing auto-increment numbers.
