// 使用mock.js提供mock接口
import Mock from 'mockjs'
import data from './data.json'



//goods
Mock.mock('/goods', {
    code: 0,
    data: data.goods,
    status: 'success'
});
//ratings
Mock.mock('/ratings', {
    code: 0,
    data: data.ratings,
    status: 'success'
});
//info
Mock.mock('/info', {
    code: 0,
    data: data.info,
    status: 'success'
});

//不需要向外暴露