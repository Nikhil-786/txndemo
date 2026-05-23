const Transaction = require('../models/Transaction');
const fs = require('fs');
const csv = require('csv-parser');

// Helper to clean currency strings (removes symbols, commas, and handles non-numeric values)
const parseCurrency = (value) => {
  if (!value) return 0;
  return parseFloat(value.toString().replace(/[^0-9.-]+/g, "")) || 0;
};

// Upload and process CSV file
exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const transactions = [];
    const filePath = req.file.path;

    // Parse CSV file
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        transactions.push({
          userId: req.userId,
          merchantName: row['Merchant Name'],
          merchantId: row['Merchant ID'],
          transactionId: row['Transaction ID'],
          orderId: row['Order ID'],
          status: row['Status'],
          clientName: row['Client Name'],
          clientEmail: row['Client Email'],
          clientPhone: row['Client Phone'],
          clientVPA: row['Client VPA'],
          amount: parseCurrency(row['Amount (₹)']),
          gst: parseCurrency(row['GST (₹)']),
          tds: parseCurrency(row['TDS (₹)']),
          totalAmount: parseCurrency(row['Total Amount (₹)']),
          netAmount: parseCurrency(row['Net Amount (₹)']),
          settlementAmount: parseCurrency(row['Settlement Amount (₹)']),
          settledAmount: parseCurrency(row['Settled Amount (₹)']),
          initiatedAt: row['Initiated At'],
          completedAt: row['Completed At'],
          settled: row['Settled'] === 'Yes',
          settlementBatch: row['Settlement Batch'],
          settledAt: row['Settled At'],
          refunded: row['Refunded'] === 'Yes',
          refundedAt: row['Refunded At'],
          paymentMethod: row['Payment Method'],
          paymentSource: row['Payment Source'],
          vpa: row['VPA'],
          pgReference: row['PG Reference'],
          utrNumber: row['UTR Number'],
          message: row['Message'],
          sourceType: row['Source Type'],
          isFlagged: row['Is Flagged'] === 'Yes',
          flaggedReason: row['Flagged Reason'],
          disputeStatus: row['Dispute Status'],
          disputeNote: row['Dispute Note'],
          reasonCode: row['Reson code'],
          mccCode: row['Mcc Code'],
        });
      })
      .on('end', async () => {
        try {
          // Insert transactions into database
          await Transaction.insertMany(transactions);

          // Calculate totals
          const totals = {
            totalAmount: transactions.reduce((sum, t) => sum + (t.amount || 0), 0),
            totalGST: transactions.reduce((sum, t) => sum + (t.gst || 0), 0),
            totalTDS: transactions.reduce((sum, t) => sum + (t.tds || 0), 0),
            totalTotalAmount: transactions.reduce((sum, t) => sum + (t.totalAmount || 0), 0),
            totalNetAmount: transactions.reduce((sum, t) => sum + (t.netAmount || 0), 0),
            transactionCount: transactions.length,
          };

          // Clean up uploaded file
          fs.unlinkSync(filePath);

          res.json({
            message: 'File uploaded and processed successfully',
            data: {
              transactionCount: transactions.length,
              totals,
            },
          });
        } catch (err) {
          fs.unlinkSync(filePath);
          res.status(500).json({ error: err.message });
        }
      })
      .on('error', (err) => {
        fs.unlinkSync(filePath);
        res.status(500).json({ error: err.message });
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get transactions for user with totals
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId });

    if (!transactions || transactions.length === 0) {
      return res.json({
        transactions: [],
        totals: {
          totalAmount: 0,
          totalGST: 0,
          totalTDS: 0,
          totalTotalAmount: 0,
          totalNetAmount: 0,
        },
      });
    }

    // Calculate totals
    const totals = {
      totalAmount: transactions.reduce((sum, t) => sum + (t.amount || 0), 0),
      totalGST: transactions.reduce((sum, t) => sum + (t.gst || 0), 0),
      totalTDS: transactions.reduce((sum, t) => sum + (t.tds || 0), 0),
      totalTotalAmount: transactions.reduce((sum, t) => sum + (t.totalAmount || 0), 0),
      totalNetAmount: transactions.reduce((sum, t) => sum + (t.netAmount || 0), 0),
    };

    res.json({ transactions, totals });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get transaction summary/statistics
exports.getTransactionSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId });

    const summary = {
      totalRecords: transactions.length,
      totalAmount: transactions.reduce((sum, t) => sum + (t.amount || 0), 0),
      totalGST: transactions.reduce((sum, t) => sum + (t.gst || 0), 0),
      totalTDS: transactions.reduce((sum, t) => sum + (t.tds || 0), 0),
      totalTotalAmount: transactions.reduce((sum, t) => sum + (t.totalAmount || 0), 0),
      totalNetAmount: transactions.reduce((sum, t) => sum + (t.netAmount || 0), 0),
      settledCount: transactions.filter(t => t.settled).length,
      disputedCount: transactions.filter(t => t.disputeStatus).length,
    };

    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
