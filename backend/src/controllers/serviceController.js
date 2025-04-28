const Service = require('../models/Service');

// Get all services (for dropdown in booking form)
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error: error.message });
  }
};

// Create a new service (admin functionality, can be protected later)
exports.createService = async (req, res) => {
  const { name } = req.body;

  // Validation for required fields
  if (!name) {
    return res.status(400).json({ message: 'Service name is required' });
  }

  try {
    const existingService = await Service.findOne({ name });
    if (existingService) {
      return res.status(400).json({ message: 'Service name already exists' });
    }

    const service = new Service({ name });
    await service.save();
    res.status(201).json({ message: 'Service created successfully', service });
  } catch (error) {
    res.status(500).json({ message: 'Error creating service', error: error.message });
  }
};