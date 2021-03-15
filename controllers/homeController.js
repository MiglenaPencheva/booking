const router = require('express').Router();
const { getAll } = require('../services/hotelService');

router.get('/', async (req, res) => {
    let hotels = await getAll();
    res.render('home', { hotels });
});

module.exports = router;