module.exports = function (app) {
  const url = 'http://localhost:3000/';
  app.get('/bot/:id', function (req, res) {
    var id = req.params.id;
    let connection = app.persistence.connectionFactory();

    let response = {
      history: result,
      links: [
        {
          href: url + "bots/",
          rel: "Listar bots",
          method: "GET"
        }
      ]
    };


    connection.query('SELECT * from bots where botId = ' + id + ' order by date', function (err, rows, fields) {
      connection.end();
      if (!err) {
        response.botsList = {};
        response.botsList = rows;
        res.status(200).json(response);
      }
      else
        res.status(500).send('erro gerado ao listar bots: ' + err);
    });

  });
  
  app.get('/bots', function (req, res) {
    let connection = app.persistence.connectionFactory();

    connection.query('SELECT * from bots order by date', function (err, rows, fields) {
      connection.end();
      if (!err)
        res.status(200).send(rows);
      else
        res.status(500).send('erro gerado ao listar bots: ' + err);
    });

  });

  app.post('/bots', function (req, res) {

    req.assert("bot.name",
      "Dê um nome para o seu Bot").notEmpty();
    req.assert("bot.botId",
      "Adicione um id ao seu bot")
      .notEmpty();

    var erros = req.validationErrors();

    if (erros) {
      console.log('Erros de validacao encontrados');
      res.status(400).send(erros);
      return;
    }

    var bot = req.body["bot"];
    console.log('processando uma requisicao de um novo bot');

    bot.status = '1';
    bot.date = new Date;

    var connection = app.persistence.connectionFactory();
    var botDao = new app.persistence.BotDao(connection);

    botDao.save(bot, function (erro, resultado) {
      if (erro) {
        console.log('Erro ao inserir no banco:' + erro);
        res.status(500).send(erro);
      } else {
        bot.botId = resultado.botId;
        console.log('bot criado: ' + bot.botId);

        res.status(201).json(bot);
      }
    });

  });
}
