
/**
 * @function 异步请求出错处理程序
 * @param {异步请求出错对象} err 
 * @param {注册在全局上的router对象} router 
 * @param {注册在Vue.prototype上弹窗方法} msgbox 
 */
export const xhrErrHandler = (err,router,msgbox) => {
    console.log(err);
    if(err.response){
        let status = err.response.status;
        if(status === 401){
            msgbox('您还没有登录','权限错误',1500)
            router.push('/login')
        }else if(status === 404){
            
        }else if(status === 500 || status === 501){
            console.log('网络异常，稍后重试！')
        }
    }
}

/**
 * @function 执行回退，一般回退到首页
 * @param {路由路径} path 
 * @param {注册在全局上的router对象} router 
 */
export const goBack = (path,router) => {
    router.push(path)
}