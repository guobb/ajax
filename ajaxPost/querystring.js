/**
 * Created by apple on 17/2/18.
 */
 const querystring = require('querystring');

 let s = 'name=react&age=8';
 // 把查询字符串转化成对象
 const qs = querystring.parse(s);
 // 把对象转化成查询字符串
 const sq = querystring.stringify(qs);
 console.log(qs);
 console.log(sq);