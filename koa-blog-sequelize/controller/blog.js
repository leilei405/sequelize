const Sequelize = require("sequelize");
const xss = require("xss");
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
  const list = await Blog.findOne({
    where: { id },
  });

  if (list) return null;

  return list.dataValues;
}

/**
 * 创建博客文章
 *
 * @param blogData 博客文章数据对象，默认为空对象
 * @returns 返回创建的博客文章对象
 */
async function createBlogArticle(blogData = {}) {
  const title = xss(blogData.title);
  const content = xss(blogData.content);
  const author = blogData.author; // 系统自己赋值的属性 比较安全
  const res = await Blog.create({
    title,
    content,
    author,
  });

  return {
    id: res.dataValues.id,
  };
}

/**
 * 更新博客文章
 *
 * @param id 文章ID
 * @param blogData 博客数据对象，默认为空对象
 * @returns 返回Promise对象，解析后返回更新后的博客数据
 */
async function updateBlogArticle(id = "", blogData = {}) {
  const title = xss(blogData.title);
  const content = xss(blogData.content);

  const res = await Blog.update(
    {
      title,
      content,
    },
    {
      where: { id },
    }
  );

  if (res[0] >= 1) return true;
  return false;
}

/**
 * 删除博客文章
 *
 * @param id 文章ID
 * @param author 作者ID
 * @returns 返回删除结果
 */
async function deleteBlogArticle(id = "", author = "") {
  const res = await Blog.destroy({
    where: { id, author },
  });

  if (res >= 1) return true;
  return false;
}

module.exports = {
  getBlogList,
  getBlogDetail,
  createBlogArticle,
  updateBlogArticle,
  deleteBlogArticle,
};
