const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongo = require('mongodb');

const app = express();
const charts = require('./routes/chart');

var url = "mongodb://localhost:27017/";

mongo.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("test");
  dbo.collection("PauDosFerrosSIM").find({"SEXO": 1}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());
app.use('/chart', charts);

const port = (3000);

app.listen(port, () => console.log(`Servidor iniciado na porta ${port}`));