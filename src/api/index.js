import ajax from './ajax'
import { async } from 'q';

const BASE_URL = '/api';


//获取图片验证码

export const queryCaptcha = () => ajax(BASE_URL + '/queryCaptcha', 'GET');


//用户名密码登录
export const reqPwdLogin = ({ user, pwd }) => ajax(BASE_URL + '/login_pwd', { user, pwd }, 'POST');