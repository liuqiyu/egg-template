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
  async lists(name, description, create_date, update_date, currentPage, pageSize, order, prop) {
    const { app } = this;
    try {
      let sql = 'select * from article_lists where 1=1 ';
      if (name) {
        sql += `and name like '%${name}%' `;
      }
      if (description) {
        sql += `and description like '%${description}%' `;
      }
      if (order && prop) {
        const order1 = order === 'descending' ? 'DESC' : 'ASC';
        sql += `order by ${prop} ${order1} `;
      } else {
        sql += 'order by create_date DESC ';
      }
      sql += `limit ${(currentPage - 1) * pageSize}, ${pageSize}`;
      console.log('sql', sql);
      const data = await app.mysql.query(sql);
      const total = await app.mysql.query('SELECT count(*) as total from article_lists');
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
