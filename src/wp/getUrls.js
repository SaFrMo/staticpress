const get = require('../utils/api').get

module.exports.default = async function(baseUrl) {
    // get all post types
    const postTypes = await get(baseUrl + 'types')

    // try to get list of all posts in all types
    let output = await Promise.all(
        Object.keys(postTypes).map(async postType => {
            console.log(`Getting posts of type ${postType}...`)

            const url = baseUrl + postType + 's'
            const rawPages = await get(url)

            if (rawPages) {
                const pageUrls = rawPages.map(page => page.link)
                return pageUrls
            }
        })
    )

    // flatten and remove null values
    output = output.reduce((acc, val) => {
        if (val) {
            return acc.concat(val)
        }
        return acc
    })

    return output
}
