/**
 *
 * 2017/4/26 0026
 * 作者：高佳
 */
import React from 'react'
import { Scene } from 'react-native-router-flux'
import { PhoneLogin, PasswordLogin, Register, FindPwd, RegisterAgreement } from '../../view/login/Index'


function createScenes() {
    return [
        <Scene key="register" moduleName="login" title="用户注册" component={Register}/> ,
        <Scene key="passwordLogin" moduleName="login" title="用户登录" component={PasswordLogin} /> ,
        <Scene key="phoneLogin" moduleName="login" title="手机登录" component={PhoneLogin}/>,
        <Scene key="findPwd" moduleName="login" title="找回密码" component={FindPwd}/>,
        <Scene key="registerAgreement" moduleName="login" title="找回密码" component={RegisterAgreement}/>,
    ];
}

module.exports = Scenes = createScenes();
