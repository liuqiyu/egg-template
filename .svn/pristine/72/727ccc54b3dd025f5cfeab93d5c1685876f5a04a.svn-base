'use strict';
const Controller = require('egg').Controller;

class FormModuleController extends Controller {
  /**
   * 创建
   */
  async create () {
    const { ctx, service } = this;
    const name = ctx.request.body.name;
    const project_id = ctx.request.body.project_id;
    const res = await service.formModule.create(name, project_id);
    ctx.body = res;
  }

  /**
 * 列表
 */
  async lists () {
    const { ctx, service } = this;
    const project_id = ctx.request.body.project_id;
    const res = await service.formModule.lists(project_id);
    ctx.body = res;
  }

  /**
   * 删除
   */
  async delete () {
    const { ctx, service } = this;
    const id = ctx.request.body.id;
    const res = await service.formModule.delete(id);
    ctx.body = res;
  }
}

module.exports = FormModuleController;
