const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');

require('dotenv').config();
require("./server/config/mongoose.config");

app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());

require('./server/routes/user.routes')(app);
require('./server/routes/expense.routes')(app);

app.listen(port, () => console.log(`Listening on port: ${port}`));