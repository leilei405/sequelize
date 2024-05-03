const Sequelize = require("sequelize");
const Blog = require("../db/model/Blog");

/**
 * 获取博客列表
 *
 * @param author 作者
 * @param keyword 关键字
 * @returns 返回一个Promise，resolve为符合条件的博客数组
 */
async function getBlogList(author = "", keyword = "") {
  const whereOpt = {};
  if (author) whereOpt.author = author;
  if (keyword) {
    whereOpt.title = {
      [Sequelize.Op.like]: `%${keyword}%`,
    };
  }
  const list = await Blog.findAll({
    where: whereOpt,
    order: [["id", "DESC"]],
  });

  return list.map((item) => item.dataValues);
}

/**
 * 获取博客详情
 *
 * @param id 博客ID
 * @returns 返回匹配到的博客对象
 */
async function getBlogDetail(id = "") {
  return await Blog.findOne({
    where: { id },
  });
}

/**
 * 创建博客文章
 *
 * @param blogData 博客文章数据对象，默认为空对象
 * @returns 返回创建的博客文章对象
 */
async function createBlogArticle(blogData = {}) {
  return await Blog.create(blogData);
}

/**
 * 更新博客文章
 *
 * @param id 文章ID
 * @param blogData 博客数据对象，默认为空对象
 * @returns 返回Promise对象，解析后返回更新后的博客数据
 */
async function updateBlogArticle(id = "", blogData = {}) {
  return await Blog.update(blogData, {
    where: { id },
  });
}

/**
 * 删除博客文章
 *
 * @param id 文章ID
 * @param author 作者ID
 * @returns 返回删除结果
 */
async function deleteBlogArticle(id = "", author = "") {
  return await Blog.destroy({
    where: { id, author },
  });
}

module.exports = {
  getBlogList,
  getBlogDetail,
  createBlogArticle,
  updateBlogArticle,
  deleteBlogArticle,
};
