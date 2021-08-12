const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = 3000;

app.listen(port, function () {
    console.log(`Server listening on port http://localhost:${port}`);
  });