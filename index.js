// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204
app.use(express.urlencoded({ extended: false }))
// http://expressjs.com/en/starter/static-files.html
app.use(express.json());
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function(req, res) {
  const days = [ 'Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let dateMain
  let { date } = req.params;
  if (date != undefined) {
    if (date.includes('-') || date.includes(' ')) dateMain = new Date(Date.parse(date));
    else dateMain = new Date(+date);

  }
  else {
    dateMain = new Date();
  }
  let hours = dateMain.getHours() < 10 ? '0' + dateMain.getHours() : dateMain.getHours();
  let minutes = dateMain.getMinutes() < 10 ? '0' + dateMain.getMinutes() : dateMain.getMinutes();

  let seconds = dateMain.getSeconds() < 10 ? '0' + dateMain.getSeconds() : dateMain.getSeconds();
  let day = dateMain.getDate() < 10 ? '0' + dateMain.getDate() : dateMain.getDate();
  if (dateMain.toString() == 'Invalid Date') {
    res.json({ error: 'Invalid Date' })
  }
  else {
    
    res.json({
      unix: dateMain.getTime(),
      utc: `${days[dateMain.getDay() ]}, ${day} ${months[dateMain.getMonth()]} ${dateMain.getFullYear()} ${hours}:${minutes}:${seconds} GMT`
    });
  }

});



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

