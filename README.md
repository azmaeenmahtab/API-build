# Todo App API

This is a **Node.js REST API** for a Todo application, following the **MVC (Model-View-Controller) pattern**. It includes **user authentication**, **CRUD operations for todos**, and **JWT-based authentication with token blacklisting for logout**.

## **Installation & Setup**

### **1. Clone the Repository**
```sh
git clone <your-repository-link>
cd todo-app-api
```

### **2. Install Dependencies**
```sh
npm install
```

### **3. Setup Environment Variables**
Create a **.env** file in the project root and add the required variables as per **.env.example**.

```sh
cp .env.example .env
```
Edit the `.env` file and configure your database and secret keys:
```env
PORT=6543
DB_HOST=localhost
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_secret_key
```

### **4. Setup Database**
Run the database migrations (if applicable) or manually create the tables:
```sh
npm run db:migrate
```
Ensure the following tables exist:
- `users (id, name, email, password)`
- `todolist (id, user_id, title, completed)`
- `blacklisted_tokens (id, token, expires_at)`

### **5. Start the Server**
```sh
npm start
```
The API should now be running on `http://localhost:6543`.

### **6. Access Swagger Documentation**
Swagger API documentation is available at:
```
http://localhost:6543/api-docs
```

## **API Endpoints**

### **Authentication**
- `POST /register` - Register a new user
- `POST /login` - User login
- `POST /logout` - User logout (JWT token blacklisting)

### **Todos**
- `GET /todos` - Get all todos for the logged-in user
- `GET /todos/:id` - Get a specific todo
- `POST /todos` - Create a new todo
- `PUT /todos/:id` - Update a todo
- `DELETE /todos/:id` - Delete a todo

## **Deployment & API Links**

### **1. Deploying the API**
You can deploy this API using **Heroku, Render, Vercel, or a VPS**.

Example (for Heroku):
```sh
git push heroku main
```

### **2. Deployed API & Swagger Documentation**
- **API Base URL:** `<your-deployed-api-url>`
- **Swagger Docs:** `<your-deployed-api-url>/api-docs`

## **Contributing**
Feel free to fork the repo, create a branch, and submit a **pull request**!

## **License**
This project is licensed under the MIT License.


