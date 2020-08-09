'use strict';

const Service = require('egg').Service;
const JWT = require('jsonwebtoken');
const moment = require('moment');

class UserService extends Service {

  /**
   * 登陆
   * @param {*} loginMsg
   */
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
        message: '用户不存在，请注册后登陆',
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
        }, this.config.jwt.secret, {
          expiresIn: 60 * 60 * 12,
        });
        result = {
          code: 200,
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
   * 注册
   * @param {*} loginMsg
   */
  async register (loginMsg) {
    const { app } = this;
    let result = {};
    const register_date = moment(new Date(), 'YYYY-MM-DD HH:mm:ss').valueOf();
    const sql = `insert into user (username, password, register_date) values ('${loginMsg.username}', '${loginMsg.password}', '${register_date}')`;
    const res = await app.mysql.query(sql);
    if (res.affectedRows === 1) {
      result = {
        code: 200,
        data: res,
      };
    } else {
      result = {
        code: 500,
        message: '注册失败',
        data: null,
      };
    }
    return result;
  }

  /**
 * 列表
 * @param {*} params
 */
  async lists (currentPage = 1, pageSize = 6, order, prop) {
    const { app } = this;
    try {
      let sql = 'select * from user where 1=1 ';
      const sql2 = 'SELECT count(*) as total from user where 1=1 ';
      if (order && prop) {
        const order1 = order === 'descending' ? 'DESC' : 'ASC';
        sql += `order by ${prop} ${order1} `;
      } else {
        sql += 'order by created_date DESC ';
      }
      sql += `limit ${(currentPage - 1) * pageSize}, ${pageSize}`;
      const data = await app.mysql.query(sql);
      const total = await app.mysql.query(sql2);
      if (data.length > 0) {
        return {
          code: 200,
          data: {
            data,
            total: total[0].total,
          },
        };
      }
      return {
        code: 200,
        data: [],
      };
    } catch (e) {
      return null;
    }
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
