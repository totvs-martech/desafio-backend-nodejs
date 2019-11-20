const Cart = require('../../controller/cart')

describe('Verify Cart: ', () => {
  let cart = null
  beforeEach(() => {
    cart = new Cart()
  })

  test('List Cart: ', async () => {
    const mockGetDataCart = jest.spyOn(Cart.prototype, 'getDataCart')
    mockGetDataCart.mockImplementation(async () => {
      return Array
    })

    const mockCreateBodyCart = jest.spyOn(Cart.prototype, 'createBodyCart')
    mockCreateBodyCart.mockImplementation(async () => {
      return {
        products: [],
        amount: 10,
        subTotal: 10,
        discount: 0,
        total: 10,
      }
    })

    const returnMethod = await cart.getCartByKey('7d59898a82f7043841fd876ed32c35fcf2cc76ad')
    expect(returnMethod).toMatchObject({
      products: expect.any(Array),
      amount: expect.any(Number),
      subTotal: expect.any(Number),
      discount: expect.any(Number),
      total: expect.any(Number)
    })

    mockCreateBodyCart.mockRestore()
  })

  afterEach(() => {
    cart = null
  })
})
