<template>
  <div class="password-input">
      <input type="password" v-model="password" name="password" class="password" :placeholder="placeHolder">
      <img :src="require('../../assets/lock.png')" alt="" class="lock">
      <!-- <router-link to="/find-password" class="forget-password" v-if="isShow">忘记密码？</router-link> -->
      <slot></slot>
  </div>
</template>

<script>
export default {
    props:['my-placeholder'],
    data(){
        return{
            placeHolder:'密码',
            isShow:true,
            password:localStorage.getItem('password')
        }
    },
    methods:{
        
    },
    watch:{
        password:function(){
            this.$emit('password',this.password);
        }
    },
    created(){
        if(this.myPlaceholder){//指定站位字符
                this.placeHolder = this.myPlaceholder;
                this.isShow = false;
            }
    }
}
</script>

<style lang="scss" scoped>
    @function px2rem($px){
        $rem:37.5px;
        @return ($px / $rem) + rem; 
    }
    .password{
        border-radius: 4px;
        /* height: px2rem(78px);
        line-height: px2rem(78px); */
        background-color:#f7f8fb;
        font-size:px2rem(28px);
        border:none;
        width:px2rem(580px);
        /* padding-left:px2rem(80px); */
        padding:px2rem(25px) 0 px2rem(25px) px2rem(80px);
        outline:none;
        box-sizing: border-box;
    }
    .password-input{
        position: relative;
    }
    .forget-password{
        width:px2rem(250px);
        position: absolute;
        top:0;
        right:px2rem(20px);
        font-size:px2rem(28px);
        display:block;
        height:px2rem(88px);
        line-height: px2rem(88px);
        color:rgb(28,38,57);
    }
    .lock{
        width:px2rem(40px);
        position: absolute;
        left:px2rem(18px);
        top:px2rem(19px)
    }
</style>


