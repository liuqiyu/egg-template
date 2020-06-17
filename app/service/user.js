'use strict';

const Service = require('egg').Service;
const JWT = require('jsonwebtoken');

class UserService extends Service {

  async login (loginMsg) {
    const { app } = this;
    let result;
    // 在当前数据库中验证此用户思否存在
    const queryResult = await app.mysql.select('user', {
      where: {
        username: loginMsg.username,
      },
    });
    if (queryResult.length <= 0) {
      result = {
        code: 500,
        message: '用户不存在，请联系管理员',
        data: null,
      };
    } else {
      if (loginMsg.password !== queryResult[0].password) {
        result = {
          code: 500,
          message: '密码错误',
          data: null,
        };
      } else {
        // 签发token
        const token = JWT.sign({
          username: queryResult[0].username,
        },
          this.config.jwt.secret, {
          expiresIn: 60 * 60 * 12,
        });
        result = {
          code: 200,
          message: 'success',
          data: {
            info: {
              id: queryResult[0].id,
              username: queryResult[0].username,
              created_date: queryResult[0].created_date,
              role_id: queryResult[0].role_id,
            },
            token,
          },
        };
      }
    }
    return result;
  }

  /**
   * 详情
   * @param {*} params
   */
  async detail (id) {
    const { app } = this;
    try {
      let result = {};
      const res = await app.mysql.get('user', {
        id,
      });
      if (res) {
        result = {
          status: 200,
          data: res,
          message: '查询成功',
        };
      } else {
        result = {
          status: 500,
          data: null,
          message: '查询失败',
        };
      }
      return result;
    } catch (e) {
      return null;
    }
  }
}

module.exports = UserService;
