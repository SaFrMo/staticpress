const get = require('../utils/api').get

module.exports.default = async function(baseUrl) {
    // get list of page URLs
    const rawPages = await get(baseUrl + 'pages')
    const pageUrls = rawPages.map(page => page.link)

    return pageUrls

    // // get list of post URLs
    // const rawPosts = await get(baseUrl + 'posts')
    // const postUrls = rawPosts.map(page => page.link)
    //
    // // concat the desired URLs
    // const urls = [].concat(pageUrls, postUrls)
    // return urls
}
