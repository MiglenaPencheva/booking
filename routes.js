const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const hotelController = require('./controllers/hotelController');
const { isLogged } = require('./middlewares/authMiddleware');

router.use('/', homeController);
router.use('/auth', authController);
router.use('/hotel', isLogged, hotelController);

module.exports = router;