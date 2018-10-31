<template>
  <div>
      <header></header>
      <div class="main">
            <div class="user-tab">
                <!-- 课前、课后与学生讨论选项卡区已经有现成的不用再编写 -->
                <tab 
                    :line-width="3" custom-bar-width="2.5em"
                    default-color="#707079"
                    active-color="#607FFF"
                    >
                    <tab-item  selected @on-item-click="onUserTab">教师</tab-item>
                    <tab-item @on-item-click="onUserTab">学生</tab-item>
                </tab>
            </div>
            <username-input @username="getUsername"></username-input>
            <password-input @password="getPassword"></password-input>
            <div class="remember-me">
                <span @click="rememberMe=!rememberMe">
                    <span v-if="!rememberMe" class="checkbox-wrapper">
                        <input type="checkbox" v-model="rememberMe" ></span>
                    <img src="../../assets/login/checked.png" alt="" v-else>记住密码
                </span></div>
            <submit-button @submit="submit">登录</submit-button>
      </div>      
  </div>
</template>

<script>
import MyHeader from '../base/my-header'
import UsernameInput from './username-input'
import PasswordInput from './password-input'
import SubmitButton from './submit-button'
//import RegisterButton from './register-button'
import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem,  } from 'vux'
import { login } from '../../api/api';
export default {
    components:{
        MyHeader,
        UsernameInput,
        PasswordInput,
        SubmitButton,
        Tab,
        TabItem,
        Sticky,
        Divider,
        XButton,
        Swiper,
        SwiperItem,
    },
    data(){
        return{
            username:'',
            password:'',
            userType:1,//1为教师，0为学生
            list: [{key: 'gd', value: '广东'}, {key: 'gx', value: '广西'}],
            rememberMe:false
        }
    },
    methods:{
        /**@function 返回上一个页面 */
        goBack(){
            history.go(-1);
        },
        /**
         * @function 监听用户切换事件
         */
        onUserTab(index){
            console.log(index);
            if(index===0){
                this.userType = 1;//用户类型教师
            }else if(index===1){
                this.userType = 0;//用户类型学生
            }
        },
        /**@function 从子组件中获取用户名 */
        getUsername(username){
            this.username = username;
        },
        /**@function 从子组件中获取用户密码 */
        getPassword(password){
            this.password = password;
        },
        /**@function 向服务器提交用户名和密码进行登录验证 */
        submit(){
            if(this.rememberMe){
                localStorage.setItem('username',this.username);
                localStorage.setItem('password',this.password);
            }else{
                localStorage.removeItem('username');
                localStorage.removeItem('password');
            }
            /* this.$http.defaults.withCredentials=true;
            this.$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
            let url = 'creditBank/login/login!login.action'; */
            let params = {no:this.username,password:this.password,operation:this.userType};
            /* this.$http.post(
                    url,
                    require('qs').stringify(params),) */
            login(params)
                .then( res => {
                    if(res.data.success){
                        let username = res.data.message;
                        //sessionStorage.setItem('IsFromLogin','True');
                        if(this.userType === 1){//教师
                            this.$router.push('/home');
                        }else{
                            this.$router.push('/student-home');
                        }
                        
                    }else if(res.data.errorMessage.indexOf('accOrPswError') != -1){
                        this.$msgbox('登录失败','账号或密码错误',2000);
                    }
                })
                .catch(err => {
                    console.log(err);
                    if(err.response){
                        let errResStatus = err.response.status;
                        if(errResStatus == 500){
                        this.$msgbox('网络异常','请稍后重试！','',2000);
                        }else if(errResStatus == 404){
                            this.$router.push('/page-not/found');
                        }else if(errResStatus == 401){
                            this.$msgbox('未授权登录');
                            this.$router.push('/login')
                        }
                    }
                })
        }
    },
    created(){
        if(localStorage.getItem('username') && localStorage.getItem('password'))
            this.rememberMe = true;
    }
}
</script>

<style lang="scss">    
    @function px2rem($px){
        $rem:37.5px;
        @return ($px / $rem) + rem; 
    }
    .user-tab .vux-tab-item{
        background:none!important;
        font-size:px2rem(32px)!important;
    }
</style>


<style lang="scss" scoped>
    @function px2rem($px){
        $rem:37.5px;
        @return ($px / $rem) + rem; 
    }
    header{
        height:px2rem(559px);
        width:px2rem(750px);
        background-image: url('../../assets/logo.png');
        background-size: cover;
    }    
    .main{
        margin-top:px2rem(48px);
        padding-left:px2rem(85px);
        padding-right:px2rem(85px);
    }
    .user-tab{
        width:px2rem(480px);
        margin:0 auto;
        margin-bottom:px2rem(34px);
    }
    .password-input{
        margin-top:px2rem(50px);
    }
    .remember-me{
        margin-top:px2rem(20px);
        text-align:center;
        font-size:px2rem(26px);
        color:#1A1A1F;
        height:px2rem(50px);
        /* line-height:px2rem(40px); */
    }
    .remember-me input{
        position: relative;
        top:2px;
        /* margin-right:px2rem(10px); */
    }
    .remember-me img{
        width:px2rem(40px);
        height:px2rem(40px);
        position: relative;
        top:-2px;
        vertical-align:middle;
    }
    .checkbox-wrapper{
        display:inline-block;
        box-sizing:border-box;
        width:px2rem(40px);
        height:px2rem(40px);
    }
    .submit-button{
        margin-top:px2rem(110px);
    }
    .register-button{
        margin-top:px2rem(100px);
    }
</style>


