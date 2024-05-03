const Sequelize = require("sequelize");
const { User, Blog } = require("./model");

!(async function () {
  // 查询单个数据 登录
  const zhangsan = await User.findOne({
    where: {
      username: "张三",
      password: "123456789",
    },
  });

  if (zhangsan) {
    console.log(zhangsan.dataValues);
  } else {
    console.log("用户不存在");
  }

  // 查询多个数据
  const blogs = await Blog.findAll({
    where: {
      author: "李四",
      title: {
        [Sequelize.Op.like]: "%标题%", // 模糊查询
      },
    },
    order: [["id", "desc"]], // 排序
  });
  console.log(blogs.map((item) => item.dataValues));
})();
