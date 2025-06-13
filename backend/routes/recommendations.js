const express = require('express');
const router = express.Router()
const { recommendMovie } = require('../controllers/recommendationController');//import the getrecommendtion function from the controller file
const authMiddleware = require('../middleware/auth');//its used to protect specific routes

router.get('/', (req, res) => {
  console.log("Recommendations route hit");
  res.render('recommendations'); 
});
router.post('/start_now', authMiddleware, recommendMovie);
//if user is logged in and wants a recommendation
//and a post request is made ,el getRecommedations function id called to process the user's answers and return result
module.exports = router;