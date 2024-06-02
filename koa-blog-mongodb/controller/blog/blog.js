const xss = require("xss");
const Blog = require("../../db/models/Blog");

// 获取博客列表
const getBlogList = async (author, keyword) => {
  // 动态拼接查询条件
  const whereOpt = {};
  if (author) whereOpt.author = author;
  if (keyword) whereOpt.keyword = new RegExp(keyword);

  const list = await Blog.find(whereOpt).sort({ _id: -1 });
  return list || [];
};

// 获取博客详情
const getBlogDetail = async (id) => {
  const blog = await Blog.findById(id);
  return blog || {};
};

// 创建博客
const createBlogArticle = async (blogData = {}) => {
  const title = xss(blogData.title);
  const content = xss(blogData.content);
  const author = blogData.author;
  const data = await Blog.create({
    title,
    content,
    author,
  });
  return { id: data._id };
};

// 更新博客
// ?id=3&content=内容1&title=标题1&createTime=1709370626290&author=Jack
const updateBlogArticle = async (id, blogData = {}) => {
  const title = xss(blogData.title);
  const content = xss(blogData.content);
  const data = await Blog.findOneAndUpdate(
    { _id: id },
    { title, content },
    { new: true } // 返回更新后的数据 配置项
  );
  if (data == null) return false;
  return true;
};

// 删除博客
const deleteBlogArticle = async (id, author) => {
  const data = await Blog.findOneAndDelete({ _id: id, author });
  if (data == null) return false;
  return true;
};

module.exports = {
  getBlogList,
  getBlogDetail,
  createBlogArticle,
  updateBlogArticle,
  deleteBlogArticle,
};
