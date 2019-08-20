module.exports = function (app) {

  app.get('/bots', function (req, res) {
    var connection = app.persistence.connectionFactory();
    var botDao = new app.persistence.BotDao(connection);

    botDao.list(req, res);

  });

  app.post('/bots', function (req, res) {

    req.assert("bot.name",
      "Dê um nome para o seu Bot").notEmpty();
    req.assert("bot.id",
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

    bot.status = 'CRIADO';
    bot.data = new Date;

    var connection = app.persistence.connectionFactory();
    var botDao = new app.persistence.BotDao(connection);

    botDao.save(bot, function (erro, resultado) {
      if (erro) {
        console.log('Erro ao inserir no banco:' + erro);
        res.status(500).send(erro);
      } else {
        bot.botId = resultado.botId;
        console.log('bot criado: '+ bot.botId);

        res.status(201).json(bot);
      }
    });

  });
}
