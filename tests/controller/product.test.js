const Product = require('../../controller/product')
const ProductRepository = require('../../repository/product')

describe('Verify Products: ', () => {
  let product = null
  beforeEach(() => {
    product = new Product()
  })

  test('Get All: ', async () => {
    const mockGetAllProduct = jest.spyOn(ProductRepository, 'get')
    mockGetAllProduct.mockImplementation(async () => {
      return Array
    })
    const returnMethod = await product.listAll('1')
    expect(returnMethod).toBe(Array)
    mockGetAllProduct.mockRestore()
  })

  test('Create: ', async () => {
    const mockCreateProduct = jest.spyOn(ProductRepository, 'create')
    mockCreateProduct.mockImplementation(async () => {
      return bodyProduct()
    })
    const returnMethod = await product.create('1')
    expect(returnMethod).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      value: expect.any(String),
      description: expect.any(String),
      factor: expect.any(String),
      image: expect.any(String)
    })
    mockCreateProduct.mockRestore()
  })

  afterEach(() => {
    product = null
  })
})

function bodyProduct () {
  return {
    id: 1,
    name: 'Product Test',
    value: '100',
    description: 'product test',
    factor: 'A',
    image: '../${PATH}'
  }
}
