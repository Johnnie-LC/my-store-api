const express = require('express')
const routerApi = require('./routes')

const {boomErrorHandler, logErrors, errorHandler} = require('./middlewares/errorHandle')

const app = express()
const port = 3000

app.use(express.json())

routerApi(app)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log('My port ' + port)
})
