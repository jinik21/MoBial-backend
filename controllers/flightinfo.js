var axios = require("axios").default;
const getFlightInfo=async (req,resp,access_key)=>{
    var iata=req.body.flight;
    var departure=req.body.departure;
    var url="http://api.aviationstack.com/v1/flights?access_key="+access_key+"&flight_iata="+iata;
    var options = {
        method: 'GET',
        url: url,
        headers: {
            'Content-Type': 'application/json'
          }
      };
  try{  await axios.request(options).then(function (response) {
    var data=response.data.data;
    var chk=0;
    var it;
    data.forEach(function (item) {
        if(item['departure']['scheduled']==departure)
        {
            chk=1;
        it=item;
        }
    });
    if(chk==1)
        return resp.json(it);
    else 
        return resp.json("Can't Find");

}).catch(function (error) {
	console.error(error);
    return resp.json("error")
});
}
catch{
  resp.json("Error while processing")
}
}


module.exports={
    getFlightInfo:getFlightInfo
  };
  