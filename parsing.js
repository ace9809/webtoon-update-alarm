var request = require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var fs = require("fs");
var url = "http://comic.naver.com/webtoon/weekday.nhn";
var toonObj = {};
var tmp = '';
var tmp2 = '';
var title1, title2, list;
console.log(url);
request(url, function(error, response, body) {
  if (error) throw error;
  var $ = cheerio.load(body);
  $("#content").find(".title").each(function (i) {
    list = $(this);
    title1 = 'http://comic.naver.com' + list.attr('href');
    title2 = list.attr("title");
    tmp += title2;
    tmp2 += title1;
    // console.log(title1);
    request(title1, function(error, response, body) {
      if (error) throw error;
      var $ = cheerio.load(body);
      var titlename = $("#content").find('.title').each(function (i) {
        list2 = $(this);
        last_title = list2.first().text();
        console.log(title2);
        console.log(last_title);
        // fs.writeFileSync('test.txt', tmp2, 'utf8');
      })
    })
    // console.log(JSON.stringify({title : title2}));
  });

  });


// var request = require("request");
// var cheerio = require("cheerio");
// var mongoose = require("mongoose");
// var fs = require("fs");
// var url = "http://comic.naver.com/webtoon/weekday.nhn";
// var toonObj = {};
// var title1, title2, list;
// console.log(url);
// request(url, function(error, response, body) {
//   if (error) throw error;
//   var $ = cheerio.load(body);
//   $("#content").find(".title").each(function (number) {
//     list = $(this);
//     title1 = 'http://comic.naver.com'+list.attr('href');
//     title2 = list.attr("title");
//     fs.writeFileSync('test.txt', title2, 'utf8');
//     // console.log(title1);
//     // console.log(title2);
//     request(title1, function(error, response, body) {
//       if (error) throw error;
//       // console.log(title1);
//       var $ = cheerio.load(body);
//       var titlename = $("#content").find('.title').each(function (i) {
//         list2 = $(this);
//         titlename2 = list2.find("a").first().text();
//         console.log(titlename2);
//
//       })
//     })
//   });
// });