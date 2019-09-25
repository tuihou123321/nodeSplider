/*
 * @Author: ecitlm
 * @Date:   2017-11-30 22:40:46
 * @Last Modified by: ecitlm
 * @Last Modified time: 2018-06-29 22:20:14
 */
const express = require('express')
const cheerio = require('cheerio')
const app = express()
const request = require('request')
const Iconv = require('iconv-lite')

let pageSize=20;
let page=0;

function regx (str) {
  const reg = /\/([^/]+)\.html/
  if (reg.test(str)) {
    return RegExp.$1
  }
}

function getObj($){
  let links=[];
  $('.vT-srch-result-list-bid>li').each(function (i,v) {
    let objV=$(v).find('a');
    console.log(objV);
    let tmp = {
      // id: pageSize*page+i+1,
      url:objV.attr('href'),
      titles: $(objV).text().trim()
    }
    links.push(tmp)
  })
  return links;
}

function getUrl(){
    return `http://search.ccgp.gov.cn/bxsearch?searchtype=2&page_index=${page+1}&bidSort=0&buyerName=&projectId=&pinMu=0&bidType=0&dbselect=bidx&kw=%E5%BF%83%E7%90%86+%E5%92%A8%E8%AF%A2&start_time=2019%3A06%3A16&end_time=2019%3A09%3A16&timeType=4&displayZone=&zoneId=&pppStatus=0`
}

function list (req, res) {
  let url=getUrl()
  console.log(url)
  request(
    {
      url: url,
      encoding: null
    },
    function (error, response, body) {
      if (response && response.statusCode === 200) {
        body = Iconv.decode(body, 'utf-8')
        let $ = cheerio.load(body)
        let lists=getObj($);
        res.send({
          code: 200,
          data: {
            lists,
            page,
            pageSize
          },
          msg: ''
        })
      } else {
        console.log(error)
        res.send({
          code: 404,
          msg: '网络好像有点问题'
        })
      }
    }
  )
}

app.get('/', function (req, res) {
   page=req.query.page || 1;
   list(req, res)
})
module.exports = app
