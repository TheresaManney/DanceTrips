var express = require('express');
var app = express();

app.use(express.static(_dirname = '/build'));

app.listen(process.env.PORT || 8081);
