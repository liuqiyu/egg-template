'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {
  /**
   * 创建
   */
  async create() {
    const { ctx, service } = this;
    const res = await service.article.create();
    // ctx.body = 'hi, create';
    // 设置响应内容和响应状态码
    ctx.body = { id: res.id };
    ctx.status = 201;
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
   * 详情
   */
  async detail() {
    const { ctx, service } = this;
    const res = await service.article.detail();
    ctx.body = {
      data: res,
    };
    ctx.status = 201;
  }
}

module.exports = ArticleController;
