const express = require('express');
const router = express.Router();
const service = require('./service.js');

router.get('/', service.showIndex);
/*
	exports.showIndex = (res, req) => {}
	所以代码就等于:
	router.get('/', (res, req)=>{});
	只是把箭头函数移到外面,这样就做到了路由

*/
router.get('/add', service.toAddBook);
router.post('/addBook', service.addBook);



router.get('/update', service.toUpdateBook);
router.post('/updateBook', service.updateBook);









module.exports = router;
//module.exports用于return类;