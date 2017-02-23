var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");
var request_sync = require('sync-request');

request("http://comic.naver.com/webtoon/weekday.nhn", function(error, response, body) {
  // console.log(JSON.stringify(testJson));
  // console.log(testJson[1].no);
  // testJson.name = "test";
  // console.log(JSON.stringify(testJson));
  var webtoonCollection = [];
  if (error) throw error;
  var $ = cheerio.load(body);
  $("#content").find(".title").each(function (i) {
    webtoon_list = $(this);
    var link = 'http://comic.naver.com' + webtoon_list.attr('href'); //웹툰 메인홈에서 가져온 title값이 들어
    var title = webtoon_list.attr("title"); //웹툰 메인홈에서 제목 가져옴
    console.log(title);
    var res = request_sync('GET', link, {
      'headers': {
        'user-agent': 'example-user-agent'
      }}); //request_sync로  link가 each문을 나가면 마지막 값만 출력되는 걸 막아줌
    var episodes = cheerio.load(res.getBody());
    episodes(".title").find("a").first().each(function (i) {
      noId = episodes(this).attr("href");
      urlSplit = noId.split("&");
      urlSplit2 = urlSplit[1].split("="); //urlSplit2에 들어오는 값: noid값
      // detailLink = 'http://comic.naver.com' + noId;
    })

    // request(detailLink, function(error, response, body) {
    //   console.log(response.statusCode);
    // }) 디테일 링크 응답코드
    var webtoonObj = new Object();
    webtoonObj.link = link;
    webtoonObj.title = title;
    webtoonObj.no = urlSplit2[1];
    webtoonCollection.push(webtoonObj);
    jsonInfo = JSON.stringify(webtoonCollection); //객체만든것들을 배열에다 집어넣은뒤 json형식으로 변환
    // var fileState = fs.statSync('./test.json');
    // var testJson = require("./test.json");
    // console.log(testJson[i].no);
    fs.stat('./test.json', function (err) {
      if (err) {
        fs.writeFileSync('test.json', jsonInfo, 'utf8', 'w');
      }
      else {
        var testJson = require("./test.json");
        if(webtoonCollection[i].no !== testJson[i].no)
        {

          console.log(title);
          console.log(webtoonCollection[i].no);
          console.log("전에id:" + testJson[i].no + "새로가져온 id :"+ webtoonCollection[i].no);
          console.log("출력");
          fs.writeFileSync('test.json', jsonInfo, 'utf8');
        }
        else {
          console.log(webtoonCollection[i].no);
          console.log("같음");
          console.log(title);
          console.log("전에id:" + testJson[i].no + "새로가져온 id :"+ webtoonCollection[i].no);
        }
      }
    }) //파일상태를 확인한후 현재 디렉토리에 test.json파일이 없으면 세션이 끊어지는 에러가 생기는데 그 에러가 생겼을 시 test.json을 만든다 만약 파일이 확인되서 에러가 나지 않았을 경우에 test.json을 불러온뒤 webtoonCollection에 있는 no값과 json파일에 저장되어 있는 no값을 비교해 다르면 jsonInfo파일을 저장 같으면 그냥 무시


    // console.log(webtoonJson);
    // episodes(".detail").find(".wrt_nm").e이ach(function (i) {
    //   console.log("작가 : " + episodes(this).text().trim());
    // }); 작가 이름 나오게

  });
});

