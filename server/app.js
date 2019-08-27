const express = require('express');

const configure = require('./config');
const routes = require('./routes');


const app = express();
configure(app);
app.use(routes);

const server = app.listen(process.env.PORT || 3001, () => {
  console.log(`  Server Listening on port ${server.address().port}`);
});
