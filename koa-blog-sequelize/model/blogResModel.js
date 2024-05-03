// 基类
class BaseModel {
  constructor(data, message) {
    if (typeof data === "string") {
      this.message = data;
      data = null;
      message = null;
    }

    if (data) {
      this.data = data;
    }

    if (message) {
      this.message = message;
    }
  }
}

class SuccessModel extends BaseModel {
  constructor(data, message) {
    super(data, message);
    this.message = message;
    this.success = true;
    this.errCode = 0;
  }
}

class ErrorModel extends BaseModel {
  constructor(data, message) {
    super(data, message);
    this.message = message;
    this.success = false;
    this.errCode = -1;
  }
}

module.exports = {
  SuccessModel,
  ErrorModel,
};
