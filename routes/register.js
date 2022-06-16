var express = require('express');
var router = express.Router();
var conn = require('../lib/dbConnections');
var bcrypt = require('bcrypt');

//renders longin view
router.get('/register', function(req, res, next) {
    res.render('../views/register', {my_session: req.session});
});

router.get('/register/new_tc', function(req, res, next) {
  res.render('../views/affiliates_crud/add_affiliate', {my_session: req.session});
});

router.post('/register/new_tc_prof' , (req, res) => {
  var voucher = Date.now().toString().slice(-5);
  let data = {    company_id: req.body.c_Id, 
                  company_name: req.body.c_nm,
                  company_rate: req.body.c_rt,
                   };

  let sqlQuery = "INSERT INTO tour_companies_profile SET ?";
  let vQuery = conn.query(sqlQuery, data,(err, results) => {
  if(err) {
      console.log(err);
  }
      else {
          res.redirect('/login');
      }
  });

  });

router.post('/register/new_user' , async(req, res) => {
var value = req.body.pswrd;
const salt =  await bcrypt.genSalt(12); // the sync alternative const salt = bcrypt.genSaltSync(12) where no await function is used
value =  await bcrypt.hash(value, salt) // similarly the sync alternative value = bcrypt.hash(value, salt)

let data = {    user_id: req.body.u_ID, 
                user_fm: req.body.f_nm,
                user_ln: req.body.l_nm,
                email_address: req.body.usr_email,
                company_id: req.body.comp_Id,
                password: value
            };

    let sqlQuery = "INSERT INTO user SET ?";
    
    let vQuery = conn.query(sqlQuery, data,(err, results) => {
    if(err) {
      console.log(err); 
    } else {
    //    res.send(JSONResponse(results));
       res.redirect('/login');
    }
    });
}); 



module.exports = router;