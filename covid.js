let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio");
//console.log("Before");
let count=0;
let data=[];
request("https://www.mygov.in/covid-19/ ", function(err, res, html){
    if(err===null && res.statusCode===200){
        parseHtml(html);
        //handleMatch(html);
    }else if(res.statusCode===404){
        console.log("Invalid URL");
    }else{
        console.log(err);
        console.log(res.statusCode);
    }
})
function parseHtml(html){
    let ch = cheerio.load(html);
    let states = ch(".views-row");
    for(let i=0;i<states.length;i++){
        let name = ch(states[i]).find(".st_name").html();
        let number = ch(states[i]).find(".st_number").html();
        let confirmed = ch(states[i]).find(".tick-confirmed small").html();
        let active = ch(states[i]).find(".tick-active small").html();
        let recovered = ch(states[i]).find(".tick-discharged small").html();
        let diseased = ch(states[i]).find(".tick-death small").html();
        let obj = {
            Name:name,
            Confirmed:confirmed,
            Active:active,
            Recovered:recovered,
            Diseased:diseased
        }
        data.push(obj);
    }
    console.table(data);
}
