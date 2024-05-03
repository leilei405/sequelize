const { Blog } = require("./model");

!(async function () {
  const res = await Blog.destroy({
    where: {
      id: 4,
      author: "张三",
    },
  });

  console.log(res);
})();
