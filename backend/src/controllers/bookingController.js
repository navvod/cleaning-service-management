const Booking = require('../models/Booking');

// Get all bookings for the logged-in user
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user_id: req.user.id }).populate('service_id', 'name');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};

// Create a new booking
exports.createBooking = async (req, res) => {
  const { customer_name, address, date_time, service_id } = req.body;

  // Validation for required fields
  if (!customer_name || !address || !date_time || !service_id) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const booking = new Booking({
      customer_name,
      address,
      date_time,
      service_id,
      user_id: req.user.id,
    });
    await booking.save();
    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
};

// Update a booking
exports.updateBooking = async (req, res) => {
  const { id } = req.params;
  const { customer_name, address, date_time, service_id } = req.body;

  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Ensure the booking belongs to the user
    if (booking.user_id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to update this booking' });
    }

    booking.customer_name = customer_name || booking.customer_name;
    booking.address = address || booking.address;
    booking.date_time = date_time || booking.date_time;
    booking.service_id = service_id || booking.service_id;

    await booking.save();
    res.status(200).json({ message: 'Booking updated successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking', error: error.message });
  }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Ensure the booking belongs to the user
    if (booking.user_id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to delete this booking' });
    }

    await booking.deleteOne();
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting booking', error: error.message });
  }
};