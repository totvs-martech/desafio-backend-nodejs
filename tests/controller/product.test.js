const Product = require('../../controller/product')
const ProductRepository = require('../../repository/product')

describe('Verify Products: ', () => {
  let product = null
  beforeEach(() => {
    product = new Product()
  })

  test('List All: ', async () => {
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

  test('Add Product in cart: ', async () => {
    const mockProduct = jest.spyOn(ProductRepository, 'getById')
    mockProduct.mockImplementation(async () => {
      return bodyProduct()
    })

    const mockCountTotal = jest.spyOn(Product.prototype, 'countTotal')
    mockCountTotal.mockImplementation(() => {
      return 100
    })

    const mockVerifyKey = jest.spyOn(Product.prototype, 'verifyKey')
    mockVerifyKey.mockImplementation(() => {
      return Array
    })

    const mockAlterBodyKey= jest.spyOn(Product.prototype, 'alterBodyKey')
    mockAlterBodyKey.mockImplementation(() => {
      return Array
    })

    const returnMethod = await product.addProductCart('1', '7d59898a82f7043841fd876ed32c35fcf2cc76ad')
    expect(returnMethod).toBe(Array)

    mockProduct.mockRestore()
    mockCountTotal.mockRestore()
    mockVerifyKey.mockRestore()
    mockAlterBodyKey.mockRestore()
  })

  test('Count Total: ', async () => {
    const returnMethod = await product.countTotal(2, 100)
    expect(returnMethod).toBe(200)
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
