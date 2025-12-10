# SuperHero Manager

A full-stack web application for managing superheroes, built with React, TypeScript, Node.js, Express, and MongoDB.

## Features

- User authentication (login/register)
- Role-based access control (admin/editor)
- CRUD operations for superheroes
- Image upload for hero profiles
- Protected routes
- JWT-based authentication

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- React Router DOM
- Axios

### Backend
- Node.js
- Express 5
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Multer for file uploads

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (running locally or a MongoDB Atlas connection)
- npm or yarn

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Mavedial/TPDernierMiniProjet.git
cd TPDernierMiniProjet
```

### 2. Install Backend dependencies

```bash
cd Backend
npm install
```

### 3. Install Frontend dependencies

```bash
cd ../Frontend
npm install
```

### 4. Configure Backend environment

Create a `.env` file in the `Backend` directory (you can copy from `.env.example`):

```bash
cd ../Backend
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/superhero
JWT_SECRET=your-secret-jwt-key-change-this-in-production
CORS_ORIGIN=http://localhost:5173
```

**Important:** 
- Replace `MONGO_URI` with your MongoDB connection string
- Replace `JWT_SECRET` with a strong secret key in production

## Running the Application

### Start MongoDB

Make sure MongoDB is running on your system:

```bash
# For local MongoDB
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # macOS
# Or use MongoDB Atlas cloud database
```

### Start the Backend Server

```bash
cd Backend
npm run dev
```

The backend server will start on `http://localhost:5000`

### Start the Frontend Development Server

In a new terminal:

```bash
cd Frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

## Building for Production

### Build Frontend

```bash
cd Frontend
npm run build
```

The built files will be in the `Frontend/dist` directory.

### Build Backend

The backend uses ts-node-dev for development. For production, you can compile TypeScript:

```bash
cd Backend
npx tsc
```

The compiled files will be in the `Backend/dist` directory.

## Project Structure

```
TPDernierMiniProjet/
├── Backend/
│   ├── src/
│   │   ├── config/        # Database configuration
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Authentication & authorization
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # Express routes
│   │   ├── types/         # TypeScript types
│   │   ├── uploads/       # Uploaded files
│   │   ├── utils/         # Utility functions
│   │   └── index.ts       # Server entry point
│   ├── .env.example       # Environment variables template
│   └── package.json
├── Frontend/
│   ├── src/
│   │   ├── api/           # API client functions
│   │   ├── components/    # React components
│   │   ├── context/       # React context (Auth)
│   │   ├── hooks/         # Custom hooks
│   │   ├── pages/         # Page components
│   │   ├── styles/        # CSS files
│   │   └── types/         # TypeScript types
│   ├── index.html
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Heroes (Protected)
- `GET /api/heroes` - Get all heroes
- `GET /api/heroes/:id` - Get a single hero
- `POST /api/heroes` - Create a new hero (requires authentication)
- `PUT /api/heroes/:id` - Update a hero (requires authentication)
- `DELETE /api/heroes/:id` - Delete a hero (requires admin role)

## Default User Roles

- **admin**: Full access to all operations
- **editor**: Can create and edit heroes, but cannot delete

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check if the `MONGO_URI` in `.env` is correct
- Verify network connectivity if using MongoDB Atlas

### Port Already in Use
- Change the `PORT` in `Backend/.env`
- Change the port in `Frontend/vite.config.ts` if needed
- Update `CORS_ORIGIN` in `Backend/.env` to match the new frontend port

### Dependencies Issues
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## License

ISC

