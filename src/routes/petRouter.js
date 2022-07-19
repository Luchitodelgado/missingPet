const express=require('express');
const router=express.Router();
const petController=require('../controllers/petController');

router.get('/pets', petController.index)
router.get('/newPet', petController.newPet)

module.exports=router;