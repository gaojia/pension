/**
 * Created by gaojia on 2017/10/11.
 * 所有主机地址
 */

const APPModel = {
    Debug : 0,
    Product : 1,
};

//http://47.94.103.126

let  HostAPI = (function (model = APPModel.Debug) {
    switch (model){
        case APPModel.Debug:
            return {
                Pension: global.service + '/api/pad-watch/',
            };
        case APPModel.Product:
            return {
                Pension: global.service + '/api/pad-watch/',
            }
    }
})(APPModel.Product);

module.exports = HostAPI;