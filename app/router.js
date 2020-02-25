'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/article/create', controller.article.create);
  router.get('/article/lists', controller.article.lists);
  router.get('/article/update', controller.article.update);
  router.get('/article/detail', controller.article.detail);
  router.delete('/article/delete', controller.article.delete);
};
