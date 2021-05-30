const express = require('express');
const { TOKENNAME } = require('./authorize');
const cookieParser = require('cookie-parser');
const { router } = require('./router');

const app = express();
const port = process.env.PORT || 8011;

app.use(cookieParser(TOKENNAME));

app.use(express.static('dist', { index: 'index.html' }));

router(app);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
