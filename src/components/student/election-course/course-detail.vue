<template>
    <div class="backgroud-color">
         <div class="top">
            <span class="left" @click="goBack">
                <img :src="require('../assets/home/back.png')" alt="">
            </span>
            <h3>课程详情</h3>
         </div>
         <div class="graphic-introduction">
              <div class="picture">
                <img :src="require('../assets/home/art-big.png')" alt="" class="big-pic">
              </div>
              <h3>创意美术课</h3>
              <p>课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介</p>
              <span>上课教室:<span class="change-color"></span></span>
              <span class="start-time">开课时间：<span class="change-color"></span></span>
         </div>
         <div class="teacher-introduction">
             <h3>教师介绍</h3>
             <span>
                  <img :src="require('../assets/home/teacher.png')" alt="" class="teacher">
             </span>
             <ul>
                 <li><strong>张小莉</strong></li>
                 <li>教师介绍教师介绍教师介绍教师介绍教师介绍教师
                     介绍教师介绍教师介绍教师介绍教师介绍教师介绍
                     教师介绍教师介绍教师介绍教师介绍介绍教师介绍
                     教师介绍介绍教师介绍教师介绍</li>
             </ul>
         </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
        }
},
 methods:{
         /**@function 跳转进入课程详情 */
        goBack(){
            this.$router.push('/home');
        }
    },
}
</script>
<style lang="scss" scoped>
     @function px2rem($px){
        $rem:37.5px;
        @return ($px / $rem) + rem; 
    }
    .backgroud-color{
        background-color: #f3f3f6;
    }
    .top{
        background-color: #fff;
        height: px2rem(80px);
        color: #555555;
        line-height: px2rem(80px);
        text-align: center;
    }
    .left{
        margin-top: px2rem(8px);
        margin-left: px2rem(32px);
        float: left;
    }
    h3{
        font-size: px2rem(32px);
    }
    .top h3{
        margin: 0 px2rem(204px);
    }
    .graphic-introduction{
        height: px2rem(626px);
        background-color: #fff;
        font-size: px2rem(24px);
        padding: 0 px2rem(32px);
        color:#999999;
        margin-bottom: px2rem(16px);
    }
    .graphic-introduction h3{
        color: #000000;
    }
    .big-pic,.picture{
        width: px2rem(688px);
        height: px2rem(368px);
    }
    .picture{
        margin-bottom: px2rem(16px);
        padding-top: px2rem(32px);
    }
    p{
        margin: px2rem(8px) 0;
        line-height: px2rem(36px);
    }
    .start-time{
        float: right;
    }
    .change-color{
        color: #000000;
    }
    .teacher-introduction{
        height: px2rem(306px);
        background-color: #fff;
        padding: 0 px2rem(28px);
    }
    .teacher{
        width: px2rem(104px);
        height: px2rem(104px);
    }
    .teacher-introduction h3{
        margin-bottom: px2rem(32px);
        padding-top: px2rem(32px);
    }
    ul{
        list-style: none;
        float: right;
        font-size: px2rem(24px);
        width: px2rem(550px);
        line-height: px2rem(36px);
        color:#999999;
    }
    strong{
        color: #000000;
    }
</style>
