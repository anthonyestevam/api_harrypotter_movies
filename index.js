const express = require('express');
const cors = require('cors');

const app = express()

//config json response
app.use(express.json());

//Solve CORS 
app.use(cors( {
     credentials: true, 
     origin: 'http://localhost:3000' 
}));

//static files
app.use(express.static('public'));

//routes
const movieRoutes = require('./routes/movieRoutes');
app.use('/movies', movieRoutes);

app.listen(5000)