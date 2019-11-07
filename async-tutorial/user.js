const { customRequest } = require('./custom-request')

const getUserName = async (userID) => {
    const user = await customRequest('/users/' + userID)
    return user.name
}

module.exports = {
    getUserName
}