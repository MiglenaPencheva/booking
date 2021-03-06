const Hotel = require('../models/Hotel');

async function getAll() {
    return await Hotel.find({}).sort({ freeRooms: -1 }).lean();
}

async function getOne(hotelId, userId) {
    let hotel = await Hotel.findById(hotelId).lean();
    hotel.isOwn = hotel.owner == userId;
    hotel.isBooked = hotel.usersBookedRoom.toString().includes(userId);
    return hotel;
}

async function create(hotelData, userId) {
    let hotel = new Hotel(hotelData);
    hotel.owner = userId;
    return await hotel.save();
}

async function book(hotelId, userId) {
    let hotel = await Hotel.findById(hotelId);
    
    if (hotel.owner == userId) return;
    if (hotel.usersBookedRoom.includes(userId)) return;
    if (hotel.freeRooms == 1) return;
    
    hotel.usersBookedRoom.push(userId);
    hotel.freeRooms -= 1;
    return hotel.save();
}

async function deleteHotel(hotelId) {
    return await Hotel.deleteOne({ _id: hotelId });
}

async function edit(hotelId, editedData) {
    return await Hotel.updateOne({ _id: hotelId }, editedData);
}

module.exports = {
    getAll,
    getOne,
    create,
    book,
    deleteHotel,
    edit,
};