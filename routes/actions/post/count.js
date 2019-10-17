const { Post } = require('../../../model/Post');

module.exports = async (req, res) => {
	// 查询所有文章数量
	const postCount = await Post.count();
	const draftCount = await Post.count({ state: 0 });
	// 响应
	res.send({ postCount, draftCount });
}