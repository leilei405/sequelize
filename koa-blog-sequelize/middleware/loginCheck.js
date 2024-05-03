const { ErrorModel } = require("../model/blogResModel");

module.exports = async (ctx, next) => {
  if (ctx.session.username) {
    await next();
    return;
  }
  ctx.body = new ErrorModel("请先登录，才能查看该页面");
};
