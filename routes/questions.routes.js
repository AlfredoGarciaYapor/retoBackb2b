var express = require('express');
var router = express.Router();

const {getPacks, createNewPack, updatePack, removePack, packCatalogue} = require('../controllers/questions.controller');

router.post("/packageList", getPacks);//Ya esta funcionando
router.post("/newPackage", createNewPack);// ya jala



module.exports = router;