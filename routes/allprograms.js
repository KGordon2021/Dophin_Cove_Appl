var express = require('express');
var router = express.Router();
var conn = require('../lib/dbConnections');

// Create GET Router to fetch all the projects in Database

router.get('/all_programs', function(req, res, next) { //route has to be declared once
    conn.query("SELECT * FROM programs_offered",function(err, rows){
           if(err){
               res.render('../views/publicaccess/allprograms', // was in incorrect file path existing_groups
               {data:''});   
           }else{
               res.render('../views/publicaccess/allprograms', 
               {data: rows,  my_session: req.session});
           }                      
            });
       });

    router.get('/all_programs/make_res/:id', function(req, res) { //must be router.get or app.get or whatever else i choose but it has to be a get http verb
        conn.query("SELECT * FROM programs_offered WHERE id =" + req.params.id, function(err,row){
        if(err) {
            res.render('../views/publicaccess/makereservation', {resInfo:''});
        } else {
            res.render('../views/publicaccess/makereservation', {resInfo:row, my_session: req.session});
        }
        });
       
    });


    router.post('/all_progams/make_res/pub_res' , (req, res) => {
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
                    res.redirect('/all_programs');
                }
            });

            });

    module.exports = router;