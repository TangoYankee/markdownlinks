jest.mock('../custom-request')

const { getUserName } = require('../user')

it('works with promises', async () => {
    expect.assertions(1)
    const data = await getUserName(4)
    return expect(data).toEqual('mark')
})
