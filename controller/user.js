/**
 * @deprecated user controller
 * @author keven
 */

const {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser
} = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { 
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo,
  deleteUserFailInfo,
  changeInfoFailInfo
} = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')

/**
 * 用户名是否存在
 * @param {string} userName 用户名
 */
async function isExist(userName) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // { errno: 0, data: {....} }
    return new SuccessModel(userInfo)
  } else {
    // { errno: 10003, message: '用户名未存在' }
    return new ErrorModel(registerUserNameNotExistInfo)
  }
}

/**
 * 
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 密码 (1-男 2-女 3-保密)
 */
async function register({ userName, password, gender }) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // 用户名已存在
    return ErrorModel(registerUserNameExistInfo)
  }

  try {
    await createUser({
      userName,
      password: doCrypto(password),
      gender
    })
    return new SuccessModel()
  } catch (ex) {
    console.error(ex.message, ex.stack)
    return new ErrorModel(registerFailInfo)
  }
}

/**
 * 登录
 * @param { Object } ctx koa2 ctx
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function login(ctx, userName, password) {
  // 登录成功 ctx.session.userInfo = xxx

  // 获取用户信息
  const userInfo = await getUserInfo(userName, doCrypto(password))
  if (!userInfo) {
    // 登录失败
    return new ErrorModel(loginFailInfo)
  }

  // 登录成功
  if (ctx.session.userInfo == null) {
    ctx.session.userInfo = userInfo
  }
  return new SuccessModel()
}

/**
 * 
 * @param {string} userName 用户名
 */
async function deleteCurUser(userName) {
  const result = await deleteUser(userName)
  if (result) {
    // 成功
    return new SuccessModel()
  }
  // 失败
  return new ErrorModel(deleteUserFailInfo)
}

/**
 * 修改个人信息
 * @param {Object} ctx ctx
 * @param {string} nickName 昵称
 * @param {string} city 城市 
 * @param {string} picture 头像
 */
async function changeInfo(ctx, { nickName, city, picture }) {
  const { userName } = ctx.session.userInfo
  if (!nickName) {
    nickName = userName
  }

  // service
  const result = await updateUser(
    {
      newNickName: nickName,
      newCity: city,
      newPicture: picture
    },
    { userName }
  )

  if (result) {
    // 执行成功
    Object.assign(ctx.session.userInfo, {
      nickName,
      city,
      picture
    })
    // 返回
    return new SuccessModel()
  }

  // 失败
  return new ErrorModel(changeInfoFailInfo)
}

module.exports = {
  isExist,
  register,
  login,
  deleteCurUser,
  changeInfo
}

