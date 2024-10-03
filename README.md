# 📝 PasteBin Web App - MERN Stack

A full-featured Pastebin web application built with the **MERN stack** (MongoDB, Express.js, React.js, and Node.js). This web app allows users to easily create and share text snippets or code blocks with advanced features like time expiration, burn-after-read functionality, public and private visibility, and secure authentication via JWT.

## 🌟 Features

- **Create Pastes**: Easily create and share text/code snippets.
- **Expiration Options**: Set pastes to expire after a specific time:
  - Never expire
  - After a few days, weeks, months, or years
- **Burn After Read**: Automatically delete the paste after it has been read once.
- **Public and Private Pastes**: Choose whether your paste is publicly accessible or private.
- **User Authentication**: Secure user authentication using JWT (JSON Web Token) for user registration, login, and authorization.
- **User Dashboard**: View and manage all pastes in your personalized dashboard.
- **Responsive Design**: Fully responsive design, optimized for both desktop and mobile devices.
  
## 🛠️ Tech Stack

- **Frontend**: 
  - React (Vite) + TypeScript
  - Styled Components / CSS Modules
- **Backend**: 
  - Node.js + Express.js with TypeScript
  - MongoDB + Mongoose for database management
  - JWT for authentication
- **Other Tools**:
  - bcrypt for password hashing
  - dotenv for environment variable management
  - nodemon for hot-reloading during development

## 🚀 Installation

To get the project up and running locally:

### Clone the Repository:
```bash
git clone https://github.com/Lettable/pastebin.git
cd pastebin
```

### Setting up the Backend (Server):
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory and add your environment variables:
   ```bash
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_secret_key>
   ```
4. Run the server:
   ```bash
   npm run dev
   ```

### Setting up the Frontend (Client):
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Run the frontend development server:
   ```bash
   npm run dev
   ```

## 📷 Screenshots

- Dashboard: Manage your pastes.
- Create Paste: Set expiration time, visibility, and burn-after-read options.

## 🔒 Security

This app uses **JWT** (JSON Web Token) for authentication, ensuring that users’ data is securely handled. Passwords are hashed using **bcrypt** to further enhance security.

## 🤝 Contributions

Contributions are welcome! Feel free to fork this project and submit pull requests.

## 📄 License

This project is licensed under the MIT License.

---

<p align="center">
    <img src="https://github.com/AnonymousX1025/AnonymousX1025/blob/master/resources/songs.gif" width="50px">
    <br>
    <i>just chillin' to some tunes...</i>
</p>