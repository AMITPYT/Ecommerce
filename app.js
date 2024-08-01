require('./connection');
const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');
const dotenv = require('dotenv');

dotenv.config();


const app = express()
const port = 5000

app.use(bodyParser.json());

app.use(cors())
app.use(express.json())
app.use(productRoutes);
app.use(cartRoutes);
app.use(userRoutes);



app.listen(port, () => {
  console.log(` listening at http://localhost:${port}`)
})