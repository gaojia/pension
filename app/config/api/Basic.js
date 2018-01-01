/**
 * Created by gaojia on 2017/10/11.
 */
import HostAPI from './HostApi';
// const API = HostAPI.ZcApiUrl,
//       OAuthServices = HostAPI.OAuthServicesUrl,
//       My = HostAPI.ZcApiUrl,
//       Business = HostAPI.BusinessUrl;

let BasicUrl = {
    // //登录
    // loginUrl: OAuthServices + 'OAuthServices/token',
    // //获取验证码
    // getVerifyCode: 'https://www.yuanxin2015.com/MobileBusiness/MobileBusiness.Common/Services/PostSMSForDHST.asmx/GetSMSVerification',
    // //注册用户
    // register: OAuthServices + 'OAuthServices/account/PhoneRegister',
    // //找回密码
    // findPassword: OAuthServices + 'OAuthServices/account/BackPassword',
    // //获取平台用户信息
    // getOAuthUserInfo: OAuthServices + 'OAuthServices/account/UserProfile',
    // //获取客户端用户信息
    // getClientUserInfo: My + 'My/InitAccount',//获取用户信息
    // //获取商家端用户信息
    // getBusinessUserInfo: Business + 'BusinessPlatformApi/User/GetUserInfo',
    //
    // getArea: OAuthServices +'BusinessService/basic/areas',//获取城市列表
    // increaseShareNo: API + 'ProjectManage/IncreaseShareNo',//分享后增加积分

};
module.exports = BasicUrl;