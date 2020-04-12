const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getAuthenticatedUser, logOutUser, logOutAllUsers } = require('../controllers/auth');
const authMiddleware = require('../middleware/auth');

router
    .route('/register')
    .post(registerUser)

router
    .route('/login')
    .post(loginUser);

router
    .get('/me', authMiddleware, getAuthenticatedUser);

router
    .post('/me/logout', authMiddleware, logOutUser);

router
    .post('/me/logoutall', authMiddleware, logOutAllUsers);

module.exports = router;