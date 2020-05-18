'use strict';
const Controller = require('egg').Controller;

class ProjectController extends Controller {
  /**
 * 列表
 */
  async lists () {
    const { ctx, service } = this;
    const res = await service.project.lists();
    ctx.body = res;
  }
}

module.exports = ProjectController;
