'use strict';

const Service = require('egg').Service;

class FormModuleService extends Service {
  /**
   * 新增
   * @param {*} params
   */
  async create (name, project_id) {
    const { app } = this;
    try {
      if (!name || !project_id) {
        return {
          code: 500,
          message: '不能为空',
        };
      }
      let result = {};
      const res = await app.mysql.insert('form_module', {
        name,
        project_id: project_id
      });
      if (res.affectedRows === 1) {
        const info = await this.app.mysql.select('form_module', {
          where: {
            id: res.insertId,
          },
        });
        result = {
          code: 200,
          message: 'success',
          data: info[0],
        };
      } else {
        result = {
          code: 200,
          message: 'error',
          data: null,
        };
      }
      return result;
    } catch (e) {
      return {
        code: 500,
        message: '不能重名',
      };
    }
  }

  /**
 * 列表
 */
  async lists (project_id) {
    const { app } = this;
    try {
      let result = {};
      let sql = `select * from form_module where project_id = ${project_id};`
      console.log(sql)
      const res = await app.mysql.query(sql);
      result = {
        code: 200,
        message: 'success',
        data: res,
      };
      return result;
    } catch (e) {
      return {
        code: 500,
        message: 'error',
      };
    }
  }

  /**
  * 删除
  */
  async delete (id) {
    const { app } = this;
    try {
      const selectSql = `select * from form_lists where module_id = ${id}`;
      const data = await app.mysql.query(selectSql);

      if (data.length > 0) {
        return {
          code: 500,
          message: '该组有表单，请删除所有表单后再删除！',
        };
      }
      const sql = `delete from form_module where id in (${id})`;
      const res = await app.mysql.query(sql);

      if (res.affectedRows === 1) {
        return {
          code: 200,
          message: 'success',
        };
      }
      return {
        code: 500,
        message: 'error',
      };
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

module.exports = FormModuleService;
