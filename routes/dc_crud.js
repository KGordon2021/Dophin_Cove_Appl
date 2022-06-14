var express = require('express');
var router = express.Router();
var conn = require('../lib/dbConnections');

// Create GET Router to fetch all the projects in Database

router.get('/dc_allreqs', function(req, res, next) { //route has to be declared once
    if(req.session.loggedin == true) {
    conn.query("SELECT b.*, tc.company_name, po.names, pm.methods FROM island_tours_app.bookings b, island_tours_app.tour_companies_profile tc, island_tours_app.programs_offered po, island_tours_app.payment_methods pm WHERE b.program_applied = po.id AND b.payment_method = pm.id AND b.booked_through = " + req.session.tc_id +
        " Group by b.voucher_no", function(err, rows){
           if(err){
               console.log(err)  
           }else{
               res.render('../views/dolphin_cove/allrequest', 
               {data: rows, my_session: req.session});
           }                      
            });
        } else {
            res.redirect('/login')
        }
       });

router.get('/dc_allreqs/edit/:id', function(req, res) { //must be router.get or app.get or whatever else i choose but it has to be a get http verb
    conn.query("SELECT * FROM bookings WHERE id =" + req.params.id, function(err,row){
    if(err) {
        res.render('../views/dolphin_cove/editrequests', {editInfo:''});
    } else {
        res.render('../views/dolphin_cove/editrequests', {editInfo:row, my_session: req.session});
    }
    });
    
});

//Update all dc records
router.post('/dc_allreqs/edit/dc_res' , (req, res, next) => {

    let sqlQuery = "UPDATE bookings SET primaryguest_fname ='"+ req.body.f_name + 
    "', primaryguest_lname ='" + req.body.l_name +
    "', hotel_from ='" + req.body.h_from +
    "', booked_through ='" + req.body.b_thru +
    "', program_applied ='" + req.body.progam_id +
    "', number_of_guest ='" + req.body.num_ppl +
    "', date_of_request ='" + req.body.req_date +
    "', date_of_excursion ='" + req.body.excur_date +
    "', payment_method ='" + req.body.pay_opts +
    "' WHERE id = " + req.body.progam_id;
        
        conn.query(sqlQuery, (err, results) => {
        if(err) {
            console.log(err);
        }
            else {
                res.redirect('/dc_allreqs');
            }
            next();
        });

        });

//the delete routes for students
router.get('/dc_allreqs/delete/:id', (req, res, next) => {
    // if(req.session.loggedin == true) {
    conn.query('DELETE FROM bookings WHERE id =' + req.params.id, function(err, row){
        if(err)  throw err;
            res.redirect('/dc_allreqs');
            next();
        });
    // }else {
    //     res.redirect('/login')
    // }
    });

router.get('/dc_allreqs/make_res', function(req, res, next) {
    // if(req.session.loggedin == true && req.session.tc_id == 1001) {

    res.render('../views/publicaccess/genreservations', {my_session: req.session});

    // } else {
    //     res.redirect('/login')
    // }
});

router.post('/dc_allreqs/make_res/res_send' , (req, res) => {
    var voucher = Date.now().toString().slice(-5);
    let data = {   primaryguest_fname: req.body.f_name, 
                    primaryguest_lname: req.body.l_name, 
                    hotel_from: req.body.h_from, 
                    booked_through: req.body.b_thru, 
                    program_applied: req.body.progam_id,
                    number_of_guest: req.body.num_ppl,
                    date_of_request: req.body.req_date,
                    date_of_excursion: req.body.excur_date,
                    voucher_no: voucher,
                    program_cost: req.body.cost,
                    payment_method: req.body.pay_opts
                     };

        let sqlQuery = "INSERT INTO bookings SET ?";
        let vQuery = conn.query(sqlQuery, data,(err, results) => {
        if(err) {
            console.log(err);
        }
            else {
                res.redirect('/dc_allreqs');
            }
        });

        });



module.exports = router;