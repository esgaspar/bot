var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var morgan = require('morgan');
var logger = require('../services/logger.js');

module.exports = function () {
  var app = express();

  //Middleware do Morgan
  app.use(morgan("common", {
    stream: {
      write: function (mensagem) {
        logger.info(mensagem);
      }
    }
  }));


  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(expressValidator());

  consign()
    .include('controllers')
    .then('persistence')
    .then('services')
    .into(app);

  return app;
}