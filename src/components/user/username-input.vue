<template>
  <div class="user-input">
      <input type="text" name="username" v-model="username" class="username" placeholder="手机号 / 用户名 / 邮箱">
      <img :src="require('../../assets/login.png')" alt="" class="login">
  </div>
</template>

<script>
export default {
    data(){
        return{
            username:localStorage.getItem('username'),
        }
    },
    methods:{

    },
    watch:{
        username:function(){
            this.$emit('username',this.username);
        }
    },
    created(){

    }
}
</script>

<style lang="scss" scoped>
    @function px2rem($px){
        $rem:37.5px;
        @return ($px / $rem) + rem; 
    }
    .username{
        border-radius: 4px;
        /* height: px2rem(78px);
        line-height: px2rem(78px); */
        background-color:#f7f8fb;
        font-size:px2rem(28px);
        border:none;
        width:px2rem(580px);
        padding:px2rem(25px) 0 px2rem(25px) px2rem(80px);
        outline:none;
        box-sizing: border-box;
    }
    .user-input{
        position: relative;
    }
    .login{
        width:px2rem(40px);
        position: absolute;
        left:px2rem(18px);
        top:px2rem(19px)
    }
</style>


