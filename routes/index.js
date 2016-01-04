var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var cleanse = require('cleanse-html');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'henry@dusendusen.com',
        pass: 'henryvd'
    }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'not for you' });
});

router.post('/', function(req, res, next) {
  console.log(req.body)

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'henry@dusendusen.com', // sender address
    to: 'webstore@dusendusen.com,candusen@gmail.com', // list of receivers
    subject: 'q: '+req.body.title, // Subject line
    text: 'question from '+req.body.email+' about '+cleanse(req.body.title)+': \n'+cleanse(req.body.question) // plaintext body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);

});



  res.end('It worked!');
  //res.render('index', { title: 'Express' });
});

module.exports = router;







