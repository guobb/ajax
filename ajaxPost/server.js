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
        // 读取文件内容
        fs.readFile('./index.html', 'utf8', (err, data) => {
            res.end(data);
        })
    } else if (pathname == '/reg') {
        let result = '';
        // 当读到客户端提交过来的数据时会触发data事件，然后调用回调函数
        req.on('data', (data) => {
            result += data;
        } );

        req.on('end', (data) => {
            // 把查询字符串转成对象
            let obj = querystring.parse(result);
            console.log(obj);
            // 发送响应
            res.end('ok');
        })
    }



}).listen(8080);