'use strict';

const Service = require('egg').Service;

class ArticleService extends Service {
  /**
   * 新增
   * @param {*} params
   */
  async create(params) {
    const { app } = this;
    try {
      const res = await app.mysql.insert('article_lists', {
        name: params.name,
        description: params.description,
        create_date: params.create_date,
        update_date: params.update_date || null,
      });
      return res;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  /**
   * 列表
   * @param {*} params
   */
  async lists() {
    const { app } = this;
    try {
      const data = await app.mysql.query('select * from article_lists');
      return data;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  /**
   * 更新
   * @param {*} params
   */
  async update(params) {
    const { app } = this;
    try {
      const res = await app.mysql.update('article_lists', {
        id: params.id,
        name: params.name,
        description: params.description,
      });
      return res;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  /**
   * 详情
   * @param {*} params
   */
  async detail(id) {
    const { app } = this;
    try {
      const res = await app.mysql.get('article_lists', {
        id,
      });
      return res;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  /**
   * 删除
   */
  async delete(id) {
    const { app } = this;
    try {
      const res = await app.mysql.delete('article_lists', {
        id,
      });
      return res;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

module.exports = ArticleService;
