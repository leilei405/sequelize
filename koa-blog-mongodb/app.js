const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const session = require("koa-generic-session");
const redisStore = require("koa-redis");
const path = require("path");
const fs = require("fs");
const morgan = require("koa-morgan");

const { REDIS_CONFIG } = require("./config/db");

const index = require("./routes/index");
const users = require("./routes/users");
const blog = require("./routes/blog");
const user = require("./routes/user");

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "pug",
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// morgan 日志
const ENV = process.env.NODE_ENV;
if (ENV !== "production") {
  // 开发环境
  app.use(morgan("dev"));
} else {
  // 线上环境
  app.use(morgan("combined"));
  // 创建日志文件
  const logStream = fs.createWriteStream(
    path.join(__dirname, "logs", "access.log"),
    {
      flags: "a", // 追加模式
    }
  );

  app.use(
    morgan("combined", {
      stream: logStream,
    })
  );
}

// session 配置
app.keys = ["some_secret_Luck_123"];
app.use(
  session({
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
    // 配置redis
    store: redisStore({
      // all: "127.0.0.1:6379", // 写死本地的redis地址
      all: `${REDIS_CONFIG.host}:${REDIS_CONFIG.port}`,
    }),
  })
);

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(blog.routes(), blog.allowedMethods());
app.use(user.routes(), user.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
