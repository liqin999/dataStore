const environment = {
    devHttp:"http://ca-web.yun300.cn",
    testHttp:'http://data.yun300.cn',
    conHttp:'http://webapp.data.yun300.cn',
    default:"http://ca-web.yun300.cn"
};
//判断接口环境
function getDomain(){
    switch (window.location.host) {
        case 'ca-web.yun300.cn':
            return environment.devHttp;
        case 'data.yun300.cn':
            return environment.testHttp;
        case 'webapp.data.yun300.cn':
            return environment.conHttp;
        default:
            return environment.default;
    }
};

let mockData = {//模拟的假数据
      allTables : 'https://easy-mock.com/mock/599d1648059b9c566dcc4206/house/getdatabase',
      onlyTable : 'https://easy-mock.com/mock/599d1648059b9c566dcc4206/house/onlyTable'
};

export {
    getDomain,
    mockData
}
