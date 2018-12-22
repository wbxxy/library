//逻辑层模块
let data = require('./data.json');
const fs = require('fs');
const path = require('path');

/*
获得data中最大的id
	1. 箭头函数赋名
	2. data.forEach(回调函数)
	3. Math函数
 */
let maxId = () => {
	let arr = [];
	data.forEach((item)=>{
		arr.push(item.id);
	});
	return Math.max.apply(null, arr);
}





function index(req, res){
	res.render('list', {list : data});
	/*
		res.render('list', data)也可以 

		-> {list: data}相当于扩充json

		-> [data] --> {list: [data]}

		-> 由此说明render使用json和对象都可以
	 */
}
//exports.functionName用于return方法
exports.showIndex = index;
/*
或者箭头/匿名函数
exports.showIndex = (req, res) => {
	res.render('list', {list : data});
}
 */





//1. 重定向到添加界面
exports.toAddBook = (req, res) => {
	res.render('addBook', {});
}
//2. 执行添加书本逻辑
exports.addBook = (req, res) => {
	//post通过第三方body-parser获得post参数
	let info = req.body;

	//向data添加用户数据, key值的使用
	let book = {};
	for(let key in info){
		book[key] = info[key];
	}
	book["id"] = maxId() + 1;
	data.push(book);

	//重写json, 数据没有操作到文件实体里, 这里需要文件操作
	fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(data), (err)=>{
		if(err) res.send('error');
		res.redirect('/');
	});
}







//3. 修改页面
exports.toUpdateBook = (req, res) => {
	let id = req.query.id;
	let book = {};
	data.forEach((item)=>{
		if(item.id == id){
			book = item;
			return;
			//break不行,因为这是箭头函数,return才是跳出函数
		}
	});
	res.render('updateBook', book);
}
//4. 修改逻辑
exports.updateBook = (req, res) => {
	let info = req.body;
	data.forEach((item)=>{
		if(item.id == info.id){
			for(let key in info){
				item[key] = info[key];
			}
			return;
		}
	});
	fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(data), (err)=>{
		if(err) res.send('error');
		res.redirect('/');
	});
}

//5. 删除逻辑
exports.deleteBook = (req, res) => {
	let id = req.query.id;
	data.forEach((item, i)=>{
		if(item.id == id){
			data.splice(i, 1);
		}
	});
	fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(data), (err)=>{
		if(err) res.send('error');
		res.redirect('/');
	});
}