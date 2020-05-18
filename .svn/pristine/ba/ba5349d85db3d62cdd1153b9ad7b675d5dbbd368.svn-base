'use strict';
const Controller = require('egg').Controller;

class UserController extends Controller {
  /**
   * 登录
   */
  async login () {
    const { ctx, service } = this;
    const rule = {
      username: { type: 'string', required: true, message: '必填项' },
      password: { type: 'string', required: true, message: '必填项' },
    };
    const loginMsg = ctx.request.body;
    await ctx.validate(rule, loginMsg); // 验证登陆信息是否合法
    // 为当前输入的密码加密
    // loginMsg.password = ctx.helper.encrypt(loginMsg.password);
    // 从service文件中拿到返回结果
    const result = await service.user.login(loginMsg);
    ctx.body = result;
  }

  /**
   * 注销
   */

  async logout () {

  }
}

module.exports = UserController;
