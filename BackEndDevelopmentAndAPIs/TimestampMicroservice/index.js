// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get("/api/:date?", function(req, res) {
  let date = new Date(req.params.date);
  
  if(!req.params.date)
  {
    let date = new Date(Date.now());
    let timeInUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
    res.json({unix : Date.now(), utc : timeInUTC.toUTCString()});
  }
  else
  {
    if(date != "Invalid Date")
    {
      let timeInUnix = Math.floor(date.getTime());
      let timeInUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
      res.json ({unix : timeInUnix, utc : timeInUTC.toUTCString()});
    }
    else
    {
      const unix = parseInt(req.params.date, 10);
      if(unix)
      {
        let unixToDate = new Date(unix);
        res.json({unix : unix, utc : unixToDate.toUTCString()});
      }
      else
      {
        res.json({ error : "Invalid Date" })
      }
    }
  }
});