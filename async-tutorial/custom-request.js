const http = require('http')
const request = require('request')

// const customRequest = (url) => {
//     return new Promise(resolve => {
//         http.get({path: url}, response => {
//             let data = ''
//             response.on('data', _data => (data+=_data))
//             response.on('end', () => resolve(data))
//         })
//     })
// }

const customRequest = (url) => {
    return new Promise(resolve => {
        request.get({
            url: url 
            }, response => {
                let data = ''
                response.on('data', _data => (data+=_data))
                response.on('end', () => resolve(data))
            }
        )
    })
}

module.exports = {
    customRequest
}
