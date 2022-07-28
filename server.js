const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const produceListRoutes = require('./routes/api/produceList');
const creditRoutes = require('./routes/api/creditList');
const salesRoutes = require('./routes/api/salesList');


const mongo = "mongodb+srv://paul:1Melchizedec%23@cluster0.5ozwp.mongodb.net/test"
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('tiny'));

app.use(bodyParser.json());


mongoose.connect(mongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

}).then(() => 
  console.log('Connected to MongoDB!')).catch(err => console.log(err));


app.use('/api/producelist', produceListRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/credit', creditRoutes);
app.get('/', (req, res) => {
  res.send('This is the server');
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
