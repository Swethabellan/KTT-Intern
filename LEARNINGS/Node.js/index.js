const express=require('express');
const app=express();

var things = require('./things.js');
// const port=3080;
app.get('/hello', function(req,res) {
    res.send("Hello Swetha!");
});
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })
app.use('/things',things);
app.listen(3000);