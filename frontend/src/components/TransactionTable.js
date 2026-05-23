import React, { useState } from 'react';
import './TransactionTable.css';

const TransactionTable = ({ transactions }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = transactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  return (
    <div className="transaction-table-container">
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Merchant Name</th>
            <th>Client Name</th>
            <th>Transaction ID</th>
            <th>Amount (₹)</th>
            <th>GST (₹)</th>
            <th>TDS (₹)</th>
            <th>Net Amount (₹)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.merchantName || '-'}</td>
              <td>{transaction.clientName || '-'}</td>
              <td>{transaction.transactionId || '-'}</td>
              <td>₹ {(transaction.amount || 0).toFixed(2)}</td>
              <td>₹ {(transaction.gst || 0).toFixed(2)}</td>
              <td>₹ {(transaction.tds || 0).toFixed(2)}</td>
              <td>₹ {(transaction.netAmount || 0).toFixed(2)}</td>
              <td>
                <span className={`status ${transaction.status?.toLowerCase()}`}>
                  {transaction.status || '-'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;
