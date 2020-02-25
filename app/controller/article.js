'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {
  /**
   * 创建
   */
  async create() {
    const { ctx, service } = this;
    const params = {
      name: ctx.request.body.name || null,
      description: ctx.request.body.description || null,
      create_date: new Date(),
    };
    const res = await service.article.create(params);
    if (res) {
      ctx.body = {
        status: 200,
        message: '创建成功',
        data: res,
      };
    } else {
      ctx.body = {
        status: 500,
        errMsg: '创建失败',
      };
    }
  }

  /**
   * 列表
   */
  async lists() {
    const { ctx, service } = this;
    const res = await service.article.lists();
    if (res) {
      ctx.body = {
        status: 200,
        message: '查询成功',
        data: res,
      };
    } else {
      ctx.body = {
        status: 500,
        errMsg: '查询失败',
      };
    }
  }

  /**
   * 更新
   */
  async update() {
    const { ctx, service } = this;
    const res = await service.article.lists();
    if (res) {
      ctx.body = {
        status: 200,
        message: '查询成功',
        data: res,
      };
    } else {
      ctx.body = {
        status: 500,
        errMsg: '查询失败',
      };
    }
  }

  /**
   * 详情
   */
  async detail() {
    const { ctx, service } = this;
    const id = ctx.request.body.id;
    const res = await service.article.detail(id);
    if (res) {
      ctx.body = {
        status: 200,
        data: res,
        message: '查询成功',
      };
    } else {
      ctx.body = {
        status: 500,
        message: '查询失败',
      };
    }
  }

  /**
   * 删除
   */
  async delete() {
    const { ctx, service } = this;
    const id = ctx.request.body.id;
    const res = await service.article.delete(id);
    if (res) {
      ctx.body = {
        status: 200,
        message: '删除成功',
      };
    } else {
      ctx.body = {
        status: 500,
        message: '删除失败',
      };
    }
  }
}

module.exports = ArticleController;
