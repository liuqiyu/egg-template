'use strict';

/** @type Egg.EggPlugin */
// config/plugin.js
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

// 开启 validate 插件
exports.validate = {
  enable: true,
  package: 'egg-validate',
};

// swaggerdoc 配置
exports.swaggerdoc = {
  enable: true, // 启用 swagger-ui 默认启用
  package: 'egg-swagger-doc', // 指定 第三方插件 包名称
};
