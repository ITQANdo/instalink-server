const express = require('express');
const instalink = require('./instalink');
const app = express();
const port = process.env.INSTALINK_PORT || 3300;

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));


// index page
app.get('/', function(req, res) {
    res.render('pages/index');
});

app.get("/p/:id", (req, res, next) => {
  async function fetchImageInfo() {
    await instalink.init();
    let r = await instalink.imageInfo(req.params.id);
    await instalink.terminate();
    return r;
  }

  fetchImageInfo().then((r) => {
    res.json(r);
  });

});

app.listen(port);
console.log(`We're running on port: ${port}`);
