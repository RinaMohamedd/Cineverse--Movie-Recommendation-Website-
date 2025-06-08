const express = require('express');
const router = express.Router()


router.get('/', (req, res) => {
  res.render('home'); 
});

router.get('/admin', (req, res) => {
  console.log('Admin page loaded');
  res.render('admin'); // renders admin.ejs
});

// Start now in recommondations
router.get('/start_now', (req, res) => {
  console.log("start_now route hit");
  res.render('start_now'); 
});

// Footer
router.get('/help_center', (req, res) => {
  console.log("Footer route hit");
  res.render('help_center'); 
});

router.get('/about_us', (req, res) => {
  console.log("Footer route hit");
  res.render('about_us'); 
});

router.get('/contact_us', (req, res) => {
  console.log("Footer route hit");
  res.render('contact_us'); 
});

router.get('/privacy_policy', (req, res) => {
  console.log("Footer route hit");
  res.render('privacy_policy'); 
});

router.get('/terms_of_service', (req, res) => {
  console.log("Footer route hit");
  res.render('terms_of_service'); 
});

module.exports = router;