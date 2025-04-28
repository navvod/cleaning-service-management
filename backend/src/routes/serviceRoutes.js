const express = require('express');
const router = express.Router();
const { getServices, createService } = require('../controllers/serviceController');
const { protect, authorize } = require('../middleware/authMiddleware');

// GET /services - Fetch all services (accessible to authenticated users)
router.get('/', protect, getServices);

// POST /services - Create a new service (restricted to admins)
router.post('/', protect, authorize('admin'), createService);

module.exports = router;