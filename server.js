const express = require('express');

const server = express();
//LOCAL IMPORTS
const userRouter = require('./users/userRouter')
const postRouter = require('./posts/postRouter')

//GLOBAL MIDDLEWARE
server.use(logger)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('/users', userRouter)
server.use('/posts', postRouter)

//custom middleware

function logger(req, res, next) {
  console.log(`A ${req.method} at ${req.url}. Time: ${Date.now()}`)
  next()
}

module.exports = server;
