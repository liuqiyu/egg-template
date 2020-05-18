'use strict';
const moment = require('moment');
const Controller = require('egg').Controller;

class FormController extends Controller {
  /**
   * 创建
   */
  async create() {
    const { ctx, service } = this;
    const title = ctx.request.body.title || '';
    const content = ctx.request.body.content || '';
    const image = ctx.request.body.image || '';
    const module_id = Number(ctx.request.body.module_id) || null;
    const created_date = moment(new Date(), 'YYYY-MM-DD HH:mm:ss').valueOf();
    const res = await service.form.create(title, content, image, module_id, created_date);
    ctx.body = res;
  }

  /**
   * 列表
   */
  async lists() {
    const { ctx, service } = this;
    const body = ctx.request.body;
    const currentPage = body.currentPage;
    const pageSize = body.pageSize;
    const module_id = body.module_id;
    const project_id = body.project_id;
    const order = body.order;
    const prop = body.prop;

    const res = await service.form.lists(module_id, project_id, currentPage, pageSize, order, prop);
    ctx.body = res;
  }

  /**
   * 更新
   */
  async update() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const id = data.id;
    const title = data.title || '';
    const content = data.content || '';
    const image = data.image || '';
    const module_id = data.module_id || null;
    const res = await service.form.update(id, title, content, image, module_id);
    ctx.body = res;
  }

  /**
   * 详情
   */
  async detail() {
    const { ctx, service } = this;
    const id = ctx.request.body.id;
    const res = await service.form.detail(id);
    ctx.body = res;
  }

  /**
   * 删除
   */
  async delete() {
    const { ctx, service } = this;
    const id = ctx.request.query.id;
    const res = await service.form.delete(id);
    ctx.body = res;
  }
}

module.exports = FormController;
