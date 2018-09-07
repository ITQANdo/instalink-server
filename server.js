const express = require('express');
const instalink = require('./instalink/instalink');
const app = express();
const port = process.env.INSTALINK_PORT || 3300;


app.listen(port);

app.get("/p/:id", (req, res, next) => {
  let postID = req.params.id;
  instalink.getURL(postID).then((r) => {
    res.json(r);
  });
});


console.log(`We're running on port: ${port}`);
