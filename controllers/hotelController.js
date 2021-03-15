const router = require('express').Router();
const { create, getOne, deleteHotel, edit } = require('../services/hotelService');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', async (req, res) => {
    let hotelData = extractData(req);
    try {
        await create(hotelData, req.user._id);
        res.redirect('/');
    } catch (error) {
        res.render('create', { error });
    }
});

router.get('/:id/details', async (req, res) => {
    const hotel = await getOne(req.params.id, req.user._id);
    res.render('details', { hotel });
});

router.get('/:id/delete', async (req, res) => {
    try {
        let hotel = await getOne(req.params.id, req.user._id);
        if (hotel.owner == req.user._id) {
            await deleteHotel(req.params.id);
            res.redirect('/');
        }
    } catch (error) {
        res.render('delete', { error });
    }
});

router.get('/:id/edit', async (req, res) => {
    let hotel = await getOne(req.params.id, req.user._id);
    res.render('edit', hotel);
});

router.post('/:id/edit', async (req, res) => {
    let hotelData = extractData(req);
    try {
        const hotel = await getOne(req.params.id, req.user._id);
        if (hotel.owner == req.user._id) {
            await edit(req.params.id, hotelData);
            res.redirect(`/hotel/${req.params.id}/details`);
        }
    } catch (error) {
        res.render('edit', { error });
    }
});

function extractData(req) {
    let { hotel, city, imageUrl, freeRooms } = req.body;

    return hotelData = {
        hotel,
        city,
        freeRooms,
        imageUrl,
    };
}

module.exports = router;