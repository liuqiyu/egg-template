'use strict';

const Service = require('egg').Service;

class ProjectService extends Service {
  /**
 * 列表
 */
  async lists () {
    const { app } = this;
    try {
      let result = {};
      const res = await app.mysql.select('project');
      result = {
        code: 200,
        message: 'success',
        data: res,
      };
      return result;
    } catch (e) {
      return {
        code: 500,
        message: 'error',
      };
    }
  }
}

module.exports = ProjectService;
