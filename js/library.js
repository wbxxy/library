/*
	1. 模版
 */

//----------1. npm init -y初始化, 导包
const express = require('express');
const path = require('path');
const template = require('art-template');
const parser = require('body-parser');
const router = require('./router.js');

//----------2. 初始化静态资源和动态资源
//动态资源服务
const app = express();

//静态资源服务
app.use(express.static(path.join(__dirname, '../public')));
//静态资源绑定文件夹路径
app.set('views', path.join(__dirname, '../views'));
//静态资源绑定文件后缀art
app.set('view engine', 'art');
//兼容处理art文件后缀的文件
app.engine('art', require('express-art-template'));


//----------3. 路由请求
//post请求参数处理
app.use(parser.urlencoded({extended: false}));
app.use(parser.json());

app.use(router);


//----------4. 逻辑处理

//----------5. 监听端口
app.listen(3000, ()=>{
	console.log('running...');
});