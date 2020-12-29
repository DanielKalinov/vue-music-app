const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();
router.get('/auth', authController.auth);
router.post('/signup', authController.signUp);
router.post('/login', authController.logIn);
router.delete('/logout', authController.logOut);

module.exports = router;
