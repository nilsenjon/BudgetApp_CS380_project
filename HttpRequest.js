var localURL = "http://192.168.1.52/api/"
var remoteURL = "http://jacobjonesdev.com/api/";


//PARAMETERS:
//1) verb (string) GET, POST, DELETE, PUT
//2) route (string) user,
//3) jsonInput: json object input paramters for the request
//RETURNS: a json object of the response
function request(verb, route, jsonInput){
    const url = localURL.concat(route);
    const param={
        headers:{
        "content-type":"application/json; charset=UTF-8"
        },
        body:JSON.stringify(jsonInput),
        method:verb
    };
    return fetch(url,param)
    .then(data=>{return data.json()})
    //.then(res=>{console.log(res)})
    //.catch(error=>console.log(error))
}