const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue');
const multer = require('multer');
const path = require('path');

// Setup storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the folder to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to avoid name collisions
  }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const newIssue = new Issue({
      email :req.body.email,
      location: req.body.location,
      issueType: req.body.issueType,
      description: req.body.description,
      photoUrl: req.file ? req.file.path : null, // Save file path to database
    });
    const savedIssue = await newIssue.save();
    res.json(savedIssue);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(400).json({ message: err.message });
  }
});
/// Modify the existing route to include status in the response
router.get('/', async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//---------------------------
router.get('/user-reports/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const userReports = await Issue.find({ email: email }).sort({ createdAt: -1 });
    res.json(userReports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const report = await Issue.findById(id); // Assuming Mongoose
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
// Update the status of a specific report by ID
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // Get the new status from the request body
  try {
    const updatedReport = await Issue.findByIdAndUpdate(
      id,
      { status: status }, // Update the status
      { new: true } // Return the updated report
    );
    if (!updatedReport) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.json(updatedReport);
  } catch (error) {
    console.error('Error updating report:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;