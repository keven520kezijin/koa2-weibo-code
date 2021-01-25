const { User } = require('../db/model/index')

/**
 * 获取用户信息
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function getUserInfo(userName, password) {
    // 查询条件
    const wheraOpt = {
        userName
    }
    if (password) {
        Object.assign(wheraOpt, { password })
    }

    // 查询
    const result = await User.findOne({
        attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
        where: wheraOpt
    })
    if (result == null) {
        // 未找到
        return result
    }

    return result.dataValues
}

module.exports = {
    getUserInfo
}
