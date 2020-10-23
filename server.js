// Servidor para servir la página una vez hecho el build de produccion
const express = require('express');
var compression = require('compression');
const path = require('path');
var enforce = require('express-sslify');
const app = express();

app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.use(compression())
app.use(express.static(__dirname + '/dist/angular-client'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/angular-client/index.html'));
});

app.listen(process.env.PORT || 8080);