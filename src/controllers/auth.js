const User = require('../models/User');


// @desc    Create new user
// @route   POST /api/v1/auth/register
// @access  Public
exports.registerUser = async (req, res, next) => {
    // Create a new user
    try {
        const user = new User(req.body);
        await user.save();
        // console.log(user);

        const token = await user.generateAuthToken();
        res.status(201).json({
            success: true,
            user: {
                name: user.name,
                email: user.email
            },
            token
        });
    } catch (err) {
        console.log(err);
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server error'
            });
        }
    }
}


// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.loginUser = async (req, res, next) => {
    //Login a registered user
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        if (!user) {
            return res.status(401).json({ error: 'Login failed! Check authentication credentials' });
        }
        const token = await user.generateAuthToken();
        res.status(200).json({
            success: true,
            user: {
                name: user.name,
                email: user.email
            },
            token
        });

    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server error'
            });
        }
    }
}


// @desc    Get current authenticated user
// @route   GET /api/v1/auth/me
// @access  Public
exports.getAuthenticatedUser = async (req, res) => {
    try {
        const { name, email } = req.user;
        // View logged in user profile
        res.status(200).json({
            success: true,
            user: {
                name,
                email
            },
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
}


// @desc    Log out current authenticated user
// @route   POST /api/v1/auth/me/logout
// @access  Public
exports.logOutUser = async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token;
        })
        await req.user.save();
        res.status(200).json({
            success: true,
            message: `${req.user.name} is logged out succesfully`
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
}


// @desc    Log out all authenticated users
// @route   POST /api/v1/auth/me/logoutall
// @access  Public
exports.logOutAllUsers = async (req, res) => {
    try {
        req.user.tokens.splice(0, req.user.tokens.length);
        await req.user.save();
        res.status(200).json({
            success: true,
            message: `${req.user.name} is logged out from all devices succesfully`
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
}