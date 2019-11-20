const User = require('../../controller/user')
const UserRepository = require('../../repository/user')

describe('Verify User: ', () => {
  let user = null
  beforeEach(() => {
    user = new User()
  })

  test('Create: ', async () => {
    const mockCreateUser = jest.spyOn(UserRepository, 'create')
    mockCreateUser.mockImplementation(async () => {
      return bodyUser()
    })

    const returnMethod = await user.create({})
    expect(returnMethod).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      email: expect.any(String),
      password: expect.any(String)
    })

    mockCreateUser.mockRestore()
  })

  afterEach(() => {
    user = null
  })
})

function bodyUser () {
  return {
    id: 1,
    name: 'User test',
    email: 'test@test.com',
    password: '123abc'
  }
}