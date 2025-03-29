# Bable Backend  

This is the backend for **Bable**, a blogging website. It is built with **Node.js** and **Express**, using **MongoDB** for database management and **JWT** for authentication.  

## Features  

- **User Authentication:** Sign up, log in, log out, and authentication check  
- **Blog Management:** Create, delete, fetch blogs (single or all), save blogs, and remove saved blogs  
- **Secure Password Handling:** Uses **Argon2** for password hashing  
- **JWT Authentication:** Tokens are handled securely with **HTTPOnly cookies**  

## Folder Structure  

```
backend/
│── controllers/  
│   ├── user.control.js  # Handles authentication (signup, login, logout, auth check)  
│   ├── blog.control.js  # Handles blog operations (create, delete, fetch, save, remove)  
│  
│── db/  
│   ├── blog.js  # Connects to MongoDB  
│  
│── models/  
│   ├── blog.models.js  # User schema  
│   ├── user.model.js  # Blog schema  
│  
│── routes/  
│   ├── user.js  # Handles user-related requests  
│   ├── blog.js  # Handles blog-related requests  
│  
│── utils/  
│   ├── password.compare.js  # Handles password hashing  
│   ├── auth.jw.js  # Handles JWT authentication  
│  
│── index.js  # Main entry point, serves /user and /blog routes  
```

## Environment Variables  

Create a `.env` file in the root of the backend directory and add the following values:  

```env
MONGO_URL=your_mongodb_connection_string  
JWT_SECRET=your_jwt_secret  
PORT=your_desired_port  
```

Replace `your_mongodb_connection_string`, `your_jwt_secret`, and `your_desired_port` with your own values.  

## Installation and Setup  

1. **Clone the repository**  
   ```sh
   git clone https://github.com/rishi0810/bable-backend.git
   cd bable-backend
   ```

2. **Install dependencies**  
   ```sh
   npm install
   ```

3. **Set up environment variables**  
   - Create a `.env` file  
   - Add `MONGO_URL`, `JWT_SECRET`, and `PORT`  

4. **Run the backend server**  
   ```sh
   npm start
   ```

## API Endpoints  

### User Routes (`/user`)  
| Method | Endpoint    | Description |
|--------|------------|-------------|
| POST   | `/signup`  | Register a new user |
| POST   | `/login`   | Log in a user |
| POST   | `/logout`  | Log out the user |
| GET    | `/authcheck` | Check user authentication status |
| GET    | `/details` | Get user details |

### Blog Routes (`/blog`)  
| Method | Endpoint    | Description |
|--------|-------------|-------------|
| POST   | `/create`   | Create a new blog |
| GET    | `/:id`      | Fetch a specific blog by ID |
| GET    | `/`         | Fetch all blogs |
| POST   | `/save/:id` | Save a blog to the user's collection |
| POST | `/remove/:id` | Delete a blog from user's collection |
| POST | `/delete/:id` | Delete a blog from database |

