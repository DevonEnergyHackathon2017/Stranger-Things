const express = require('express');
const path = require('path');
// const bodyParser = require('body-parser');

const root = '.';
const public = process.env.PUBLIC || `${root}`;
const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(root));
console.log(`serving ${root}`);
app.get('*', (req, res) => {
  res.sendFile(`index.html`, { root: root });
});

const port = process.env.PORT || '3000';
app.listen(port, () => console.log(`API running on localhost:${port}`));
