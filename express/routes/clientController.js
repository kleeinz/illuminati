const express = require('express');
const router = express.Router();
// CONFIGURATION
const config = require('../configs/config');
const errorSender = require('../configs/ErrorSender');
const Responser = require('../configs/Responser');
const status = require('../configs/StatusCodes');
const app = express();
const Client = require('../models/clients');

/*
  This web service update an exist client in the database.
  Only will do changes in phone, married, gender, age and profession.
 * @param request is the Client to update, this object corresponds to the model object in the front end.
 * @param response is the client stored in the database.
*/
router.put('/update', (request, response) => {
  Client.update({
    '_id': request.body._id,
    'name': request.body.name
  },
  {
    phone: request.body.phone,
    married: request.body.married,
    gender: request.body.gender,
    age: request.body.age,
    profession: request.body.profession
  }).then(success => {
    return response.status(status.codes.ok).json(new Responser(success, status.codes.ok, 'The client has been updated.'));
  }).catch( err => {
    return errorSender(err, response, status.codes.server);
  });
});

/* This web service creates a new Client in the database. 
 * @param request is the Client to create, this object corresponds to the model object in the front end.
 * @param response is the client stored in the database.
*/
router.post('/save', (request, response) => {
  let client = new Client({
    name: request.body.name,
    phone: request.body.phone,
    married: request.body.married,
    gender: request.body.gender,
    age: request.body.age,
    profession: request.body.profession
  });
  client.save().then(data =>  {
    return response.status(status.codes.save).json(new Responser(data, status.codes.save, 'The client has been created.'));
  }).catch(err => {
    return errorSender(err, response, status.codes.server);
  });
});

/* This web service get All clients in the database */
router.get('/find', (request, response) => {
  Client.find().then(clients => {
    return response.status(status.codes.ok).json(new Responser(clients, status.codes.ok, 'The clients have been got.'));
  }).catch(err => {
    return errorSender(err, response, status.codes.server);
  });
});

/* This web service remove a client from the database through client id generated by MongoDB */
router.post('/delete', (request, response) => {
  Client.remove({'_id': request.body.client._id}).then(client => {
      return response.status(status.codes.ok).json(new Responser(client, status.codes.ok, 'The client has been removed.'));
    }).catch(err => {
      return errorSender(err, response, status.codes.server);
    });
});

/* This web service search a client by id in the database */
router.get('/find/:id', (request, response) => {
  Client.findOne({'_id':request.params.id}).then(clients => {
    return response.status(status.codes.ok).json(new Responser(clients, status.codes.ok, 'The users has been got.'));
  }).catch(err => {
    return errorSender(err, response, status.codes.server);
  });

});

/* Exporting this controller to router */
module.exports = router;
