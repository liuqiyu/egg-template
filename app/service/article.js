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
        create_date: Date.now(),
        update_date: Date.now(),
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
  async lists(query) {
    const { app } = this;
    try {
      console.log(query);
      const data = await app.mysql.select('article_lists', {
        limit: 5, // 返回数据量
        offset: 0, // 数据偏移量
      });
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
        update_date: Date.now(),
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
      console.log(`delete from article_lists where id in (${id})`);
      const res = await app.mysql.query(`delete from article_lists where id in (${id})`);
      return res;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

module.exports = ArticleService;
