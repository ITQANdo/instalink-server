const express = require('express');
const instalink = require('./instalink');
const app = express();
const port = process.env.INSTALINK_PORT || 3300;
const fs = require('fs');
const moment = require('moment');
const logfile = 'instalink-log.txt';
// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


// index page
app.get('/', function(req, res) {
    res.render('pages/index');
});

app.get("/p/:id", (req, res, next) => {
  let ip = req.headers['x-forwarded-for'] ||
     req.connection.remoteAddress ||
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null);
  async function fetchImageInfo() {
    await instalink.init();
    let r = await instalink.imageInfo(req.params.id);
    await instalink.terminate();
    return r;
  }

  fetchImageInfo().then((r) => {
    res.json(r);
    fs.appendFile(__dirname + '/public/' + logfile,
    `\n${moment().format('YYYY-MM-DD:HH:mm:ss')} - ${ip} - https://www.instagram.com/p/${req.params.id} - RESTULT:${r.STATUS}`,
     function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
  });

});

app.listen(port);
console.log(`We're running on port: ${port}`);
