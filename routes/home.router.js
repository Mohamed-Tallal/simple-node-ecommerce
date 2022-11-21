const  router  = require("express").Router();
const HomeCOntroller  = require('../controllers/home.controller');

router.get('/' , HomeCOntroller.getHome );
module.exports = router;