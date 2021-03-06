'use strict';
const Controller = require('egg').Controller;

/**
* @controller User 注释必写，swagger-doc是根据这段注释来生成接口的 ）。
*/
class UserController extends Controller {
  /**  （ 注释必写，swagger-doc是根据这段注释来生成接口详细信息的 ）。
    * @summary 根据ID查询信息。
    * @description 根据ID查询信息。
    * @router post /user/login （ get 表示设置请求为 get 请求，最后的 selectById 对应下面的 selectById 方法 ）。
    * @request query string username 需要去查新的ID。（ get 对应 query 请求，请求值设定为 integer 纯数字类型，ID 为请求的字段，注意大小写，和下面的方法要一一对应，不然会报错 ）。
    * @request query string password 需要去查新的ID。（ get 对应 query 请求，请求值设定为 integer 纯数字类型，ID 为请求的字段，注意大小写，和下面的方法要一一对应，不然会报错 ）。
    * @response 200 JsonBody 返回结果。（ 对应 contract 里面的验证属性，下面会提到 。）
    */
  async login () {
    const { ctx, service } = this;
    const rule = {
      username: {
        type: 'string',
        required: true,
        message: '必填项',
      },
      password: {
        type: 'string',
        required: true,
        message: '必填项',
      },
    };
    const loginMsg = ctx.request.body;
    await ctx.validate(rule, loginMsg); // 验证登陆信息是否合法
    // 为当前输入的密码加密
    // loginMsg.password = ctx.helper.encrypt(loginMsg.password);
    // 从service文件中拿到返回结果
    const result = await service.user.login(loginMsg);
    ctx.body = result;
  }

  /**  （ 注释必写，swagger-doc是根据这段注释来生成接口详细信息的 ）。
   * @summary 根据ID查询信息。
   * @description 根据ID查询信息。
   * @router post /user/login （ get 表示设置请求为 get 请求，最后的 selectById 对应下面的 selectById 方法 ）。
   * @request query string username 需要去查新的ID。（ get 对应 query 请求，请求值设定为 integer 纯数字类型，ID 为请求的字段，注意大小写，和下面的方法要一一对应，不然会报错 ）。
   * @request query string password 需要去查新的ID。（ get 对应 query 请求，请求值设定为 integer 纯数字类型，ID 为请求的字段，注意大小写，和下面的方法要一一对应，不然会报错 ）。
   * @response 200 JsonBody 返回结果。（ 对应 contract 里面的验证属性，下面会提到 。）
   */
  async register () {
    const { ctx, service } = this;
    const rule = {
      username: {
        type: 'string',
        required: true,
        message: '必填项',
      },
      password: {
        type: 'string',
        required: true,
        message: '必填项',
      },
    };
    const loginMsg = ctx.request.body;
    await ctx.validate(rule, loginMsg); // 验证登陆信息是否合法
    // 为当前输入的密码加密
    // loginMsg.password = ctx.helper.encrypt(loginMsg.password);
    // 从service文件中拿到返回结果
    const result = await service.user.register(loginMsg);
    ctx.body = result;
  }


  /**
   * 列表
   */
  async lists () {
    const { ctx, service } = this;
    const body = ctx.request.body;
    const currentPage = body.currentPage;
    const pageSize = body.pageSize;
    const order = body.order;
    const prop = body.prop;

    const res = await service.user.lists(currentPage, pageSize, order, prop);
    ctx.body = res;
  }


  /**  （ 注释必写，swagger-doc是根据这段注释来生成接口详细信息的 ）。
   * @summary 根据ID查询信息。
   * @description 根据ID查询信息。
   * @router get /user/detail （ get 表示设置请求为 get 请求 ）。
   * @request query integer id 需要去查新的ID。（ get 对应 query 请求，请求值设定为 integer 纯数字类型）。
   */
  async detail () {
    const { ctx, service } = this;
    const id = ctx.request.query.id;
    const res = await service.user.detail(id);
    ctx.body = res;
  }

  /*
    * 对返回的数据结果进行封装。
    */
  JsonBody (data) {
    this.ctx.body = {
      result: data,
    };
  }
}

module.exports = UserController;
