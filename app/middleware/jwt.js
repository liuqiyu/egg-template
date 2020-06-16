'use strict';

const JWT = require('jsonwebtoken');

module.exports = options => {
  return async function (ctx, next) {
    // 拿到传会数据的header 中的token值
    const token = ctx.request.header.authorization;
    // 当前请求时get请求，执行接下来的中间件
    await next();
    // if (!token) {
    //   if (ctx.path === '/user/login') {
    //     await next();
    //   } else {
    //     ctx.status = 401;
    //     ctx.body = {
    //       message: '未登录， 请先登录',
    //     };
    //   }
    // } else { // 当前token值存在
    //   let decode;
    //   try {
    //     // 验证当前token
    //     decode = JWT.verify(token.split(' ')[1], options.secret);
    //     if (!decode || !decode.username) {
    //       ctx.status = 401;
    //       ctx.body = {
    //         message: '没有权限，请登录',
    //       };
    //     }
    //     if (Date.now() - decode.expire > 0) {
    //       ctx.status = 401;
    //       ctx.body = {
    //         message: 'Token已过期',
    //       };
    //     }
    //     const queryResult = await ctx.app.mysql.select('user', {
    //       where: {
    //         username: decode.username,
    //       },
    //     });
    //     if (queryResult) {
    //       await next();
    //     } else {
    //       ctx.status = 401;
    //       ctx.body = {
    //         message: '用户信息验证失败',
    //       };
    //     }
    //   } catch (e) {

    //     if (e.name === 'TokenExpiredError') {
    //       ctx.status = 401;
    //       ctx.body = {
    //         message: 'Token失效，请重新登录',
    //       };
    //     }
    //   }
    // }
  };
};
