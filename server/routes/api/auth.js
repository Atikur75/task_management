const express = require('express');
const { registrationController, sentOTPController, verifyOTPController, logoutCotroller } = require('../../controllers/AuthController/authControllers');
const middleware = require('../../middleware/middleware');
const router = express.Router();


// Registration
router.post('/registration', registrationController);

// Sent OTP
router.post('/sentotp', sentOTPController);

// Verify OTP
router.post('/verifyotp', verifyOTPController);

// Logout
router.get('/logout',middleware, logoutCotroller);


module.exports = router;