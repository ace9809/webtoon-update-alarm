var request = require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var fs = require("fs");
var request_sync = require('sync-request');
var url = "http://comic.naver.com/webtoon/weekday.nhn";
var noId,urlSplit,webtoonJson;
var webtoonCollection = [];

request(url, function(error, response, body) {
  if (error) throw error;
  var $ = cheerio.load(body);
  $("#content").find(".title").each(function (i) {
    webtoon_list = $(this);
    var link = 'http://comic.naver.com' + webtoon_list.attr('href');
    var title = webtoon_list.attr("title");

    // console.log("제목 : " + title);
    // console.log("리스트 링크 : " + link);
    var res = request_sync('GET', link, {
      'headers': {
        'user-agent': 'example-user-agent'
      }});
    var episodes = cheerio.load(res.getBody());
    episodes(".title").find("a").first().each(function (i) {
      noId = episodes(this).attr("href");
      urlSplit = noId.split("&");
      // console.log(urlSplit[1]);
    })
    Obj = {
      링크 : link,
      제목 : title,
      만화id : urlSplit[1]
    }
    webtoonJson = JSON.stringify(Obj);
    webtoonCollection.push(webtoonJson);
    console.log(webtoonCollection);
    // console.log(webtoonJson);
    fs.writeFileSync('test.txt', webtoonCollection, 'utf8');
    // console.log(webtoonJson);
    // episodes(".detail").find(".wrt_nm").each(function (i) {
    //   console.log("작가 : " + episodes(this).text().trim());
    // }); 작가 이름 나오게

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