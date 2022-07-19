const express=require('express');
const router=express.Router();
const mainController=require('../controllers/mainController');
router.get('/', mainController.index)



router.get('/contadorVisitas', function(req,res){
  if (req.session.numeroVisitas==undefined){
    req.session.numeroVisitas=0;
  }
  req.session.numeroVisitas++;

  juan=req.session.userLogged

  res.send(juan)
})


module.exports=router;