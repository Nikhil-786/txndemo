# Workspace Setup Instructions

## Project Overview

This is a full-stack transaction management system with:
- **Frontend**: React application for user authentication and file upload
- **Backend**: Node.js/Express server for processing transactions
- **Database**: MongoDB for data storage

## Quick Start

### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file from example
copy .env.example .env

# Update .env with your MongoDB URI
# Then start the server
npm run dev
```

Backend will run on http://localhost:5000

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend will open at http://localhost:3000

### 3. Database Setup

Ensure MongoDB is running:
- **Local**: `mongod`
- **Atlas**: Update connection string in backend `.env`

## Testing the Application

1. Go to http://localhost:3000
2. Register a new account
3. Upload a CSV file with transaction data
4. View financial totals and transaction details

## Key Features

✅ User authentication (Register/Login)
✅ JWT-based security
✅ CSV file upload and parsing
✅ Transaction data storage
✅ Financial calculations (Amount, GST, TDS, Net Amount)
✅ Transaction summary and statistics
✅ Responsive UI design

## File Structure

- `/frontend` - React application
- `/backend` - Node.js server
- `/backend/models` - MongoDB schemas
- `/backend/controllers` - Business logic
- `/backend/routes` - API endpoints
- `/backend/middleware` - Authentication middleware

## Important Notes

⚠️ Change JWT_SECRET in .env for production
⚠️ Use environment variables for sensitive data
⚠️ Ensure MongoDB is running before starting backend
⚠️ Keep frontend proxy setting in package.json pointing to backend

## Troubleshooting

- **Backend won't start**: Check if port 5000 is available
- **Frontend won't connect**: Ensure backend is running on port 5000
- **Database error**: Verify MongoDB connection string in .env

See individual README.md files in frontend/ and backend/ directories for more details.
