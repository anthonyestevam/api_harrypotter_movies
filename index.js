const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const swaggerDocument = yaml.load('./swagger/swagger.yaml');

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

//swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//routes
const movieRoutes = require('./routes/movieRoutes');
app.use('/movies', movieRoutes);

app.listen(5000)