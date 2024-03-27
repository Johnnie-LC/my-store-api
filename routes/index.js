const express = require('express')
const productsRouter = require('./products.router')
const usersRouter = require('./users.router')
const categoriesRouter = require('./categories.router')
const homeRouter = require('./home.routre')
const htmlRouter = require('./html.router')

function routerApi(app) {
  const router = express.Router()
  app.use('/api/v1', router)

  router.use('/html', htmlRouter)
  router.use('/products', productsRouter)
  router.use('/users', usersRouter)
  router.use('/categories', categoriesRouter)
  router.use('/', homeRouter)
}

module.exports = routerApi
