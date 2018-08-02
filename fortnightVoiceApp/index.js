var express = require ('express');
var app = express();
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/public', express.static(path.join(__dirname, 'static')));

app.get('/', function(req,res){
  res.sendFile(path.join(__dirname + '/static/index.html'));
});
var uri = 'https://api.fortnitetracker.com/v1/profile/';

//https://api.fortnitetracker.com/v1/profile/{platform}/{epic-nickname}
//Platforms: pc, xbl, psn
//TRN-Api-Key: 0bfa97b1-d015-481e-8736-48d3fea8cb36

app.post('/', function(req,res){
  console.log(req.body);
  request.get(uri + req.body.dropDownValue + '/' + req.body.epicNickName, {
    headers : {
      'TRN-Api-Key': '0bfa97b1-d015-481e-8736-48d3fea8cb36'
    }}, function(error, responce, body){
      // console.log(responce);
      // console.log(res);
      // console.log(res.json(body.stats));
      res.json(body);
      // console.log(body);
      body = JSON.parse(body);
      console.log("Solo wins:  " + body.stats.p2.top1.value);

  });
});

var port = 3003;
app.listen(port, () => {
  console.log("listening on port:  "  + port);
});
