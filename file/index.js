/**
 * Created by apple on 17/2/18.
 */
window.onload = () => {
    // 先注册监听
    document.querySelector('#regBtn').addEventListener('click',() => {

        const xhr = new XMLHttpRequest();

        xhr.open("POST",'/reg2',true);

        // 设置响应类型
        xhr.responseType = 'text';

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log(xhr.responseText);
                // 把上传的图片显示出来
                // 1. 在服务器端，把files里的avatar里的path读取出来, 复制到images目录下；

                // 2. 把此图片路径返回浏览器端

                // 3. 浏览器端构建一个img元素，追加到body，并且指定img的src属性

                // 4. 服务端端可以接受客户端发出的请求图片的请求，返回图片的内容
                let img = document.createElement('img');
                img.src = xhr.responseText;
                document.body.appendChild(img);

            }
        };

        // 准备发送给服务器的数据
        let formDate = new FormData();

        // 给表单这个表单对象增加一个表单元素
        formDate.append('username', document.querySelector('input[name=username]').value);
        // 给表单这个表单对象增加一个表单元素
        formDate.append('possword', document.querySelector('input[name=password]').value);

        let avatar = document.querySelector('input[name=avatar]');
        formDate.append('avatar',avatar.files[0]);

        xhr.end(formDate);
        return false;
    })
};