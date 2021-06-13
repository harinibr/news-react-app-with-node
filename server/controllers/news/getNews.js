const req = require("request");
const config = require("/news/config.json");
//GET Calls
/***
 *
 * @param url - API url
 * @returns {Promise<{data:any}>}
 */
function getAPIresponse (url){
    return new Promise((resolve,reject) => {
        console.log(url)
        req.get(url, (err,resp,body)=>{
            if(err){
                reject(err);
            }else{
                resolve(JSON.parse(body));
            }
        });
    });
};

module.exports = {
    async getNews(req,res){
        return await getAPIresponse(`${config.newsAPIUrl}&country=${req.params.country}`)
            .then(data=> {
                /***
                 * data{
                 *
                    data: {
                    status: string,
                    totalResults: number,
                    articles: [
                        source: {
                            id: string|null,
                            name: string
                            },
                        author: string,
                        title: stirng,
                        description: string,
                        url: string,
                        urlToImage: string,
                        publishedAt: dateString,
                        content: string
                    ]
                    }
                 * }
                 */
                res.status(200).send({
                    data
                });
            })
            .catch(error => res.status(400).send({
                data: {
                    error: error
                },
                success: false,
                Message: "Failure",
                StatusCode: "Failure"
            }));
    }
}