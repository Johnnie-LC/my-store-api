const express = require('express')
const ProductServices = require('./../services/product.services')
const validatorHandler = require('./../middlewares/validator.handler')
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema} = require('./../schema/product.schema')

const router = express.Router()

const services = new ProductServices()

router.get('/', async (req, res)=>{
  const products = await services.find()
  console.log({requestTime: req.requestTime})
 res.json(products)
})

router.get('/filter',(req, res)=>{
  res.send('Yo soy un filter')
})

router.get('/:id', validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const product = await services.findOne(id)

      if(!product){
        res.status(404).json({
          message: 'Not found',
          id
        })
      }

      res.status(200).json(product)
    } catch (error) {
      next(error)
    }

})

router.post('/', validatorHandler(createProductSchema, 'body'),
  async (req, res)=>{
    const body = req.body
    await services.create(body)

    res.status(201).json({
      message: 'created',
      data: body
    })
  })

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next)=>{
    try {
      const { id } = req.params
      const body = req.body
      const product = await services.update({
        id,
        body
      })
      res.status(201).json({
        message: 'update',
        data: product
      })
    } catch (error) {

    next(error)
    }
  })

router.delete('/:id', async (req,res, next)=>{
  try {
    const { id } = req.params
    const {id:idDelete} = await services.delete(id)

    res.json({
      message: 'Deleted',
      id: idDelete
    })

  } catch (error) {
    next(error)
  }

})

module.exports = router
