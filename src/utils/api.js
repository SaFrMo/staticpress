const axios = require('axios')

module.exports.get = async function(url) {
    try {
        const res = await axios.get(url)
        return res.data
    } catch {
        return null
    }
}
