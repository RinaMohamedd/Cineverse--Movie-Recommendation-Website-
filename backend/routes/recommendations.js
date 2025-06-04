const express = require('express');
const router = express.Router()


router.get('/', (req, res) => {
  console.log("Recommendations route hit");
  res.render('recommendations'); 
});

router.get('/start_now', (req, res) => {
  console.log("start_now route hit");
  res.render('start_now'); 
});

module.exports = router;