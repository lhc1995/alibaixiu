// 引入express框架
const express = require('express');
// 引入数据库处理模块
const mongoose = require('mongoose');
// 引入路径处理模块
const path = require('path');
// 引入session模块
var session = require('express-session');
// 处理文件上传
const formidableMiddleware = require('express-formidable');
// web服务器
const app = express();
// 开放静态资源
app.use(express.static(path.join(__dirname, 'public')));
// session配置
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 // 设置cookie有效期是1天
	},
}));
app.use(function (req, res, next) {
	req.session._garbage = Date();
	req.session.touch();
	next();
});
// 处理post参数
app.use(formidableMiddleware({
	// 文件上传目录
	uploadDir: path.join(__dirname, 'public', 'uploads'),
	// 最大上传文件为2G
	maxFileSize: 2048 * 1024 * 1024,
	// 保留文件扩展名
	keepExtensions: true
}));

//未加密版 数据库连接
// mongoose.connect('mongodb://localhost:27017/alibaixiu', { useNewUrlParser: true, useCreateIndex: true})
// 	.then(() => console.log('数据库连接成功'))
// 	.catch(() => console.log('数据库连接失败'));


//加密版 数据库连接
mongoose.connect('mongodb://itcast:itcast@localhost:27017/alibaixiu', {})
	.then(() => console.log('数据库连接成功'))
	.catch(() => console.log('数据库连接失败'));

// 路由
require('./routes')(app);

// 返回系统监听
app.listen(3000, () => console.log('服务器启动成功'));
