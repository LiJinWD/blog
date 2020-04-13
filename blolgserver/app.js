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
const jwt = require('jsonwebtoken');

// 开放静态资源
app.use(express.static(path.join(__dirname, 'public')));
// session配置
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
// 处理post参数
app.use(formidableMiddleware({
	// 文件上传目录
	uploadDir: path.join(__dirname, 'public', 'blogweb','src','uploads'),
	// 最大上传文件为2M
	maxFileSize: 6 * 1024 * 1024,
	// 保留文件扩展名
	keepExtensions: true
}));

// 数据库连接
// 如果报错用这个: mongodb://itcast:itcast@132.232.216.199:27017/alibaixiu
mongoose.connect('mongodb://itcast:itcast@localhost:27017/alibaixiu', { useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true})
	.then(() => console.log('数据库连接成功'))
	.catch((err) => console.log('数据库连接失败' + err));

// 路由 传递给路由的aPP参数
// 跨域
app.all('*', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:8080");
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Token, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");
	if (req.method == 'OPTIONS') res.send(200)
	/*让options请求快速返回*/ else next()
})
	// 其他
	// 用户登录
app.use((req, res, next) => {
	/* const url = ['/login', '/index', '/detail/:id', '/list/:id']
	/* console.log(url.some(item => req.url == item));
	if (url.some(item => req.url == item)) return next(); 
	console.log(req.url); */
	
	if (req.url == '/login') return next();
	jwt.verify(req.headers.authorization, 'token', (err, data) => {
		if (err) res.status(401).send('无效token');
		next()
	})
})
require('./routes')(app);
// 返回系统监听
app.listen(3000, () => console.log('服务器启动成功'));
