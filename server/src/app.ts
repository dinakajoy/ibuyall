import * as express from 'express';
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger.json');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.options("/*", function(request: express.Request, response: express.Response, next: express.NextFunction) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  response.header('Access-Control-Allow-Headers', 'Origin, Content, Accept, Content-Type, Authorization, Content-Length, X-Requested-With');
  response.sendStatus(200);
});
app.all('*', function(request: express.Request, response: express.Response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get('/', (request: express.Request, response: express.Response) => {
  response.status(200).json({
    success: 'YAY! Congratulations! Your Are Connected To Mini-Netflix Api. But, You Must Be Authorized To Continue!!!'
  });
});

app.use('*', (request: express.Request, response: express.Response) => {
  response.status(400).json({
    error: 'Welcome To ibuyall Api. Please Ensure You Entered A Correct Route!!!'
  });
});

module.exports = app;
