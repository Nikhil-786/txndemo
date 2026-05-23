# Transaction Frontend

React-based frontend for transaction file processing and financial summary display.

## Setup Instructions

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The application will open at http://localhost:3000

## Features

- **User Authentication**: Register and login functionality
- **File Upload**: Upload CSV files containing transaction data
- **Transaction Summary**: View total records, settled transactions, and disputes
- **Financial Totals**: See totals for Amount, GST, TDS, Total Amount, and Net Amount
- **Transaction Table**: Paginated view of all transactions with key details
- **Responsive Design**: Works on desktop and mobile devices

## Pages

- **Login** (`/login`) - User login page
- **Register** (`/register`) - User registration page
- **Dashboard** (`/dashboard`) - Main dashboard with file upload and transaction display

## Components

- `FileUpload` - CSV file upload component
- `TransactionSummary` - Displays transaction statistics
- `TransactionTable` - Paginated table of transactions

## API Integration

The frontend connects to the backend API at `http://localhost:5000/api`

### Required Headers
- Authorization: `Bearer <token>` (for protected routes)

## Required Environment

The backend server must be running on `http://localhost:5000` for the frontend to work properly.
