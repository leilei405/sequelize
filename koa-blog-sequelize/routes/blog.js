const router = require("koa-router")();
const {
  getBlogDetail,
  getBlogList,
  createBlogArticle,
  deleteBlogArticle,
  updateBlogArticle,
} = require("../controller/blog/blog");
const { SuccessModel, ErrorModel } = require("../model/blogResModel");
const loginCheck = require("../middleware/loginCheck");

router.prefix("/api/blog");

router.get("/list", async (ctx, next) => {
  let author = ctx.query.author || "";
  const keyword = ctx.query.keyword || "";
  if (ctx.query.isadmin) {
    // 管理员界面
    if (ctx.session.username == null) {
      // 未登录
      ctx.body = new ErrorModel("未登录");
      return;
    }
    author = ctx.session.username;
  }

  const listData = await getBlogList(author, keyword);
  ctx.body = new SuccessModel(listData);
});

router.get("/detail", async (ctx, next) => {
  const data = await getBlogDetail(ctx.query.id);
  ctx.body = new SuccessModel(data);
});

router.post("/new", loginCheck, async (ctx, next) => {
  const body = ctx.request.body;
  body.author = ctx.session.username;
  const data = await createBlogArticle(body);
  ctx.body = new SuccessModel(data);
});

router.post("/update", loginCheck, async (ctx, next) => {
  const val = await updateBlogArticle(ctx.query.id, ctx.request.body);
  if (val) {
    ctx.body = new SuccessModel("更新成功");
  } else {
    ctx.body = new ErrorModel("更新失败");
  }
});

router.post("/delete", loginCheck, async (ctx, next) => {
  const author = ctx.session.username;
  if (author == null) {
    ctx.body = new ErrorModel("未登录");
    return;
  }
  const val = await deleteBlogArticle(ctx.query.id, author);
  if (val) {
    ctx.body = new SuccessModel();
  } else {
    ctx.body = new ErrorModel("删除失败");
  }
});

module.exports = router;
