const Hash = require('../../controller/hash')
const crypto = require('crypto')

describe('Verify Hash: ', () => {
  let hash = null
  beforeEach(() => {
    hash = new Hash()
  })

  test('Generate: ', async () => {
    const mockCrypto = jest.spyOn(crypto, 'randomBytes')
    mockCrypto.mockImplementation(() => {
      return '943245b1d91bbdd62c902d60cfb1a5d79f3fe20b'
    })
    const returnMethod = await hash.generate()
    expect(returnMethod).toBe('943245b1d91bbdd62c902d60cfb1a5d79f3fe20b')
    mockCrypto.mockRestore()
  })

  afterEach(() => {
    hash = null
  })
})
