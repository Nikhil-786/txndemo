import React from 'react';
import './TransactionSummary.css';

const TransactionSummary = ({ summary }) => {
  return (
    <div className="transaction-summary">
      <div className="summary-card">
        <h4>Total Records</h4>
        <p className="summary-value">{summary.totalRecords || 0}</p>
      </div>
      <div className="summary-card">
        <h4>Settled Transactions</h4>
        <p className="summary-value">{summary.settledCount || 0}</p>
      </div>
      <div className="summary-card">
        <h4>Disputed Transactions</h4>
        <p className="summary-value">{summary.disputedCount || 0}</p>
      </div>
    </div>
  );
};

export default TransactionSummary;
