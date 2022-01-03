var axios = require("axios").default;
const scannedCduty = async (req, resp, Cduty, azure_cv) => {
    var iata = req.body.flight;
    var departure = req.body.departure;
    var url = azure_cv.endpoint + "vision/v3.2/analyze?visualFeatures=Objects";
    var options = {
        method: 'post',
        url: url,
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': azure_cv.key
        },
        data: {
            url: req.body.url,
        }
    };
    var chk = 0;
    var it = [];
    var itb=[];
    var data;
    try {
        await axios.request(options).then(async function (response) {
            data = response.data.objects;     
        }).catch(function (error) {
            console.error(error);
            return resp.json("error")
        });
         await data.forEach(async function (item) {
            var itmname = item['object']
            it.push(itmname)
        });
        const itm = await Cduty.find({ 'name': it });
            console.log(itm)
            if (itm.length != 0) {
                chk = 1;
            }
        console.log("hello")
        if (chk == 1)
            return resp.json(itm);
        else
            return resp.json("Can't Find");
    }
    catch {
        resp.json("Error while processing")
    }
}
module.exports = {
    scannedCduty: scannedCduty
};