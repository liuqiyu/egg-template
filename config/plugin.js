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
