/**
 * Created by WangGao on 2017/4/11.
 * 所有主机地址
 */

const APPModel = {
    Debug : 0,
    Product : 1,
};

let  HostAPI = (function (model = APPModel.Debug) {
    switch (model){
        case APPModel.Debug:
            return {
                Debug: true,
                ZcApiUrl: 'https://mobiletest.yuanxin2015.com/YuanxinApi/',
                OAuthServicesUrl: 'https://mobiletest.yuanxin2015.com/',
                WebSiteUrl: 'http://mtest.sinooceanland.net/ZhongChou',
                ResourceShareUrl: 'https://mobiletest.yuanxin2015.com/Yuanxin.ResourceShare.WebApi/',
                PartnerUrl:'https://mobiletest.yuanxin2015.com/YuanXinOfficePartner/Project/',//老带新Url
                PartnerImage:'http://mtest.sinooceanland.net/FileUpload/PartnerProject/Pics/',//老带新图片
                BusinessUrl: 'https://mobiletest.yuanxin2015.com/',
                MicroWebsiteUrl:'https://mobiletest.yuanxin2015.com/WeiOfficialWebsite/zh-cn/',//微官网
            };
        case APPModel.Product:
            return {
                Debug: false,
                ZcApiUrl: 'https://www.yuanxin2015.com/MobileBusiness/YuanXin.ZhongChou.ApiNew/',
                OAuthServicesUrl: 'https://www.yuanxin2015.com/MobileBusiness/',
                WebSiteUrl: 'https://www.yuanxin2015.com/MobileBusiness/YuanXin.ZhongChou.ApiNew',
                ResourceShareUrl: 'https://www.yuanxin2015.com/MobileBusiness/Yuanxin.ResourceShare.WebApi/',
                PartnerUrl:'https://moa.sinooceanland.com/THRWebApi/YuanXinOfficePartner/Project/',//老带新Url
                PartnerImage:'https://www.yuanxin2015.com/OutSiteUploadFile/preferentialImage/',//老带新图片
                MicroWebsiteUrl:'https://www.yuanxin2015.com/MobileBusiness/WeiOfficialWebsite/zh-cn/',//微官网
                BusinessUrl: 'https://www.yuanxin2015.com/MobileBusiness/'
            }
    }
})(APPModel.Product);

module.exports = HostAPI;