import express from 'express';
import Problem from '../models/Problem.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

function generateTrackingId() {
  const year = new Date().getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `JH-${year}-${random}`;
}

// POST /api/problems — report a problem (no login required, same as citizens flow)
router.post('/', async (req, res) => {
  try {
    const trackingId = generateTrackingId();
    const problem = await Problem.create({ ...req.body, trackingId });
    res.status(201).json(problem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/problems/track/:trackingId — used by Track Problem page
router.get('/track/:trackingId', async (req, res) => {
  const problem = await Problem.findOne({ trackingId: req.params.trackingId });
  if (!problem) return res.status(404).json({ error: 'No problem found with that tracking ID' });
  res.json(problem);
});

// GET /api/problems/by-contact/:contact — second tracking method: search by phone/email used at report time
router.get('/by-contact/:contact', async (req, res) => {
  const problems = await Problem.find({ reporterContact: req.params.contact }).sort({ createdAt: -1 });
  res.json(problems);
});

// GET /api/problems — list/filter (used by Explore Challenges + Government dashboard)
router.get('/', async (req, res) => {
  const { category, status, state } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (status) filter.status = status;
  if (state) filter.state = state;
  const problems = await Problem.find(filter).sort({ createdAt: -1 });
  res.json(problems);
});

// PATCH /api/problems/:id/status — government/university updates status (requires login)
router.patch('/:id/status', requireAuth, async (req, res) => {
  const problem = await Problem.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  if (!problem) return res.status(404).json({ error: 'Problem not found' });
  res.json(problem);
});

// GET /api/problems/stats/by-state — for the state-wise bar chart shown after login
router.get('/stats/by-state', async (req, res) => {
  const stats = await Problem.aggregate([
    { $group: { _id: '$state', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);
  res.json(stats.map((s) => ({ state: s._id, count: s.count })));
});

export default router;
