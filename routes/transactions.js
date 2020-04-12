const express = require('express');
const router = express.Router();
const { getTransactions, addTransactions, getTransactionById, deleteTransaction, updateTransaction } = require('../controllers/transactions')

router
    .route('/')
    .get(getTransactions)
    .post(addTransactions);

router
    .route('/:id')
    .put(updateTransaction)
    .get(getTransactionById)
    .delete(deleteTransaction);

module.exports = router;