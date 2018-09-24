const getUrls = require('./wp/getUrls').default
const axios = require('axios')
const fs = require('fs')
const rimraf = require('./utils/rimrafPromise').default
const ProgressBar = require('progress')

module.exports.default = async function(domain) {
    console.log('Finding all items to fetch...')

    // base API URL
    const apiUrl = domain + '/wp-json/wp/v2/'
    // get all URLs to fetch
    const urls = await getUrls(apiUrl)

    console.log(`Found ${urls.length} URL(s). Starting...`)

    // create output if necessary
    if (!fs.existsSync('./dist')) {
        fs.mkdirSync('./dist')
    }

    // remove existing
    await rimraf('./dist/**/*')

    // set up progress bar
    const bar = new ProgressBar(
        `   :token1
    [:bar] (:current / :total)`,
        {
            total: urls.length
        }
    )

    for (let i = 0; i < urls.length; i++) {
        const url = urls[i]

        // update CLI
        process.stdout.clearLine()
        process.stdout.cursorTo(0)
        bar.tick({
            token1: url.replace(domain, '')
        })

        const res = await axios.get(url + '?contentType=json')

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
            `./dist/${tokenizedPath.join('/')}/content.json`,
            JSON.stringify(res.data)
        )
    }

    console.log('Site data built successfully!')
}
