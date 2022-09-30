const http = require("http");
const fs = require("fs");
const  minimist = require('minimist');
const { argv } = require("process");

var port = 3000;
var args =  minimist(process.argv.slice(2));
if(args.port != undefined)
    port = args.port;

// console.log("PORT:::" + port);

let homeContent = "";
let projectContent = "";
let registrarionContent = "";

fs.readFile("home.html", (err, home)=>{
    if(err){
        throw err;
    }
    homeContent=home;
});
fs.readFile("project.html", (err,project)=>{
    if(err) {
        throw err;
    }
    projectContent = project;
});
fs.readFile("registration.html", (err,registration)=>{
    if(err) {
        throw err;
    }
    registrarionContent=registration;
});

http.createServer((request,response)=>{
        let url = request.url;
        response.writeHeader(200, { "Content-Type":"text/html" });
        switch(url){
            case "/registration":
              response.write(registrarionContent);
              response.end();
              break;
            case "/project":
              response.write(projectContent);
             response.end();
              break;
            default:
            response.write(homeContent);
            response.end();
            break;
        }
    }).listen(port);