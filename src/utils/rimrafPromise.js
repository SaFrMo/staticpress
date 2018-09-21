const rimraf = require('rimraf')

module.exports.default = async function(glob) {
    return new Promise((res, rej) => {
        rimraf(glob, res)
    })
}
