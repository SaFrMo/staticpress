const getUrls = require('./wp/getUrls').default
const axios = require('axios')
const fs = require('fs')
const rimraf = require('./utils/rimrafPromise').default

module.exports.default = async function(domain) {
    // API fetching
    const apiUrl = domain + '/wp-json/wp/v2/'

    const urls = await getUrls(apiUrl)

    if (!fs.existsSync('./dist')) {
        fs.mkdirSync('./dist')
    }

    // remove existing
    await rimraf('./dist/**/*')

    for (let i = 0; i < urls.length; i++) {
        const url = urls[i]
        const res = await axios.get(url)

        // strip domain name
        const relativePath = url.replace(domain + '/', '')
        // find filename
        const tokenizedPath = relativePath.split('/').filter(piece => piece)
        const fileName = tokenizedPath.slice(-1)

        for (let j = 0; j < tokenizedPath.length; j++) {
            const checkingFor = `./dist/${tokenizedPath
                .slice(0, j + 1)
                .join('/')}`
            if (!fs.existsSync(checkingFor)) {
                fs.mkdirSync(checkingFor)
            }
        }
        // save result
        fs.writeFileSync(
            `./dist/${tokenizedPath.join('/')}/index.html`,
            JSON.stringify(res.data)
        )
    }
}
