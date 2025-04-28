const express = require('express');
const router = express.Router();
const { getBookings, createBooking, updateBooking, deleteBooking } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

// Protect all booking routes with JWT authentication
router.use(protect);

// Booking routes (accessible to authenticated users)
router.get('/', getBookings);           
router.post('/', createBooking);        
router.put('/:id', updateBooking);      
router.delete('/:id', deleteBooking);   

module.exports = router;