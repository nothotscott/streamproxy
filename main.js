var express = require("express")
var fetch = require("node-fetch")
var https = require("https")
var fs = require("fs")

var key = fs.readFileSync("privkey.pem", "utf8");
var cert = fs.readFileSync("cert.pem", "utf8");


var app = express()
app.get("/", (req, res) => {
	fetch("http://localhost:8080").then(r => r.body).then(s => {
		res.append("Access-Control-Allow-Origin", "*")
		s.pipe(res)
	}).catch(e => {
		res.status(500).send("Error.")
	})
})

var httpsServer = https.createServer({key: key, cert: cert}, app);
httpsServer.listen(10443);
console.log("Started stream proxy")