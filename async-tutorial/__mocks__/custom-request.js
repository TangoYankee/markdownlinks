const users = {
    4: {name: 'mark'},
    5: {name: 'paul'}
}

const customRequest = (url) => {
    return new Promise((resolve, reject) => {
        const userID = parseInt(url.substr('/users/'.length), 10)
        process.nextTick(() =>
        users[userID]
            ? resolve(users[userID])
            : reject({
                error: 'User with' + userID + ' not found.'
            })
        )
    })
}

module.exports = {
    customRequest
}
