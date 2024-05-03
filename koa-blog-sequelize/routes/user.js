const router = require("koa-router")();
const { login, registerCheck } = require("../controller/blog/user");
const { ErrorModel, SuccessModel } = require("../model/blogResModel");

router.prefix("/api/user");

router.post("/login", async (ctx, next) => {
  const { username, password } = ctx.request.body;
  console.log(username);
  console.log(password);
  const data = await login(username, password);
  if (data.username) {
    ctx.session.username = data.username;
    ctx.session.realname = data.realname;
    ctx.body = new SuccessModel("登录成功");
    return;
  }
  ctx.body = new ErrorModel("登录失败");
});

// session 测试
// router.get("/sessiontest", async (ctx, next) => {
//   if (ctx.session.viewCount == null) {
//     ctx.session.viewCount = 0;
//   }
//   ctx.session.viewCount++;

//   ctx.body = {
//     viewCount: ctx.session.viewCount,
//   };
// });

module.exports = router;
