const { Category } = require('../../../model/Category');

module.exports = async (req, res) => {
	// 查询所有文章数量
	const categoryCount = await Category.count();
	// 响应
	res.send({categoryCount});
}