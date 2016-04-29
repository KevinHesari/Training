'use strict'
//These are the constants (Hapi and server)
const Hapi = require('hapi');
const server = new Hapi.Server();

//This is the connection configuration
server.connection({ port: 3000 });

//First hello world route
server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('Hello, world!');
  }
});

//Second woohoo route
server.route({
  method: 'GET',
  path: '/woohoo',
  handler: (request, reply) => {
    reply('Woohoo my second route!')
  }
})

//This is a route with parameters
server.route({
  method: 'GET',
  path: '/hello/{name}',
  handler: (request,reply) => {
    reply('Hello ' + request.params.name)
  }
})

//This is a route that has a query string
server.route({
  method: 'GET',
  path: '/query',
  handler: (request,reply) => {
    reply('Hello' + request.query.name)
  }
})

//This is a route with multiple query strings
server.route({
  method: 'GET',
  path: '/query2',
  handler: (request,reply) => {
    reply('This is query1:' + request.query.query1 + 'This is query2:' + request.query.query2)
  }
})

server.register(require('inert'), (err) => {
  if (err) {
    throw err
  }

  //This is the form
  server.route({
    method: 'GET',
    path: '/form',
    handler: (request,reply) => {
      reply.file('index.html')
    }
  })

})

server.route({
  method: 'POST',
  path: '/recieve_money',
  handler: (request,reply) => {
    reply('You have sent ' + request.payload.money + ' USD')
  }
})

//This starts the server
server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
