const express = require('express');
const router = express.Router()


router.get('/', (req, res) => {
  console.log("Recommendations route hit");
  res.render('recommendations'); 
});



module.exports = router;