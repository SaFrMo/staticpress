const axios = require('axios')

module.exports.get = async function(url) {
    const res = await axios.get(url)
    return res.data
}
