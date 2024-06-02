// 登录
const loginQuestionCheck = (username, password) => {
    // 假数据使用
    if (username === 'Jack' && password === '123456') {
        return true;
    }
    return false;
}

// 注册
const registerQuestionCheck = (username, password) => {
    // 假数据使用
    if (username === 'Jack' && password === '123456') {
        return true;
    }
    return false;
}

// 获取用户列表
const getQuestionInfo = () => {
    const infoList = [
        {
            username: "Jack",
            password: "123456",
        },
        {
            username: "Tom",
            password: "632578",
        }
    ];
    return infoList;
}


module.exports = {
    loginQuestionCheck,
    registerQuestionCheck,
    getQuestionInfo
}