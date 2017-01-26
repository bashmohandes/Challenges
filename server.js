var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var crypto = require('crypto');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

var dict = {};

router.post('/', function(req, res){
    console.log("Request")
    if(!req.body || !req.body.message){
        console.log("BAD Request")
        res.sendStatus(400);
        return;
    }
    const hash = crypto.createHash('sha256')
                       .update(req.body.message)
                       .digest('hex');
    dict[hash] = req.body.message;

    res.json({ digest: hash});
});

router.get('/:digest', function(req, res){
    if(!req.params.digest) {
        res.sendStatus(400);
        return;
    }

    if(req.params.digest in dict) {
        res.json({message: dict[req.params.digest]});
        return;
    }    

    res.status(404).json({error_msg: "Message not found"});
});

app.use('/messages', router);

app.listen(port);

console.log('Started on port ', port);