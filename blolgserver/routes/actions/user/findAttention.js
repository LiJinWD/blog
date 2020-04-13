// 验证模块
const Joi = require('joi');
// 用户模块
const { User } = require('../../../model/User');

module.exports = async (req, res) => {
    // 获取用户id
    const idList = req.params['id'].split('-');

    // 验证模型
    const schema = Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('用户id不符合格式'));
    // 验证
    for (const item of idList) {
        // 验证
        let { error } = Joi.validate(item, schema);
        // 数据格式没有通过验证
        if (error) return res.status(400).send({ message: error.message });
    }
    // 通过验证
    const result = [];
    for (const item of idList) {
        // 查询用户信息
        let user = await User.findById(item).select('-password');
        // 将删除的用户存储在数组中
        result.push(user);
    }

    return res.send(result);

};