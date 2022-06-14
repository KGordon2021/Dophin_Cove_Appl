var express = require('express');
var router = express.Router();
var conn = require('../lib/dbConnections');
var bcrypt = require('bcrypt')

//renders longin view
router.get('/login', function(req, res, next) {
    res.render('../views/login', {my_session: req.session});
});

//authenticates user 
router.post('/user/login', async (req, res, next) =>{
    var email = req.body.usr_email;
    var password = req.body.pswrd;

    conn.query('SELECT * FROM user WHERE email_address = ?', [email], function(error, rows, fields){ //santitizes and cleanses your code
        if (rows[0].password) {
            bcrypt.compare(req.body.pswrd, rows[0].password, function(err, result) {
            //  console.log('>>>>>> ', password)
            //  console.log('>>>>>> ', rows[0].user_pswd)
             if(result) {
                req.session.loggedin = true;
                req.session.first_Nm = rows[0].user_fm;
                req.session.tc_id = rows[0].company_id
                res.redirect('/dc_allreqs');
               return 
             }
             else {
                req.flash('error', "Incorrect Login Credentials");
                res.redirect('/login');
                return
             }
            
    });   
}
})
})

//to log out user

router.get('/logout', function(req, res){
    // req.flash('success', "Enter your Login Credentials"); // logically not applicable after the user logs in
    res.redirect('/login');
    req.session.destroy();
})

module.exports = router;