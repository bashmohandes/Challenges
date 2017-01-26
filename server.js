var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var crypto = require('crypto');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

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
    res.json({ digest: hash});
});

router.get('/:digest', function(req, res){
    res.json(req.params.digest);
});

app.use('/messages', router);

app.listen(port);

console.log('Started on port ', port);