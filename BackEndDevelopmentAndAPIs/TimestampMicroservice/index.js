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
    //If req.params.date is empty, we use today's date and time
    let date = new Date(Date.now());
    let timeInUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
    res.json({unix : Date.now(), utc : timeInUTC.toUTCString()});
  }
  else
  {
    if(date != "Invalid Date")
    {
      //If the date works with new Date(), we convert it to unix and UTC with some built in functions
      let timeInUnix = Math.floor(date.getTime());
      let timeInUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
      res.json ({unix : timeInUnix, utc : timeInUTC.toUTCString()});
    }
    else
    {
      //Given a date in unix format, new Date() doesn't consider it a date so we have to convert it ourselves.
      const unix = parseInt(req.params.date, 10);
      if(unix)
      {
        //We convert it the same way to utc as we did above
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
