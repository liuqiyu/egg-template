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
      const name = query.name || null;
      const description = query.description || null;
      const currentPage = query.currentPage || 1;
      const pageSize = query.pageSize || 20;
      const sql = `select * from article_lists where (name like ${name} or name is not null) and (description like ${description} or description is not null) limit ${(currentPage - 1) * pageSize}, ${pageSize}`;
      const data = await app.mysql.query(sql);
      console.log(sql);
      const total = await app.mysql.query('SELECT count(*) as total from article_lists');
      console.log(total[0].total);
      return {
        data,
        total: total[0].total,
      };
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
