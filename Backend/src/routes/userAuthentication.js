const express = require('express')
const authRouter = express.Router();
const {register, login} = require('../controllers/UserAuth');
const UserMiddleware = require('../middleware/UserMiddleware');


authRouter.post('/register',register);
authRouter.post('/login',login);

module.exports = authRouter;