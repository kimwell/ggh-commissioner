/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */

let baseUrl = '';
let routerMode = 'history';
let imgBaseUrl = 'http://tbxoss.oss-cn-hangzhou.aliyuncs.com';


if (process.env.NODE_ENV == 'development') {
    baseUrl = 'http://192.168.0.251';
} else if (process.env.NODE_ENV == 'production') {
    // baseUrl = 'http://jiedan8.cn';
}

export {
    baseUrl,
    routerMode,
    imgBaseUrl,
}