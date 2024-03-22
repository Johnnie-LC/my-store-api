const express = require('express')
const { faker } = require('@faker-js/faker')

const router = express.Router()

router.get('/', (req, res)=>{
  const products = []
  const { size } = req.query
  const limit = parseInt(size) || 10

  for(let index = 0; index < limit; index++){
    products.push({
      id: faker.id,
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price()),
      image: faker.image.imageUrl(),
      index
    })
  }
  res.json(products)
})

router.get('/filter',(req, res)=>{
  res.send('Yo soy un filter')
})

router.get('/:id', (req, res) => {
  const { id } = req.params

  res.json({
    id,
    name: 'Producto 1',
    price: 1000
  })
})

router.post('/', (req, res)=>{
  const body = req.body

  res.json({
    message: 'created',
    data: body
  })

})

module.exports = router
