var express  = require('express');
var app = express();
var cors = require('cors');
var unirest = require("unirest");

var req = unirest("GET", "https://football-prediction-api.p.rapidapi.com/api/v2/predictions");
var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

var date = [year, month, day].join('-');
console.log(date)
req.query({
	"iso_date": date,
	"market": "classic",
	"federation": "UEFA"
});
app.use(cors());

app.get('', (reqs,ress) => {
  console.log('client connected successfully');
  req.headers({
	"x-rapidapi-key": "d8ad551b48msh75b3c2b6967e1e9p19ea2ajsn5ea7ac0aa1b1",
	"x-rapidapi-host": "football-prediction-api.p.rapidapi.com",
	"useQueryString": true
});
req.end(function (res) {
    if (res.error) throw new Error(res.error);
    ress.send(res.body);
});
})
app.listen(process.env.PORT||3030, () => {
    console.log('server listening at port 3000')
})
