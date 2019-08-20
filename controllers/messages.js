module.exports = function (app) {
  const url = 'http://localhost:3000/'
  var content = {};
  content.history = {};
  var listConversationId = [];
  var session = require('express-session')


  app.post('/messages', function (req, res) {
    content.message = req.body["message"];

    content.message.conversationId = sid;
    content.message.date = new Date();

    content.message.botId = 1;

    if (content.message.interaction == null) {

      let id = req.params.id;
      content.hasHistory = messageDao.findByConversationId(req, res, id).length > 0;

      if (hasHistory == null) {
        content.message.interaction = 'Oi! Como posso te ajudar?'
        content.message.bot = true;
      } else {
        req.assert("message.interaction", "Fale alguma coisa com seu bot, a sua ultima mensagem estava vazia").notEmpty();
        content.erros = req.validationErrors();
        res.status(406).send(erros);
      }

    }

    var connection = app.persistence.connectionFactory();
    var messageDao = new app.persistence.MessageDao(connection);

    messageDao.save(message, function (erro, resultado) {
      if (content.erro) {
        console.log('Erro ao inserir no banco:' + erro);
        res.status(500).send(erro);
      } else {
        content.message.id = resultado.insertId;
        console.log('messagem criada');

        response = content.history = messageDao.findByConversationId(req, res, content.message.conversationId);
        let response = {
          mensagem_enviada: content.message,
          links: [
            {
              href: url + "mensagem/messages/"
                + content.message.conversationId,
              rel: "Enviar Nova Mensagem",
              method: "POST"
            },
            {
              href: url + "messages/:id/"
                + content.message.messageId,
              rel: "Ver Mensagem",
              method: "GET"
            },
            {
              href: url + "messages/:conversationId/"
                + content.message.conversationId,
              rel: "Ver Histórico",
              method: "GET"
            }
          ]
        };

        res.status(201).json(response);
      }
    });

  });

  app.get('/messages/:id', function (req, res) {
    let connection = app.persistence.connectionFactory();
    let messageDao = new app.persistence.MessageDao(connection);

    content.mensagemEncontrada = messageDao.findById(req.params.id);

    // let response = {
    //   mensagem: content.mensagemEncontrada,
    //   links: [
    //     {
    //       href: url + "messages/"
    //         + content.message.conversationId,
    //       rel: "Enviar Nova Mensagem",
    //       method: "POST"
    //     },
    //     {
    //       href: url + "messages/:conversationId/"
    //         + content.message.conversationId,
    //       rel: "Ver Histórico",
    //       method: "GET"
    //     }
    //   ]
    // };

    res.status(200).json(content.mensagemEncontrada);
  });

  processRow = function (row) {
    listConversationId.push(row);
  }

  app.get('/messages/conversation/:id', function (req, res) {
    let connection = app.persistence.connectionFactory();
    let messageDao = new app.persistence.MessageDao(connection);
    let id = req.query.id;

    let conversation = messageDao.conversation(id);
    res.status(500).send(conversation);

  });

  app.get('/messages/conversation/old/:id', function (req, res) {
    var connection = app.persistence.connectionFactory();
    var messageDao = new app.persistence.MessageDao(connection);

    messageDao.findByConversationId(req.params.id).then(
      result => {
        console.log(result);
        let response = {
          history: result,
          links: [
            {
              href: url + "mensagens/"
                + req.params.id,
              rel: "Enviar Nova Mensagem",
              method: "POST"
            }
          ]
        };

        res.status(200).json(response);
      }

    ).catch(error => {
      res.status(500).send('Erro ao buscar conversa ' + error);
    });

  });

}
