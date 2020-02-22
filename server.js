// server.js
// where your node app starts

// init project
const express = require("express");
const HTMLParser = require('node-html-parser');
const app = express();
const uTool = require('./utility.js');

const getHokkienPron = uTool.getHokkienPron;
const getMiddlePron = uTool.getMiddlePron
const axios = require('axios');
//just for test
var w = '中'
var reg = /\/\*\*\/\((.*)\)/
const baseURL = 'http://en.wiktionary.org';
//let st = new Date().getTime(); 

//解析返回的数据
/*
function parseWiki(json,cb){
  const root = HTMLParser.parse(json)
  //获取所有中文发音
  cb(root)
}
*/
  //let et = new Date().getTime();
  //console.log(et-st)

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/middle/:hanchar", function(request, response) {

    // 将userId转换为整型
    var word = request.params.hanchar
    console.log(word)
    // Make a request
    var render = axios.get(baseURL+'/w/api.php?action=parse&format=json&prop=text|revid|displaytitle&callback=?&page='+word)
      .then(function (response) {
      // handle success
      let json = reg.exec(response.data)[1]
      //Html
      let parse = JSON.parse(json).parse.text['*']
      //console.log(w)
      let root = HTMLParser.parse(parse)
      const res = getMiddlePron(root)
      return res
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        return('OOOOOOps!Something wrong happend!')
      })
      render.then(res=>response.send('<html lang="zh-TW">'+res+'</html>'))
    // ...
});

app.get("/dialect/:hanchar", function(request, response) {

    // 将userId转换为整型
    var word = request.params.hanchar
    console.log(word)
    // Make a request
    var render = axios.get(baseURL+'/w/api.php?action=parse&format=json&prop=text|revid|displaytitle&callback=?&page='+word)
      .then(function (response) {
      // handle success
      let json = reg.exec(response.data)[1]
      //Html
      let parse = JSON.parse(json).parse.text['*']
      //console.log(w)
      let root = HTMLParser.parse(parse)
      const res = getHokkienPron(root)
      return '<h1>'+decodeURI(word)+'</h1>'+res
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        return('OOOOOOps!Something wrong happend!')
      })
      render.then(res=>response.send('<html lang="zh-TW">'+res+'</html>'))
    // ...
});
// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});



