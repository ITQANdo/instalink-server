const express = require('express');
const instalink = require('./instalink');
const app = express();
const port = process.env.INSTALINK_PORT || 3300;

app.listen(port);

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

console.log(`We're running on port: ${port}`);
