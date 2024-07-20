# Blog-Space

Website is live on Render.com here : 

User Portal - https://blog-space-frontend-user.onrender.com/
Admin Portal - https://blog-space-frontend-admin.onrender.com/


Blog-Space is a comprehensive blogging platform designed to allow users to create, view, and interact with blog posts. The platform is built with a MERN stack and features two separate frontends: one for general users and one for content creators (admins).

## Features

### User Portal

- Displays cards with post titles, upload dates, number of likes, and author names.

- Displays full post content including title, content, upload date, modification date, and comments.
- Like button for posts.
- Comment section: Add, modify, and delete own comments.

### Admin Portal

- **Post Management**:
  - Add, update, and delete blog posts.
- **Comment Management**:
  - Delete inappropriate comments.

## Tech Stack

### Frontend

- **React**: For building user interfaces.
- **Tailwind CSS**: For styling and responsiveness.
- **React Router**: For client-side routing.

### Backend

- **Node.js**: For server-side JavaScript runtime.
- **Express.js**: For building the backend API.
- **MongoDB**: As the database for storing user, post, and comment data.
- **Mongoose**: For object data modeling (ODM) to interact with MongoDB.
- **JWT (JSON Web Tokens)**: For authentication and authorization.

### Tools and Libraries

- **Git**: For version control.
- **GitHub**: For repository hosting and collaboration.
- **Render.com**: For deployment and hosting.
- **express-generator**: For scaffolding the Express application.
- **bcrypt**: For hashing passwords.
- **dotenv**: For managing environment variables.
