/*
	1. 模版
 */

//----------1. npm init -y初始化, 导包
const express = require('express');
const path = require('path');
const template = require('art-template');
const parser = require('body-parser');

//----------2. 初始化静态资源和动态资源
//动态资源
const app = express();

//静态资源绑定文件夹路径
app.set('views', path.join(__dirname, '../views'));
//静态资源绑定文件后缀art
app.set('view engine', 'art');
//兼容处理art文件后缀的文件
app.engine('art', require('express-art-template'));


//----------3. 路由请求
app.get('/list', (req, res)=>{
	//M: 数据data
	let data = {
		title: 'wbx',
		list: ['123', '456']
	}
	//VM: 中间件render
	res.render('list', data);//V: 视图list
});

//----------4. 监听端口
app.listen(3000, ()=>{
	console.log('running...');
});