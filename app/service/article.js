'use strict';

const Service = require('egg').Service;

class ArticleService extends Service {
  create() {
    const data = {
      id: 123,
    };
    return data;
  }

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

  detail() {
    const data = '刘岂宇';
    return data;
  }
}

module.exports = ArticleService;
