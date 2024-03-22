const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
  res.send('Hola mi server en espress')
  })

module.exports = router
