/**
 * Created by apple on 17/2/18.
 */
// 引入核心模块
const http = require('http');
// 应用URL解析URL参数
const url = require('url');
// 读写文件
const fs = require('fs');

const querystring = require('querystring');
// 创建http服务器
http.createServer((req,res) => {
    // 一定是个对象
    // true urlObj的query也会是个对象，否则就是一个字符串
    // username=node&password=123 -> {username:'node',passworld:'123'}

    let urlObj = url.parse(req.url, true);

    let pathname = urlObj.pathname;

    if (pathname == '/') {
        fs.readFile('./index.html', 'utf8', (err, data) => {
            res.end(data);
        })
    } else if (pathname == '/reg') {
        let result = '';

        req.on('data', (data) => {
            result += data;
        } );

        req.on('end', (data) => {
            let obj = querystring.parse(result);
            console.log(obj);
            res.end('ok');
        })
    }



}).listen(8080);