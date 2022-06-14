var express = require('express');
var router = express.Router();
var conn = require('../lib/dbConnections');

//renders longin view
router.get('/', function(req, res, next) {
    res.render('../views/home', {my_session: req.session});
});

//Create GET Router to fetch all the projects in Database

// router.get('/existing_groups', function(req, res, next) { //route has to be declared once
//     if(req.session.loggedin == true) {
//     conn.query(`SELECT gc.*, COUNT(ni.intern_id)AS 'currently_enrolled'
//                 FROM hrm_1st_graded_assign.group_classification gc, hrm_1st_graded_assign.new_interns ni
//                 WHERE gc.group_id = ni.group_id
//                 GROUP BY gc.group_id`,function(err, rows){
//            if(err){
//                res.render('groups/allgroups', // was in incorrect file path existing_groups
//                {data:''});   
//            }else{
//                res.render('groups/allgroups', 
//                {data: rows});
//            }                      
//             });
//         }else {
//             res.redirect('/login')
//         }
//        });



// //Update router to update projects //this is the set up for the actual page

// router.get('/existing_groups/update/:id', function(req, res) { //must be router.get or app.get or whatever else i choose but it has to be a get http verb
//     if(req.session.loggedin == true) {
//     conn.query("SELECT * FROM group_classification WHERE id =" + req.params.id, function(err,row){
//     if(err) {
//         res.render('groups/editgroups', {updatedgroupInfo:''});
//     } else {
//         res.render('groups/editgroups', {updatedgroupInfo:row});
//     }
//     });
//     }else {
//         res.redirect('/login')
//     }
// });

// router.post('/existing_groups/edit', (req, res, next) => {
//     if(req.session.loggedin == true) {
//     let sqlQuery = "UPDATE group_classification SET group_id ='" + req.body.g_id + 
//                 "', orientation_type='" + req.body.ot_id + 
//                 "', appointment_date ='" + req.body.sched_date + 
//                 "' WHERE id = " + req.body.id;

//     conn.query(sqlQuery, function(err,rows) {
//         if(err) {
//             console.log(err)
//         } else {
//         //req.flash('error', err); 
//         res.redirect('/existing_groups');
//         }   
//         next();                
//      });
//     }else {
//         res.redirect('/login')
//     }
// });

// //the delete routes for students
// router.get('/existing_groups/delete/:id', (req, res, next) => {
//     if(req.session.loggedin == true) {
//     conn.query('DELETE FROM group_classification WHERE id =' + req.params.id, function(err, row){
//         if(err)  throw err;
//             res.redirect('/existing_groups');
//             next();
//         });
//     }else {
//         res.redirect('/login')
//     }
//     });


module.exports = router;