'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // 用户管理 v1
  router.post('/user/login', controller.user.login);

  // 表单
  // router.post('/form/create', controller.form.create);
  // router.post('/form/lists', controller.form.lists);
  // router.put('/form/update', controller.form.update);
  // router.post('/form/detail', controller.form.detail);
  // router.delete('/form/delete', controller.form.delete);
};
