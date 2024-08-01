var express = require('express');
var cors = require('cors');
require('dotenv').config()
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), function(req, res) {
  var file_name = req.file.originalname;
  var file_type = req.file.mimetype;
  var file_size = req.file.size;
  res.json({
    name: file_name,
    type: file_type,
    size: file_size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
