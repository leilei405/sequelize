const seq = require("./seq");

// 需要同步的模型
require("./model/Blog");
require("./model/User");

// 测试连接
seq
  .authenticate()
  .then(() => {
    console.log("连接成功");
  })
  .catch((err) => {
    console.log("连接失败", err);
  });

// 同步数据库
// force: true 强制同步，删除原表
seq.sync({ force: true }).then(() => {
  console.log("数据库同步成功");
  process.exit();
});
