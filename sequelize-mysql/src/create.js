const { User, Blog } = require("./model");

// await语法 外层要包裹一个自执行 async'函数'
!(async function create() {
  // 新增用户数据
  const user = await User.create({
    username: "李四",
    password: 123,
    realname: "lisi",
  });
  console.log(user.dataValues);

  // 新增博客数据
  const blog = await Blog.create({
    title: "标题4",
    content: "内容4",
    author: "张三",
  });
  console.log(blog.dataValues);
})();
