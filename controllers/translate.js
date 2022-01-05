const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');
const translate = async (req, resp, azure_translate) => {
    var endpoint = azure_translate.endpoint

    var messages=req.body.messages
    var arr=[]
    messages.forEach(function (item) {
        var obj={'text':item['text']}
        arr.push(obj)
    })
    var options = {
        baseURL: endpoint,
        url: '/translate',
        method: 'post',
        headers: {
            'Ocp-Apim-Subscription-Key': azure_translate.key,
            'Ocp-Apim-Subscription-Region': azure_translate.location,
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        },
        params: {
            'api-version': '3.0',
            // 'from': req.body.from_lang,
            'to': req.body.to_lang
        },
        data:arr,
        responseType: 'json'
    };
    var data;
    try {
        await axios.request(options).then(async function (response) {
            data = response.data;
        }).catch(function (error) {
            console.error(error);
            return resp.json("error")
        });
        let len = messages.length;
        for(var i=0;i<len;i++)
        {
            // console.log(data[i])
            messages[i]['text']=data[i]['translations'][0]['text']
        }
        // console.log(messages)
        return resp.json(messages)
    }
    catch {
        resp.json("Error while processing")
    }
}
module.exports = {
    translate: translate
};