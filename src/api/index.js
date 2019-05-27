import ajax from './ajax'

const BASE_URL = '/api';


//获取图片验证码

export const queryCaptcha = () => ajax(BASE_URL + '/queryCaptcha', 'GET');


//用户名密码登录
export const reqPwdLogin = ({ user, pwd }) => ajax(BASE_URL + '/login_pwd', { user, pwd }, 'POST');

//获取goods
export const queryGoods = () => ajax('/goods');
//获取ratings
export const queryRatings = () => ajax('/ratings');
//获取info
export const queryInfo = () => ajax('/info');