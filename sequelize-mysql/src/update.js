const { Blog } = require("./model");

!(async function () {
  const res = await Blog.update(
    // 修改的字段
    {
      title: "标题2",
      content: "内容2",
    },
    // 修改条件
    {
      where: {
        id: 2,
      },
    }
  );
  console.log(res);
})();
