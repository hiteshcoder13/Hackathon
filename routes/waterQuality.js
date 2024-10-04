const express = require('express');
const router = express.Router();

// Dummy data for various water bodies in Delhi
const waterQualityData = [
  {
    location: 'Yamuna River',
    pH: 7.5,
    turbidity: 4.8,
    dissolvedOxygen: 6.1,
    temperature: 25,
    conductivity: 400,
  },
  {
    location: 'Hauz Khas Lake',
    pH: 7.1,
    turbidity: 7.0,
    dissolvedOxygen: 5.5,
    temperature: 23,
    conductivity: 350,
  },
  {
    location: 'Sanjay Lake',
    pH: 6.9,
    turbidity: 6.8,
    dissolvedOxygen: 4.9,
    temperature: 24,
    conductivity: 380,
  },
  {
    location: 'Naini Lake',
    pH: 7.0,
    turbidity: 3.5,
    dissolvedOxygen: 6.5,
    temperature: 26,
    conductivity: 410,
  },
  {
    location: 'Bhalswa Lake',
    pH: 7.3,
    turbidity: 8.2,
    dissolvedOxygen: 5.0,
    temperature: 24,
    conductivity: 370,
  },
];

// Route to fetch water quality data
router.get('/', (req, res) => {
  // Return the dummy data as JSON
  res.json(waterQualityData);
});

module.exports = router;
