var express = require('express');
var router = express.Router();
var conn = require('../lib/dbConnections');

// Router to fetch all the affilates in Database

router.get('/affiliates_allreqs', function(req, res, next) { //route has to be declared once
    if(req.session.loggedin == true && req.session.tc_id == 1001) {
    conn.query("SELECT * FROM tour_companies_profile", function(err, rows){
           if(err){
               console.log(err)  
           }else{
               res.render('../views/affiliates_crud/all_affiliates', 
               {data: rows, my_session: req.session});
           }                      
            });
        } else {
            res.redirect('/login')
        }
        
       });

router.get('/affiliates_allrecs/edit/:id', function(req, res) { //must be router.get or app.get or whatever else i choose but it has to be a get http verb
    if(req.session.loggedin == true && req.session.tc_id == 1001) {
    conn.query("SELECT * FROM tour_companies_profile WHERE id =" + req.params.id, function(err,row){
    if(err) {
        res.render('../views/affiliates_crud/edit_affiliate', {editInfo:''});
    } else {
        res.render('../views/affiliates_crud/edit_affiliate', {editInfo:row, my_session: req.session});
    }
    });
    }else {
        res.redirect('/login')
    }
    
});

//Update selected affiliate record
router.post('/affiliates_allrecs/update' , (req, res, next) => {
    if(req.session.loggedin == true && req.session.tc_id == 1001) {
    let sqlQuery = "UPDATE tour_companies_profile SET company_name ='"+ req.body.c_name + 
    "', company_rate ='" + req.body.c_rt +
    "', company_id ='" + req.body.c_id+
    "' WHERE id = " + req.body.id;
        
        conn.query(sqlQuery, (err, results) => {
        if(err) {
            console.log(err);
        }
            else {
                res.redirect('/affiliates_allreqs');
            }
            next();
        });
    }else {
        res.redirect('/login')
    }

        });

//delete selected affiliate
router.get('/affiliates_allrecs/delete/:id', (req, res, next) => {
    if(req.session.loggedin == true && req.session.tc_id == 1001) {
    conn.query('DELETE FROM tour_companies_profile WHERE id =' + req.params.id, function(err, row){
        if(err)  throw err;
            res.redirect('/affiliates_allreqs');
            next();
        });
    }else {
        res.redirect('/login')
    }
    });


module.exports = router;