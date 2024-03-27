const express = require('express')
const cors = require('cors')
const routerApi = require('./routes')

const {boomErrorHandler, logErrors, errorHandler} = require('./middlewares/errorHandle')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

const whitList = ['http://127.0.0.1:5500']
const options = {
  origin: (origin, callback ) => {

    if(whitList.includes(origin) || !origin){
      callback(null, true)
    }else{
      callback(new Error('no Permitido'))
    }
  }
}

app.use(cors(options))

routerApi(app)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log('My port ' + port)
})
