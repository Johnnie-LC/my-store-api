const { faker } = require('@faker-js/faker')
const boom = require('@hapi/boom')

class ProductServices {

  constructor(){
    this.products = []
    this.generate()
  }

  async generate(){
    const limit = 100
    for(let index = 0; index < limit; index++){
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        image: faker.image.url(),
        isBlocked: faker.datatype.boolean()
      })
    }
  }

  async create({name, price, image}){

    const newProduct = {
      id: faker.string.uuid(),
      name,
      price,
      image
    }

    this.products.push(newProduct)
  }

  find(){
    return new Promise((resolve,)=>{
      setTimeout(()=>{
        resolve(this.products)
      },5000)
    })
    // return this.products
  }

  async findOne(id){
    const product = this.products.find(item => item.id === id)

    if(!product){
      throw boom.notFound('Product not Found')
    }

    if(product.isBlocked){
      throw boom.conflict('Product is block')
    }

    return product
  }

  async update({id, body}){
    const isElementId = (element) => element.id === id
    const index = this.products.findIndex(isElementId)

    if(index === -1){
      throw boom.notFound('Product not found')
    }

    this.products[index] = {
      ...this.products[index],
      ...body
    }

    return this.products[index]
  }

  async delete(id){
    const isElementId = (element) => element.id === id
    const index = this.products.findIndex(isElementId)

    if(index === -1){
      throw boom.notFound('Product not found')
    }
    this.products.splice(index,1)

    return {id}
  }
}

module.exports = ProductServices
