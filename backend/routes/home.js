const express = require('express');
const router = express.Router()


router.get('/', (req, res) => {
  res.render('home'); 
});



// Start now in recommondations
router.get('/start_now', (req, res) => {
  console.log("start_now route hit");
  res.render('start_now'); 
});

router.get('/search', (req, res) => {
  console.log("search route hit");
  res.render('search'); 
});
//removed the admin page route to handle it correctly in the adminRoutes.js file

// Footer
router.get('/help_center', (req, res) => {
  console.log("Footer route hit (help_center)");
  res.render('help_center'); 
});

router.get('/about_us', (req, res) => {
  console.log("Footer route hit (about us)");
  res.render('about_us'); 
});

router.get('/contact_us', (req, res) => {
  console.log("Footer route hit (contact us)");
  res.render('contact_us'); 
});

router.get('/privacy_policy', (req, res) => {
  console.log("Footer route hit (privacy policy)");
  res.render('privacy_policy'); 
});

router.get('/terms_of_service', (req, res) => {
  console.log("Footer route hit (terms of service");
  res.render('terms_of_service'); 
});

module.exports = router;