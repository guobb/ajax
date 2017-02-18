/**
 * Created by apple on 17/2/18.
 */
// 引入核心模块
const http = require('http');
// 应用URL解析URL参数
const url = require('url');
// 读写文件
const fs = require('fs');

const formidable = require('formidable');

const querystring = require('querystring');

const util = require('util');

const mime = require('mime');
// 创建http服务器
// 只有当提交form表单并且是get, 浏览器才会把表单进行序列化拼到URL后面
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
            // 取出请求体的内容类型
            let contentType = req.headers['content-type'];
            // 如果请求体发过来的是序列化表单
            if(contentType == 'application/x-www-form-urlencoded' ) {

                // 把查询字符串转成对象
                let obj = querystring.parse(result);
            } else if (contentType == 'application/json') {
                let obj = JSON.parse(result);
            }


            console.log(obj);
            // 发送响应
            res.end('ok');
        })
    } else if (pathname == '/reg2') {
        // 构建一个解析器
        let form = new formidable.IncomingForm();
        /**
         *  用解析器解析请求体
         *  把非file的input放在fileds里
         *  把文件类型的元素放在files里
         */
        form.parse(req, function(err, fields, files) {

            fs.readFile(files.avatar.path, (err, data) => {
                let filename = '/images/'+ files.avatar.name;
                fs.writeFile('.'+filename, data,(err) => {
                    res.writeHead(200, {'content-type': 'text/plain'});
                    res.end(filename);

                })
            });
        });
    } else {
        fs.exists('.'+pathname, (exists) => {
            if (exists) {
                // 从文件名中获取文件的Content-Type
                res.setHeader('Content-Type', mime.lookup(pathhame));
                fs.readFile('.'+pathname, (err, data) => {
                    res.end(data);
                })
            } else {
                res.statusCode = 404;
                res.end('404');
            }
        } )
    }



}).listen(8080);