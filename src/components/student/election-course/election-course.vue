<template>
    <div class="background-color">
        <my-header class="header">
            <span class="left" slot="left">
                <img :src="require('../assets/home/back.png')" alt="">
            </span>
            <span slot="center" class="home-course-tab">
                <!-- 课前、课后与学生讨论选项卡区已经有现成的不用再编写 -->
                <tab 
                    :line-width="3" custom-bar-width="4.1em"
                    default-color="#616475"
                    active-color="#4B78FF"
                    >
                    <tab-item  @on-item-click="onTabClick">选课中心</tab-item>
                    <tab-item selected @on-item-click="onTabClick">我的课程</tab-item>
                </tab>
            </span>
            <span class="right" slot="right" >
                <img :src="require('../assets/home/filter.png')" alt="" @click="onClick">
            </span>
        </my-header>
        <section>
           <div class="elective-course" 
           v-for="(course,idx) in courseList" 
           :key="idx" 
           v-if="actIndex == 0"
           @click="goCourseDetail">
               <span>
                   <img :src="arrImg[idx%3]" alt="" >
               </span>
               <ul class="course-information">
                        <h3>{{course.claName}}</h3>
                        <li class="teacher">任课老师：{{course.thrName}}</li>
                        <li class="classroom">上课教室：{{course.classRoom}}</li>
                        <li class="starttime">开课时间：未定</li>
                        <li class="number">人数：{{course.manNumUp}}/<span class="class-number">{{course.manNumCur}}</span></li>
                        <li class="btn" :class="{
                            select:course.state==3,
                            remind:course.state ==2,
                            full:course.state ==1,
                        }" @click.stop="onBtn">{{stateNames[course.state-1]}}</li>
               </ul>
           </div>
           <div class="my-courses"  v-if="actIndex == 1" v-for="(course,idx) in courseList" :key="idx">
                <span>
                   <img :src="arrImg[idx%3]" alt="">
               </span>
               <ul class="course-information">
                        <h3>创意美术课</h3>
                        <li class="teacher">任课老师：</li>
                        <li class="classroom">上课教室：</li>
                        <li class="starttime">开课时间：</li>
                        <li class="number">人数：</li>
                        <li class="mycourse-btn" >待审核</li>
               </ul>
           </div>
        </section>
         
        <coursefilter v-show="filtershow"></coursefilter>  
        <nav-bar></nav-bar>
        
    </div>
</template>

<script>
import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'
import MyHeader from '../components/base/my-header'
import NavBar from '../components/base/nav-bar' 
import { getElectTask, getCourses }  from '../api/api.js'
import Coursefilter from '../components/base/course-filter' 
export default {
    components: {
        Tab,
        TabItem,
        Sticky,
        Divider,
        XButton,
        Swiper,
        SwiperItem,      
        MyHeader,
        NavBar, 
        Coursefilter,
    },
    data(){
        return{
            actIndex:1,//默认激活选项卡内容,
            /* setBarWidth:function(index){
                return  (index+1)*2 + 'em';
            } */
            arrImg:[
                require("../assets/home/art.png"),
                require("../assets/home/art-two.png"),
                require("../assets/home/art-three.png"),
            ],
            courseList:[],
            stateNames:['已满额','提醒我','选课'],
            classStateName:['待审核','已报名','退选'],
            filtershow:false,
            
        }
    },
    methods:{
        /**@function 监听点击选项卡事件 */
        onTabClick(idx){
            console.log(idx);
            let isOpenCourse = false;
            this.actIndex = idx;
            if(idx === 0){
                isOpenCourse = true;
            }
            this.$root.bus.$emit('open-course',isOpenCourse)
        }, 
         /**@function 跳转进入课程详情 */
        goCourseDetail(){
            this.$router.push('/course-detail');
        },
        onBtn(){
            
        },
        /**@function 监听点击筛选图标，然后发送点击事件 */
        onClick(){
            this.filtershow = true;
        },
    },

      mounted(){
          
        let params = {
            start:0,
            limit:50,
        };
        getElectTask(params)
            .then(res => {
                if(res.data.success){
                    let lastesTask = res.data.dataList[res.data.dataList.length-1];
                    let params = {
                            taskNO:lastesTask.taskNO,
                            stuId:lastesTask.stuId
                            }
                        getCourses(params)
                            .then(res => {
                                console.log(res)
                                if(res.data.success){
                                    this.courseList = res.data.dataList;//课程列表对象   
                                    console.log(this.courseList);                                
                                }
                            })
                }
            })
            
    }
}
</script>

<style lang="scss" scoped>
    @function px2rem($px){
        $rem:37.5px;
        @return ($px / $rem) + rem; 
    }
    .background-color{
        background-color: #f3f3f6;
    }
    .elective-course img,.my-courses img{
        width: px2rem(192px);
        height: px2rem(192px);
        margin: px2rem(32px);
        float: left;
    }
    .header{
        background-color: #fff;
    }
    .elective-course,.my-courses{
        background-color: #fff;
        height: px2rem(256px);
        font-size: px2rem(28px);
        margin-top: px2rem(16px);
    }
    ul{
        padding-top: px2rem(40px);
    }
    li{
        list-style: none;
        font-size: px2rem(24px);
    }
    .teacher,.starttime,.classroom{
        color: #999999;
    }
    h3{
        margin-bottom: px2rem(8px);
    }
    .number{
         margin-top: px2rem(8px);
         float: left;
    }
    li:last-child{
        width: px2rem(104px);
        height: px2rem(40px);
        border-radius: px2rem(4px);
        text-align: center;
        float: right;
        font-size: px2rem(22px);
        margin-right: px2rem(30px);
        line-height: px2rem(40px);
    }
    .btn{
        background-color: #607FFF;
        color: #fff;
    }
    .mycourse-btn{
        background-color: #DEE4FE;
        color: #607FFF;
    }
    .select{
        background-color: #607FFF;
    }
    .remind{
        background-color: #FFA560;
    }
    .full{
        background-color: #FFE9E9;
        color: #FF3831;
    }
    .vux-tab{
        height:px2rem(88px);
    }
    .home-course-tab{
        width:px2rem(350px);
    }
    .vux-tab-item{
        font-size:px2rem(32px)!important;
        font-weight: bold;
        background:none!important;
        line-height:px2rem(88px)!important;
    }
    .left{
        margin-left:px2rem(32px)
        }
    .right{
        text-align: right;
        margin-right:px2rem(30px)
    }
    .class-number{
        color: #607FFF;
    }
    .take-lessons{
        color: #DF5D5D;
    }
    .audited{
        background-color: #DEE4FE;
        color: #607FFF;
    }
    .registered{
        background-color: #5DC87D;
        color: white;
    }
</style>

<style lang="scss" >
    @function px2rem($px){
        $rem:37.5px;
        @return ($px / $rem) + rem; 
    }
    .vux-tab-ink-bar{
        height:px2rem(6px)!important;
    }
</style>

