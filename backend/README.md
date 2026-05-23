# Transaction Backend

Node.js/Express backend for transaction file processing with user authentication.

## Setup Instructions

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file (copy from `.env.example`):
   ```bash
   copy .env.example .env
   ```

4. Update `.env` with your MongoDB connection string and JWT secret:
   ```
   MONGODB_URI=mongodb://localhost:27017/txndemo
   JWT_SECRET=your_secure_secret_key
   PORT=5000
   ```

5. Start the server:
   ```bash
   npm run dev
   ```

The server will run on http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Transactions
- `POST /api/transactions/upload` - Upload CSV file (protected)
- `GET /api/transactions` - Get user's transactions (protected)
- `GET /api/transactions/summary` - Get transaction summary (protected)

## Database Models

### User
- name
- email
- password (hashed)
- createdAt

### Transaction
- userId (reference to User)
- Merchant details (name, ID)
- Transaction details (ID, order ID, status)
- Client information (name, email, phone, VPA)
- Financial fields (amount, GST, TDS, total, net)
- Settlement information
- Payment details
- Dispute information
- And more...
