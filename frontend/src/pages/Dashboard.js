import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { transactionAPI } from '../utils/api';
import FileUpload from '../components/FileUpload';
import TransactionSummary from '../components/TransactionSummary';
import TransactionTable from '../components/TransactionTable';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [totals, setTotals] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await transactionAPI.getTransactions();
      setTransactions(response.data.transactions);
      setTotals(response.data.totals);
      
      const summaryResponse = await transactionAPI.getTransactionSummary();
      setSummary(summaryResponse.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file) => {
    try {
      setError('');
      const response = await transactionAPI.uploadFile(file);
      setTransactions(response.data.data.transactions || []);
      setTotals(response.data.data.totals);
      
      // Refresh data after upload
      await fetchTransactions();
    } catch (err) {
      setError(err.response?.data?.error || 'File upload failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) return <div className="dashboard"><p>Loading...</p></div>;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Transaction Dashboard</h1>
          {user && <p>Welcome, {user.name}</p>}
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main className="dashboard-main">
        {error && <div className="error-message">{error}</div>}

        <section className="upload-section">
          <h2>Upload Transaction File</h2>
          <FileUpload onFileUpload={handleFileUpload} />
        </section>

        {summary && (
          <section className="summary-section">
            <h2>Transaction Summary</h2>
            <TransactionSummary summary={summary} />
          </section>
        )}

        {totals && (
          <section className="totals-section">
            <h2>Financial Summary</h2>
            <div className="totals-grid">
              <div className="total-card">
                <h3>Total Amount</h3>
                <p className="amount">₹ {totals.totalAmount.toFixed(2)}</p>
              </div>
              <div className="total-card">
                <h3>Total GST</h3>
                <p className="amount">₹ {totals.totalGST.toFixed(2)}</p>
              </div>
              <div className="total-card">
                <h3>Total TDS</h3>
                <p className="amount">₹ {totals.totalTDS.toFixed(2)}</p>
              </div>
              <div className="total-card">
                <h3>Total (Amount + GST + TDS)</h3>
                <p className="amount">₹ {totals.totalTotalAmount.toFixed(2)}</p>
              </div>
              <div className="total-card">
                <h3>Net Amount</h3>
                <p className="amount">₹ {totals.totalNetAmount.toFixed(2)}</p>
              </div>
            </div>
          </section>
        )}

        {transactions.length > 0 && (
          <section className="transactions-section">
            <h2>Transaction Details</h2>
            <TransactionTable transactions={transactions} />
          </section>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
