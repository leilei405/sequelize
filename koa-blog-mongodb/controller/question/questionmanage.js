// 获取全部问卷列表
const getQuestionAllList = (keyword) => {

    const dataList = [
        {
          _id: 'w1',
          title: '问卷1',
          isPublished: true,
          isStar: false,
          answerCount: 5,
          createdAt: '4月15日 23:56',
        },
        {
          _id: 'w2',
          title: '问卷2',
          isPublished: false,
          isStar: true,
          answerCount: 3,
          createdAt: '4月16日 22:56',
        },
        {
          _id: 'w3',
          title: '问卷3',
          isPublished: true,
          isStar: false,
          answerCount: 7,
          createdAt: '4月17日 21:56',
        },
        {
          _id: 'w4',
          title: '问卷4',
          isPublished: false,
          isStar: true,
          answerCount: 1,
          createdAt: '4月18日 20:56',
        },
    ]

    return dataList;
}

// 获取单个问卷信息
const getQuestionDetail = () => {
    const data = {
        _id: 'w1',
        title: '问卷1',
        isPublished: true,
        isStar: false,
        answerCount: 5,
        createdAt: '4月15日 23:56',
    }

    return data;
}

// 创建调查问卷
const createQuestion = () => {
    console.log('创建');
    return {
        id: 1,
    }
}

// 更新调查问卷
const updateQuestion = (id, questionData) => {
    console.log('更新');
    return {
        id: 1,
    }
}

// 复制调查问卷
const copyQuestion = (id) => {
    console.log('复制');
    return {
        id: 1,
    }
}

// 删除调查问卷
const deleteQuestion = (id) => {
    console.log('删除');
    return {
        id: 1,
    }
}

module.exports = {
    getQuestionAllList,
    getQuestionDetail,
    createQuestion,
    updateQuestion,
    copyQuestion,
    deleteQuestion
}