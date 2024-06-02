const xss = require("xss");
const { exec, escape } = require("../../db/mysql");

// 获取博客列表
const getBlogList = async (author, keyword) => {
  // 受限定义一个sql语句
  // let sql = "select * from bloglist where 1=1 ";

  // if (author) {
  //   // author = escape(author);
  //   sql += `and author=${author}`;
  // }

  // if (keyword) {
  //   keyword = escape(keyword);
  //   sql += `and title like %${keyword}%`;
  // }

  // sql += `order by createTime desc;`;

  // return await exec(sql);

  let sql = `select * from bloglist where 1=1 `;
  if (author) {
    sql += `and author='${author}' `;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }
  sql += `order by createtime desc;`;

  return await exec(sql);
};

// 获取单个详情
const getBlogDetail = async (id) => {
  id = escape(id);
  let sql = `select * from bloglist where id=${id}`;
  const rows = await exec(sql);
  return rows[0] || {};
};

// 创建博客
const createBlogArticle = async (blogData = {}) => {
  // blogData 是一个博客对象，包含 title content author 属性
  const title = xss(blogData.title);
  // console.log('title is', title)
  const content = xss(blogData.content);
  const author = blogData.author;
  const createTime = Date.now();

  const sql = `
       insert into bloglist (title, content, createTime, author)
       values ('${title}', '${content}', ${createTime}, '${author}');
   `;

  const insertData = await exec(sql);
  return {
    id: insertData.insertId,
  };
};

// 更新博客
// ?id=3&content=内容1&title=标题1&createTime=1709370626290&author=Jack
const updateBlogArticle = async (id, blogData = {}) => {
  const { title, content } = blogData;
  let sql = `update bloglist set title='${title}', content='${content}' where id=${id} ;`;
  const updateData = await exec(sql);
  if (updateData.affectedRows > 0) {
    return true;
  }
  return false;
};

// 删除博客
const deleteBlogArticle = async (id, author) => {
  let sql = `delete from bloglist where id=${id} and author='${author}';`;
  const deleteData = await exec(sql);
  if (deleteData.affectedRows > 0) {
    return true;
  }
  return false;
};

module.exports = {
  getBlogList,
  getBlogDetail,
  createBlogArticle,
  updateBlogArticle,
  deleteBlogArticle,
};
