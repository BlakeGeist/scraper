const request = require('request')


function getStatus(link) {
    return new Promise((resolve, reject) => {
        request(link.href, function(error, response, body) {
            resolve({
                ...link,
                status: (!error && response.statusCode == 200) ? response.statusCode : "Down: " + error, 
            })
        })
    })   
}

export default async function handler(req, res) {
    const jsonReq = JSON.parse(req.body)

    let promiseList = jsonReq.links.data.map((link) => getStatus(link))

    Promise.all(promiseList).then(resultList => {
        res.status(200).json({ data: resultList, score: 100 })
    })
}