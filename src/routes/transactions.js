const express = require('express');
const router = express.Router();
const { getTransactions, addTransactions, getTransactionById, deleteTransaction, updateTransaction } = require('../controllers/transactions')
const authMiddleware = require('../middleware/auth');

router
    .route('/')
    .get(authMiddleware, getTransactions)
    .post(authMiddleware, addTransactions);

router
    .route('/:id')
    .put(authMiddleware, updateTransaction)
    .get(getTransactionById)
    .delete(authMiddleware, deleteTransaction);

module.exports = router;