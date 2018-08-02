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
      var data = {};
  console.log(req.body);
  request.get(uri + req.body.dropDownValue + '/' + req.body.epicNickName, {
    headers : {
      'TRN-Api-Key': '0bfa97b1-d015-481e-8736-48d3fea8cb36'
    }}, function(error, responce,body){
      // console.log(responce);
      // console.log(res);
      // console.log(res.json(body.stats));
      res.json(body);

      // data.epicNickName = epicNickName.val().toLowerCase();
      // data.dropDownValue = dropDownValue.toLowerCase();

      $.ajax({
        type: "POST",
        url: '/',
        dataType: 'json',
        data: data,
        success: function(data){
          data = JSON.parse(data);
          displayData(data);
          console.log(displayData(data));
        }
      });
  });
});


function displayData(data){
  var epicUserHandel = data.epicUserHandle;
            console.log(data.stats.p2.top1.value);
}

// var port = process.env.PORT || 3000;
// app.listen(port);
app.listen(3003, () => {
  console.log("listening on port 3003");
});
