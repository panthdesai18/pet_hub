var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var multer = require('multer');
var path = require('path');
const e = require('express');
const Database = require('./Connections');
const Users = require('./models/Users');
const Jobs = require('./models/Jobs');
const { exists } = require('./models/Users');
const { response } = require('express');
module.exports = app;
app.use(express.static('public'))

app.set('view engine', 'ejs');

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(bodyParser.json());

// var pool  = mysql.createPool({
//     host     : 'your_url_for_mysql_server',
//     user     : 'root',
//     password : '',
//     database : ''
// });

// pool.getConnection(function(err){
//     if(!err) {
//         // console.log("Database is connected ... nn");
//     } else {
//         // console.log("Error connecting database ... nn");
//     }
// });

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.post("/signUp", function(req,res){
    const password = req.body.password;
    var user = Users({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.username,
      zipcode: req.body.location,
  })
    console.log("Inside User Signup!")
    var exists = false;
    Users.find({}, function(err, result)
    {
      if(err) throw err;
      for(var i = 0; i < result.length; i++)
      {
        if(req.body.username === result[i].email)
        {
          exists = true;
          debugger
          break;
        }
      }
      if(exists){
        res.writeHead(209, {
          'Content-Type' : 'text/plain'
        })
        res.end("Error!")
      }
      else{
        bcrypt.hash(req.body.password, saltRounds, function(err, hash){
          user.password = hash;
          user.save(function(err, results){
            if(err){
              console.log(err);
              res.writeHead(401,{
                'Content-Type': 'text/plain'
              })  
            }
            else{
              res.writeHead(200,{
                'Content-Type': 'text/plain'
              })
              res.end("User Inserted!")
            }
          })
        })
      }
    })
});

app.post('/login', function(req, res) {
    
    console.log("Login Attempt!")
    console.log(req.body)

    Users.findOne({email : req.body.username} , function(err, results){
      if(err)
      {
        res.writeHead(500,{
          'Content-Type': 'text/plain'
        })
        res.end("User Inserted!")
      }
      else if(results === null)
      {
        res.writeHead(207,{
          'Content-Type': 'text/plain'
        })
        res.end("User Inserted!")
      }
      else{
          bcrypt.compare(req.body.password, results.password, (err, isPasswordTrue) => {
              if(err)
              {
                res.writeHead(500,{
                  'Content-Type': 'text/plain'
                })
                res.end("User Inserted!")
              }
              else
              {
                  if(isPasswordTrue)
                  {
                    res.writeHead(200,{
                      'Content-Type': 'text/plain'
                    })
                    res.end(JSON.stringify(results._id))
                  }
                  else
                  {
                    res.writeHead(209,{
                      'Content-Type': 'text/plain'
                    })
                    res.end("User Inserted!")
                  }
              }
          })
      }
  })
});

app.post("/updateCust", function(req,res){
    console.log("Updating Customer!")
    console.log(req.body);

    var newvalues = {
      $set: { nickname: req.body.nickname, headline: req.body.headline, address: req.body.address, city: req.body.city, state: req.body.state, country:req.body.country, ilove:req.body.ilove } 
    }
    Users.updateOne({_id:req.body.userid}, newvalues, function(err, result){
        if(err) throw err;
        else{
          res.writeHead(200,{
            'Content-Type' : 'text/plain'
          })
          res.end("Profile Updated!")
        }
    })
});

app.post("/addJob", function(req,res){
    console.log("Adding New Job!")
    console.log(req.body);

    var job = Jobs({
        dogOwner: req.body.firstname,
        petName: req.body.lastname,
        schedule: req.body.username,
        petType: req.body.location,
        salary: req.body.salary,
        petSize: req.body.size,
        geoFence: req.body.geoFence
    })

    job.save(function(err, results){
        if(err){
          console.log(err);
          res.writeHead(401,{
            'Content-Type': 'text/plain'
          })  
        }
        else{
          res.writeHead(200,{
            'Content-Type': 'text/plain'
          })
          res.end("User Inserted!")
        }
    })
})

app.post("/filterPetSizeSmall", function(req,res){
    Jobs.find({userid:msg.userid,petSize:"0-35"},function(err, result1){
        if(err) throw err;
        console.log("RESULTS are:", result1)
        final.push(result1)
        if(result1.length>0){
            Jobs.find({orderid:result1[0]._id}, function(err, result2){
                if(err) throw err;
                console.log("RESULTS 2 ARE:", result2)
                final.push(result2)
                callback( null, final)
            })
        }
    })
})

app.post("/filterPetSizeMedium", function(req,res){
    Jobs.find({userid:msg.userid,petSize:"36-80"},function(err, result1){
        if(err) throw err;
        console.log("RESULTS are:", result1)
        final.push(result1)
        if(result1.length>0){
            Jobs.find({orderid:result1[0]._id}, function(err, result2){
                if(err) throw err;
                console.log("RESULTS 2 ARE:", result2)
                final.push(result2)
                callback( null, final)
            })
        }
    })
})

app.post("/filterPetSizeLarge", function(req,res){
    Jobs.find({userid:msg.userid,petSize:"80+"},function(err, result1){
        if(err) throw err;
        console.log("RESULTS are:", result1)
        final.push(result1)
        if(result1.length>0){
            Jobs.find({orderid:result1[0]._id}, function(err, result2){
                if(err) throw err;
                console.log("RESULTS 2 ARE:", result2)
                final.push(result2)
                callback( null, final)
            })
        }
    })
})

const storage = multer.diskStorage({
    destination: './public/profimages/',
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + '_' + Date.now() + path.extname(file.originalname)
      )
    }
})

app.post('/updateProfPhoto',function(req,res){
  upload(req, res, err => {
      if (err) {
        res.writeHead(400, {
          'Content-Type': 'text/plain'
        })
        res.end('Issue with uploading')
      } else {
        filename = req.file.filename;

        Users.findOneAndUpdate({_id : req.body.userid},{profimage :req.file.filename}, function(err, result) {
          if (err) throw err;
                console.log(result.affectedRows + " record(s) updated");
                res.end("Details Updated!");
              });
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        })
        res.end(JSON.stringify(req.file))
      }
    })
});

const upload = multer({
    storage: storage
}).single('profImage')






app.listen(3001);
console.log("Server Listening on port 3001");

