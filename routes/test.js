var express = require('express');
var router = express.Router();
var pool=require('./pool')

/* GET users listing. */
router.get('/display', function(req, res, next) {
    // console.log(req.params);
  res.render('test');
});


/* GET users listing. */
router.get('/mypage/:id/:name', function(req, res, next) {
    console.log(req.params);
  res.send('hello from my test page');
});

router.get('/search/:id', function(req, res, next) {
try{  
pool.query("select E.*,(select S.statename from states S where S.stateid=E.stateid) as statename, (select C.cityname from city C where C.cityid=E.cityid) as cityname from employees E where E.employeeid=?",[req.params.id],function(error,result){
if(error)
{ console.log(error)
   res.render("editdeletedisplay",{status:false,message:'Error in database query...'})

}
else
{
  if(result.length==1)
   res.render("editdeletedisplay",{status:true,data:result[0]})
  else
    res.render('searchemployee',{message:'Employee Not Exist',color:'red'})
}

})
}
catch(e)
{
   res.render("editdeletedisplay",{status:false,message:'Critical Server Error....'})
}

  

  
});

module.exports = router;